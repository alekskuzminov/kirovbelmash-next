'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { EquipmentItem } from './equipmentData';

interface Props {
    items: EquipmentItem[];
    categorySlug: string;
    title?: string;
    linkLabel?: string;
}

const VISIBLE_DESKTOP = 4;
const VISIBLE_TABLET = 2;

export default function RelatedEquipmentCarousel({ items, categorySlug, title, linkLabel }: Props) {
    const [current, setCurrent] = useState(0);
    const isAnimating = useRef(false);
    const total = items.length;

    const prev = useCallback(() => {
        if (isAnimating.current || total === 0) return;
        isAnimating.current = true;
        setCurrent((c) => (c - 1 + total) % total);
        setTimeout(() => { isAnimating.current = false; }, 400);
    }, [total]);

    const next = useCallback(() => {
        if (isAnimating.current || total === 0) return;
        isAnimating.current = true;
        setCurrent((c) => (c + 1) % total);
        setTimeout(() => { isAnimating.current = false; }, 400);
    }, [total]);

    if (total === 0) return null;

    const visibleDesktop = Array.from({ length: Math.min(VISIBLE_DESKTOP, total) }, (_, i) =>
        items[(current + i) % total]
    );
    const visibleTablet = Array.from({ length: Math.min(VISIBLE_TABLET, total) }, (_, i) =>
        items[(current + i) % total]
    );
    const visibleMobile = [items[current % total]];

    return (
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-gray-100 mb-10">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <i className="ri-grid-line text-red-600" />
                    {title ?? 'Другое оборудование в категории'}
                </h2>
                <div className="flex items-center gap-3 shrink-0">
                    <button
                        onClick={prev}
                        aria-label="Предыдущий"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                    >
                        <i className="ri-arrow-left-s-line text-xl" />
                    </button>
                    <span className="text-sm text-gray-400 font-medium tabular-nums">
                        {current + 1} / {total}
                    </span>
                    <button
                        onClick={next}
                        aria-label="Следующий"
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                    >
                        <i className="ri-arrow-right-s-line text-xl" />
                    </button>
                </div>
            </div>

            {/* Desktop: 4 cards */}
            <div className="hidden lg:grid grid-cols-4 gap-4">
                {visibleDesktop.map((item, idx) => (
                    <EquipmentCarouselCard key={`d-${item.slug}-${current}-${idx}`} item={item} />
                ))}
            </div>

            {/* Tablet: 2 cards */}
            <div className="hidden sm:grid lg:hidden grid-cols-2 gap-6">
                {visibleTablet.map((item, idx) => (
                    <EquipmentCarouselCard key={`t-${item.slug}-${current}-${idx}`} item={item} />
                ))}
            </div>

            {/* Mobile: 1 card */}
            <div className="grid sm:hidden grid-cols-1 gap-6">
                {visibleMobile.map((item, idx) => (
                    <EquipmentCarouselCard key={`m-${item.slug}-${current}-${idx}`} item={item} />
                ))}
            </div>

            {/* Dots */}
            {total > 1 && (
                <div className="flex justify-center gap-1.5 mt-6">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            aria-label={`Слайд ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                i === current ? 'w-6 bg-red-600' : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                            }`}
                        />
                    ))}
                </div>
            )}

            {/* Link to full category */}
            <div className="text-center mt-6">
                <Link
                    href={categorySlug && categorySlug !== 'all' ? `/oborudovanie/${categorySlug}` : '/oborudovanie'}
                    className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-300"
                >
                    {linkLabel ?? 'Смотреть все в категории'}
                    <i className="ri-arrow-right-line" />
                </Link>
            </div>
        </div>
    );
}

function EquipmentCarouselCard({ item }: { item: EquipmentItem }) {
    return (
        <Link
            href={`/oborudovanie/${item.slug}`}
            className="group flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
            {/* Image */}
            <div className="relative w-full h-44 bg-white overflow-hidden flex-shrink-0">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Info */}
            <div className="p-4 flex flex-col flex-1">
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider mb-1">
                    {item.category}
                </span>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 min-h-[2.5rem] mb-3">
                    {item.name}
                </h3>
                <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 group-hover:text-red-600 transition-colors">
                    Характеристики
                    <i className="ri-arrow-right-line" />
                </span>
            </div>
        </Link>
    );
}
