import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import EquipmentPageClient from './EquipmentPageClient';
import EquipmentCTA from '@/components/equipment/EquipmentCTA';
import { equipmentCategoriesConfig } from '@/components/equipment/equipmentData';
import WebPageJsonLd from '@/components/ui/WebPageJsonLd';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/ui/BreadcrumbJsonLd';

export const metadata: Metadata = {
    title: 'Агрегаты для линий брикетирования и гранулирования',
    description: 'Каталог промышленного оборудования для производства брикетов, пеллет и переработки древесины. Прессы, грануляторы, сушилки, дробилки, транспортёры.',
    alternates: { canonical: '/oborudovanie' },
    openGraph: {
        title: 'Каталог оборудования КировБелМаш',
        description: 'Прессы, грануляторы, сушилки, дробилки и транспортное оборудование для переработки древесного сырья.',
        url: 'https://kirovbelmash.ru/oborudovanie',
        type: 'website',
        siteName: 'КировБелМаш',
        images: [
            {
                url: '/images/logo/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Каталог оборудования КировБелМаш',
            },
        ],
    },
};

export default function EquipmentPage({ searchParams }: { searchParams: { category?: string } }) {
    if (searchParams.category) {
        const cat = equipmentCategoriesConfig.find(c => c.name === searchParams.category);
        if (cat && cat.slug !== 'all') {
            redirect(`/oborudovanie/${cat.slug}`);
        }
    }

    const breadcrumbItems = [
        { label: 'Главная', href: '/' },
        { label: 'Каталог оборудования' },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50">
            <BreadcrumbJsonLd items={breadcrumbItems} />
            <WebPageJsonLd
                type="CollectionPage"
                name="Каталог оборудования КировБелМаш"
                description="Прессы, грануляторы, сушилки, дробилки и транспортное оборудование для переработки древесного сырья."
                url="/oborudovanie"
            />
            <EquipmentPageClient activeCategory="Все" />
            <EquipmentCTA />
        </div>
    );
}