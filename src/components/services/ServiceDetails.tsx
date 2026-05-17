import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { servicesData } from './servicesData';

export default function ServiceDetails() {
    return (
        <section className="py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-14">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="w-8 h-0.5 bg-red-500"></div>
                        <span className="text-red-600 text-sm font-medium tracking-wider uppercase">
                            Подробнее
                        </span>
                        <div className="w-8 h-0.5 bg-red-500"></div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Каждый этап — под контролем
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto">
                        Детальное описание каждой услуги и что вы получаете на каждом этапе
                        сотрудничества
                    </p>
                </div>

                <div className="space-y-10 sm:space-y-16">
                    {servicesData.map((service, index) => {
                        const isReversed = index % 2 !== 0;
                        return (
                            <div
                                key={service.id}
                                id={service.id}
                                className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
                                    } gap-6 sm:gap-10 items-center`}
                            >
                                {/* Image side */}
                                <div className="w-full lg:w-1/2">
                                    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden w-full h-56 sm:h-80 lg:h-96 shadow-lg">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover object-top"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                        <div className="absolute top-4 left-4 flex items-center space-x-2">
                                            <div className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg">
                                                Этап {service.number}
                                            </div>
                                        </div>
                                        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-md">
                                            <div className="text-xl font-bold text-red-600">
                                                {service.stats.value}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {service.stats.label}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Text side */}
                                <div className="w-full lg:w-1/2">
                                    <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-red-50 rounded-xl">
                                            <i
                                                className={`${service.icon} text-xl sm:text-2xl text-red-600`}
                                                aria-hidden="true"
                                            ></i>
                                        </div>
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                                                {service.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-gray-500">{service.subtitle}</p>
                                        </div>
                                    </div>

                                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 sm:mb-6">
                                        {service.description}
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                                        {service.features.map((feature, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-start space-x-2"
                                            >
                                                <i className="ri-check-double-line text-red-500 text-base mt-0.5 flex-shrink-0"></i>
                                                <span className="text-sm text-gray-600">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                        <div className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-red-50 rounded-lg">
                                            <i className="ri-time-line text-red-500 text-xs sm:text-sm"></i>
                                            <span className="text-[10px] sm:text-xs font-medium text-red-700">
                                                Сроки: {service.duration}
                                            </span>
                                        </div>
                                        <Link
                                            href={`/services/${service.id}`}
                                            className="px-4 sm:px-5 py-1.5 sm:py-2 bg-red-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
                                        >
                                            Подробнее об услуге
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
