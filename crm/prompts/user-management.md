# Задача: управление пользователями CRM

## Контекст проекта

`kirovbelmash-next` — Next.js 16, App Router, Tailwind v4, TypeScript strict, Prisma 6 + PostgreSQL.
Собственная CRM на `/admin/crm/*`. Авторизация — NextAuth v4, Credentials, JWT.

**Перед началом обязательно читать:**
- `crm/CLAUDE.md` — стек, структура файлов, команды деплоя
- `crm/ROADMAP.md` — текущий план (Фаза 4 в работе)
- `crm/DECISIONS.md` — архитектурные решения (особенно по авторизации)
- `prisma/schema.prisma` — полная схема БД

---

## Что уже есть (не трогать)

- Авторизация: `src/lib/auth.ts` (authOptions, NextAuth Credentials)
- Типы сессии: `src/types/next-auth.d.ts` (id, role расширены)
- Модель `User` в схеме: id, email, name, password (bcrypt), role (ADMIN/MANAGER), createdAt, updatedAt
- Seed: создаёт одного admin-пользователя (`admin@kirovbelmash.ru`)
- Сайдбар: `src/components/admin/AdminSidebar.tsx`
- Хаб-страница: `src/app/admin/(auth)/page.tsx`

---

## Что нужно реализовать

### Часть 1 — Схема БД

Добавить поле в модель `User`:

```prisma
isActive Boolean @default(true)
```

Деактивированный пользователь не может войти — проверка в `authOptions` (`src/lib/auth.ts`):
```ts
if (!user.isActive) return null; // запретить вход
```

После правки схемы: `.\node_modules\.bin\prisma generate`, на VPS — `npx prisma@6 db push`.

### Часть 2 — Server Actions

Создать `src/lib/crm/actions/users.ts`:

```ts
// Типы
export interface SerializedUser {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'MANAGER';
    isActive: boolean;
    createdAt: string;
}

// Actions (все требуют роль ADMIN, кроме changeOwnPassword)
getUsers(): Promise<SerializedUser[]>
createUser(data: { name, email, password, role }): Promise<void>
updateUser(id, data: { name?, email?, role? }): Promise<void>
toggleUserActive(id): Promise<void>          // переключает isActive
changePassword(id, newPassword): Promise<void> // ADMIN меняет любой пароль
changeOwnPassword(currentPassword, newPassword): Promise<void> // любой пользователь
```

- Пароль хешировать через `bcryptjs` (уже в зависимостях — используется в auth.ts)
- `changeOwnPassword` — проверять текущий пароль перед сменой
- `createUser` — проверять уникальность email
- Все мутирующие actions — проверять сессию и роль через `getServerSession`

### Часть 3 — Страницы

#### `/admin/users` — список пользователей (только ADMIN)

Маршрут: `src/app/admin/(auth)/users/page.tsx`

UI:
- Таблица: Имя, Email, Роль (бейдж), Статус (Активен / Деактивирован), Дата создания
- Кнопка «+ Добавить менеджера» → открывает модалку создания
- Строка каждого пользователя: кнопка редактировать (карандаш) + кнопка деактивировать/активировать
- Нельзя деактивировать самого себя
- Нельзя менять роль/статус последнего ADMIN

#### Модалка создания/редактирования

Компонент `src/components/admin/users/UserFormModal.tsx`:
- Поля: Имя*, Email*, Роль (select: ADMIN/MANAGER), Пароль* (только при создании)
- При редактировании: пароль не показывать (смена — отдельная кнопка)

#### Смена пароля

Компонент `src/components/admin/users/ChangePasswordModal.tsx`:
- Если ADMIN меняет чужой пароль: только новый пароль (2 поля: новый + подтверждение)
- Если пользователь меняет свой: текущий пароль + новый + подтверждение

#### `/admin/users/me` или кнопка в сайдбаре — профиль текущего пользователя

Минимум: кнопка смены своего пароля. Опционально: имя/email.

### Часть 4 — Навигация

Добавить в сайдбар (`src/components/admin/AdminSidebar.tsx`) пункт «Пользователи» — только для роли ADMIN.

Добавить на хаб-страницу (`src/app/admin/(auth)/page.tsx`) карточку раздела «Пользователи».

---

## Важные ограничения

- **НЕ запускать dev-сервер** (`npm run dev`, `preview_start`).
- Проверка — `npm run build`.
- Стили — только Tailwind utility classes, тёмная тема (gray-900/800/700) как во всей админке.
- Иконки — только Remixicon (`ri-*`).
- Роль проверять на сервере, не только в UI — `getServerSession` в page.tsx и в actions.
- Страница `/admin/users` — редирект на `/admin/` если роль не ADMIN.

---

## Файлы для обязательного чтения перед работой

1. `prisma/schema.prisma` — модель User целиком
2. `src/lib/auth.ts` — authOptions, как проверяется пароль при входе
3. `src/types/next-auth.d.ts` — расширение типов сессии
4. `src/components/admin/AdminSidebar.tsx` — как устроена навигация
5. `src/app/admin/(auth)/page.tsx` — хаб-страница
6. `src/lib/crm/actions/deals.ts` — паттерн server actions (для единообразия)

---

## Порядок реализации

1. Обновить `schema.prisma` (добавить `isActive`) + `prisma generate`
2. Обновить `src/lib/auth.ts` — блокировать вход деактивированных
3. Создать `src/lib/crm/actions/users.ts`
4. Создать компоненты: `UserFormModal`, `ChangePasswordModal`, `UsersClient`
5. Создать страницу `/admin/users/page.tsx`
6. Добавить пункт в сайдбар + карточку на хаб
7. `npm run build`
