import type { Metadata } from 'next';
import Link from 'next/link';
import { lineVariants } from '@/components/lines/linesData';
import LineCard from '@/components/lines/LineCard';
import LineHero from '@/components/lines/LineHero';
import LineComparisonTable from '@/components/lines/LineComparisonTable';
import Projects from '@/components/home/Projects';
import ContactForm from '@/components/home/ContactForm';
import { HERO_BLUR } from '@/lib/heroBlur';
import {
    BriquettingConceptFAQ,
    BriquettingEquipmentFlow,
    BriquettingIntentPaths,
    BriquettingProjectApproach,
    BriquettingSelectionMatrix,
} from '@/components/lines/BriquettingConceptSections';

export const metadata: Metadata = {
    title: 'Линии и оборудование для производства топливных брикетов',
    description:
        'Тестовая версия страницы линий брикетирования. Подбор оборудования по виду сырья, влажности и требуемой производительности.',
    robots: {
        index: false,
        follow: false,
        googleBot: {
            index: false,
            follow: false,
        },
    },
    alternates: {
        canonical: '/linii-briketirovaniya',
    },
};

export default function BriquettingLineTestPage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <LineHero
                label="Линии брикетирования"
                headingMain="Линии и оборудование"
                headingAccent="для производства топливных брикетов"
                description={[
                    <div key="description">
                        Подберём состав производства под ваше сырьё: от отдельного пресса
                        до линии полного цикла производительностью 2000 кг/ч.
                    </div>,
                ]}
                breadcrumbs={[
                    { label: 'Главная', href: '/' },
                    { label: 'Линии', href: '/#production-lines' },
                    { label: 'Тестовая версия страницы' },
                ]}
                image="/images/lines/briquetting/briquett-line-hero-bg.webp"
                blurDataURL={HERO_BLUR.linesBriquetting}
            />

            <div className="bg-amber-50 border-b border-amber-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-start sm:items-center gap-2 text-sm text-amber-950">
                        <i className="ri-flask-line text-lg text-amber-700" />
                        <span>
                            Тестовая версия страницы. Она закрыта от индексации и не заменяет действующую.
                        </span>
                    </div>
                    <Link
                        href="/linii-briketirovaniya"
                        className="text-sm font-semibold text-amber-900 hover:text-red-700 transition-colors"
                    >
                        Открыть текущую версию
                    </Link>
                </div>
            </div>

            <BriquettingIntentPaths />
            <BriquettingEquipmentFlow />
            <BriquettingSelectionMatrix />

            <section id="variants" className="pt-12 sm:pt-16 pb-8 bg-gray-50 scroll-mt-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-0.5 bg-red-500" />
                            <span className="text-sm font-medium tracking-wider uppercase text-red-600">
                                Готовые решения
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                            Линии полного цикла для сырья естественной влажности
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                            Три базовые производительности. В состав входят подготовка сырья,
                            сушильный участок, прессование и резка брикета.
                        </p>
                    </div>
                </div>
            </section>

            <section className="pb-12 sm:pb-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {lineVariants.briquetting.map((variant) => (
                            <LineCard key={variant.id} variant={variant} />
                        ))}
                    </div>
                </div>
            </section>

            <LineComparisonTable variants={lineVariants.briquetting} ctaHref="/contacts" />

            <Projects
                filterCategory="Брикетирование"
                title="Линии брикетирования в работе"
                subtitle="Реализованные проекты с разным сырьём, составом оборудования и производительностью"
            />

            <BriquettingProjectApproach />
            <BriquettingConceptFAQ />
            <ContactForm />
        </div>
    );
}
