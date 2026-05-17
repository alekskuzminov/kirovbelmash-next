#!/bin/bash
# IndexNow: notify Yandex about updated pages after deploy
# Docs: https://yandex.com/support/webmaster/indexnow.html

set -e

SITE_URL="https://kirovbelmash.ru"
KEY="34d5ed4e-9f52-441c-b2d8-99bd1829e2bc"

# Extract all URLs from sitemap.xml
URLS=$(grep -oP '(?<=<loc>)[^<]+' /var/www/kirovbelmash-next/public/sitemap.xml)

# Build JSON array of URLs
URL_LIST=""
for url in $URLS; do
    URL_LIST="${URL_LIST}\"${url}\","
done
URL_LIST="[${URL_LIST%,}]"

echo "📡 Sending IndexNow request to Yandex ($(echo "$URLS" | wc -l) URLs)..."

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
    -X POST "https://yandex.com/indexnow" \
    -H "Content-Type: application/json" \
    -d "{
        \"host\": \"kirovbelmash.ru\",
        \"key\": \"${KEY}\",
        \"keyLocation\": \"${SITE_URL}/${KEY}.txt\",
        \"urlList\": ${URL_LIST}
    }")

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "202" ]; then
    echo "✅ IndexNow: Yandex accepted the request (HTTP ${HTTP_CODE})"
else
    echo "⚠️  IndexNow: Yandex returned HTTP ${HTTP_CODE} (non-critical, skipping)"
fi
