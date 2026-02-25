'use client';

import { ReactNode } from 'react';
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
    /** Описание — массив строк, каждая на отдельной строке */
    description: string[];
    /** Хлебные крошки */
    breadcrumbs: Breadcrumb[];
    /** URL фонового изображения */
    image: string;
}

export default function LineHero({
    label,
    headingMain,
    headingAccent,
    description,
    breadcrumbs,
    image,
}: LineHeroProps) {
    return (
        <section className="relative overflow-hidden min-h-[450px] sm:min-h-[580px]">
            {/* Background image */}
            <Image
                src={image}
                alt=""
                fill
                priority
                className="absolute inset-0 object-cover z-0"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gray-900/75 z-10" />

            {/* Content — pt-24/32 to clear fixed navbar */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40 pb-12 sm:pb-16">
                <div className="max-w-4xl">
                    {/* Breadcrumbs */}
                    <Breadcrumbs
                        items={breadcrumbs}
                        className="mb-4"
                        textColor="text-gray-300"
                        activeTextColor="text-white"
                        hoverColor="hover:text-white"
                    />

                    {/* Red dash label */}
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-6 sm:w-8 h-0.5 bg-red-500" />
                        <span className="text-red-400 text-xs sm:text-sm font-medium tracking-wider uppercase">
                            {label}
                        </span>
                    </div>

                    {/* H1 */}
                    <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-5 leading-tight">
                        {headingMain}
                        <br />
                        <span className="text-red-500">{headingAccent}</span>
                    </h1>

                    {/* Description — каждая строка отдельно */}
                    <div className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-6 sm:mb-8 space-y-1">
                        {description.map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        <ContactModalButton
                            message={'\u041f\u043e\u0434\u0431\u043e\u0440 \u043f\u0440\u043e\u0438\u0437\u0432\u043e\u0434\u0441\u0442\u0432\u0435\u043d\u043d\u043e\u0439 \u043b\u0438\u043d\u0438\u0438'}
                            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer inline-flex items-center justify-center"
                        >
                            Получить КП
                        </ContactModalButton>
                        <Link
                            href="#variants"
                            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20 whitespace-nowrap cursor-pointer"
                        >
                            Варианты линий
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
