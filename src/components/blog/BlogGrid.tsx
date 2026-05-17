"use client";

import { useState } from 'react';
import { blogPosts, blogCategories } from './blogData';
import BlogCard from './BlogCard';

export default function BlogGrid() {
    const [activeCategory, setActiveCategory] = useState('Все');

    const filtered = (
        activeCategory === 'Все'
            ? blogPosts
            : blogPosts.filter((p) => p.category === activeCategory)
    ).slice().sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <section className="py-16 sm:py-24 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Все статьи
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Экспертные материалы о выборе оборудования, эксплуатации и реальном опыте наших клиентов
                    </p>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
                    {blogCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === cat
                                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20 scale-105'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 shadow-sm border border-gray-100'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {filtered.map((post) => (
                        <div key={post.id} className="h-full">
                            <BlogCard post={post} />
                        </div>
                    ))}
                </div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded-full mx-auto mb-6">
                            <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">Ничего не найдено</h3>
                        <p className="text-gray-500">В данной категории пока нет статей</p>
                    </div>
                )}
            </div>
        </section>
    );
}
