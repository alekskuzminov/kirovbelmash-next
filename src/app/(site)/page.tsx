import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Products from '@/components/home/Products';
import EquipmentCatalog from '@/components/home/EquipmentCatalog';
import Advantages from '@/components/home/Advantages';
import Projects from '@/components/home/Projects';
import ContactForm from '@/components/home/ContactForm';

export const metadata: Metadata = {
    title: 'Производитель оборудования для переработки древесных отходов',
    description:
        'Завод КировБелМаш — производитель оборудования для переработки древесных отходов, опилок и щепы. Комплексные решения под ключ за 60 дней. Проектирование, изготовление, обучение, запуск, сервис.',
    alternates: { canonical: '/' },
    openGraph: {
        title: 'КировБелМаш | Производитель оборудования для переработки древесных отходов',
        description:
            'Завод-производитель оборудования для переработки древесных отходов, опилок и щепы. Комплексные решения под ключ за 60 дней.',
        url: 'https://kirovbelmash.ru/',
        type: 'website',
        siteName: 'КировБелМаш',
        images: [
            {
                url: '/images/logo/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'КировБелМаш | Производитель оборудования для переработки древесных отходов',
            },
        ],
    },
};

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            <Hero />
            <Products />
            <EquipmentCatalog />
            <Advantages />
            <Projects />
            <ContactForm />
        </div>
    );
}
