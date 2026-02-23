"use client";

import { useState } from 'react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

interface EquipmentFiltersProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    totalCount: number;
    categories: string[];
}

export default function EquipmentFilters({
    activeCategory,
    onCategoryChange,
    searchQuery,
    onSearchChange,
    totalCount,
    categories,
}: EquipmentFiltersProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const categoryList = (
        <ul className="space-y-1">
            {categories.map((cat) => (
                <li key={cat}>
                    <button
                        onClick={() => {
                            onCategoryChange(cat);
                            setMobileOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer flex items-center gap-2 ${activeCategory === cat
                            ? 'bg-red-600 text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                    >
                        <span
                            className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeCategory === cat ? 'bg-white' : 'bg-gray-300'
                                }`}
                        />
                        {cat}
                    </button>
                </li>
            ))}
        </ul>
    );

    return (
        <>
            <section className="pt-32 sm:pt-40 pb-6 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Breadcrumbs
                        items={[
                            { label: 'Главная', href: '/' },
                            { label: 'Каталог оборудования' }
                        ]}
                    />
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                        Каталог оборудования
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
                        Детальный каталог промышленного оборудования с техническими характеристиками и описанием
                    </p>
                </div>
            </section>

            <div className="lg:hidden bg-white border-b border-gray-100 sticky top-16 z-20 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                    <div className="relative flex-1">
                        <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                        <input
                            type="text"
                            placeholder="Поиск оборудования..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="pl-9 pr-8 py-2 w-full text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-gray-50"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => onSearchChange('')}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                            >
                                <i className="ri-close-line text-base" />
                            </button>
                        )}
                    </div>

                    <button
                        onClick={() => setMobileOpen(true)}
                        className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer flex-shrink-0 transition-colors"
                    >
                        <i className="ri-filter-3-line text-base" />
                        Фильтры
                        {activeCategory !== 'Все' && (
                            <span className="w-2 h-2 rounded-full bg-red-600 flex-shrink-0" />
                        )}
                    </button>
                </div>

                {activeCategory !== 'Все' && (
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-red-50 border border-red-200 text-red-700 text-xs font-medium rounded-full">
                            {activeCategory}
                            <button
                                onClick={() => onCategoryChange('Все')}
                                className="cursor-pointer hover:text-red-900"
                            >
                                <i className="ri-close-line text-xs" />
                            </button>
                        </span>
                    </div>
                )}

                <p className="mt-2 text-xs text-gray-500">
                    Найдено: <strong className="text-gray-900">{totalCount}</strong> единиц
                </p>
            </div>

            {mobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                    <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl flex flex-col">
                        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
                            <span className="font-semibold text-gray-900 text-sm">Категории</span>
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                            >
                                <i className="ri-close-line text-lg" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto px-3 py-4">{categoryList}</div>
                    </div>
                </div>
            )}
        </>
    );
}
