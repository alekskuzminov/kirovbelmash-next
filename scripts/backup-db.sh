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
AWS_ACCESS_KEY_ID="$S3_ACCESS_KEY_ID" \
AWS_SECRET_ACCESS_KEY="$S3_SECRET_ACCESS_KEY" \
AWS_DEFAULT_REGION="${S3_REGION:-ru-1}" \
aws s3 cp "$BACKUP_FILE" \
  "s3://${S3_BUCKET}/${S3_PREFIX}/$(basename $BACKUP_FILE)" \
  --endpoint-url https://s3.ru1.storage.beget.cloud \
  --region "${S3_REGION:-ru-1}"

echo "[backup] Cleaning up local file..."
rm -f "$BACKUP_FILE"

echo "[backup] Removing old backups (older than ${KEEP_DAYS} days)..."
AWS_ACCESS_KEY_ID="$S3_ACCESS_KEY_ID" \
AWS_SECRET_ACCESS_KEY="$S3_SECRET_ACCESS_KEY" \
AWS_DEFAULT_REGION="${S3_REGION:-ru-1}" \
aws s3 ls "s3://${S3_BUCKET}/${S3_PREFIX}/" \
  --endpoint-url https://s3.ru1.storage.beget.cloud \
  --region "${S3_REGION:-ru-1}" | \
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
        AWS_DEFAULT_REGION="${S3_REGION:-ru-1}" \
        aws s3 rm "s3://${S3_BUCKET}/${S3_PREFIX}/$key" \
          --endpoint-url https://s3.ru1.storage.beget.cloud \
          --region "${S3_REGION:-ru-1}"
      fi
    fi
  done

echo "[backup] Done: ${BACKUP_FILE}"
