import Image from 'next/image';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import type { BlogPost } from './blogData';
import { HERO_BLUR } from '@/lib/heroBlur';

interface ArticleHeroProps {
    post: BlogPost;
}

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function ArticleHero({ post }: ArticleHeroProps) {
    const defaultImage = `/images/blog/blog_placeholder.png`;
    const imageSrc = post.image || defaultImage;

    return (
        <section className="relative min-h-[420px] sm:min-h-[560px] overflow-hidden bg-gray-900">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={imageSrc}
                    alt={post.title}
                    fill
                    className="object-cover object-[65%_center]"
                    priority
                    sizes="100vw"
                    placeholder="blur"
                    blurDataURL={HERO_BLUR.blog}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-gray-900/30" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-8 sm:pb-12 h-full flex flex-col justify-end">
                {/* Breadcrumbs */}
                <Breadcrumbs
                    items={[
                        { label: 'Главная', href: '/' },
                        { label: 'Блог', href: '/blog' },
                        { label: post.title }
                    ]}
                    className="mb-6"
                    textColor="text-gray-300"
                    activeTextColor="text-white"
                    hoverColor="hover:text-white"
                />

                {/* Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-md shadow-sm">
                        {post.category}
                    </span>
                    <span className="flex items-center space-x-1.5 text-gray-300 text-sm font-medium">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </span>
                    {post.updatedAt && (
                        <span className="flex items-center space-x-1.5 text-gray-400 text-sm font-medium">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            <span>обновлено <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></span>
                        </span>
                    )}
                    <span className="flex items-center space-x-1.5 text-gray-300 text-sm font-medium">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{post.readTime} минут чтения</span>
                    </span>
                    <span className="text-gray-400 text-sm">
                        Редакция КировБелМаш
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">
                    {post.title}
                </h1>
            </div>
        </section>
    );
}
