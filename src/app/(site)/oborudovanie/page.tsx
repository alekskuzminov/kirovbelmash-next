import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import EquipmentPageClient from './EquipmentPageClient';
import { equipmentCategoriesConfig } from '@/components/equipment/equipmentData';

export const metadata: Metadata = {
    title: 'Каталог оборудования',
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

    return (
        <div className="min-h-screen bg-gray-50/50">
            <EquipmentPageClient activeCategory="Все" />
        </div>
    );
}