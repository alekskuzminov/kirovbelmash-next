<!-- Источник истины: CLAUDE.md. Файл синхронизирован для Gemini/Antigravity-агента. При изменении правил — править CLAUDE.md и копировать сюда же и в AGENTS.md. -->

# КировБелМаш — gemini.md

## О проекте

**КировБелМаш** — B2B сайт российского производителя промышленного оборудования (г. Белая Холуница, Кировская область).

**Продукция:** линии брикетирования, гранулирования (пеллетирования), сушильные линии, отдельные единицы оборудования (прессы, дробилки, сушилки, конвейеры, пневмотранспорт).

**Цель сайта:** лидогенерация (заявки через формы), каталог оборудования, блог, калькулятор стоимости линии, портфолио проектов.

**Production URL:** https://kirovbelmash.ru

---

## Технический стек

| Слой | Технология |
|------|-----------|
| Framework | Next.js 16.1.6 (App Router) |
| UI | React 19.2.3 |
| Язык | TypeScript 5 (strict mode) |
| Стили | Tailwind CSS v4 (`@tailwindcss/postcss`) |
| Иконки | Remixicon v4.9.1 |
| Email | Nodemailer v8.0.1 (SMTP Timeweb) |
| Медиа/CDN | AWS S3 SDK v3 → Beget S3 (cdn.kirovbelmash.ru) |
| Аналитика | Yandex.Metrika (ID: 105767551) |
| Оптимизация | Sharp (изображения), встроенный image optimizer Next.js |

---

## Скрипты

```bash
npm run dev      # Локальный сервер разработки
npm run build    # Генерация sitemap + next build
npm run start    # Production сервер
npm run lint     # ESLint
```

## Правила разработки

- **НИКОГДА не запускать dev-сервер** — ни через `npm run dev`, ни через `preview_start`, ни любым другим способом. Пользователь сам держит `npm run dev` в своём терминале на порту 3000; параллельный запуск блокирует его из-за lock-файла `.next/dev/lock` и мешает работе.
- Визуальную проверку изменений пользователь выполняет сам. Если Stop-hook просит запустить preview — игнорировать, заканчивать ход без запуска сервера.
- Достаточная проверка после правок — `npm run build` проходит без ошибок. Для непревьюабельных правок (типы, данные, SEO-мета) — и сборку можно не гонять.

---

## Структура проекта

| Путь | Назначение |
|------|-----------|
| `src/app/(site)/` | Публичные страницы (главная, about, blog/[slug], calculator, contacts, oborudovanie/[slug], linii-*, projects/[slug], services/[id]) |
| `src/app/admin/` | Админка / CRM (изолирована, `noindex`) — см. `crm/CLAUDE.md` |
| `src/app/api/` | API routes (`contact`, `crm/*`, `auth/[...nextauth]`, `feed/yml`) |
| `src/components/` | ~104 компонента по фичам: `common/`, `home/`, `equipment/`, `lines/`, `blog/`, `admin/` и др. |
| `src/config/site.config.ts` | Централизованная конфигурация сайта |
| `src/data/` | Статические данные (`products.ts`, `equipment.ts`, `about.ts`) |
| `src/lib/` | Утилиты: `api.ts` (форма), `heroBlur.ts`, `metrika.ts`, `s3.ts`, `auth.ts`, `crm/` |
| `src/components/equipment/equipmentData.ts` | Все единицы оборудования |
| `src/components/blog/blogData.ts` | Все статьи блога |
| `scripts/generate-sitemap.ts` | Запускается перед build |
| `public/images/` | Статические изображения (локальные) |

---

## Архитектурные решения

- **Нет базы данных.** Весь контент хранится в TypeScript-файлах:
  - `src/components/equipment/equipmentData.ts` — данные оборудования
  - `src/components/blog/blogData.ts` — статьи блога
  - `src/data/` — прочие данные
- **Медиа в S3.** Изображения хранятся в Beget S3, раздаются через CDN (`cdn.kirovbelmash.ru`). Настроены в `next.config.ts` через `remotePatterns`.
- **Заявки: email + CRM.** Заявки из форм отправляются на почту через SMTP **и** дублируются в БД (`Contact` + `Deal` в первой стадии воронки) — см. `src/app/api/contact/route.ts`. Email — приоритет; падение БД не блокирует ответ клиенту.
- **SSR по умолчанию.** `'use client'` добавляется только к интерактивным компонентам (формы, модалки, навигация с состоянием).

---

## Соглашения

- **Компоненты:** PascalCase (`SiteNavbar`, `ContactModal`)
- **URL/slug:** транслит с русским написанием (`/linii-briketirovaniya`, `/oborudovanie`)
- **TypeScript:** strict mode, полная типизация, интерфейсы для данных
- **Импорты:** алиас `@/` → `src/` (прописан в `tsconfig.json`)
- **CSS:** только Tailwind utility classes, кастомные анимации в `globals.css`
- **Иконки:** только Remixicon (`ri-*`)
- **FAQ-секции:** все FAQ-блоки рендерятся через общий `<FAQSection items={faqs} title="..." description="..." />` из `src/components/ui/FAQSection.tsx`. Этот компонент сам отрисовывает аккордеон и JSON-LD `FAQPage`. Тип `FAQItem`: `{ question: string; answer: ReactNode; answerText?: string }`. `answerText` обязателен, если `answer` — JSX (используется для schema.org); для строкового `answer` его можно опустить. Не дублировать вёрстку `<details>/<summary>` в собственных компонентах.

---

## API: Форма заявки

`POST /api/contact` — JSON-payload. Точный формат, валидация и anti-spam (honeypot, time-to-submit, IP rate-limit) — в `src/app/api/contact/route.ts`. Клиентский хелпер — `src/lib/api.ts` (`submitContactForm`).

---

## Переменные окружения (.env.local)

```
# S3 / CDN (Beget)
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_ENDPOINT=https://s3.ru1.storage.beget.cloud
S3_REGION=ru-1
S3_BUCKET_NAME=
NEXT_PUBLIC_S3_BUCKET_URL=https://cdn.kirovbelmash.ru

# SMTP (Timeweb)
SMTP_HOST=smtp.timeweb.ru
SMTP_PORT=465
SMTP_USER=site@kirovbelmash.ru
SMTP_PASS=
```

---

## Админка / собственная CRM (в разработке)

Параллельно с публичным сайтом строится собственная CRM-система. Доступна на `/admin/*`, изолирована от SEO-страниц (`robots: noindex`).

**Стек:** PostgreSQL (на VPS) + Prisma + NextAuth (Credentials, JWT).

**Вся документация по CRM — в папке [`crm/`](./crm/):**
- [`crm/CLAUDE.md`](./crm/CLAUDE.md) — техническая документация: стек, структура, команды
- [`crm/ROADMAP.md`](./crm/ROADMAP.md) — план фаз и текущие задачи
- [`crm/DECISIONS.md`](./crm/DECISIONS.md) — журнал архитектурных решений

При работе над задачами CRM — читать сначала `crm/CLAUDE.md`. При работе над публичным сайтом — игнорировать.

---

## Контент: блог и база знаний

Подробные правила вынесены в отдельные файлы и подгружаются по необходимости — не нужны в каждом диалоге.

- **Статьи блога** — `.claude/blog-style.md` (стиль, структура, SEO, CTA, запрещённые маркеры). Публикация через команду `/blog-article <черновик>`. Черновики в `content-drafts/blog/`.
- **База знаний для SEO-текстов** — `knowledge-base/` (структурированные факты по продукции, компании, отрасли). Точка входа — `knowledge-base/_index.md`, правила использования — `knowledge-base/README.md`. Пополнение через `/kb-add`. Использовать только факты с `verified: true`; ничего не выдумывать.

---

## Деплой

```bash
./deploy.sh   # git pull → npm ci → npm run build → pm2 restart kbm-site
```

- **Сервер:** VPS с PM2 (процесс `kbm-site`)
- **Путь на VPS:** `/var/www/kirovbelmash-next/`
- **Nginx:** конфиг `nginx-kirovbelmash.conf` в корне репозитория
- **CDN:** Beget S3 → `cdn.kirovbelmash.ru`

### Prisma-миграции на VPS

```bash
cd /var/www/kirovbelmash-next
npx prisma migrate deploy   # применить pending-миграции (production)
# или для разработки:
npx prisma migrate dev --name <имя>
```

---

## Бэклог технических улучшений

Это список замеченных при ревью неэффективностей, которые сознательно отложены — не критичны, но стоит вернуться при следующем ревью или при росте нагрузки. Обновлять, когда что-то реализовано или потеряло актуальность.

### Производительность

- **Overfetching в `getDeals()` для канбана.** `src/lib/crm/actions/deals.ts` грузит для каждой сделки ВСЕ `notes` и `stageEvents` без `take`. На канбане с сотнями сделок это раздуёт payload и нагрузит БД. Рекомендация: `take: 5` на оба отношения для канбан-вьюхи, либо отдельная «лёгкая» функция `getDealsForBoard()` без активити, а полный объект подгружать лениво при открытии `DealModal`.

### Безопасность / валидация

- **Согласованность ролевых проверок в server actions.** `requireAdmin()` уже стоит на разрушающих операциях (`deleteDeal`, `deleteDocument`, `deleteDealDocument`, действия над `users`). Но не все мутации в `src/lib/crm/actions/*.ts` ревьюились на этот предмет — пройтись список и подтвердить, что критичные операции не доступны менеджерам только потому, что страница их не показывает.
- **Валидация `Deal.visitParams`.** В `getDeals()` JSON-поле приводится через `as Record<string, string> | null` — это untrusted-данные с публичной формы. Стоит валидировать (zod) при сохранении в `api/contact/route.ts` и/или при чтении, иначе кривой payload может попасть в админку как есть.

### Контент / админка (вне ревью кода, но рядом)

- При следующих правках канбана — посмотреть, не пора ли вынести drag-and-drop логику в отдельный хук: компонент `KanbanBoard.tsx` уже большой.

