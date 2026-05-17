import { Metadata } from 'next';
import ContactsHero from '@/components/contacts/ContactsHero';
import ContactDetails from '@/components/contacts/ContactDetails';
import ContactForm from '@/components/contacts/ContactForm';
import WebPageJsonLd from '@/components/ui/WebPageJsonLd';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/ui/BreadcrumbJsonLd';

export const metadata: Metadata = {
    title: 'Контакты',
    description: 'Контактная информация КировБелМаш: телефоны, адрес, email, форма обратной связи. Белая Холуница, Кировская область. Пн-Пт 8:00–17:00.',
    alternates: { canonical: '/contacts' },
    openGraph: {
        title: 'Контакты КировБелМаш',
        description: 'Телефоны, адрес, email и форма заявки. Работаем Пн-Пт с 8:00 до 17:00.',
        url: 'https://kirovbelmash.ru/contacts',
        type: 'website',
        siteName: 'КировБелМаш',
        images: [
            {
                url: '/images/logo/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Контакты КировБелМаш',
            },
        ],
    },
};

const breadcrumbItems = [
    { label: 'Главная', href: '/' },
    { label: 'Контакты' },
];

export default function ContactsPage() {
    return (
        <div className="min-h-screen bg-white">
            <BreadcrumbJsonLd items={breadcrumbItems} />
            <WebPageJsonLd
                type="ContactPage"
                name="Контакты КировБелМаш"
                description="Контактная информация: телефоны, адрес, email, форма обратной связи. Белая Холуница, Кировская область."
                url="/contacts"
            />
            <ContactsHero />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <Breadcrumbs items={breadcrumbItems} className="mb-0" />
            </div>
            <ContactDetails />
            <ContactForm />
        </div>
    );
}
