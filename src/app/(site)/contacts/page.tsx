import { Metadata } from 'next';
import ContactsHero from '@/components/contacts/ContactsHero';
import ContactDetails from '@/components/contacts/ContactDetails';
import ContactForm from '@/components/contacts/ContactForm';

export const metadata: Metadata = {
    title: 'Контакты',
    description: 'Контактная информация КировБелМаш: телефоны, адрес, email, форма обратной связи. Белая Холуница, Кировская область. Пн-Пт 8:00–17:00.',
    alternates: { canonical: '/contacts' },
    openGraph: {
        title: 'Контакты КировБелМаш',
        description: 'Телефоны, адрес, email и форма заявки. Работаем Пн-Пт с 8:00 до 17:00.',
        url: 'https://kirovbelmash.ru/contacts',
    },
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
