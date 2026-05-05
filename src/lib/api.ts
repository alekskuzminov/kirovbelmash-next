// API helper for form submissions.
// Sends data to our own /api/contact endpoint which forwards to email.

import { getVisitParams } from './tracking';

export interface ContactFormData {
    name: string;
    phone: string;
    email?: string;
    company?: string;
    message?: string;
    source?: string;
    extra?: Record<string, string>;
    visitParams?: Record<string, string>;
    hp?: string;   // honeypot (empty for real users)
    ts?: number;   // form mount timestamp (client Date.now())
}

/**
 * Submit a contact/inquiry form via our own API Route.
 * Automatically attaches UTM / visit parameters captured from the browser session.
 * @returns true on success, false on failure
 */
export async function submitContactForm(data: ContactFormData): Promise<boolean> {
    try {
        const payload: ContactFormData = { ...data };

        // Auto-attach visit tracking data unless caller already provided it
        if (!payload.visitParams) {
            const visitParams = getVisitParams();
            if (Object.keys(visitParams).length > 0) {
                payload.visitParams = visitParams;
            }
        }

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        return response.ok;
    } catch (error) {
        console.error('[api] submitContactForm error:', error);
        return false;
    }
}
