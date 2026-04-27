# CRM — техническая документация

Этот файл — главный источник правды по разработке собственной CRM-системы внутри проекта `kirovbelmash-next`. Если задача связана с админкой/CRM — читать в первую очередь.

Связанные документы:
- [ROADMAP.md](./ROADMAP.md) — план фаз и задач
- [DECISIONS.md](./DECISIONS.md) — журнал архитектурных решений

---

## Зачем своя CRM

Параллельно с продакшен-сайтом строится собственная CRM. amoCRM продолжает работать у заказчика — переключение не запланировано. Цель: создать кейс «сайт + CRM + SEO» для дальнейшего масштабирования услуги на похожие B2B-производства.

---

## Стек

| Слой | Технология | Версия |
|------|-----------|--------|
| База данных | PostgreSQL | 16 |
| ORM | Prisma | 6.19.3 |
| Авторизация | NextAuth | 4.24.x |
| Хеш паролей | bcryptjs | 3.x |
| Хранение файлов | Beget S3 (общий с сайтом) | - |
| UI | Next.js App Router + Tailwind | как у сайта |

**Важно:** Prisma 7 пока не использовать — сломана обратная совместимость со схемой (`url = env("DATABASE_URL")` больше не валиден). См. DECISIONS.md.

---

## Структура файлов

```
prisma/
├── schema.prisma         # Все модели БД
└── seed.ts               # Создание admin-пользователя и дефолтной воронки

src/
├── app/
│   ├── (admin)/          # Group route — пустой layout с robots:noindex (исторический, можно удалить позже)
│   ├── admin/
│   │   ├── layout.tsx    # SessionProvider + meta
│   │   ├── login/
│   │   │   └── page.tsx  # Форма входа
│   │   └── (auth)/       # Защищённая зона (sidebar layout)
│   │       ├── layout.tsx
│   │       ├── page.tsx          # Редирект на /admin/deals
│   │       └── deals/page.tsx    # Заглушка Kanban
│   └── api/
│       └── auth/[...nextauth]/route.ts
├── lib/
│   ├── prisma.ts         # Singleton PrismaClient
│   └── auth.ts           # authOptions для NextAuth
├── components/admin/
│   ├── AdminSessionProvider.tsx
│   └── AdminSidebar.tsx
├── types/
│   └── next-auth.d.ts    # Расширение типов сессии (id, role)
└── proxy.ts              # Защита /admin/* (в Next.js 16 middleware → proxy)
```

---

## Модели БД (краткий справочник)

Полная схема — `prisma/schema.prisma`.

- **User** — менеджеры и администраторы. Роли: `ADMIN`, `MANAGER`.
- **Contact** — клиент (компания/лицо). Один контакт может иметь много сделок.
- **Pipeline / Stage** — воронки и их этапы. По умолчанию создаётся одна воронка с 6 этапами (как в amoCRM).
- **Deal** — сделка. Привязана к контакту, этапу, воронке, опционально к ответственному.
- **Task** — задача. Привязана к сделке или контакту, опционально к ответственному, имеет дедлайн.
- **Note** — текстовая заметка к сделке/контакту.
- **Document** — файл в S3. Привязан к сделке или контакту.

---

## Защита маршрутов

Защита реализована через `src/proxy.ts` (Next.js 16 переименовал middleware в proxy). Защищены все `/admin/*` кроме `/admin/login`. Логика — стандартный `next-auth/middleware` с экспортом `proxy`.

---

## Переменные окружения

В `.env.local` (и локально, и на VPS) нужны:

```
DATABASE_URL="postgresql://kbm_user:ПАРОЛЬ@localhost:5432/kbm_crm"
NEXTAUTH_SECRET=случайная-строка-32+-символа
NEXTAUTH_URL=https://kirovbelmash.ru   # на VPS
NEXTAUTH_URL=http://localhost:3000     # локально
```

`NEXTAUTH_SECRET` генерируется на VPS: `openssl rand -base64 32`.

---

## Команды

### Локально

```bash
# Генерация Prisma Client после изменения schema.prisma
.\node_modules\.bin\prisma generate

# Установка пакетов (нужен флаг из-за конфликта nodemailer)
npm install --legacy-peer-deps
```

### На VPS

Prisma в devDependencies, deploy.sh не ставит её. Используем npx с явной версией:

```bash
cd /var/www/kirovbelmash-next

# Применить изменения схемы к БД
export DATABASE_URL="postgresql://kbm_user:ПАРОЛЬ@localhost:5432/kbm_crm"
npx prisma@6 db push

# Запустить seed (создаёт admin-пользователя и дефолтную воронку, если их нет)
npx prisma@6 db seed
```

PostgreSQL установлен напрямую на VPS, не в Docker. База: `kbm_crm`, пользователь: `kbm_user`.

---

## Деплой

`deploy.sh` использует `npm install --legacy-peer-deps` (необходимо из-за конфликта `nodemailer@8` vs `next-auth@4` peer-зависимостей).

Полный workflow при изменениях, затрагивающих БД:

```
1. Локально: правка schema.prisma
2. Локально: .\node_modules\.bin\prisma generate
3. git push
4. На VPS: bash /var/www/kirovbelmash-next/deploy.sh
5. На VPS: cd /var/www/kirovbelmash-next && export DATABASE_URL="..." && npx prisma@6 db push
```

---

## Учётные данные по умолчанию

После seed создаётся:

```
admin@kirovbelmash.ru / Admin123!
```

**После первого входа сменить пароль.** UI смены пароля пока нет — править через psql или временный скрипт.

---

## Изоляция от сайта

CRM не влияет на SEO и публичный сайт:

- Все маршруты `/admin/*` помечены `robots: { index: false, follow: false }`
- PostgreSQL не используется на публичных страницах сайта
- Sidebar и сессии загружаются только под `/admin`
- Yandex.Metrika в админке не нужна (отключить, если случайно подцепится)
