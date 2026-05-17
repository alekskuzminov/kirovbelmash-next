import { Metadata } from 'next';
import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';
import WebPageJsonLd from '@/components/ui/WebPageJsonLd';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import BreadcrumbJsonLd from '@/components/ui/BreadcrumbJsonLd';

export const metadata: Metadata = {
    title: 'Блог',
    description: 'Статьи о производстве топливных брикетов и пеллет, выборе оборудования, сушке сырья и реальном опыте клиентов.',
    alternates: { canonical: '/blog' },
    openGraph: {
        title: 'Блог КировБелМаш — статьи об оборудовании',
        description: 'Экспертные статьи о брикетировании, гранулировании, выборе оборудования и реальные кейсы клиентов.',
        url: 'https://kirovbelmash.ru/blog',
        type: 'website',
        siteName: 'КировБелМаш',
        images: [
            {
                url: '/images/logo/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Блог КировБелМаш',
            },
        ],
    },
};

const breadcrumbItems = [
    { label: 'Главная', href: '/' },
    { label: 'Блог' },
];

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-white pb-20">
            <BreadcrumbJsonLd items={breadcrumbItems} />
            <WebPageJsonLd
                type="CollectionPage"
                name="Блог КировБелМаш"
                description="Статьи о производстве топливных брикетов и пеллет, выборе оборудования и реальном опыте клиентов."
                url="/blog"
            />
            <BlogHero />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <Breadcrumbs items={breadcrumbItems} className="mb-0" />
            </div>
            <BlogGrid />
        </main>
    );
}
