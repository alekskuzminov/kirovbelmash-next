import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ContactModalButton from '@/components/common/ContactModalButton';
import { notFound } from 'next/navigation';
import { equipmentItems, equipmentCategoriesConfig } from '@/components/equipment/equipmentData';
import EquipmentCTA from '@/components/equipment/EquipmentCTA';
import ContactForm from '@/components/home/ContactForm';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/ui/BreadcrumbJsonLd';
import EquipmentImageGallery from '@/components/equipment/EquipmentImageGallery';
import EquipmentPageClient from '../EquipmentPageClient';
import RelatedEquipmentCarousel from '@/components/equipment/RelatedEquipmentCarousel';
import PressPbm2SeoText from '@/components/equipment/seo/PressPbm2SeoText';
import BriketirujushheeSeoText from '@/components/equipment/seo/BriketirujushheeSeoText';
import PelletSeoText from '@/components/equipment/seo/PelletSeoText';
import GranuljatorOgm15SeoText from '@/components/equipment/seo/GranuljatorOgm15SeoText';
import BriketirujushheeEquipmentFAQ from '@/components/equipment/faq/BriketirujushheeEquipmentFAQ';
import PelletEquipmentFAQ from '@/components/equipment/faq/PelletEquipmentFAQ';
import PressPbm2FAQ from '@/components/equipment/faq/PressPbm2FAQ';
import GranuljatorOgm15FAQ from '@/components/equipment/faq/GranuljatorOgm15FAQ';

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    // Сначала проверяем, категория ли это
    const category = equipmentCategoriesConfig.find((c) => c.slug === slug);
    if (category) {
        return {
            title: category.seoTitle || category.name,
            description: category.seoDescription || `Купить оборудование в категории "${category.name}". Каталог промышленных станков и линий с техническими характеристиками и описанием.`,
            alternates: { canonical: `/oborudovanie/${slug}` },
            openGraph: {
                title: category.seoTitle || category.name,
                description: category.seoDescription || '',
                url: `https://kirovbelmash.ru/oborudovanie/${slug}`,
                type: 'website',
                siteName: 'КировБелМаш',
                images: [
                    {
                        url: '/images/logo/og-image.jpg',
                        width: 1200,
                        height: 630,
                        alt: category.seoTitle || category.name,
                    },
                ],
            },
        };
    }

    // Иначе проверяем, товар ли это
    const item = equipmentItems.find((e) => e.slug === slug);
    if (item) {
        return {
            title: item.seoTitle || `${item.name} | Оборудование`,
            description: item.description,
            alternates: { canonical: `/oborudovanie/${slug}` },
            openGraph: {
                title: item.seoTitle || item.name,
                description: item.description,
                url: `https://kirovbelmash.ru/oborudovanie/${slug}`,
                type: 'website',
                siteName: 'КировБелМаш',
                images: [
                    {
                        url: item.image || '/images/logo/og-image.jpg',
                        width: 1200,
                        height: 630,
                        alt: item.seoTitle || item.name,
                    },
                ],
            },
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
        const otherItems = equipmentItems.filter((e) => e.category !== category.name);
        return (
            <div className="min-h-screen bg-gray-50/50">
                <EquipmentPageClient activeCategory={category.name} />
                <EquipmentCTA />
                {slug === 'briketirujushhee-oborudovanie' && <BriketirujushheeSeoText />}
                {slug === 'oborudovanie-dlja-proizvodstva-granul' && <PelletSeoText />}
                {slug === 'briketirujushhee-oborudovanie' && <BriketirujushheeEquipmentFAQ />}
                {slug === 'oborudovanie-dlja-proizvodstva-granul' && <PelletEquipmentFAQ />}
                {otherItems.length > 0 && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                        <RelatedEquipmentCarousel
                            items={otherItems}
                            categorySlug="all"
                            title="Другие элементы линий для производства брикетов и пеллет"
                            linkLabel="Весь каталог оборудования"
                        />
                    </div>
                )}
            </div>
        );
    }

    // Сценарий 2: Детальная страница товара
    const item = equipmentItems.find((e) => e.slug === slug);
    if (!item) {
        notFound();
    }

    const linksMap: Record<string, Array<{ href: string; label: string; image: string }>> = {
        'Станки для производства брикетов': [
            { href: '/linii-briketirovaniya', label: 'Линии брикетирования', image: '/images/lines/briquetting/preview-briquette-line-home.webp' },
        ],
        'Станки для производства пеллет': [
            { href: '/linii-granulirovaniya', label: 'Линии гранулирования', image: '/images/lines/granulation/preview-pellets-line-home.webp' },
        ],
        'Сушильное оборудование': [
            { href: '/sushilnie-linii', label: 'Сушильные линии', image: '/images/lines/drying/preview-drying-line-home.webp' },
            { href: '/linii-briketirovaniya', label: 'Линии брикетирования', image: '/images/lines/briquetting/preview-briquette-line-home.webp' },
            { href: '/linii-granulirovaniya', label: 'Линии гранулирования', image: '/images/lines/granulation/preview-pellets-line-home.webp' },
        ],
    };
    const defaultLines = [
        { href: '/linii-briketirovaniya', label: 'Линии брикетирования', image: '/images/lines/briquetting/preview-briquette-line-home.webp' },
        { href: '/linii-granulirovaniya', label: 'Линии гранулирования', image: '/images/lines/granulation/preview-pellets-line-home.webp' },
    ];
    const usedInLines = linksMap[item.category] ?? defaultLines;

    const breadcrumbItems = [
        { label: 'Главная', href: '/' },
        { label: 'Каталог оборудования', href: '/oborudovanie' },
        { label: item.category, href: `/oborudovanie/${equipmentCategoriesConfig.find(c => c.name === item.category)?.slug || ''}` },
        { label: item.name },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            <BreadcrumbJsonLd items={breadcrumbItems} />
            {/* Хлебные крошки */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40">
                <Breadcrumbs
                    items={breadcrumbItems}
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

                                {/* Входит в состав линий */}
                                <div className="mt-10">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <i className="ri-links-line text-red-600" />
                                        Входит в состав линий
                                    </h2>
                                    <div className="flex flex-col gap-3">
                                        {usedInLines.map((line) => (
                                            <Link
                                                key={line.href}
                                                href={line.href}
                                                className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 hover:border-red-200 hover:bg-red-50/40 transition-all duration-200 group"
                                            >
                                                <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                                                    <Image
                                                        src={line.image}
                                                        alt={line.label}
                                                        fill
                                                        className="object-cover"
                                                        sizes="64px"
                                                    />
                                                </div>
                                                <span className="text-sm font-semibold text-gray-800 group-hover:text-red-600 transition-colors flex-1">
                                                    {line.label}
                                                </span>
                                                <i className="ri-arrow-right-s-line text-gray-400 group-hover:text-red-500 transition-colors text-lg flex-shrink-0" />
                                            </Link>
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

            {/* Вызов к действию (общий) */}
            <EquipmentCTA title={
                (slug === 'press-pbm2-dlya-briketov' || slug === 'granuljator-ogm-1-5')
                    ? 'Нужна помощь с подбором оборудования?'
                    : 'Не нашли нужное оборудование?'
            } />

            {/* SEO-секция (per-equipment) */}
            {slug === 'press-pbm2-dlya-briketov' && <PressPbm2SeoText />}
            {slug === 'granuljator-ogm-1-5' && <GranuljatorOgm15SeoText />}

            {/* FAQ-секция (per-equipment) */}
            {slug === 'press-pbm2-dlya-briketov' && <PressPbm2FAQ />}
            {slug === 'granuljator-ogm-1-5' && <GranuljatorOgm15FAQ />}

            {/* Quote Form */}
            <ContactForm initialMessage={`Запрос КП: ${item.name}`} />
        </div>
    );
}
