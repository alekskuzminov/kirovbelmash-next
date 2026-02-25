import { Metadata } from 'next';
import { Suspense } from 'react';
import EquipmentPageClient from './EquipmentPageClient';

export const metadata: Metadata = {
    title: 'Каталог оборудования | Kirovbelmash',
    description: 'Каталог промышленного оборудования для производства брикетов, пеллет и переработки древесины. Полный каталог станков и линий.',
};

export default function EquipmentPage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center">Загрузка каталога...</div>}>
                <EquipmentPageClient />
            </Suspense>
        </div>
    );
}