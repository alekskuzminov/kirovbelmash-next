import { Metadata } from 'next';
import { lineVariants } from '@/components/lines/linesData';
import LineCard from '@/components/lines/LineCard';
import LineHero from '@/components/lines/LineHero';
import LinesCTA from '@/components/lines/LinesCTA';
import { HERO_BLUR } from '@/lib/heroBlur';
import Projects from '@/components/home/Projects';
import BriquettingProcess from '@/components/lines/BriquettingProcess';
import RelatedLinesBlock from '@/components/lines/RelatedLinesBlock';
import BriquettingSeoText from '@/components/lines/BriquettingSeoText';
import BriquettingFAQ from '@/components/lines/BriquettingFAQ';
import LineComparisonTable from '@/components/lines/LineComparisonTable';
import ContactForm from '@/components/home/ContactForm';
import BreadcrumbJsonLd from '@/components/ui/BreadcrumbJsonLd';

export const metadata: Metadata = {
    title: 'Оборудование для производства топливных брикетов из опилок — линии под ключ',
    description: 'Линии брикетирования и оборудование для производства топливных брикетов из опилок. Цена за комплект от 9,4 млн ₽. Производительность 500–2000 кг/ч. Монтаж и запуск под ключ.',
    alternates: { canonical: '/linii-briketirovaniya' },
    openGraph: {
        title: 'Линии брикетирования – оборудование для производства брикетов',
        description: 'Линии брикетирования и оборудование для производства топливных брикетов из опилок. Цена за комплект от 9,4 млн ₽. Производительность 500–2000 кг/ч. Монтаж и запуск под ключ.',
        url: 'https://kirovbelmash.ru/linii-briketirovaniya',
        type: 'website',
        siteName: 'КировБелМаш',
        images: [
            {
                url: '/images/logo/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Линии брикетирования – оборудование для производства брикетов | КировБелМаш',
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
    name: 'Линии брикетирования и оборудование для производства брикетов КировБелМаш',
    description: 'Линия по производству топливных брикетов из опилок и древесных отходов: дробление, сушка, прессование и упаковка',
    numberOfItems: lineVariants.briquetting.length,
    itemListElement: lineVariants.briquetting.map((v, i) => ({
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

export default function BriquettingLinePage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <BreadcrumbJsonLd items={[
                { label: 'Главная', href: '/' },
                { label: 'Линии', href: '/#production-lines' },
                { label: 'Линии брикетирования' },
            ]} />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />
            <LineHero
                label="Линии брикетирования"
                headingMain="Линии производства топливных брикетов"
                headingAccent="под ключ за 60 дней"
                description={[
                    <div key="desc">
                        Стоимость линии — от 9,4 млн ₽. Монтаж, запуск и обучение включаем в проект.
                    </div>,
                ]}
                breadcrumbs={[
                    { label: 'Главная', href: '/' },
                    { label: 'Линии', href: '/#production-lines' },
                    { label: 'Линии брикетирования' },
                ]}
                image="/images/lines/briquetting/briquett-line-hero-bg.webp"
                blurDataURL={HERO_BLUR.linesBriquetting}
            />

            {/* Подзаголовок секции */}
            <section id="variants" className="pt-8 pb-6 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Линии брикетирования полного цикла
                    </h2>
                </div>
            </section>

            <section className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lineVariants.briquetting.map((variant) => (
                            <LineCard key={variant.id} variant={variant} />
                        ))}
                    </div>
                </div>
            </section>

            <LineComparisonTable variants={lineVariants.briquetting} ctaHref="/contacts" />

            <BriquettingProcess />

            <LinesCTA />

            <RelatedLinesBlock
                title="Выбираете направление производства?"
                subtitle="КировБелМаш производит оборудование для трёх направлений переработки древесных отходов в топливо — сравните и выберите подходящее под ваше сырьё и объёмы."
                lines={[
                    {
                        href: '/linii-granulirovaniya',
                        label: 'Линии гранулирования топливных пеллет',
                        description: 'Производство топливных пеллет стандарта DIN+ EN Plus диаметром 6–8 мм из опилок, щепы и растительных отходов.',
                        image: '/images/lines/granulation/preview-pellets-line-home.webp',
                    },
                    {
                        href: '/sushilnie-linii',
                        label: 'Сушильные линии для опилок и щепы',
                        description: 'Линии сушки сырья до оптимальной влажности 10% — обязательный этап перед прессованием брикетов.',
                        image: '/images/lines/drying/preview-drying-line-home.webp',
                    },
                ]}
            />

            <BriquettingSeoText />

            <BriquettingFAQ />

            <Projects
                filterCategory="Брикетирование"
                title="Реализованные проекты по брикетированию"
                subtitle="Запущенные линии брикетирования у наших клиентов"
            />

            <ContactForm />
        </div>
    );
}
