import { Metadata } from 'next';
import { lineVariants } from '@/components/lines/linesData';
import LineCard from '@/components/lines/LineCard';
import LineHero from '@/components/lines/LineHero';
import LinesCTA from '@/components/lines/LinesCTA';
import { HERO_BLUR } from '@/lib/heroBlur';
import Projects from '@/components/home/Projects';
import GranulationProcess from '@/components/lines/GranulationProcess';
import RelatedLinesBlock from '@/components/lines/RelatedLinesBlock';
import GranulationFAQ from '@/components/lines/GranulationFAQ';
import GranulationSeoText from '@/components/lines/GranulationSeoText';
import ContactForm from '@/components/home/ContactForm';

export const metadata: Metadata = {
    title: 'Оборудование для производства топливных пеллет из опилок',
    description: 'Линия гранулирования для изготовления топливных пеллетов из опилок и другого древесного сырья. Пеллетные линии по ценам от завода-производителя',
    alternates: { canonical: '/linii-granulirovaniya' },
    keywords: [
        'оборудование для производства пеллет',
        'оборудование для производства пеллет из опилок',
        'оборудование для производства топливных пеллет',
        'линия гранулирования',
        'оборудование для пеллетов',
        'пеллетная линия',
        'оборудование для изготовления пеллет',
        'оборудование для изготовления пеллетов',
        'линия по производству пеллет',
    ],
    openGraph: {
        title: 'Оборудование для производства топливных пеллет из опилок | КировБелМаш',
        description: 'Линия гранулирования для изготовления топливных пеллетов из опилок и другого древесного сырья. Пеллетные линии по ценам от завода-производителя',
        url: 'https://kirovbelmash.ru/linii-granulirovaniya',
        type: 'website',
        siteName: 'КировБелМаш',
        images: [
            {
                url: '/images/logo/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Оборудование для производства пеллет | КировБелМаш',
            },
        ],
    },
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://kirovbelmash.ru/' },
        { '@type': 'ListItem', position: 2, name: 'Линии гранулирования', item: 'https://kirovbelmash.ru/linii-granulirovaniya' },
    ],
};

const SITE_URL = 'https://kirovbelmash.ru';

function parsePrice(priceStr: string): number | null {
    const digits = priceStr.replace(/[^\d]/g, '');
    return digits ? parseInt(digits, 10) : null;
}

const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Пеллетные линии гранулирования КировБелМаш',
    description: 'Оборудование для производства топливных пеллет из опилок и древесных отходов',
    numberOfItems: lineVariants.granulation.length,
    itemListElement: lineVariants.granulation.map((v, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
            '@type': 'Product',
            name: v.name,
            description: v.description,
            image: `${SITE_URL}${v.image}`,
            brand: { '@type': 'Brand', name: 'КировБелМаш' },
            offers: {
                '@type': 'Offer',
                price: parsePrice(v.price),
                priceCurrency: 'RUB',
                availability: 'https://schema.org/InStock',
                priceValidUntil: `${new Date().getFullYear()}-12-31`,
                hasMerchantReturnPolicy: {
                    '@type': 'MerchantReturnPolicy',
                    applicableCountry: 'RU',
                    returnPolicyCategory: 'https://schema.org/MerchantReturnNotPermitted',
                },
                shippingDetails: {
                    '@type': 'OfferShippingDetails',
                    shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'RUB' },
                    shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'RU' },
                    deliveryTime: {
                        '@type': 'ShippingDeliveryTime',
                        handlingTime: {
                            '@type': 'QuantitativeValue',
                            minValue: 56,
                            maxValue: 112,
                            unitCode: 'DAY',
                        },
                    },
                },
            },
        },
    })),
};

export default function GranulationLinePage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <LineHero
                label="Линии гранулирования"
                headingMain="Оборудование для производства топливных пеллет из опилок"
                headingAccent="линии гранулирования «под ключ»"
                description={[
                    // Десктопная версия (скрыта на мобильных)
                    <div key="desktop-1" className="hidden sm:block">
                        Изготовим пеллетную линию гранулирования - собственное производство.
                    </div>,
                    <div key="desktop-2" className="hidden sm:block">
                        Полный цикл: проектируем, производим, обучаем и запускаем.
                    </div>,
                    <div key="desktop-3" className="hidden sm:block">
                        Гарантия качества и сервисная поддержка.
                    </div>,
                    // Мобильная версия (скрыта на десктопах)
                    <div key="mobile-1" className="block sm:hidden text-base">
                        Линии гранулирования топливных пеллет &quot;под ключ&quot;
                    </div>,
                    <div key="mobile-2" className="block sm:hidden text-base">
                        Проектирование, производство, обучение персонала и запуск
                    </div>,
                    <div key="mobile-3" className="block sm:hidden text-base">
                        Гарантия качества и сервис
                    </div>,
                ]}
                breadcrumbs={[
                    { label: 'Главная', href: '/' },
                    { label: 'Линии', href: '/#production-lines' },
                    { label: 'Линии гранулирования' },
                ]}
                image="/images/lines/granulation/pellets-lines-hero-bg.webp"
                blurDataURL={HERO_BLUR.linesGranulation}
            />

            {/* Подзаголовок секции */}
            <section id="variants" className="pt-8 pb-6 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Купить пеллетное оборудование для производства гранул из опилок
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl">
                        Производительность от 500 до 2000 кг/час. Цена от 9,2 млн ₽. Комплектация «под ключ».
                    </p>
                </div>
            </section>

            <section className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {lineVariants.granulation.map((variant) => (
                            <LineCard key={variant.id} variant={variant} />
                        ))}
                    </div>
                </div>
            </section>

            <GranulationProcess />

            <LinesCTA />

            <RelatedLinesBlock
                title="Выбираете направление производства?"
                subtitle="КировБелМаш производит оборудование для трёх направлений переработки древесных отходов в топливо — сравните и выберите подходящее под ваше сырьё и объёмы."
                lines={[
                    {
                        href: '/linii-briketirovaniya',
                        label: 'Линии брикетирования топливных брикетов',
                        description: 'Производство древесных топливных брикетов RUF и Pini Key из опилок, стружки и других отходов деревопереработки.',
                        image: '/images/lines/briquetting/preview-briquette-line-home.webp',
                    },
                    {
                        href: '/sushilnie-linii',
                        label: 'Сушильные линии для опилок и щепы',
                        description: 'Линии сушки сырья до оптимальной влажности 10% — обязательный этап перед гранулированием пеллет.',
                        image: '/images/lines/drying/preview-drying-line-home.webp',
                    },
                ]}
            />

            <GranulationSeoText />

            <GranulationFAQ />

            <Projects />

            <ContactForm />
        </div>
    );
}
