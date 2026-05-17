'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { openContactModal } from '@/components/common/ContactModal';
import { HERO_BLUR } from '@/lib/heroBlur';

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const scrolled = window.scrollY;
            const sectionTop = sectionRef.current.offsetTop;
            const viewportHeight = window.innerHeight;

            // Расчет смещения только когда блок в поле зрения
            if (scrolled + viewportHeight > sectionTop) {
                // Коэффициент 0.2 для более мягкого параллакса в Hero
                setOffset((scrolled - sectionTop) * 0.2);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gray-900">
            {/* Background Image with Parallax and Slow Zoom */}
            <div
                className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]"
                style={{
                    transform: `translateY(${offset}px)`,
                    willChange: 'transform'
                }}
            >
                <div className="absolute inset-0 animate-slowZoom">
                    <Image
                        src="/images/home/hero-bg-line.jpg"
                        alt="Завод КировБелМаш — производство оборудования для переработки древесных отходов"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-bottom"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/60 to-gray-950/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left">
                    {/* Red Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-red-600 rounded-lg mb-6 opacity-0 animate-slideUp">
                        <span className="text-white text-sm font-semibold tracking-wide">ПРОИЗВОДИТЕЛЬ ОБОРУДОВАНИЯ</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight opacity-0 animate-slideUp [animation-delay:200ms]">
                        Оборудование для переработки{' '}
                        <span className="sm:whitespace-nowrap">древесных отходов</span>
                        <br />{' '}
                        <span className="text-red-600">под ключ за 60 дней</span>
                    </h1>

                    <div className="text-base sm:text-lg lg:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed opacity-0 animate-slideUp [animation-delay:400ms]">
                        {/* Desktop text */}
                        <div className="hidden sm:block">
                            Полный цикл: проектируем, производим, обучаем и запускаем
                            <br />
                            Гарантия качества и сервисная поддержка
                        </div>
                        {/* Mobile text */}
                        <div className="block sm:hidden space-y-1">
                            <div>Проектирование, производство, обучение персонала и запуск</div>
                            <div>Гарантия качества и сервис</div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                        <button
                            onClick={() => openContactModal('Заявка на обратный звонок')}
                            className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-red-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center cursor-pointer"
                        >
                            Получить коммерческое предложение
                        </button>
                        <Link
                            href="/calculator"
                            className="w-full sm:w-auto px-6 py-3.5 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-md text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/10 text-center"
                        >
                            Рассчитать стоимость
                        </Link>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex items-center justify-center">
                                <i className="ri-shield-check-line text-4xl text-red-600"></i>
                            </div>
                            <div>
                                <p className="text-white text-base leading-relaxed">
                                    Гарантийный срок —<br />
                                    3 года
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex items-center justify-center">
                                <i className="ri-time-line text-4xl text-red-600"></i>
                            </div>
                            <div>
                                <p className="text-white text-base leading-relaxed">
                                    Срок изготовления — 60 дней
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex items-center justify-center">
                                <i className="ri-graduation-cap-line text-4xl text-red-600"></i>
                            </div>
                            <div>
                                <p className="text-white text-base leading-relaxed">
                                    Обучение персонала и ввод в эксплуатацию
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex items-center justify-center">
                                <i className="ri-customer-service-2-line text-4xl text-red-600"></i>
                            </div>
                            <div>
                                <p className="text-white text-base leading-relaxed">
                                    Сервис и запчасти — поддержка после запуска
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                    <div className="w-1.5 h-3 bg-white/70 rounded-full"></div>
                </div>
            </div>
        </section>
    );
}
