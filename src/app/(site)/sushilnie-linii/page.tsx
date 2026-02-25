import { Metadata } from 'next';
import { lineVariants } from '@/components/lines/linesData';
import LineCard from '@/components/lines/LineCard';
import LineHero from '@/components/lines/LineHero';
import LinesCTA from '@/components/lines/LinesCTA';

export const metadata: Metadata = {
    title: 'Сушильные линии | КировБелМаш',
    description: 'Производство линий для сушки сырья (опилок, щепы и биомассы). Изготовим линию сушки сырья на производстве брикетов, пеллет и гранул.',
};

export default function DryingLinePage() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <LineHero
                label="Сушильные линии"
                headingMain={<>Производство линий<br />для сушки сырья</>}
                headingAccent="опилок, щепы и биомассы"
                description={[
                    'Изготовим линию сушки сырья на производстве брикетов, пеллет и гранул.',
                    'Полный цикл: проектируем, производим, обучаем и запускаем.',
                    'Гарантия качества и сервисная поддержка.',
                ]}
                breadcrumbs={[
                    { label: 'Главная', href: '/' },
                    { label: 'Линии', href: '/#production-lines' },
                    { label: 'Сушильные линии' },
                ]}
                image="/images/lines/drying/drying-lines-hero-bg.webp"
            />

            {/* Подзаголовок секции */}
            <section id="variants" className="pt-8 pb-6 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Готовые сушильные линии для производства брикетов и пеллет
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl">
                        Производительность от 500 до 2000 кг/час. Снижение влажности до W ≤ 12%.
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

            <LinesCTA />
        </div>
    );
}
