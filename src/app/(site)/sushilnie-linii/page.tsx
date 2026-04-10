import { Metadata } from 'next';
import { lineVariants } from '@/components/lines/linesData';
import LineCard from '@/components/lines/LineCard';
import LineHero from '@/components/lines/LineHero';
import BreadcrumbJsonLd from '@/components/ui/BreadcrumbJsonLd';
import LinesCTA from '@/components/lines/LinesCTA';
import { HERO_BLUR } from '@/lib/heroBlur';
import Projects from '@/components/home/Projects';
import DryingProcess from '@/components/lines/DryingProcess';
import RelatedLinesBlock from '@/components/lines/RelatedLinesBlock';
import ContactForm from '@/components/home/ContactForm';

export const metadata: Metadata = {
    title: 'Оборудование для сушки древесного сырья',
    description: 'Линии для сушки сырья опилок, щепы и биомассы. Изготовим сушильные линии на производстве брикетов, пеллет и гранул. Гарантия качества и сервисная поддержка',
    alternates: { canonical: '/sushilnie-linii' },
    openGraph: {
        title: 'Оборудование для сушки древесного сырья | КировБелМаш',
        description: 'Линии для сушки сырья опилок, щепы и биомассы. Изготовим сушильные линии на производстве брикетов, пеллет и гранул. Гарантия качества и сервисная поддержка',
        url: 'https://kirovbelmash.ru/sushilnie-linii',
        type: 'website',
        siteName: 'КировБелМаш',
        images: [
            {
                url: '/images/logo/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Сушильные линии | КировБелМаш',
            },
        ],
    },
};

export default function DryingLinePage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <BreadcrumbJsonLd items={[
                { label: 'Главная', href: '/' },
                { label: 'Линии', href: '/#production-lines' },
                { label: 'Сушильные линии' },
            ]} />
            <LineHero
                label="Сушильные линии"
                headingMain={<>Производство линий<br />для сушки сырья</>}
                headingAccent="опилок, щепы и биомассы"
                description={[
                    // Десктопная версия (скрыта на мобильных)
                    <div key="desktop-1" className="hidden sm:block">
                        Изготовим линию сушки сырья на производстве брикетов, пеллет и гранул.
                    </div>,
                    <div key="desktop-2" className="hidden sm:block">
                        Полный цикл: проектируем, производим, обучаем и запускаем.
                    </div>,
                    <div key="desktop-3" className="hidden sm:block">
                        Гарантия качества и сервисная поддержка.
                    </div>,
                    // Мобильная версия (скрыта на десктопах)
                    <div key="mobile-1" className="block sm:hidden text-base">
                        Линии сушки опилок и щепы &quot;под ключ&quot;
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
                    { label: 'Сушильные линии' },
                ]}
                image="/images/lines/drying/drying-lines-hero-bg.webp"
                blurDataURL={HERO_BLUR.linesDrying}
            />

            {/* Подзаголовок секции */}
            <section id="variants" className="pt-8 pb-6 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Готовые сушильные линии для производства брикетов и пеллет
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl">
                        Производительность от 500 до 2000 кг/час. Комплектация «под ключ».
                    </p>
                </div>
            </section>

            <section className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {lineVariants.drying.map((variant) => (
                            <LineCard key={variant.id} variant={variant} />
                        ))}
                    </div>
                </div>
            </section>

            <DryingProcess />

            <LinesCTA />

            <RelatedLinesBlock
                title="Выбираете направление производства?"
                subtitle="Сушка сырья — обязательный этап в производстве и брикетов, и пеллет. Выберите производственную линию под ваши задачи."
                lines={[
                    {
                        href: '/linii-briketirovaniya',
                        label: 'Линии брикетирования топливных брикетов',
                        description: 'Производство древесных топливных брикетов RUF и Pini Key. Сушильный барабан — ключевой этап подготовки сырья.',
                        image: '/images/lines/briquetting/preview-briquette-line-home.webp',
                    },
                    {
                        href: '/linii-granulirovaniya',
                        label: 'Линии гранулирования топливных пеллет',
                        description: 'Производство топливных пеллет стандарта DIN+ EN Plus. Сушка сырья обеспечивает стабильное качество готовых гранул.',
                        image: '/images/lines/granulation/preview-pellets-line-home.webp',
                    },
                ]}
            />

            <Projects />

            <ContactForm />
        </div>
    );
}
