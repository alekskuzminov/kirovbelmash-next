// Telegram notifications via Bot API.
// Used to alert on backend failures (SMTP down, DB down, etc.).
// Configured via env: TG_BOT_TOKEN, TG_CHAT_ID. No-op if either is missing.

const TG_API_TIMEOUT_MS = 5000;

/**
 * Send a plain-text message to TG_CHAT_ID via TG_BOT_TOKEN.
 * Best-effort: never throws, returns silently on any failure.
 * Designed for use inside error-handling paths — must not mask the original error.
 */
export async function notifyTelegram(text: string): Promise<void> {
    const token = process.env.TG_BOT_TOKEN;
    const chatId = process.env.TG_CHAT_ID;
    if (!token || !chatId) return;

    try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), TG_API_TIMEOUT_MS);
        const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text,
                disable_web_page_preview: true,
            }),
            signal: controller.signal,
        });
        clearTimeout(timer);
        if (!res.ok) {
            const body = await res.text().catch(() => '');
            console.error('[telegram] notification failed:', res.status, body);
        }
    } catch (err) {
        console.error('[telegram] notification error:', err);
    }
}
