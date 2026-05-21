import Link from 'next/link';
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
    title: 'Оборудование для производства топливных брикетов из опилок',
    description: 'Линии брикетирования и оборудование для производства топливных брикетов из опилок. Цена за комплект от 10,5 млн ₽. Производительность 500–2000 кг/ч. Монтаж и запуск под ключ.',
    alternates: { canonical: '/linii-briketirovaniya' },
    openGraph: {
        title: 'Линии брикетирования – оборудование для производства брикетов',
        description: 'Линии брикетирования и оборудование для производства топливных брикетов из опилок. Цена за комплект от 10,5 млн ₽. Производительность 500–2000 кг/ч. Монтаж и запуск под ключ.',
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
                headingMain="Линии брикетирования – оборудование для производства топливных брикетов"
                headingAccent="из опилок «под ключ»"
                description={[
                    // Десктопная версия (скрыта на мобильных)
                    <div key="desktop-1" className="hidden sm:block">
                        Изготовим линию для производства топливных брикетов из опилок — срок 2&nbsp;месяца.
                    </div>,
                    <div key="desktop-2" className="hidden sm:block">
                        Подберём состав оборудования: дробилка, сушка, пресс, резка, автоматика и упаковка.
                    </div>,
                    <div key="desktop-3" className="hidden sm:block">
                        Цена комплектной линии — от 10,5 млн ₽. Монтаж, запуск и обучение включаем в проект.
                    </div>,
                    // Мобильная версия (скрыта на десктопах)
                    <div key="mobile-1" className="block sm:hidden text-base">
                        Линия по производству брикетов Pini & Kay из опилок за 2 месяца
                    </div>,
                    <div key="mobile-2" className="block sm:hidden text-base">
                        Дробилка, сушка, пресс, резка и автоматика в одном проекте
                    </div>,
                    <div key="mobile-3" className="block sm:hidden text-base">
                        Цена от 10,5 млн ₽, монтаж и запуск под ключ
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
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Линии брикетирования полного цикла:<br className="hidden sm:block" />производительность, состав оборудования и цены
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl">
                        Производительность от 500 до 2000 кг/час. Цена от 10,5 млн ₽. Комплектация «под ключ».
                    </p>
                    <p className="mt-4 text-base text-gray-600 max-w-4xl leading-relaxed">
                        Ниже представлены линии по производству брикетов из опилок, стружки, щепы и лузги.
                        В составе каждой линии — оборудование для брикетов полного цикла: дробилка, сушильный барабан,
                        бункер-накопитель, пресс, автомат резки и система автоматики. Если вам нужны не только
                        комплексные линии, но и отдельные узлы, смотрите{' '}
                        <Link href="/oborudovanie/briketirujushhee-oborudovanie" className="text-red-600 hover:underline font-medium">
                            станки для производства брикетов
                        </Link>{' '}
                        и{' '}
                        <Link href="/oborudovanie/press-pbm2-dlya-briketov" className="text-red-600 hover:underline font-medium">
                            пресс ПБМ-2
                        </Link>.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm">
                        <Link href="/oborudovanie/briketirujushhee-oborudovanie" className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-100">
                            Станки для производства брикетов
                        </Link>
                        <Link href="/oborudovanie/press-pbm2-dlya-briketov" className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-100">
                            Пресс ПБМ-2
                        </Link>
                        <Link href="/sushilnie-linii" className="inline-flex items-center rounded-full border border-red-100 bg-red-50 px-4 py-2 font-medium text-red-700 transition-colors hover:bg-red-100">
                            Сушильные линии для опилок
                        </Link>
                    </div>
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
