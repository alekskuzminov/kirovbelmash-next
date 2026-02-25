import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { findLineVariant, getAllLineIds, getLineBackLink, lineVariants } from '@/components/lines/linesData';
import LineDetailHero from '@/components/lines/LineDetailHero';
import LineGallery from '@/components/lines/LineGallery';
import LineSpecs from '@/components/lines/LineSpecs';
import LineComposition from '@/components/lines/LineComposition';
import ContactForm from '@/components/home/ContactForm';

interface ProductionLinePageProps {
    params: Promise<{ id: string }>;
}

export function generateStaticParams() {
    return getAllLineIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: ProductionLinePageProps): Promise<Metadata> {
    const { id } = await params;
    const variant = findLineVariant(id);
    if (!variant) return {};
    return {
        title: `${variant.name} | КировБелМаш`,
        description: variant.description,
    };
}

const backLabels: Record<string, string> = {
    '/linii-briketirovaniya': 'Линии брикетирования',
    '/linii-granulirovaniya': 'Линии гранулирования',
    '/sushilnie-linii': 'Сушильные линии',
};

export default async function ProductionLinePage({ params }: ProductionLinePageProps) {
    const { id } = await params;
    const variant = findLineVariant(id);

    if (!variant) notFound();

    const backHref = getLineBackLink(id);
    const backLabel = backLabels[backHref] ?? 'Линии';

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <LineDetailHero variant={variant} backHref={backHref} backLabel={backLabel} />

            {/* Galleries + Specs */}
            <section className="py-10 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
                        {/* Renders */}
                        <LineGallery
                            images={variant.renders}
                            title="Рендеры линии"
                            icon="ri-3d-cube-sphere-line"
                        />
                        {/* Specs */}
                        <LineSpecs variant={variant} />
                    </div>

                    {/* Schemes */}
                    <div className="max-w-xl">
                        <LineGallery
                            images={variant.schemes}
                            title="Схема линии"
                            icon="ri-flow-chart"
                        />
                    </div>
                </div>
            </section>

            {/* Composition */}
            <LineComposition composition={variant.composition} backHref={backHref} />

            {/* Quote Form */}
            <ContactForm initialMessage={`Запрос КП: ${variant.name}`} />
        </div>
    );
}
