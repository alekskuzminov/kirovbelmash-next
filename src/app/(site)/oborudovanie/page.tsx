import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import EquipmentPageClient from './EquipmentPageClient';
import { equipmentCategoriesConfig } from '@/components/equipment/equipmentData';

export const metadata: Metadata = {
    title: 'Каталог оборудования | Kirovbelmash',
    description: 'Каталог промышленного оборудования для производства брикетов, пеллет и переработки древесины. Полный каталог станков и линий.',
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