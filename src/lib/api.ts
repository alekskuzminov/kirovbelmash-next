// API helper for form submissions.
// Sends data to our own /api/contact endpoint which forwards to email.

export interface ContactFormData {
    name: string;
    phone: string;
    email?: string;
    company?: string;
    message?: string;
    source?: string;
    extra?: Record<string, string>;
    hp?: string;   // honeypot (empty for real users)
    ts?: number;   // form mount timestamp (client Date.now())
}

/**
 * Submit a contact/inquiry form via our own API Route.
 * @returns true on success, false on failure
 */
export async function submitContactForm(data: ContactFormData): Promise<boolean> {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        return response.ok;
    } catch (error) {
        console.error('[api] submitContactForm error:', error);
        return false;
    }
}
