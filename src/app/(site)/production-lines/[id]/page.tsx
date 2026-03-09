import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { findLineVariant, getAllLineIds, getLineBackLink } from '@/components/lines/linesData';
import LineDetailHero from '@/components/lines/LineDetailHero';
import LineGallery from '@/components/lines/LineGallery';
import LineSpecs from '@/components/lines/LineSpecs';
import LineComposition from '@/components/lines/LineComposition';
import ContactForm from '@/components/home/ContactForm';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/ui/BreadcrumbJsonLd';

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
        title: variant.name,
        description: variant.description,
        alternates: { canonical: `/production-lines/${id}` },
        openGraph: {
            title: variant.name,
            description: variant.description,
            url: `https://kirovbelmash.ru/production-lines/${id}`,
        },
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

    const breadcrumbItems = [
        { label: 'Главная', href: '/' },
        { label: 'Линии', href: '/#production-lines' },
        { label: backLabel, href: backHref },
        { label: variant.name },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 pb-12">
            <BreadcrumbJsonLd items={breadcrumbItems} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40">
                <Breadcrumbs
                    items={breadcrumbItems}
                    className="mb-6"
                />

                <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 mb-10">
                    <div className="flex flex-col xl:grid xl:grid-cols-2 gap-10 xl:gap-16">
                        {/* Upper Info (Hero, Specs) - Second */}
                        <div className="order-2">
                            {/* Hero Info (H1, Price, Description, Buttons) */}
                            <LineDetailHero variant={variant} backHref={backHref} backLabel={backLabel} />

                            <hr className="hidden xl:block my-8 border-gray-100" />

                            {/* Tech Specs */}
                            <LineSpecs variant={variant} />
                        </div>

                        {/* Left Column: Renders (always first) */}
                        <div className="order-1 xl:border-r xl:border-gray-100 xl:pr-10 xl:sticky xl:top-32 xl:self-start">
                            <LineGallery images={variant.renders} />
                        </div>
                    </div>
                </div>

                {/* Composition */}
                <LineComposition composition={variant.composition} />

                {/* Schemes */}
                <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 mb-10">
                    <LineGallery
                        images={variant.schemes}
                        title="Схемы линии"
                        icon="ri-flow-chart"
                        showLogo={false}
                        aspectClass="aspect-[16/9]"
                    />
                </div>

                {/* Back to all lines button */}
                <div className="text-center mb-10">
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md rounded-xl transition-all"
                    >
                        <i className="ri-arrow-left-line" />
                        Все линии
                    </Link>
                </div>
            </div>

            {/* Quote Form */}
            <ContactForm initialMessage={`Запрос КП: ${variant.name}`} />
        </div>
    );
}
