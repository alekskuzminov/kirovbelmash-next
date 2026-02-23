// API helper for form submissions.
// In Phase 0 this is a stub that simulates success.
// In Phase 1 it will POST to /api/contact on our Express backend.

export interface ContactFormData {
    name: string;
    phone: string;
    email?: string;
    company?: string;
    equipment?: string;
    service?: string;
    message?: string;
}

/**
 * Submit a contact/inquiry form.
 * @returns true on success, false on failure
 */
export async function submitContactForm(data: ContactFormData): Promise<boolean> {
    try {
        // TODO Phase 1: replace with real endpoint
        // const response = await fetch('/api/contact', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data),
        // });
        // return response.ok;

        // Phase 0 stub: simulate network delay and always succeed
        await new Promise((resolve) => setTimeout(resolve, 800));
        console.info('[api] Contact form submitted (stub):', data);
        return true;
    } catch (error) {
        console.error('[api] submitContactForm error:', error);
        return false;
    }
}
