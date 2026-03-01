import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from './blogData';

interface BlogCardProps {
    post: BlogPost;
}

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogCard({ post }: BlogCardProps) {
    const defaultImage = `/images/blog/blog_placeholder.png`;

    return (
        <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
            <Link href={`/blog/${post.slug}`} className="block relative w-full h-56 overflow-hidden bg-gray-100">
                <Image
                    src={post.image || defaultImage}
                    alt={post.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                <div className="absolute top-4 left-4 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-full shadow-md">
                    {post.category}
                </div>

                <div className="absolute top-4 right-4 flex items-center space-x-1.5 px-3 py-1.5 bg-black/60 text-white text-xs rounded-full backdrop-blur-sm">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{post.readTime} мин</span>
                </div>
            </Link>

            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center space-x-2 text-xs text-gray-400 mb-3">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{formatDate(post.date)}</span>
                </div>

                <Link href={`/blog/${post.id}`}>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                </Link>

                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                </p>

                <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 bg-gray-50 text-gray-500 text-xs rounded-md border border-gray-100"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center space-x-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                    >
                        <span>Читать статью</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}
