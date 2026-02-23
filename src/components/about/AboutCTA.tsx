"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function AboutCTA() {
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.phone.trim()) return;
        setIsSubmitting(true);
        try {
            const body = new URLSearchParams();
            body.append('name', formData.name);
            body.append('phone', formData.phone);
            body.append('email', formData.email);
            body.append('message', formData.message);
            await fetch('https://readdy.ai/api/form/d6ao9p5bd17lru29lum0', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body.toString(),
            });
            setIsSubmitted(true);
            setFormData({ name: '', phone: '', email: '', message: '' });
        } catch {
            // silent
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative py-12 sm:py-20 overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="https://readdy.ai/api/search-image?query=industrial%20factory%20interior%20with%20heavy%20machinery%20and%20production%20equipment%20dramatic%20warm%20lighting%20wide%20angle%20view%20showing%20manufacturing%20capability%20and%20scale%20professional%20industrial%20photography%20dark%20tones&width=1920&height=700&seq=aboutcta1&orientation=landscape"
                    alt="Производство КировБелМаш"
                    className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50"></div>
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
                                    <a href="tel:+79005218477" className="text-sm text-white font-medium hover:text-red-400 transition-colors cursor-pointer">+7 900 521-84-77</a>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 flex items-center justify-center bg-red-600/20 rounded-lg">
                                    <i className="ri-mail-line text-xl text-red-400"></i>
                                </div>
                                <div>
                                    <div className="text-xs text-gray-400">Email</div>
                                    <a href="mailto:sale@kirovbelmash.tw1.ru" className="text-sm text-white font-medium hover:text-red-400 transition-colors cursor-pointer">sale@kirovbelmash.tw1.ru</a>
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
                        {isSubmitted ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                                    <i className="ri-check-line text-3xl text-green-600"></i>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
                                <p className="text-sm text-gray-500">Мы свяжемся с вами в ближайшее время</p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-6 px-6 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
                                >
                                    Отправить ещё
                                </button>
                            </div>
                        ) : (
                            <form
                                id="about-callback-form"
                                data-readdy-form
                                onSubmit={handleSubmit}
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-5">Обратная связь</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Имя *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                            placeholder="Ваше имя"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Телефон *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                            placeholder="+7 (___) ___-__-__"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Сообщение</label>
                                        <textarea
                                            name="message"
                                            rows={3}
                                            maxLength={500}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none"
                                            placeholder="Опишите вашу задачу"
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full px-6 py-3 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer"
                                    >
                                        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
