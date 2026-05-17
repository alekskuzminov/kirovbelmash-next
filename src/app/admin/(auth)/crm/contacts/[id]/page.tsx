import type { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { notFound } from 'next/navigation';
import { getContact } from '@/lib/crm/actions/contacts';
import ContactDetailClient from '@/components/admin/contacts/ContactDetailClient';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const contact = await getContact(id);
    return { title: contact?.name ?? 'Контакт' };
}

export default async function ContactPage({ params }: Props) {
    const { id } = await params;
    const contact = await getContact(id);
    if (!contact) notFound();
    return <ContactDetailClient contact={contact} />;
}
