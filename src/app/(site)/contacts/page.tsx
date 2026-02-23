import { Metadata } from 'next';
import ContactsHero from '@/components/contacts/ContactsHero';
import ContactDetails from '@/components/contacts/ContactDetails';
import ContactForm from '@/components/contacts/ContactForm';

export const metadata: Metadata = {
    title: 'Контакты | КировБелМаш',
    description: 'Контактная информация компании КировБелМаш: телефоны, адреса, реквизиты, форма обратной связи.',
};

export default function ContactsPage() {
    return (
        <div className="min-h-screen bg-white">
            <ContactsHero />
            <ContactDetails />
            <ContactForm />
        </div>
    );
}
