import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { blogPosts } from '@/components/blog/blogData';
import ArticleHero from '@/components/blog/ArticleHero';
import ArticleBody from '@/components/blog/ArticleBody';
import ArticleJsonLd from '@/components/blog/ArticleJsonLd';
import BreadcrumbJsonLd from '@/components/ui/BreadcrumbJsonLd';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return {
            title: 'Статья не найдена',
        };
    }

    return {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `/blog/${post.slug}` },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://kirovbelmash.ru/blog/${post.slug}`,
            type: 'article',
            publishedTime: post.date,
            siteName: 'КировБелМаш',
            images: [
                {
                    url: post.image || '/images/logo/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
    };
}

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    // Related: same category, excluding current
    const related = blogPosts
        .filter((p) => p.id !== post.id && p.category === post.category)
        .slice(0, 3);

    // If no same-category, pick any recent
    const relatedPosts =
        related.length > 0
            ? related
            : blogPosts.filter((p) => p.id !== post.id).slice(0, 3);

    const breadcrumbItems = [
        { label: 'Главная', href: '/' },
        { label: 'Блог', href: '/blog' },
        { label: post.title },
    ];

    return (
        <main className="min-h-screen bg-white">
            <BreadcrumbJsonLd items={breadcrumbItems} />
            <ArticleJsonLd post={post} />
            <ArticleHero post={post} />
            <ArticleBody post={post} relatedPosts={relatedPosts} />
        </main>
    );
}
