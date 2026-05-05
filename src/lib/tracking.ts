// Captures UTM parameters, click IDs, and Yandex ClientID from the current browser session.
// Data is stored in sessionStorage so it persists across page navigation within the same tab,
// but is cleared when the tab is closed.

const UTM_KEYS = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
];

const CLICK_ID_KEYS = ['yclid', 'gclid', 'fbclid'];

const SESSION_KEY = '_kbm_visit';
const MAX_VALUE_LENGTH = 200;

function trim(s: string): string {
    return s.slice(0, MAX_VALUE_LENGTH);
}

function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
}

/**
 * Call once on page load (in a useEffect) to capture visit parameters from the
 * current URL and store them in sessionStorage for later form submission.
 *
 * - UTM params and click IDs: read from the current URL; overwrite any previously
 *   stored values (a new campaign link in the same tab wins).
 * - Referrer: captured only on the very first call in the session (don't overwrite
 *   with internal navigation referrers).
 * - Yandex ClientID: read from the _ym_uid cookie if available.
 */
export function captureVisitParams(): void {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);

    // Load whatever was already captured this session
    let stored: Record<string, string> = {};
    try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        if (raw) stored = JSON.parse(raw) as Record<string, string>;
    } catch {
        // ignore parse errors
    }

    const captured: Record<string, string> = {};

    // UTM params + click IDs from current URL
    for (const key of [...UTM_KEYS, ...CLICK_ID_KEYS]) {
        const val = params.get(key);
        if (val) captured[key] = trim(val);
    }

    // Merge: stored first, then new URL params overwrite (in case user follows
    // a new campaign link in the same tab)
    const merged: Record<string, string> = { ...stored, ...captured };

    // Referrer — only on the first page of the session (internal nav has referrer too)
    if (!merged['referrer'] && document.referrer) {
        merged['referrer'] = trim(document.referrer);
    }

    // Yandex.Metrika ClientID from cookie _ym_uid
    const ymUid = getCookie('_ym_uid');
    if (ymUid) merged['ya_client_id'] = trim(ymUid);

    if (Object.keys(merged).length > 0) {
        try {
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(merged));
        } catch {
            // ignore quota errors
        }
    }
}

/**
 * Returns all captured visit parameters from sessionStorage.
 * Returns an empty object if nothing was captured yet.
 */
export function getVisitParams(): Record<string, string> {
    if (typeof window === 'undefined') return {};
    try {
        const raw = sessionStorage.getItem(SESSION_KEY);
        return raw ? (JSON.parse(raw) as Record<string, string>) : {};
    } catch {
        return {};
    }
}
