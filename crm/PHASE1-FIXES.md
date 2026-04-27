# CRM Phase 1 — Fixes before Phase 2

Это задание для Claude Code. Нужно внести правки в существующий проект **до начала разработки Kanban-доски**. Все изменения касаются только файлов CRM — публичный сайт не трогаем.

Прочитай сначала:
- `crm/CLAUDE.md` — техническая документация
- `crm/DECISIONS.md` — журнал решений
- `prisma/schema.prisma` — текущая схема

---

## Задача 1 — Добавить DealStageEvent в схему

**Проблема:** Без истории переходов между этапами невозможно посчитать конверсию воронки, время в стадии и активность менеджеров. `updatedAt` на Deal не считается — это не история.

**Что сделать:**

Добавить модель в `prisma/schema.prisma`:

```prisma
model DealStageEvent {
  id          String   @id @default(cuid())
  createdAt   DateTime @default(now())

  dealId      String
  deal        Deal     @relation(fields: [dealId], references: [id])

  fromStageId String?
  fromStage   Stage?   @relation("FromStage", fields: [fromStageId], references: [id])

  toStageId   String
  toStage     Stage    @relation("ToStage", fields: [toStageId], references: [id])

  actorId     String?
  actor       User?    @relation(fields: [actorId], references: [id])
}
```

Добавить обратные relations в существующие модели:
- `Deal`: `stageEvents DealStageEvent[]`
- `Stage`: `eventsFrom DealStageEvent[] @relation("FromStage")` и `eventsTo DealStageEvent[] @relation("ToStage")`
- `User`: `stageEvents DealStageEvent[]`

---

## Задача 2 — Добавить phoneNormalized на Contact

**Проблема:** Дедупликация контакта по номеру телефона при входящей заявке с сайта невозможна без нормализованного поля — `+7(903)123-45-67` и `89031234567` — один человек, но как строки они разные.

**Что сделать:**

В модели `Contact` в `prisma/schema.prisma`:
- Добавить поле `phoneNormalized String?` с индексом
- Добавить `@@index([phoneNormalized])`

Создать утилиту `src/lib/phone.ts`:

```typescript
/**
 * Normalizes a phone number to digits-only, with leading 7 for Russian numbers.
 * Example: "+7 (903) 123-45-67" → "79031234567"
 * Example: "8 903 123 45 67" → "79031234567"
 */
export function normalizePhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 0) return null;
  // Russian mobile: 11 digits starting with 8 or 7
  if (digits.length === 11 && (digits[0] === '7' || digits[0] === '8')) {
    return '7' + digits.slice(1);
  }
  // 10 digits — assume Russian without country code
  if (digits.length === 10) {
    return '7' + digits;
  }
  // Return as-is for other formats (international)
  return digits;
}
```

---

## Задача 3 — Добавить soft delete на Contact, Deal, Document

**Проблема:** Hard delete удаляет данные навсегда. Нужна возможность восстановить случайно удалённое.

**Что сделать:**

В `prisma/schema.prisma` добавить поле `deletedAt DateTime?` в модели `Contact`, `Deal`, `Document`.

Добавить индексы для быстрой фильтрации "живых" записей:
- `Contact`: `@@index([deletedAt])`
- `Deal`: `@@index([deletedAt])`
- `Document`: `@@index([deletedAt])`

---

## Задача 4 — Добавить индексы на горячие поля

**Проблема:** При росте данных запросы без индексов будут тормозить.

**Что сделать:**

В `prisma/schema.prisma` добавить индексы:

```prisma
// Deal
@@index([stageId])
@@index([assigneeId])
@@index([contactId])
@@index([deletedAt])
@@index([createdAt])

// Task
@@index([assigneeId])
@@index([dueDate])
@@index([dealId])
@@index([done])

// Note
@@index([dealId])
@@index([contactId])

// Document
@@index([dealId])
@@index([contactId])
```

---

## Задача 5 — Инвариант stageId + pipelineId на Deal

**Проблема:** Deal.pipelineId и Deal.stageId хранятся независимо — ничто не мешает сохранить сделку с этапом из другой воронки. Это приведёт к порче данных.

**Что сделать:**

Создать Server Action или хелпер `src/lib/crm/deals.ts` с функцией `moveDealToStage`:

```typescript
import { prisma } from '@/lib/prisma';

export async function moveDealToStage(
  dealId: string,
  newStageId: string,
  actorId?: string
): Promise<void> {
  // Получаем этап и проверяем что он существует
  const stage = await prisma.stage.findUniqueOrThrow({
    where: { id: newStageId },
    select: { id: true, pipelineId: true },
  });

  const deal = await prisma.deal.findUniqueOrThrow({
    where: { id: dealId },
    select: { id: true, stageId: true, pipelineId: true },
  });

  // Инвариант: этап должен принадлежать той же воронке что и сделка
  if (stage.pipelineId !== deal.pipelineId) {
    throw new Error(
      `Stage ${newStageId} belongs to pipeline ${stage.pipelineId}, but deal is in pipeline ${deal.pipelineId}`
    );
  }

  // Обновляем сделку и создаём событие атомарно
  await prisma.$transaction([
    prisma.deal.update({
      where: { id: dealId },
      data: { stageId: newStageId },
    }),
    prisma.dealStageEvent.create({
      data: {
        dealId,
        fromStageId: deal.stageId,
        toStageId: newStageId,
        actorId: actorId ?? null,
      },
    }),
  ]);
}
```

---

## Задача 6 — Настроить бэкап PostgreSQL

**Проблема:** Данные клиентов хранятся на одном VPS без бэкапов. Потеря данных при сбое диска — катастрофа.

**Что сделать:**

Создать скрипт `scripts/backup-db.sh`:

```bash
#!/bin/bash
# PostgreSQL backup to Beget S3
# Run via cron: 0 2 * * * bash /var/www/kirovbelmash-next/scripts/backup-db.sh

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="/tmp/kbm_crm_${TIMESTAMP}.dump"
S3_BUCKET="ccf5cfe7fed6-kbm-site"
S3_PREFIX="backups/db"
KEEP_DAYS=30

# Load env
source /var/www/kirovbelmash-next/.env.local 2>/dev/null || true

echo "[backup] Starting PostgreSQL dump..."
PGPASSWORD="kirovbelmash" pg_dump \
  -h localhost \
  -U kbm_user \
  -d kbm_crm \
  -Fc \
  -f "$BACKUP_FILE"

echo "[backup] Uploading to S3..."
# Requires AWS CLI configured with Beget S3 credentials
AWS_ACCESS_KEY_ID="$S3_ACCESS_KEY_ID" \
AWS_SECRET_ACCESS_KEY="$S3_SECRET_ACCESS_KEY" \
aws s3 cp "$BACKUP_FILE" \
  "s3://${S3_BUCKET}/${S3_PREFIX}/$(basename $BACKUP_FILE)" \
  --endpoint-url https://s3.ru1.storage.beget.cloud

echo "[backup] Cleaning up local file..."
rm -f "$BACKUP_FILE"

echo "[backup] Removing old backups (older than ${KEEP_DAYS} days)..."
AWS_ACCESS_KEY_ID="$S3_ACCESS_KEY_ID" \
AWS_SECRET_ACCESS_KEY="$S3_SECRET_ACCESS_KEY" \
aws s3 ls "s3://${S3_BUCKET}/${S3_PREFIX}/" \
  --endpoint-url https://s3.ru1.storage.beget.cloud | \
  awk '{print $4}' | \
  while read key; do
    date_str=$(echo "$key" | grep -oP '\d{8}')
    if [ ! -z "$date_str" ]; then
      file_date=$(date -d "$date_str" +%s 2>/dev/null || echo 0)
      cutoff=$(date -d "-${KEEP_DAYS} days" +%s)
      if [ "$file_date" -lt "$cutoff" ]; then
        echo "[backup] Deleting old backup: $key"
        AWS_ACCESS_KEY_ID="$S3_ACCESS_KEY_ID" \
        AWS_SECRET_ACCESS_KEY="$S3_SECRET_ACCESS_KEY" \
        aws s3 rm "s3://${S3_BUCKET}/${S3_PREFIX}/$key" \
          --endpoint-url https://s3.ru1.storage.beget.cloud
      fi
    fi
  done

echo "[backup] Done: ${BACKUP_FILE}"
```

Добавить в crontab на VPS (через `crontab -e`):
```
0 2 * * * bash /var/www/kirovbelmash-next/scripts/backup-db.sh >> /var/log/kbm-backup.log 2>&1
```

Проверить что AWS CLI установлен на VPS:
```bash
aws --version || apt install awscli -y
```

---

## Порядок выполнения

1. Задачи 1-4 — правки в `prisma/schema.prisma` (делать вместе одним коммитом)
2. Запустить `.\node_modules\.bin\prisma generate` локально
3. Задача 5 — создать `src/lib/crm/deals.ts`
4. Задача 6 — создать `scripts/backup-db.sh`
5. `npm run build` — убедиться что сборка проходит
6. Закоммитить и запушить
7. На VPS: `bash /var/www/kirovbelmash-next/deploy.sh`
8. На VPS: `export DATABASE_URL="postgresql://kbm_user:kirovbelmash@localhost:5432/kbm_crm" && npx prisma@6 db push`
9. На VPS: настроить crontab для бэкапа

## Что НЕ делать в этом чате

- Не трогать публичные страницы сайта
- Не менять стратегию авторизации (JWT → database sessions — отдельная задача)
- Не добавлять audit log (отдельная задача в Фазе 3)
- Не добавлять role guards (появятся вместе с admin-only разделами в Фазе 2)
