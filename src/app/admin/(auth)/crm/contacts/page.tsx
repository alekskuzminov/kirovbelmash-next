import type { Metadata } from 'next';
import { getContacts } from '@/lib/crm/actions/contacts';
import ContactsClient from '@/components/admin/contacts/ContactsClient';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Контакты' };

export default async function ContactsPage() {
    const contacts = await getContacts();
    return <ContactsClient contacts={contacts} />;
}
