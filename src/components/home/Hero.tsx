'use client';

import Image from 'next/image';
import Link from 'next/link';
import { openContactModal } from '@/components/common/ContactModal';

export default function Hero() {
    return (
        <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/home/hero-bg.webp"
                    alt="Производственные линии КировБелМаш"
                    fill
                    priority
                    className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-left">
                    {/* Red Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-red-600 rounded-lg mb-6">
                        <span className="text-white text-sm font-semibold tracking-wide">ПРОИЗВОДИТЕЛЬ ОБОРУДОВАНИЯ</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                        Производство линий{' '}
                        <span className="sm:whitespace-nowrap">брикетирования и гранулирования</span>
                        <br />{' '}
                        <span className="text-red-600">под ключ за 60 дней</span>
                    </h1>

                    <p className="text-base sm:text-lg lg:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
                        Полный цикл: проектируем, производим, обучаем и запускаем
                        <br />
                        Гарантия качества и сервисная поддержка
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 mb-16">
                        <button
                            onClick={() => openContactModal('Заявка на обратный звонок')}
                            className="px-8 py-4 bg-red-600 text-white text-base font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap text-center"
                        >
                            Получить коммерческое предложение
                        </button>
                        <Link
                            href="/calculator"
                            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-base font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border-2 border-white/30 whitespace-nowrap text-center"
                        >
                            Рассчитать стоимость
                        </Link>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 flex items-center justify-center">
                                <i className="ri-tools-line text-4xl text-red-600"></i>
                            </div>
                            <div>
                                <p className="text-white text-base leading-relaxed">
                                    Проектируем и запускаем «под ключ»
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
