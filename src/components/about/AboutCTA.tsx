"use client";

import Link from 'next/link';
import Image from 'next/image';
import { SITE_CONFIG } from '@/config/site.config';
import AboutCTAForm from './AboutCTAForm';

export default function AboutCTA() {
    return (
        <section className="relative py-12 sm:py-20 overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/images/about/about-cta-bg.jpg"
                    alt="Производство КировБелМаш"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
                    <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-5">
                            Готовы обсудить<br />ваш проект?
                        </h2>
                        <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6 sm:mb-8">
                            Оставьте заявку, и наши специалисты свяжутся с вами для обсуждения задач
                            и подготовки коммерческого предложения.
                        </p>
                        <div className="flex flex-wrap gap-4 sm:gap-6 mb-6 sm:mb-8">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 flex items-center justify-center bg-red-600/20 rounded-lg">
                                    <i className="ri-phone-line text-xl text-red-400"></i>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400">Телефон</div>
                                    <a href={`tel:${SITE_CONFIG.contacts.phone}`} className="text-sm text-white font-medium hover:text-red-400 transition-colors cursor-pointer">{SITE_CONFIG.contacts.phoneFormatted}</a>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 flex items-center justify-center bg-red-600/20 rounded-lg">
                                    <i className="ri-mail-line text-xl text-red-400"></i>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400">Email</div>
                                    <a href={`mailto:${SITE_CONFIG.contacts.email}`} className="text-sm text-white font-medium hover:text-red-400 transition-colors cursor-pointer">{SITE_CONFIG.contacts.email}</a>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            <Link href="/oborudovanie" className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20 whitespace-nowrap cursor-pointer">
                                Каталог оборудования
                            </Link>
                            <Link href="/projects" className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-white/20 transition-colors border border-white/20 whitespace-nowrap cursor-pointer">
                                Наши проекты
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-2xl">
                        <AboutCTAForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
