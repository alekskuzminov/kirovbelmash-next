import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { equipmentItems } from '@/components/equipment/equipmentData';
import EquipmentCTA from '@/components/equipment/EquipmentCTA';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const item = equipmentItems.find((e) => e.id.toString() === id);

    if (!item) {
        return {
            title: 'Оборудование не найдено | Kirovbelmash'
        };
    }

    return {
        title: `${item.name} | Оборудование | Kirovbelmash`,
        description: item.description,
    };
}

// Generate static params for SSG
export function generateStaticParams() {
    return equipmentItems.map((item) => ({
        id: item.id.toString(),
    }));
}

export default async function EquipmentDetailPage({ params }: Props) {
    const { id } = await params;
    const item = equipmentItems.find((e) => e.id.toString() === id);

    if (!item) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50/50">
            {/* Шапка с хлебными крошками */}
            <section className="pt-32 sm:pt-40 pb-6 sm:pb-12 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs
                        items={[
                            { label: 'Главная', href: '/' },
                            { label: 'Каталог оборудования', href: '/oborudovanie' },
                            { label: item.name }
                        ]}
                        className="mb-4 sm:mb-6 pb-2"
                    />

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-6 lg:gap-8">
                        <div className="flex-1">
                            <div className="inline-block px-3 py-1 bg-red-50 text-red-600 text-xs sm:text-sm font-medium rounded-full mb-3 sm:mb-4 border border-red-100">
                                {item.category}
                            </div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                                {item.name}
                            </h1>
                            {item.badge && (
                                <span className="inline-block px-2.5 py-1 bg-gray-900 text-white text-xs font-bold uppercase tracking-wide rounded mb-3 sm:mb-4">
                                    {item.badge}
                                </span>
                            )}
                        </div>

                        <div className="flex-shrink-0 w-full md:w-auto">
                            <Link
                                href="/contacts"
                                className="w-full md:w-auto px-6 sm:px-8 py-3 sm:py-3.5 bg-red-600 text-white text-sm font-medium rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
                            >
                                <i className="ri-mail-send-line text-lg"></i>
                                Получить коммерческое
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Основной контент */}
            <section className="py-8 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                        {/* Изображение (слева на десктопе, сверху на мобилке) */}
                        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 lg:sticky lg:top-24">
                            <div className="relative w-full aspect-video sm:aspect-[4/3] rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 66vw"
                                    priority
                                    className="object-contain p-4"
                                />
                            </div>
                        </div>

                        {/* Характеристики (справа на десктопе) */}
                        <div className="lg:col-span-5 xl:col-span-4 space-y-6 sm:space-y-8">

                            {/* Описание */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                                    <i className="ri-file-info-line text-red-600"></i>
                                    Описание
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>

                            {/* Технические характеристики */}
                            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 sm:mb-5 flex items-center gap-2">
                                    <i className="ri-settings-4-line text-red-600"></i>
                                    Технические характеристики
                                </h3>
                                <div className="space-y-0 text-sm sm:text-base">
                                    {item.specs.map((spec, index) => (
                                        <div
                                            key={index}
                                            className={`flex justify-between py-2 sm:py-3 border-b border-gray-100 last:border-0 ${index % 2 === 0 ? 'bg-gray-50/50 -mx-5 sm:-mx-6 px-5 sm:px-6' : ''}`}
                                        >
                                            <span className="text-gray-500">{spec.label}</span>
                                            <span className="font-medium text-gray-900 text-right ml-4">{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Особенности/Преимущества */}
                            <div className="bg-red-50 rounded-2xl p-5 sm:p-6 border border-red-100">
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <i className="ri-checkbox-circle-line text-red-600"></i>
                                    Особенности
                                </h3>
                                <ul className="space-y-2.5">
                                    {item.features.map((feature, index) => (
                                        <li key={index} className="flex gap-3 text-sm sm:text-base text-gray-700">
                                            <i className="ri-check-line text-red-600 flex-shrink-0 mt-0.5"></i>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Вызов к действию (общий) */}
            <EquipmentCTA />
        </div>
    );
}
