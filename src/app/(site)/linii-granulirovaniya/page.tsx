import Link from 'next/link';
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
import LineComparisonTable from '@/components/lines/LineComparisonTable';
import ContactForm from '@/components/home/ContactForm';
import BreadcrumbJsonLd from '@/components/ui/BreadcrumbJsonLd';

export const metadata: Metadata = {
    title: 'Оборудование для производства пеллет из опилок — купить линию гранулирования',
    description: 'Оборудование для производства пеллет из опилок и древесных отходов — от производителя. Цена за комплект от 9,2 млн ₽. Производительность 500–2000 кг/ч. Монтаж и запуск под ключ.',
    alternates: { canonical: '/linii-granulirovaniya' },
    openGraph: {
        title: 'Оборудование для производства пеллет из опилок — купить линию гранулирования | КировБелМаш',
        description: 'Оборудование для производства пеллет из опилок и древесных отходов — от производителя. Цена за комплект от 9,2 млн ₽. Производительность 500–2000 кг/ч. Монтаж и запуск под ключ.',
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
                '@type': 'AggregateOffer',
                lowPrice: parsePrice(v.price),
                priceCurrency: 'RUB',
                availability: 'https://schema.org/InStock',
            },
        },
    })),
};

export default function GranulationLinePage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <BreadcrumbJsonLd items={[
                { label: 'Главная', href: '/' },
                { label: 'Линии', href: '/#production-lines' },
                { label: 'Линии гранулирования' },
            ]} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <LineHero
                label="Линии гранулирования"
                headingMain="Линии гранулирования для производства топливных пеллет"
                headingAccent="из опилок «под ключ»"
                description={[
                    // Десктопная версия (скрыта на мобильных)
                    <div key="desktop-1" className="hidden sm:block">
                        Изготовим линию гранулирования пеллет из опилок и древесных отходов за 2 месяца.
                    </div>,
                    <div key="desktop-2" className="hidden sm:block">
                        Подберём состав линии: дробилка, сушка, гранулятор, охлаждение, фасовка и автоматика.
                    </div>,
                    <div key="desktop-3" className="hidden sm:block">
                        Цена комплектной линии — от 9,2 млн ₽. Монтаж, запуск и обучение включаем в проект.
                    </div>,
                    // Мобильная версия (скрыта на десктопах)
                    <div key="mobile-1" className="block sm:hidden text-base">
                        Линия гранулирования пеллет из опилок за 2 месяца
                    </div>,
                    <div key="mobile-2" className="block sm:hidden text-base">
                        Дробилка, сушка, гранулятор, охлаждение и автоматика в одном проекте
                    </div>,
                    <div key="mobile-3" className="block sm:hidden text-base">
                        Цена от 9,2 млн ₽, монтаж и запуск под ключ
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
                        Линии гранулирования полного цикла:<br className="hidden sm:block" />производительность, состав линии и цены
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl">
                        Производительность от 500 до 2000 кг/час. Цена от 9,2 млн ₽. Комплектация «под ключ».
                    </p>
                    <p className="mt-4 text-base text-gray-600 max-w-4xl leading-relaxed">
                        Ниже представлены линии по производству пеллет из опилок, щепы, горбыля и лузги.
                        В составе каждой линии — дробилка, сушильный барабан, гранулятор, колонна охлаждения,
                        фасовка и автоматика. Если вам нужны не комплексные линии, а отдельные станки,
                        смотрите{' '}
                        <Link href="/oborudovanie/oborudovanie-dlja-proizvodstva-granul" className="text-red-600 hover:underline font-medium">
                            станки для производства пеллет
                        </Link>{' '}
                        и{' '}
                        <Link href="/oborudovanie/granuljator-ogm-1-5" className="text-red-600 hover:underline font-medium">
                            гранулятор ОГМ-1,5
                        </Link>.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                        <Link href="/oborudovanie/oborudovanie-dlja-proizvodstva-granul" className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-100">
                            Станки для производства пеллет
                        </Link>
                        <Link href="/oborudovanie/granuljator-ogm-1-5" className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-100">
                            Гранулятор ОГМ-1,5
                        </Link>
                        <Link href="/sushilnie-linii" className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-100">
                            Сушильные линии для опилок
                        </Link>
                    </div>
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

            <LineComparisonTable variants={lineVariants.granulation} ctaHref="/contacts" />

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

            <Projects
                filterCategory="Гранулирование"
                title="Реализованные проекты по гранулированию"
                subtitle="Запущенные линии гранулирования пеллет у наших клиентов"
            />

            <ContactForm />
        </div>
    );
}
