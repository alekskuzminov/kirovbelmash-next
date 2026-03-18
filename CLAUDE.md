# КировБелМаш — CLAUDE.md

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

---

## Структура проекта

```
src/
├── app/
│   ├── (site)/              # Публичные страницы сайта
│   │   ├── page.tsx         # Главная
│   │   ├── about/           # О компании
│   │   ├── blog/[slug]/     # Блог
│   │   ├── calculator/      # Калькулятор стоимости
│   │   ├── contacts/        # Контакты
│   │   ├── oborudovanie/[slug]/    # Каталог оборудования
│   │   ├── linii-briketirovaniya/ # Линии брикетирования
│   │   ├── linii-granulirovaniya/ # Линии гранулирования
│   │   ├── sushilnie-linii/       # Сушильные линии
│   │   ├── projects/[slug]/       # Проекты
│   │   └── services/[id]/         # Услуги
│   ├── api/contact/route.ts # Endpoint формы заявки
│   ├── layout.tsx           # Root layout (мета, шрифты)
│   └── globals.css          # Глобальные стили + Tailwind
├── components/              # ~104 компонента, организованы по фичам
│   ├── common/              # ContactModal, StaticLeadForm и др.
│   ├── home/ about/ blog/ calculator/ equipment/ lines/ ...
│   ├── SiteNavbar.tsx
│   ├── SiteFooter.tsx
│   └── YandexMetrika.tsx
├── config/
│   └── site.config.ts       # Централизованная конфигурация сайта
├── data/
│   ├── products.ts          # Статические данные продуктов
│   ├── equipment.ts
│   └── about.ts
└── lib/
    ├── api.ts               # submitContactForm() — хелпер формы
    ├── heroBlur.ts          # Blur placeholder URLs для изображений
    ├── metrika.ts           # sendMetrikaGoal() — трекинг событий
    └── s3.ts                # S3 клиент

scripts/
└── generate-sitemap.ts      # Запускается перед build

public/images/               # Статические изображения (локальные)
```

---

## Архитектурные решения

- **Нет базы данных.** Весь контент хранится в TypeScript-файлах:
  - `src/components/equipment/equipmentData.ts` — данные оборудования
  - `src/components/blog/blogData.ts` — статьи блога
  - `src/data/` — прочие данные
- **Медиа в S3.** Изображения хранятся в Beget S3, раздаются через CDN (`cdn.kirovbelmash.ru`). Настроены в `next.config.ts` через `remotePatterns`.
- **Email как CRM.** Заявки из форм отправляются на почту через SMTP, в БД не сохраняются.
- **SSR по умолчанию.** `'use client'` добавляется только к интерактивным компонентам (формы, модалки, навигация с состоянием).

---

## Ключевые файлы

| Файл | Назначение |
|------|-----------|
| `src/config/site.config.ts` | Контакты компании, соцсети, общие настройки |
| `src/components/equipment/equipmentData.ts` | Все единицы оборудования (slug, SEO, specs, gallery) |
| `src/components/blog/blogData.ts` | Все статьи блога |
| `src/app/api/contact/route.ts` | POST endpoint для форм заявок |
| `src/lib/api.ts` | `submitContactForm(data)` — клиентский хелпер |
| `src/components/common/ContactModal.tsx` | Модальная форма заявки (глобальная) |
| `src/lib/heroBlur.ts` | Blur placeholders для hero-изображений |

---

## Соглашения

- **Компоненты:** PascalCase (`SiteNavbar`, `ContactModal`)
- **URL/slug:** транслит с русским написанием (`/linii-briketirovaniya`, `/oborudovanie`)
- **TypeScript:** strict mode, полная типизация, интерфейсы для данных
- **Импорты:** алиас `@/` → `src/` (прописан в `tsconfig.json`)
- **CSS:** только Tailwind utility classes, кастомные анимации в `globals.css`
- **Иконки:** только Remixicon (`ri-*`)

---

## API: Форма заявки

```
POST /api/contact
Content-Type: application/json

{
  name: string,        // обязательно
  phone: string,       // обязательно
  email?: string,
  company?: string,
  message?: string,
  source?: string,     // откуда заявка (для трекинга)
  extra?: Record<string, string>
}

Response: { ok: true } | { error: string }
```

---

## Переменные окружения (.env.local)

```
# S3 / CDN (Beget)
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_ENDPOINT=https://s3.ru1.storage.beget.cloud
S3_REGION=ru-1
S3_BUCKET=
NEXT_PUBLIC_S3_BUCKET_URL=https://cdn.kirovbelmash.ru

# SMTP (Timeweb)
SMTP_HOST=smtp.timeweb.ru
SMTP_PORT=465
SMTP_USER=site@kirovbelmash.ru
SMTP_PASS=
```

---

## Админка (в планах)

Роутинг зарезервирован: `src/app/(admin)/layout.tsx` — пустой layout с `robots: noindex`.
Страниц, авторизации и UI нет. Детали стека и функционал будут определены позже.

---

## Блог: правила написания статей

### Рабочий процесс
1. Черновик кладётся в `content-drafts/blog/название.md` (шаблон — `_TEMPLATE.md`)
2. Команда `/blog-article название.md` — Claude читает черновик, пишет статью, добавляет в `blogData.ts`
3. После — нужно положить изображение в `public/images/blog/[slug]/main.png`

### Стиль текста (человекоподобный, B2B промышленный)
- **Конкретика вместо абстракций:** числа, модели, реальные кейсы («производительность 800 кг/ч», «срок окупаемости 14 месяцев»)
- **Переменная длина предложений:** короткие ударные + длинные объяснительные — чередовать
- **Живые вводные:** «На практике», «Важный момент», «Здесь есть нюанс» — вместо казённых «Следует отметить», «Необходимо подчеркнуть»
- **Прямые утверждения** без избыточных оговорок («как правило», «в некоторых случаях» — только там, где реально нужно)
- **Мы-голос:** от лица производителя («Мы рекомендуем», «В нашей практике», «Наши клиенты»)
- **Отраслевой жаргон органично:** матрица, шнек, гранула, фракция, влажность сырья — без объяснений базовых терминов
- **Запрещённые маркеры ИИ-текста:** «В заключение следует отметить», «Таким образом можно сделать вывод», «Немаловажно», «осуществлять», «данный», «является», «необходимо отметить», «в рамках», «на сегодняшний день»

### Структура статьи
- 4–8 секций `heading` с контентом под каждой
- Минимум 1 блок `list` (критерии выбора, сравнение, шаги)
- Минимум 1 блок `quote` — конкретный инсайт из практики, не банальная мысль
- 1-2 внутренние ссылки: через `[анкор](url)` в параграфах И/ИЛИ блок `cta`
- `readTime`: 1 минута ≈ 800 символов текста всей статьи
- `excerpt`: 1-2 предложения, конкретная польза для читателя (не пересказ заголовка)

### SEO
- `title` оптимизируется под `keywords` из frontmatter черновика; до 65 символов, ключевое слово в начале
- Первый параграф содержит целевой запрос органично
- `slug`: транслит, строчные, дефисы, без предлогов
- `tags`: 3–5 тегов, точные термины отрасли

### Внутренние ссылки
- Использовать `related_products` из черновика как приоритетные цели для ссылок
- 1 ссылка — органично в тексте через `[анкор](url)` в параграфе (тип `paragraph`)
- 1 блок `cta` — в конце тематического раздела или статьи с явным призывом

### CTA-блок: обязательный запрос перед публикацией
Перед добавлением статьи в `blogData.ts` **всегда спрашивать у пользователя**:
1. Текст кнопки CTA (`linkText`)
2. URL перехода (`href`) — абсолютный путь или якорь, например `/contacts`, `/#production-lines`, `/linii-granulirovaniya`

Без этой информации использовать дефолт: `linkText: 'Обсудить проект'`, `href: '/contacts'` — и явно сообщить пользователю, что использован дефолт.

---

## Деплой

```bash
./deploy.sh   # git pull → npm ci → npm run build → pm2 restart kbm-site
```

- **Сервер:** VPS с PM2 (процесс `kbm-site`)
- **Nginx:** конфиг `nginx-kirovbelmash.conf` в корне репозитория
- **CDN:** Beget S3 → `cdn.kirovbelmash.ru`
