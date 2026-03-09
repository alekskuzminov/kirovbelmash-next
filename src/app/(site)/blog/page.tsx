import { Metadata } from 'next';
import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';

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

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-white pb-20">
            <BlogHero />
            <BlogGrid />
        </main>
    );
}
