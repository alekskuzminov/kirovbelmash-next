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
    description: 'Оборудование для производства пеллет из опилок и древесных отходов — от производителя. Цена за комплект от 10,6 млн ₽. Производительность 500–2000 кг/ч. Монтаж и запуск под ключ.',
    alternates: { canonical: '/linii-granulirovaniya' },
    openGraph: {
        title: 'Оборудование для производства пеллет из опилок — купить линию гранулирования | КировБелМаш',
        description: 'Оборудование для производства пеллет из опилок и древесных отходов — от производителя. Цена за комплект от 10,6 млн ₽. Производительность 500–2000 кг/ч. Монтаж и запуск под ключ.',
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
                headingMain="Линии производства топливных пеллет"
                headingAccent="под ключ за 60 дней"
                description={[
                    <div key="desc">
                        Стоимость линии — от 10,6 млн ₽. Монтаж, запуск и обучение включаем в проект.
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
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Линии гранулирования полного цикла
                    </h2>
                </div>
            </section>

            <section className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
