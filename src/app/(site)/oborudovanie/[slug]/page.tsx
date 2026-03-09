import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ContactModalButton from '@/components/common/ContactModalButton';
import { notFound } from 'next/navigation';
import { equipmentItems, equipmentCategoriesConfig } from '@/components/equipment/equipmentData';
import EquipmentCTA from '@/components/equipment/EquipmentCTA';
import ContactForm from '@/components/home/ContactForm';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import EquipmentImageGallery from '@/components/equipment/EquipmentImageGallery';
import EquipmentPageClient from '../EquipmentPageClient';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    // Сначала проверяем, категория ли это
    const category = equipmentCategoriesConfig.find((c) => c.slug === slug);
    if (category) {
        return {
            title: `${category.name} | Каталог оборудования`,
            description: `Купить оборудование в категории "${category.name}". Каталог промышленных станков и линий с техническими характеристиками и описанием.`,
        };
    }

    // Иначе проверяем, товар ли это
    const item = equipmentItems.find((e) => e.slug === slug);
    if (item) {
        return {
            title: item.seoTitle || `${item.name} | Оборудование`,
            description: item.description,
        };
    }

    return {
        title: 'Страница не найдена'
    };
}

// Generate static params for SSG
export function generateStaticParams() {
    const itemParams = equipmentItems.map((item) => ({
        slug: item.slug,
    }));

    const categoryParams = equipmentCategoriesConfig
        .filter((cat) => cat.slug !== 'all')
        .map((cat) => ({
            slug: cat.slug,
        }));

    return [...categoryParams, ...itemParams];
}

export default async function EquipmentDynamicPage({ params }: Props) {
    const { slug } = await params;

    // Сценарий 1: Категория
    const category = equipmentCategoriesConfig.find((c) => c.slug === slug);
    if (category) {
        return (
            <div className="min-h-screen bg-gray-50/50">
                <EquipmentPageClient activeCategory={category.name} />
            </div>
        );
    }

    // Сценарий 2: Детальная страница товара
    const item = equipmentItems.find((e) => e.slug === slug);
    if (!item) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            {/* Хлебные крошки */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40">
                <Breadcrumbs
                    items={[
                        { label: 'Главная', href: '/' },
                        { label: 'Каталог оборудования', href: '/oborudovanie' },
                        { label: item.category, href: `/oborudovanie/${equipmentCategoriesConfig.find(c => c.name === item.category)?.slug || ''}` },
                        { label: item.name }
                    ]}
                    className="mb-6"
                />

                {/* Основной контент */}
                <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 mb-10">
                    <div className="flex flex-col xl:grid xl:grid-cols-2 gap-10 xl:gap-16">

                        {/* Левая колонка: Галерея (всегда первая) */}
                        <div className="order-1 xl:border-r xl:border-gray-100 xl:pr-10 xl:sticky xl:top-32 xl:self-start">
                            <EquipmentImageGallery
                                mainImage={item.image}
                                gallery={item.gallery}
                                itemName={item.name}
                            />
                        </div>

                        {/* Правая колонка: Инфо и Характеристики (всегда вторая) */}
                        <div className="order-2">
                            <div className="mb-8 font-inter">
                                <Link
                                    href={`/oborudovanie/${equipmentCategoriesConfig.find(c => c.name === item.category)?.slug}`}
                                    className="inline-block px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-4 border border-red-100 hover:bg-red-100 transition-colors"
                                >
                                    {item.category}
                                </Link>
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
                                    {item.name}
                                </h1>

                                <div className="flex flex-col gap-1 mb-8">
                                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                                        Цена: по запросу
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-3 mb-10">
                                    <Link
                                        href={`/oborudovanie/${equipmentCategoriesConfig.find(c => c.name === item.category)?.slug}`}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                                    >
                                        <i className="ri-arrow-left-line" />
                                        Назад в категорию
                                    </Link>
                                    <ContactModalButton
                                        message={`Запрос КП: ${item.name}`}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm cursor-pointer"
                                    >
                                        Запросить КП
                                        <i className="ri-send-plane-line" />
                                    </ContactModalButton>
                                </div>

                                {/* Описание */}
                                <div className="mb-10">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <i className="ri-article-line text-red-600" />
                                        Описание
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Характеристики */}
                                <div>
                                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <i className="ri-list-settings-line text-red-600" />
                                        Технические характеристики
                                    </h2>
                                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                                        {item.specs.map((spec, index) => (
                                            <div
                                                key={index}
                                                className={`flex justify-between items-center px-5 py-3 text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                                    }`}
                                            >
                                                <span className="text-gray-500">{spec.label}</span>
                                                <span className="font-semibold text-gray-900">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Особенности */}
                {item.features && item.features.length > 0 && (
                    <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 mb-10">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <i className="ri-checkbox-circle-line text-green-500" />
                            Особенности и преимущества
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {item.features.map((feature, index) => (
                                <div key={index} className="flex gap-3 items-start p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <i className="ri-check-line text-green-500 text-xl flex-shrink-0" />
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Quote Form */}
            <ContactForm initialMessage={`Запрос КП: ${item.name}`} />

            {/* Вызов к действию (общий) */}
            <EquipmentCTA />
        </div>
    );
}
