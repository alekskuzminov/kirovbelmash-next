# План: разделы «Контент» и «Настройки» в админке

> Черновик плана к будущей Фазе 5. Не реализовано. Обсудить перед стартом.

## Context

На хабе `/admin/` ([page.tsx](../src/app/admin/(auth)/page.tsx)) две заглушки `COMING_SOON` — «Контент» и «Настройки». В roadmap они не описаны. Нужно превратить их в рабочие разделы.

**Принятые решения по scope (из обсуждения с пользователем):**

- **Контент** — гибрид: контент остаётся в TS-файлах (`blogData.ts`, `equipmentData.ts`, `site.config.ts`), а в БД хранится только мета-оверлей. В первую очередь делаем **только SEO глобально** (теги главной/разделов, OG-картинки по умолчанию, robots).
- **Настройки** — три подраздела: **Интеграции и уведомления**, **Реквизиты компании**, **Настройки CRM**. Секреты (SMTP_PASS, S3_SECRET) остаются в `.env` — в UI выводим только non-secret параметры и статус «настроено: да/нет».
- Все разделы доступны только роли `ADMIN` (по аналогии с `/admin/users`).

**Что это даёт:**
- Заказчик может править SEO-меты главной и разделов без деплоя.
- Адресаты email-уведомлений и Telegram-алерты о заявках — без правки кода и `.env`.
- Реквизиты компании (телефоны, адрес, рабочие часы, соцсети) — редактируются из UI, фолбек на `site.config.ts`.
- Дефолтный ответственный для автосделок и параметры авто-задач — без хардкода в `/api/contact/route.ts`.

---

## Архитектура

### Хранение

Каждый раздел настроек — отдельная Prisma-модель **singleton** (одна строка с фиксированным id `"singleton"`). Это типизированно и проще key-value хранилища.

SEO-оверрайды для конкретных URL — обычная таблица с `path` как unique key.

### Кеширование и инвалидация

Все singleton-записи читаются через `unstable_cache` с тегом, например `seo-overrides`, `notification-settings`, `company-details`, `crm-settings`. После записи в server action — `revalidateTag(...)` + `revalidatePath('/')` для site-wide настроек (реквизиты, SEO).

### Защита

- Все маршруты `/admin/content/*` и `/admin/settings/*` защищены существующим `src/proxy.ts`.
- Server actions проверяют `session.user.role === 'ADMIN'` — иначе throw. По аналогии с `src/lib/crm/actions/pipeline.ts`.
- В `AdminSidebar` секция «Настройки» уже есть (видна только админам, [AdminSidebar.tsx:68](../src/components/admin/AdminSidebar.tsx)). Добавляем туда новые ссылки.

---

## Изменения в Prisma-схеме

Файл: [prisma/schema.prisma](../prisma/schema.prisma)

```prisma
model SeoOverride {
  id          String   @id @default(cuid())
  path        String   @unique          // "/", "/about", "/contacts", "/blog", ...
  title       String?
  description String?
  ogImage     String?                    // URL CDN или /images/...
  robots      String?                    // "index,follow" или "noindex,nofollow"
  updatedAt   DateTime @updatedAt
}

model SeoDefaults {
  id                 String   @id @default("singleton")
  defaultOgImage     String?
  titleTemplate      String?  // "%s — КировБелМаш"
  defaultDescription String?
  updatedAt          DateTime @updatedAt
}

model NotificationSettings {
  id                   String   @id @default("singleton")
  emailRecipients      String[] @default([])    // адреса для уведомлений о заявках
  telegramChatId       String?                  // chat_id для алертов
  notifyOnNewLead      Boolean  @default(true)
  notifyOnTaskDeadline Boolean  @default(true)
  notifyOnStageChange  Boolean  @default(false)
  updatedAt            DateTime @updatedAt
}

model CompanyDetails {
  id              String   @id @default("singleton")
  phonePrimary    String?
  phoneSales      String?
  phoneSupply     String?
  phoneAccounting String?
  emailPrimary    String?
  emailSales      String?
  addressCity     String?
  addressStreet   String?
  workingHours    String?
  vk              String?
  telegram        String?
  whatsapp        String?
  max             String?
  updatedAt       DateTime @updatedAt
}

model CrmSettings {
  id                String   @id @default("singleton")
  defaultAssigneeId String?
  defaultPipelineId String?
  defaultStageId    String?
  autoTaskEnabled   Boolean  @default(false)
  autoTaskTitle     String?  // например "Перезвонить"
  autoTaskOffsetMin Int?     // дедлайн через N минут после создания сделки
  sources           String[] @default(["Сайт", "Вручную", "Звонок", "Реферал", "Выставка"])
  updatedAt         DateTime @updatedAt
}
```

После правки — `prisma generate` локально и `npx prisma@6 db push` на VPS (флоу описан в [crm/CLAUDE.md](./CLAUDE.md)).

`prisma/seed.ts` дополнить созданием четырёх singleton-записей (если их нет) с пустыми/дефолтными значениями.

---

## Server actions

Новые файлы (по аналогии с `src/lib/crm/actions/pipeline.ts`):

- **`src/lib/admin/actions/seo.ts`** — `listSeoOverrides()`, `upsertSeoOverride(path, data)`, `deleteSeoOverride(id)`, `updateSeoDefaults(data)`.
- **`src/lib/admin/actions/settings.ts`** — `getNotificationSettings()`, `updateNotificationSettings(data)`, `getCompanyDetails()`, `updateCompanyDetails(data)`, `getCrmSettings()`, `updateCrmSettings(data)`. Все мутирующие — проверка `role === 'ADMIN'`.

Хелпер для чтения site-wide настроек на публичном сайте:

- **`src/lib/admin/seo.ts`** — `getSeoForPath(path: string): Promise<Metadata>`. Читает `SeoOverride` + `SeoDefaults`, возвращает Next.js Metadata. Кешируется через `unstable_cache(['seo', path], { tags: ['seo-overrides'] })`.
- **`src/lib/admin/company.ts`** — `getCompanyDetails(): Promise<CompanyDetails>`. Возвращает БД-запись с фолбеком на значения из `src/config/site.config.ts`. Кешируется тегом `company-details`.

---

## Страницы и компоненты

### Контент

| Маршрут | Описание |
|---------|----------|
| `src/app/admin/(auth)/content/page.tsx` | Хаб раздела «Контент» — пока одна карточка «SEO», остальные (Блог, Оборудование, KB) как `COMING_SOON` |
| `src/app/admin/(auth)/content/seo/page.tsx` | Серверная: список `SeoOverride` + форма `SeoDefaults` |

Компоненты:
- `src/components/admin/content/SeoDefaultsForm.tsx` — клиентская форма дефолтов (titleTemplate, defaultDescription, defaultOgImage)
- `src/components/admin/content/SeoOverridesTable.tsx` — таблица URL → title/description/robots, inline-edit
- `src/components/admin/content/SeoOverrideModal.tsx` — модалка добавления/редактирования оверрайда конкретного path

Список «известных» path для подсказки в селекте: жёсткий массив `["/", "/about", "/contacts", "/blog", "/calculator", "/linii-briketirovaniya", "/linii-granulirovaniya", "/sushilnie-linii"]` в `src/lib/admin/knownPaths.ts`. Для динамических страниц (`/blog/[slug]`, `/oborudovanie/[slug]`) — вне scope этой фазы (потребует UI блога/оборудования).

### Настройки

| Маршрут | Описание |
|---------|----------|
| `src/app/admin/(auth)/settings/page.tsx` | Хаб раздела «Настройки» — три карточки |
| `src/app/admin/(auth)/settings/integrations/page.tsx` | Интеграции и уведомления |
| `src/app/admin/(auth)/settings/company/page.tsx` | Реквизиты компании |
| `src/app/admin/(auth)/settings/crm/page.tsx` | Настройки CRM |

Компоненты:
- `src/components/admin/settings/IntegrationsForm.tsx` — формы:
  - **SMTP**: read-only host/port/user из `.env`, бейдж «настроено», поле «Получатели» (`emailRecipients[]` — chips)
  - **Telegram**: bot token (статус «настроено в .env»), `telegramChatId` (input), переключатель `notifyOnNewLead`
  - **Yandex.Metrika**: read-only ID из кода (`105767551`)
  - **Beget S3**: read-only endpoint/bucket, бейдж «настроено»
- `src/components/admin/settings/CompanyForm.tsx` — все поля `CompanyDetails` (телефоны, email, адрес, соцсети, рабочие часы)
- `src/components/admin/settings/CrmSettingsForm.tsx`:
  - селект ответственного (загрузка `User` через server action)
  - селект воронки/этапа (загрузка `Pipeline` + `Stage`)
  - переключатель авто-задачи + поля title и offsetMin
  - редактор списка `sources` (chips)

### Сайдбар

Файл [AdminSidebar.tsx](../src/components/admin/AdminSidebar.tsx) дополнить в секции `SETTINGS_NAV`:

```ts
const SETTINGS_NAV = [
    { href: '/admin/users', label: 'Пользователи', icon: 'ri-team-line' },
    { href: '/admin/settings/integrations', label: 'Интеграции', icon: 'ri-plug-line' },
    { href: '/admin/settings/company', label: 'Реквизиты', icon: 'ri-building-2-line' },
    { href: '/admin/settings/crm', label: 'Настройки CRM', icon: 'ri-kanban-view-2' },
];
```

И отдельная секция «Контент» (только для ADMIN, после CRM):

```ts
const CONTENT_NAV = [
    { href: '/admin/content/seo', label: 'SEO', icon: 'ri-seo-line' },
];
```

### Хаб

В [src/app/admin/(auth)/page.tsx](../src/app/admin/(auth)/page.tsx) убрать «Контент» и «Настройки» из `COMING_SOON`, добавить в `ADMIN_SECTIONS`:

```ts
{ href: '/admin/content', icon: 'ri-file-text-line', title: 'Контент', description: 'SEO, мета-теги', color: 'bg-emerald-50 text-emerald-600' },
{ href: '/admin/settings/integrations', icon: 'ri-settings-3-line', title: 'Настройки', description: 'Интеграции, реквизиты, CRM', color: 'bg-amber-50 text-amber-600' },
```

`COMING_SOON` массив можно удалить полностью.

---

## Интеграция с публичным сайтом

### SEO

В корневом [src/app/layout.tsx](../src/app/layout.tsx) и в `page.tsx` ключевых маршрутов добавить `generateMetadata()`:

```ts
export async function generateMetadata(): Promise<Metadata> {
    return getSeoForPath('/');
}
```

Существующие хардкоженные `metadata` остаются как фолбек внутри `getSeoForPath` если в БД нет оверрайда. **Важно:** не сломать текущие meta-теги — если `SeoOverride` для path отсутствует, возвращать те же значения, что и сейчас.

Точечная интеграция в первую очередь: главная (`/`), `/about`, `/contacts`, `/blog`, `/calculator`. Карточки оборудования и статьи блога — вне scope (там generateMetadata зависит от данных).

### Уведомления о заявках

В [src/app/api/contact/route.ts](../src/app/api/contact/route.ts):
- Заменить хардкод `RECIPIENTS` (строки 18-21) на чтение `getNotificationSettings().emailRecipients`. Если массив пустой — фолбек на текущий хардкод (чтобы не потерять заявки).
- После успешного `transporter.sendMail` — если `telegramChatId` задан и `notifyOnNewLead === true`, отправить сообщение в Telegram через простой fetch к `https://api.telegram.org/bot<TOKEN>/sendMessage` (token из `.env`, новая переменная `TELEGRAM_BOT_TOKEN`).
- Telegram-вызов оборачивается в try/catch — провал не должен ломать ответ пользователю (как уже сделано для записи в БД).

### Реквизиты компании

Компоненты сайта (`SiteFooter`, `Contacts*`, `SiteNavbar`) сейчас читают `SITE_CONFIG` напрямую. Подмена должна быть постепенной:

- Первый шаг: создать `getCompanyDetails()` который возвращает merged-объект (БД поверх `SITE_CONFIG`).
- Серверные компоненты, использующие реквизиты, переписать на `await getCompanyDetails()`.
- Клиентские компоненты получают данные через props от родителя-сервера.

В этой фазе **не трогаем все компоненты** — только подключаем хелпер и переводим SiteFooter (как самый зависимый от контактов). Остальные — отдельной задачей.

### Настройки CRM

В `/api/contact/route.ts` (создание автосделки, строки 213-243):
- Воронку искать через `crmSettings.defaultPipelineId` (если задано) с фолбеком на `findFirst`.
- Этап — через `defaultStageId` с фолбеком на первый этап.
- Если `crmSettings.defaultAssigneeId` задан — присваивать сделке `assigneeId`.
- Если `autoTaskEnabled` — после создания сделки создать `Task` с `dealId`, `assigneeId` (=defaultAssigneeId), `title` = `autoTaskTitle`, `dueDate` = `now + autoTaskOffsetMin` минут.

В `src/components/admin/deals/CreateDealModal.tsx`: список `sources` теперь грузится из `CrmSettings.sources` вместо хардкода.

---

## Критические файлы

- [prisma/schema.prisma](../prisma/schema.prisma) — 5 новых моделей
- [prisma/seed.ts](../prisma/seed.ts) — добавить создание singleton-записей
- [src/components/admin/AdminSidebar.tsx](../src/components/admin/AdminSidebar.tsx) — новые пункты навигации
- [src/app/admin/(auth)/page.tsx](../src/app/admin/(auth)/page.tsx) — заменить `COMING_SOON` на активные карточки
- [src/app/api/contact/route.ts](../src/app/api/contact/route.ts) — динамические recipients, Telegram, дефолты CRM
- [src/app/layout.tsx](../src/app/layout.tsx) и `page.tsx` ключевых маршрутов — `generateMetadata` через `getSeoForPath`
- Новые директории: `src/app/admin/(auth)/content/`, `src/app/admin/(auth)/settings/`, `src/components/admin/content/`, `src/components/admin/settings/`, `src/lib/admin/`

---

## Переменные окружения

Добавить в `.env.local` и на VPS:

```
TELEGRAM_BOT_TOKEN=         # для уведомлений о заявках
```

---

## Порядок реализации (рекомендуемые этапы)

Чтобы можно было катить инкрементально, не ломая прод:

1. **Schema + seed + хабы**: модели в Prisma, страницы-хабы `/admin/content/` и `/admin/settings/`, обновлённый сайдбар. Кнопки на главной активны и ведут на пустые хабы.
2. **Реквизиты компании**: форма + хелпер `getCompanyDetails()`, перевод SiteFooter. Низкий риск — есть фолбек на `SITE_CONFIG`.
3. **SEO глобально**: модели уже есть, добавляем UI + интеграция в `generateMetadata` ключевых страниц.
4. **Настройки CRM**: форма + интеграция в `/api/contact` и `CreateDealModal`.
5. **Интеграции и уведомления**: форма + замена RECIPIENTS + Telegram-уведомления.

Каждый этап — отдельный коммит/деплой, сборка `npm run build` должна проходить без ошибок (dev-сервер не запускаем, согласно памяти).

---

## Верификация

После реализации каждого этапа:

- `npm run build` без ошибок и предупреждений типов.
- На VPS: `npx prisma@6 db push` применяет схему, `npx prisma@6 db seed` создаёт singleton-записи.
- Войти под admin (`admin@kirovbelmash.ru`), проверить:
  - Хаб `/admin/` — две новые активные карточки.
  - Сайдбар — новые пункты в секциях «Контент» и «Настройки» (видны только админу).
  - Каждая форма сохраняет данные (после reload значения остаются).
  - Manager-пользователь не видит ссылки и получает 403/redirect при прямом заходе.
- Изменить SEO главной → перезагрузить публичную главную → meta-теги обновились (через `revalidateTag`).
- Изменить email-получателей → отправить тестовую заявку через `/contacts` → письмо ушло на новый адрес.
- Изменить дефолтного ответственного → отправить заявку → новая сделка имеет правильного assignee.
- При выключенной БД — заявки всё равно уходят на email (текущий контракт сохраняется).

---

## Roadmap

После выполнения добавить в [crm/ROADMAP.md](./ROADMAP.md) как **Фаза 5 — Контент и настройки** с подзадачами по этапам выше. Пункты «Telegram-уведомления о новых заявках» и «Email-уведомления менеджеру о назначенной задаче» из секции «Идеи на потом» переезжают в эту фазу.
