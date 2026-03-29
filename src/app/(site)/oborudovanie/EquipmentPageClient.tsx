"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import EquipmentFilters from '@/components/equipment/EquipmentFilters';
import EquipmentCard from '@/components/equipment/EquipmentCard';
import { equipmentItems, equipmentCategoriesConfig } from '@/components/equipment/equipmentData';

interface EquipmentPageClientProps {
    activeCategory?: string;
}

export default function EquipmentPageClient({ activeCategory = 'Все' }: EquipmentPageClientProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredItems = useMemo(() => {
        let items = equipmentItems;

        if (activeCategory !== 'Все') {
            items = items.filter((item) => item.category === activeCategory);
        }

        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            items = items.filter(
                (item) =>
                    item.name.toLowerCase().includes(q) ||
                    item.category.toLowerCase().includes(q) ||
                    item.description.toLowerCase().includes(q)
            );
        }

        return items;
    }, [activeCategory, searchQuery]);

    return (
        <>
            <EquipmentFilters
                activeCategory={activeCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                totalCount={filteredItems.length}
                categories={equipmentCategoriesConfig}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Десктопный вертикальный сайдбар */}
                    <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0">
                        <div className="sticky top-28 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <h2 className="text-sm font-semibold text-gray-900">Категории</h2>
                            </div>
                            <nav className="px-3 py-3">
                                <ul className="space-y-0.5">
                                    {equipmentCategoriesConfig.map((cat) => (
                                        <li key={cat.slug}>
                                            <Link
                                                href={cat.slug === 'all' ? '/oborudovanie' : `/oborudovanie/${cat.slug}`}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex items-center gap-2.5 ${activeCategory === cat.name
                                                    ? 'bg-red-600 text-white shadow-sm'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                    }`}
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${activeCategory === cat.name ? 'bg-red-200' : 'bg-gray-300'
                                                        }`}
                                                />
                                                <span className="leading-snug">{cat.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </aside>

                    {/* Правая часть: поиск + счётчик + карточки */}
                    <div className="flex-1 min-w-0">
                        <div className="hidden lg:flex items-center justify-between mb-6 gap-4">
                            <p className="text-sm text-gray-500">
                                Найдено: <strong className="text-gray-900">{filteredItems.length}</strong> единиц оборудования
                            </p>
                            <div className="relative flex-shrink-0">
                                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                                <input
                                    type="text"
                                    placeholder="Поиск оборудования..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9 pr-8 py-2 w-64 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all bg-white"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                    >
                                        <i className="ri-close-line text-base" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {filteredItems.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                                {filteredItems.map((item, index) => (
                                    <EquipmentCard key={item.id} item={item} index={index} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-xl border border-gray-100 h-full flex flex-col items-center justify-center">
                                <div className="w-20 h-20 flex items-center justify-center bg-gray-50 rounded-full mx-auto mb-6">
                                    <i className="ri-search-line text-3xl text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Ничего не найдено</h3>
                                <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
                                    Попробуйте изменить параметры поиска или выбрать другую категорию
                                </p>
                                <Link
                                    href="/oborudovanie"
                                    onClick={() => setSearchQuery('')}
                                    className="px-6 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
                                >
                                    Сбросить фильтры
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>
    );
} 