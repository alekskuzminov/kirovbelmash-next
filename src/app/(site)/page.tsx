import type { Metadata } from 'next';
import Hero from '@/components/home/Hero';
import Products from '@/components/home/Products';
import EquipmentCatalog from '@/components/home/EquipmentCatalog';
import Advantages from '@/components/home/Advantages';
import Projects from '@/components/home/Projects';
import ContactForm from '@/components/home/ContactForm';

export const metadata: Metadata = {
    title: 'Линии брикетирования и гранулирования',
    description:
        'Производство линий брикетирования и гранулирования "под ключ" за 60 дней. Полный цикл: проектирование, изготовление, обучение, запуск, сервис. Гарантия качества',
    alternates: { canonical: '/' },
    openGraph: {
        title: 'КировБелМаш | Линии брикетирования и гранулирования',
        description:
            'Производство линий брикетирования и гранулирования "под ключ" за 60 дней. Полный цикл: проектирование, изготовление, обучение, запуск, сервис. Гарантия качества',
        url: 'https://kirovbelmash.ru/',
        type: 'website',
        siteName: 'КировБелМаш',
        images: [
            {
                url: '/images/logo/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'КировБелМаш | Линии брикетирования и гранулирования',
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
