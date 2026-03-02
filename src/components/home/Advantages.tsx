"use client";
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { advantages } from '@/data/products';

export default function Advantages() {
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
                // Коэффициент 0.3 для умеренной скорости
                setOffset((scrolled - sectionTop) * 0.3);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className="relative pt-12 pb-16 sm:pt-20 sm:pb-32 overflow-hidden">
            {/* Фоновое изображение с параллаксом */}
            <div
                className="absolute inset-0 w-full h-[140%] -top-[20%]"
                style={{
                    transform: `translateY(${offset}px)`,
                    willChange: 'transform'
                }}
            >
                <Image
                    src="/images/home/why-bg.webp"
                    alt="Производственное оборудование"
                    fill
                    loading="lazy"
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#020617]/65 to-[#020617]/80" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white">
                        Наш потенциал и ресурсы
                    </h2>
                    <p className="text-sm sm:text-lg text-gray-300 max-w-3xl mx-auto px-2">
                        Опыт и возможности КировБелМаш в цифрах и фактах
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                    {advantages.map((advantage, index) => (
                        <div
                            key={index}
                            className="group bg-gray-950/10 backdrop-blur-md pt-5 pb-7 px-4 rounded-xl border border-white/5 hover:bg-gray-950/20 transition-all duration-300 flex flex-col items-center text-center"
                        >
                            <div className="flex flex-row items-center justify-center gap-2 mb-4">
                                <div className="w-7 h-7 shrink-0 flex items-center justify-center bg-red-600/80 rounded-lg group-hover:bg-white transition-colors duration-300">
                                    <i className={`${advantage.icon} text-sm text-white group-hover:text-red-600 transition-colors duration-300`}></i>
                                </div>
                                <div className="text-lg sm:text-xl font-bold text-red-600 whitespace-nowrap">{advantage.value}</div>
                            </div>
                            <h3 className="text-sm sm:text-base font-bold text-white/90 leading-tight min-h-[2.5rem] flex items-center justify-center">
                                {advantage.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
