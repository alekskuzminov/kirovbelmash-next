'use client';

import { useState } from 'react';
import Image from 'next/image';
import { testimonials } from './projectsData';

export default function Testimonials() {
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <i
                key={i}
                className={`${i < rating ? 'ri-star-fill text-amber-400' : 'ri-star-line text-gray-300'
                    } text-base`}
            ></i>
        ));
    };

    return (
        <section className="py-12 sm:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-14">
                    <div className="flex items-center justify-center space-x-2 mb-3 sm:mb-4">
                        <div className="w-6 sm:w-8 h-0.5 bg-red-500"></div>
                        <span className="text-red-600 text-xs sm:text-sm font-medium tracking-wider uppercase">
                            Отзывы
                        </span>
                        <div className="w-6 sm:w-8 h-0.5 bg-red-500"></div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Что говорят наши клиенты
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                        Реальные отзывы руководителей предприятий, которые выбрали оборудование
                        КировБелМаш
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {testimonials.map((t) => {
                        const isExpanded = expandedId === t.id;
                        const isLong = t.text.length > 160;

                        return (
                            <article
                                key={t.id}
                                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 flex flex-col"
                            >
                                <div className="flex items-center space-x-1 mb-4">{renderStars(t.rating)}</div>

                                <div className="flex-1 mb-5">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                        {isExpanded || !isLong ? (
                                            <>
                                                &laquo;{t.text}&raquo;
                                            </>
                                        ) : (
                                            <>
                                                &laquo;{t.text.slice(0, 160)}...&raquo;
                                                <button
                                                    onClick={() => setExpandedId(t.id)}
                                                    className="text-red-600 hover:text-red-700 ml-1 text-sm font-medium cursor-pointer whitespace-nowrap"
                                                >
                                                    Читать далее
                                                </button>
                                            </>
                                        )}
                                    </p>
                                    {isExpanded && isLong && (
                                        <button
                                            onClick={() => setExpandedId(null)}
                                            className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer mt-1 whitespace-nowrap"
                                        >
                                            Свернуть
                                        </button>
                                    )}
                                </div>

                                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                                    <div className="w-11 h-11 relative rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                                        <Image src={t.avatar} alt={t.name} fill sizes="44px" className="object-cover object-top" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-sm font-semibold text-gray-900 truncate">{t.name}</div>
                                        <div className="text-xs text-gray-500 truncate">
                                            {t.position}, {t.company}
                                        </div>
                                        <div className="flex items-center space-x-1 text-xs text-gray-400 mt-0.5">
                                            <i className="ri-map-pin-2-line"></i>
                                            <span>{t.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
