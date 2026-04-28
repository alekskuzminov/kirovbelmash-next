# Задача: улучшение карточки сделки + документы

## Контекст проекта

Проект `kirovbelmash-next` — Next.js 16, App Router, Tailwind v4, TypeScript strict, Prisma 6 + PostgreSQL.
B2B сайт + собственная CRM для производителя промышленного оборудования.

**Перед началом обязательно читать:**
- `crm/CLAUDE.md` — стек, структура файлов, команды
- `crm/ROADMAP.md` — Фаза 3 (текущая задача там описана)
- `crm/DECISIONS.md` — архитектурные решения (особенно по документам и структуре)
- `prisma/schema.prisma` — полная схема БД

---

## Что уже сделано (не трогать)

- Фазы 1, 2, 2.5 завершены
- CRM живёт на `/admin/crm/*`
- Kanban-доска: `src/components/admin/deals/KanbanBoard.tsx`
- Карточка сделки: `src/components/admin/deals/DealModal.tsx`
- Форма создания: `src/components/admin/deals/CreateDealModal.tsx`
- Server actions: `src/lib/crm/actions/deals.ts`, `contacts.ts`, `pipeline.ts`

---

## Что нужно реализовать

### Часть 1 — Изменения схемы БД

Добавить два поля в модель `Deal` в `prisma/schema.prisma`:

```prisma
model Deal {
  // ... существующие поля ...
  city        String?   // город клиента
  documentUrl String?   // URL PDF-документа в S3 (КП, спецификация)
}
```

После правки схемы — локально запустить `.\node_modules\.bin\prisma generate`.
Инструкция по применению на VPS — в `crm/CLAUDE.md` раздел «Деплой».

### Часть 2 — Улучшение DealModal (`src/components/admin/deals/DealModal.tsx`)

Текущий вид: два столбца — слева поля (этап, сумма, источник, ответственный), справа заметки.

**Нужно переработать карточку:**

#### Шапка (header)
- Название сделки (редактируемое) — как сейчас
- Контакт: имя → кликабельная ссылка `/admin/crm/contacts/{id}`, открывается в новой вкладке
- Под именем контакта: телефон с `tel:` ссылкой + email с `mailto:` (если есть) — иконки Remixicon
- В правом верхнем углу шапки: «N дней в этапе» — серый бейдж. Считать от даты последнего `DealStageEvent` с `toStageId === deal.stageId` (данные уже есть в `SerializedDeal`). Если событий нет — от `deal.createdAt`

#### Левая колонка — поля
- Этап (select) — как сейчас
- Сумма — как сейчас
- Город (`city`) — текстовый инпут, placeholder «Не указан»
- Источник — как сейчас
- Ответственный — как сейчас
- Даты: «Создана» и «Обновлена» (`updatedAt`) — оба значения рядом, мелким шрифтом

#### Блок документа (под полями левой колонки)
- Если `documentUrl` пуст: кнопка «Загрузить КП (PDF)» — открывает `<input type="file" accept=".pdf">`
- При выборе файла: загрузить в S3 через новый API endpoint `POST /api/crm/upload-deal-doc`
  - S3 путь: `crm/deals/{dealId}/doc.pdf` (перезаписывает предыдущий)
  - После загрузки: обновить `deal.documentUrl` через `updateDeal`
- Если `documentUrl` заполнен:
  - Название файла (или «КП.pdf») + кнопка «Просмотр» → открывает PDF-модалку
  - Кнопка замены файла (иконка карандаша)
  - Кнопка удаления (иконка корзины, с подтверждением) → зачищает `documentUrl`, удаляет из S3

#### PDF-модалка
- Отдельный компонент `PdfPreviewModal`
- Overlay поверх DealModal (z-index выше)
- `<iframe src={documentUrl} className="w-full h-full" />` — нативный рендер браузера
- Кнопки: «Скачать» (ссылка на CDN) + «Закрыть»
- Размер: `max-w-4xl`, высота `80vh`

#### Правая колонка — лента активности (заменяет «Заметки»)
Единый хронологический список событий двух типов, перемешанных по дате:

**Тип 1 — смена этапа** (из `DealStageEvent`):
```
[иконка ri-git-branch-line] 14 апр, 10:23 · Дмитрий
Этап: Новая заявка → В работе
```

**Тип 2 — заметка** (из `Note`):
```
[иконка ri-message-2-line] 14 апр, 10:45 · Дмитрий
Созвонились, высылаем КП
```

- Новые записи сверху (desc)
- Если список пустой: «Нет активности» серым текстом
- В самом низу ленты — плашка «Нет задач — рекомендуем добавить» (желтоватый фон, иконка `ri-alarm-warning-line`), если `deal` не имеет связанных задач. Пока это просто UI-напоминание (задачи как функционал в Phase 3 следующая очередь).

- Инпут добавления заметки — как сейчас (внизу, Enter для отправки)

### Часть 3 — API endpoint загрузки документа

Создать `src/app/api/crm/upload-deal-doc/route.ts`:
- `POST` — принимает `multipart/form-data` с полями `file` (PDF) и `dealId`
- Проверяет сессию (getServerSession)
- Валидирует: только PDF, размер ≤ 20 MB
- Загружает в S3: ключ `crm/deals/{dealId}/doc.pdf`
- Обновляет `deal.documentUrl` в БД через Prisma
- Возвращает `{ url: string }`

S3-клиент уже есть в `src/lib/s3.ts`. CDN URL: `https://cdn.kirovbelmash.ru`.

### Часть 4 — Обновить `SerializedDeal` и `getDeals`

В `src/lib/crm/actions/deals.ts`:
- Добавить в `SerializedDeal`: `city: string | null`, `documentUrl: string | null`
- Добавить в `getDeals` запрос: `stageEvents` (для подсчёта дней в этапе) и `tasks` (для плашки «нет задач»):
  ```ts
  stageEvents: {
    orderBy: { createdAt: 'desc' },
    take: 1,
    where: { toStageId: deal.stageId }, // фильтровать по текущему этапу
    select: { createdAt: true }
  },
  _count: { select: { tasks: { where: { done: false } } } }
  ```
- Добавить в `updateDeal` поддержку полей `city` и `documentUrl`

---

## Важные ограничения

- **НЕ запускать dev-сервер** (`npm run dev`, `preview_start`). Пользователь держит его сам на порту 3000.
- Проверка после правок — `npm run build` (должен пройти без ошибок).
- Стили — только Tailwind utility classes.
- Иконки — только Remixicon (`ri-*`).
- `'use client'` — только там где нужна интерактивность. DealModal уже клиентский.
- Компоненты: PascalCase. Файлы рядом с теми что уже есть в `src/components/admin/deals/`.

---

## Файлы для обязательного чтения перед работой

1. `prisma/schema.prisma` — схема целиком
2. `src/components/admin/deals/DealModal.tsx` — текущий вид модалки
3. `src/components/admin/deals/CreateDealModal.tsx` — для понимания паттернов
4. `src/lib/crm/actions/deals.ts` — SerializedDeal интерфейс и все actions
5. `src/lib/s3.ts` — как работает S3 клиент

---

## Порядок реализации

1. Обновить `schema.prisma` + `prisma generate`
2. Обновить `SerializedDeal` и `getDeals` / `updateDeal` в `deals.ts`
3. Создать API route `upload-deal-doc`
4. Переработать `DealModal.tsx` (по частям: шапка → поля → документ → лента)
5. Создать `PdfPreviewModal.tsx` рядом с DealModal
6. `npm run build` — убедиться что всё компилируется
