'use client';

import React, { useEffect, useState, useRef, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ContactModalButton from '@/components/common/ContactModalButton';

interface Breadcrumb {
    label: string;
    href?: string;
}

interface LineHeroProps {
    /** Короткий лейбл под хлебными крошками (н-р «Линии брикетирования») */
    label: string;
    /** Основная строка H1 — можно передать JSX с <br /> */
    headingMain: ReactNode;
    /** Акцентная (красная) последняя строка H1 */
    headingAccent: string;
    /** Описание — массив строк или JSX-элементов, каждая на отдельной строке */
    description: ReactNode[];
    /** Хлебные крошки */
    breadcrumbs: Breadcrumb[];
    /** URL фонового изображения */
    image: string;
    /** BlurDataURL для instant placeholder (опционально) */
    blurDataURL?: string;
}

export default function LineHero({
    label,
    headingMain,
    headingAccent,
    description,
    breadcrumbs,
    image,
    blurDataURL,
}: LineHeroProps) {
    const sectionRef = useRef<HTMLElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const scrolled = window.scrollY;
            const sectionTop = sectionRef.current.offsetTop;
            const viewportHeight = window.innerHeight;

            if (scrolled + viewportHeight > sectionTop) {
                setOffset((scrolled - sectionTop) * 0.2);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden min-h-[450px] sm:min-h-[580px] bg-gray-900">
            {/* Background Container with Parallax and Slow Zoom */}
            <div
                className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]"
                style={{
                    transform: `translateY(${offset}px)`,
                    willChange: 'transform'
                }}
            >
                <div className="absolute inset-0 animate-slowZoom">
                    <Image
                        src={image}
                        alt={label}
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                        {...(blurDataURL ? { placeholder: 'blur' as const, blurDataURL } : {})}
                    />
                </div>
                {/* Brand Neutral Dark Gradient Filter */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80" />
                {/* Additional top subtle darkening */}
                <div className="absolute top-0 left-0 right-0 h-32 sm:h-48 bg-gradient-to-b from-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-12 sm:pb-16">
                <div className="max-w-4xl">
                    {/* Breadcrumbs - Entrance Animation */}
                    <div className="opacity-0 animate-slideUp">
                        <Breadcrumbs
                            items={breadcrumbs}
                            className="mb-4"
                            textColor="text-gray-300"
                            activeTextColor="text-white"
                            hoverColor="hover:text-white"
                        />
                    </div>

                    {/* Red dash label - Entrance Animation */}
                    <div className="flex items-center space-x-2 mb-4 opacity-0 animate-slideUp [animation-delay:100ms]">
                        <div className="w-6 sm:w-8 h-0.5 bg-red-500" />
                        <span className="text-red-400 text-xs sm:text-sm font-medium tracking-wider uppercase">
                            {label}
                        </span>
                    </div>

                    {/* H1 - Entrance Animation */}
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 leading-tight opacity-0 animate-slideUp [animation-delay:200ms]">
                        {headingMain}
                        <br />
                        <span className="text-red-500">{headingAccent}</span>
                    </h1>

                    {/* Description - Entrance Animation */}
                    <div className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-6 sm:mb-8 space-y-1 opacity-0 animate-slideUp [animation-delay:400ms]">
                        {description.map((line, i) => (
                            <div key={i}>{line}</div>
                        ))}
                    </div>

                    {/* CTA buttons - Entrance Animation */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        <ContactModalButton
                            message={'\u041f\u043e\u0434\u0431\u043e\u0440 \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0439 \u043b\u0438\u043d\u0438\u0438'}
                            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer inline-flex items-center justify-center shadow-lg hover:shadow-xl"
                        >
                            Получить КП
                        </ContactModalButton>
                        <Link
                            href="#variants"
                            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-md text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/10 whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
                        >
                            Варианты линий
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
