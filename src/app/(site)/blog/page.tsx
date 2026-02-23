import { Metadata } from 'next';
import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';

export const metadata: Metadata = {
    title: 'Блог | КировБелМаш',
    description: 'Статьи о производстве топливных брикетов и пеллет, выборе оборудования и реальном опыте клиентов.',
};

export default function BlogPage() {
    return (
        <main className="min-h-screen bg-white pb-20">
            <BlogHero />
            <BlogGrid />
        </main>
    );
}
