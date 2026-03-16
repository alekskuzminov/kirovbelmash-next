import { Metadata } from 'next';
import { lineVariants } from '@/components/lines/linesData';
import LineCard from '@/components/lines/LineCard';
import LineHero from '@/components/lines/LineHero';
import LinesCTA from '@/components/lines/LinesCTA';
import { HERO_BLUR } from '@/lib/heroBlur';
import Projects from '@/components/home/Projects';
import BriquettingProcess from '@/components/lines/BriquettingProcess';
import RelatedLinesBlock from '@/components/lines/RelatedLinesBlock';
import ContactForm from '@/components/home/ContactForm';

export const metadata: Metadata = {
    title: 'Оборудование для производства топливных брикетов',
    description: 'Линии брикетирования и оборудование для производства топливных брикетов из опилок и других древесных отходов. Проектирование, изготовление, монтаж, запуск',
    alternates: { canonical: '/linii-briketirovaniya' },
    openGraph: {
        title: 'Оборудование для производства топливных брикетов | КировБелМаш',
        description: 'Линии брикетирования и оборудование для производства топливных брикетов из опилок и других древесных отходов. Проектирование, изготовление, монтаж, запуск',
        url: 'https://kirovbelmash.ru/linii-briketirovaniya',
        type: 'website',
        siteName: 'КировБелМаш',
        images: [
            {
                url: '/images/logo/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Линии брикетирования | КировБелМаш',
            },
        ],
    },
};

export default function BriquettingLinePage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <LineHero
                label="Линии брикетирования"
                headingMain="Оборудование для производства топливных брикетов"
                headingAccent="из опилок и древесных отходов"
                description={[
                    // Десктопная версия (скрыта на мобильных)
                    <div key="desktop-1" className="hidden sm:block">
                        Изготовим линию брикетирования евродров Pini Key и Ruf «под ключ» за 2 месяца.
                    </div>,
                    <div key="desktop-2" className="hidden sm:block">
                        Полный цикл: проектируем, производим, обучаем и запускаем.
                    </div>,
                    <div key="desktop-3" className="hidden sm:block">
                        Гарантия качества и сервисная поддержка.
                    </div>,
                    // Мобильная версия (скрыта на десктопах)
                    <div key="mobile-1" className="block sm:hidden text-base">
                        Линии брикетирования Pini Key и Ruf &quot;под ключ&quot; за 2 месяца
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
                    { label: 'Линии брикетирования' },
                ]}
                image="/images/lines/briquetting/briquett-line-hero-bg.webp"
                blurDataURL={HERO_BLUR.linesBriquetting}
            />

            {/* Подзаголовок секции */}
            <section id="variants" className="pt-8 pb-6 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Готовые линии производства топливных брикетов
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl">
                        Производительность от 500 до 2000 кг/час. Комплектация «под ключ».
                    </p>
                </div>
            </section>

            <section className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {lineVariants.briquetting.map((variant) => (
                            <LineCard key={variant.id} variant={variant} />
                        ))}
                    </div>
                </div>
            </section>

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

            <Projects />

            <ContactForm />
        </div>
    );
}
