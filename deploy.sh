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

echo "🗄️ Syncing database schema..."
npx prisma@6 db push --accept-data-loss=false

echo "🔨 Building the project..."
npm run build

echo "🔄 Restarting PM2 process..."
pm2 restart kbm-site

# Sync nginx config from repo to /etc/nginx/, reload if changed.
# Requires passwordless sudo for: cp, nginx -t, systemctl reload nginx.
# Setup once on VPS: `sudo visudo` →
#   <deploy-user> ALL=(root) NOPASSWD: /usr/bin/cp /var/www/kirovbelmash-next/nginx-kirovbelmash.conf /etc/nginx/sites-available/kirovbelmash, /usr/sbin/nginx -t, /bin/systemctl reload nginx
echo "🌐 Checking nginx config..."
NGINX_SRC="/var/www/kirovbelmash-next/nginx-kirovbelmash.conf"
NGINX_DEST="/etc/nginx/sites-available/kirovbelmash"
if ! cmp -s "$NGINX_SRC" "$NGINX_DEST"; then
    echo "   Config changed — applying and reloading nginx..."
    sudo cp "$NGINX_SRC" "$NGINX_DEST"
    sudo nginx -t
    sudo systemctl reload nginx
    echo "   ✅ Nginx reloaded"
else
    echo "   No changes — skipping nginx reload"
fi

echo "📡 Notifying Yandex via IndexNow..."
bash /var/www/kirovbelmash-next/scripts/indexnow.sh || true

echo "✅ Deploy complete! Site is live at https://kirovbelmash.ru"
