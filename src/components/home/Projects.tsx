'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projectsData } from '@/components/projects/projectsData';

const VISIBLE_COUNT = 3;

export default function Projects() {
    const [current, setCurrent] = useState(0);
    const isAnimating = useRef(false);

    const total = projectsData.length;

    const prev = useCallback(() => {
        if (isAnimating.current) return;
        isAnimating.current = true;
        setCurrent((c) => (c - 1 + total) % total);
        setTimeout(() => { isAnimating.current = false; }, 400);
    }, [total]);

    const next = useCallback(() => {
        if (isAnimating.current) return;
        isAnimating.current = true;
        setCurrent((c) => (c + 1) % total);
        setTimeout(() => { isAnimating.current = false; }, 400);
    }, [total]);

    // Build the visible items array (with wrapping)
    const visibleProjects = Array.from({ length: VISIBLE_COUNT }, (_, i) => {
        return projectsData[(current + i) % total];
    });

    return (
        <section id="projects" className="py-12 sm:py-20 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                            Реализованные проекты
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500 max-w-xl">
                            Производственные линии и оборудование для изготовления топливных брикетов и пеллет
                        </p>
                    </div>
                    {/* Nav arrows */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={prev}
                            aria-label="Предыдущий проект"
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                        >
                            <i className="ri-arrow-left-s-line text-xl" />
                        </button>
                        <span className="text-sm text-gray-400 font-medium tabular-nums">
                            {current + 1} / {total}
                        </span>
                        <button
                            onClick={next}
                            aria-label="Следующий проект"
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                        >
                            <i className="ri-arrow-right-s-line text-xl" />
                        </button>
                    </div>
                </div>

                {/* Slider track */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {visibleProjects.map((project, idx) => (
                        <Link
                            key={`${project.id}-${current}-${idx}`}
                            href={`/projects/${project.id}`}
                            className="group block rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 bg-white"
                        >
                            {/* Image */}
                            <div className="relative w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={`${project.title} — ${project.location}`}
                                    fill
                                    loading="lazy"
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                            </div>

                            {/* Info */}
                            <div className="p-4">
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                                    {project.title}
                                </h3>
                                <div className="flex items-center justify-between gap-1 text-sm text-gray-500">
                                    <div className="flex items-center gap-1 min-w-0">
                                        <i className="ri-map-pin-line text-red-500 shrink-0" />
                                        <span className="truncate">{project.location}</span>
                                    </div>
                                    <span className="shrink-0 font-semibold text-red-600">{project.year}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Dots pagination */}
                <div className="flex justify-center gap-1.5 mt-6">
                    {projectsData.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            aria-label={`Слайд ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === current
                                ? 'w-6 bg-red-600'
                                : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                                }`}
                        />
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center mt-8 sm:mt-10">
                    <Link
                        href="/projects"
                        className="inline-block px-6 sm:px-8 py-3 bg-red-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-md hover:shadow-lg whitespace-nowrap"
                    >
                        Смотреть все проекты
                    </Link>
                </div>
            </div>
        </section>
    );
}
