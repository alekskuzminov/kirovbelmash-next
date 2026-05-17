import React from 'react';
import Link from 'next/link';
import ContactModalButton from '@/components/common/ContactModalButton';
import Image from 'next/image';
import { SITE_CONFIG } from '@/config/site.config';
import type { BlogPost, BlogSection } from './blogData';

interface ArticleBodyProps {
    post: BlogPost;
    relatedPosts: BlogPost[];
}

function parseLinks(text: string): React.ReactNode[] {
    const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
            return (
                <Link key={i} href={match[2]} className="text-red-600 underline underline-offset-2 hover:text-red-700 transition-colors">
                    {match[1]}
                </Link>
            );
        }
        return part;
    });
}

function renderSection(section: BlogSection, index: number) {
    switch (section.type) {
        case 'paragraph':
            return (
                <p key={index} className="text-gray-700 leading-relaxed text-base sm:text-lg mb-6">
                    {section.content ? parseLinks(section.content) : null}
                </p>
            );
        case 'heading':
            return (
                <h2
                    key={index}
                    className="text-2xl sm:text-3xl font-bold text-gray-900 mt-12 mb-6 tracking-tight flex items-center gap-3"
                >
                    {section.content}
                </h2>
            );
        case 'list':
            return (
                <ul key={index} className="mb-8 space-y-4 pt-2">
                    {section.items?.map((item, i) => (
                        <li key={i} className="flex items-start text-base sm:text-lg text-gray-700">
                            <i className="ri-checkbox-circle-fill text-red-600 text-xl mt-0.5 flex-shrink-0 mr-4" />
                            <span className="leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            );
        case 'quote':
            return (
                <blockquote
                    key={index}
                    className="relative my-10 bg-red-50 rounded-xl py-8 px-6 sm:px-10 border border-red-50"
                >
                    <svg className="w-10 h-10 text-red-200 absolute top-4 left-6" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="text-base sm:text-lg text-gray-800 italic leading-relaxed sm:pl-10 relative z-10 font-medium">
                        {section.content}
                    </p>
                </blockquote>
            );
        case 'image':
            return (
                <figure key={index} className="my-10">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
                        <Image
                            src={section.src!}
                            alt={section.alt || ''}
                            fill
                            className="object-cover"
                        />
                    </div>
                    {section.caption && (
                        <figcaption className="mt-3 text-sm text-gray-500 text-center italic">
                            {parseLinks(section.caption)}
                        </figcaption>
                    )}
                </figure>
            );
        case 'image-pair':
            return (
                <div key={index} className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {section.images?.map((img, i) => (
                        <figure key={i}>
                            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {img.caption && (
                                <figcaption className="mt-3 text-sm text-gray-500 text-center italic">
                                    {parseLinks(img.caption)}
                                </figcaption>
                            )}
                        </figure>
                    ))}
                </div>
            );
        case 'faq':
            return (
                <div key={index} className="my-10">
                    {section.content && (
                        <div className="text-center mb-8 sm:mb-10">
                            <div className="flex items-center justify-center space-x-2 mb-3">
                                <div className="w-8 h-0.5 bg-red-500" />
                                <span className="text-red-600 text-sm font-medium tracking-wider uppercase">Вопросы</span>
                                <div className="w-8 h-0.5 bg-red-500" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
                                {section.content}
                            </h2>
                        </div>
                    )}
                    <div className="space-y-3">
                        {section.faqs?.map((item, i) => (
                            <details
                                key={i}
                                className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
                            >
                                <summary className="flex items-center justify-between px-5 sm:px-6 py-4 cursor-pointer list-none">
                                    <h3 className="text-sm sm:text-base font-medium text-gray-900 pr-4">{item.q}</h3>
                                    <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                                        <i className="ri-add-line text-lg text-gray-400 group-open:hidden" />
                                        <i className="ri-subtract-line text-lg text-red-500 hidden group-open:block" />
                                    </div>
                                </summary>
                                <div className="px-5 sm:px-6 pb-4">
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {parseLinks(item.a)}
                                    </p>
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            );
        case 'cta':
            return (
                <div key={index} className="my-10 bg-gray-50 border border-gray-200 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-4">
                    <p className="flex-1 text-gray-800 font-medium leading-relaxed">
                        {section.content ? parseLinks(section.content) : null}
                    </p>
                    {section.modal ? (
                        <ContactModalButton
                            message={section.linkText}
                            className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors whitespace-nowrap flex-shrink-0"
                        >
                            {section.linkText}
                            <i className="ri-arrow-right-line text-base" />
                        </ContactModalButton>
                    ) : (
                        <Link
                            href={section.href!}
                            className="inline-flex items-center gap-2 px-5 py-3 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors whitespace-nowrap flex-shrink-0"
                        >
                            {section.linkText}
                            <i className="ri-arrow-right-line text-base" />
                        </Link>
                    )}
                </div>
            );
        default:
            return null;
    }
}

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function ArticleBody({ post, relatedPosts }: ArticleBodyProps) {
    return (
        <section className="py-12 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">
                    {/* Main content */}
                    <article className="flex-1 min-w-0">
                        {/* Excerpt - special styling to match screenshot */}
                        <div className="pl-6 border-l-[3px] border-red-600 mb-10">
                            <p className="text-lg sm:text-xl text-gray-600 font-normal leading-relaxed">
                                {post.excerpt}
                            </p>
                        </div>

                        {/* Article body */}
                        <div className="prose prose-lg max-w-none text-gray-700">
                            {post.content.map((section, i) => renderSection(section, i))}
                        </div>

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-gray-100">
                            <div className="flex items-center flex-wrap gap-3">
                                <span className="text-sm text-gray-400 font-medium">Теги:</span>
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1.5 bg-gray-50 text-gray-500 text-sm rounded-md font-medium"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Back link */}
                        <div className="mt-10">
                            <Link
                                href="/blog"
                                className="inline-flex items-center space-x-2 text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span>Назад в блог</span>
                            </Link>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:w-[340px] flex-shrink-0 space-y-8 lg:sticky lg:top-28 lg:self-start">
                        {/* CTA card */}
                        <div className="bg-[#1a1f2c] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                            {/* Decorative blur */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-600/20 rounded-full blur-2xl" />

                            <div className="relative z-10 border border-[#2d3342] rounded-xl p-3 bg-[#232836] inline-flex mb-6 text-red-500">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-bold mb-3 tracking-tight">
                                Нужна консультация по оборудованию?
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                Наши инженеры подберут оптимальное решение под ваши задачи и объёмы производства.
                            </p>

                            <ContactModalButton
                                message={'\u041a\u043e\u043d\u0441\u0443\u043b\u044c\u0442\u0430\u0446\u0438\u044f \u043f\u043e \u043e\u0431\u043e\u0440\u0443\u0434\u043e\u0432\u0430\u043d\u0438\u044e'}
                                className="flex items-center justify-center w-full px-4 py-3.5 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-md shadow-red-600/20"
                            >
                                Запросить КП
                            </ContactModalButton>

                            <a
                                href={`tel:${SITE_CONFIG.contacts.phone}`}
                                className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors"
                            >
                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="font-medium">{SITE_CONFIG.contacts.phoneFormatted}</span>
                            </a>
                        </div>

                        {/* Related articles */}
                        {relatedPosts.length > 0 && (
                            <div className="bg-gray-50/80 rounded-2xl p-6 sm:p-8 border border-gray-100">
                                <h3 className="text-base font-bold text-gray-900 mb-6">Похожие статьи</h3>
                                <div className="space-y-6">
                                    {relatedPosts.map((related) => {
                                        const defaultImage = `/images/blog/blog_placeholder.png`;
                                        const imageSrc = related.image || defaultImage;

                                        return (
                                            <Link
                                                key={related.id}
                                                href={`/blog/${related.slug}`}
                                                className="group flex gap-4 items-center"
                                            >
                                                <div className="relative w-[72px] h-[54px] flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
                                                    <Image
                                                        src={imageSrc}
                                                        alt={related.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-gray-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                                                        {related.title}
                                                    </p>
                                                    <p className="text-[11px] text-gray-500 mt-1.5 font-medium">{formatDate(related.date)}</p>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </section>
    );
}
