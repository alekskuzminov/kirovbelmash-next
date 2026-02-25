"use client";

import { useState } from 'react';
import Image from 'next/image';
import { teamMembers } from '@/data/about';

export default function TeamSection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="team" className="py-12 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-14">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="w-6 sm:w-8 h-0.5 bg-red-500"></div>
                        <span className="text-red-600 text-xs sm:text-sm font-medium tracking-wider uppercase">Наши люди</span>
                        <div className="w-6 sm:w-8 h-0.5 bg-red-500"></div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Команда профессионалов
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
                        За каждым успешным проектом стоят опытные специалисты, преданные своему делу
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <div className="relative w-full h-[240px] sm:h-[320px] overflow-hidden">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                />
                                <div
                                    className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                                        }`}
                                ></div>
                                <div
                                    className={`absolute bottom-0 left-0 right-0 p-5 transition-all duration-500 ${hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                        }`}
                                >
                                    <p className="text-sm text-gray-200 leading-relaxed">{member.description}</p>
                                </div>
                            </div>
                            <div className="p-4 sm:p-5">
                                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">{member.name}</h3>
                                <p className="text-xs sm:text-sm text-red-600 font-medium">{member.position}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
