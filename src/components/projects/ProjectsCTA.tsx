'use client';

import Image from 'next/image';
import ProjectsCTAForm from './ProjectsCTAForm';

export default function ProjectsCTA() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 w-full h-full">
                        <Image
                            src="/images/backgrounds/projects-cta-bg.webp"
                            alt="Производство КировБелМаш"
                            fill
                            className="object-cover object-top"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/60"></div>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 p-5 sm:p-8 lg:p-16">
                        <div className="flex flex-col justify-center">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                                Обсудим ваш проект?
                            </h2>
                            <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6 sm:mb-8">
                                Оставьте заявку — наши инженеры подготовят индивидуальное коммерческое предложение с учётом ваших задач и бюджета.
                            </p>
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 flex items-center justify-center bg-red-600/20 rounded-lg flex-shrink-0">
                                        <i className="ri-time-line text-red-400 text-lg"></i>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white">Быстрый ответ</div>
                                        <div className="text-xs text-gray-400">Перезвоним в течение 2 часов</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 flex items-center justify-center bg-red-600/20 rounded-lg flex-shrink-0">
                                        <i className="ri-file-text-line text-red-400 text-lg"></i>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white">Бесплатный расчёт</div>
                                        <div className="text-xs text-gray-400">КП с детализацией за 1-2 дня</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 flex items-center justify-center bg-red-600/20 rounded-lg flex-shrink-0">
                                        <i className="ri-truck-line text-red-400 text-lg"></i>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white">Доставка по России</div>
                                        <div className="text-xs text-gray-400">Монтаж и пусконаладка под ключ</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-5 sm:p-6 lg:p-8 shadow-xl">
                            <ProjectsCTAForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
