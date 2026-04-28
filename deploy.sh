#!/bin/bash
# Deploy script for kirovbelmash-next
# Usage: bash deploy.sh

set -e

echo "🚀 Starting deploy..."

cd /var/www/kirovbelmash-next

echo "📥 Pulling latest changes from GitHub..."
git checkout public/sitemap.xml public/robots.txt || true
git pull origin main

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps

echo "💾 Backing up database..."
bash /var/www/kirovbelmash-next/scripts/backup-db.sh || echo "⚠️  Backup failed — continuing deploy"

echo "⚙️ Generating Prisma Client..."
npx prisma@6 generate

echo "🔨 Building the project..."
npm run build

echo "🔄 Restarting PM2 process..."
pm2 restart kbm-site

echo "📡 Notifying Yandex via IndexNow..."
bash /var/www/kirovbelmash-next/scripts/indexnow.sh || true

echo "✅ Deploy complete! Site is live at https://kirovbelmash.ru"
