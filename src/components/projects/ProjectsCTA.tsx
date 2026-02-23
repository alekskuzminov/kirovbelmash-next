'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function ProjectsCTA() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.phone.trim()) {
            setError('Пожалуйста, заполните имя и телефон');
            return;
        }
        setError('');
        setIsSubmitting(true);

        try {
            const body = new URLSearchParams();
            body.append('name', formData.name);
            body.append('phone', formData.phone);
            body.append('email', formData.email);
            body.append('message', formData.message);

            const res = await fetch('https://readdy.ai/api/form/d6ao3sua728k8ctu3e30', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body.toString(),
            });

            if (res.ok) {
                setIsSubmitted(true);
                setFormData({ name: '', phone: '', email: '', message: '' });
            } else {
                setError('Ошибка отправки. Попробуйте позже.');
            }
        } catch {
            setError('Ошибка соединения. Попробуйте позже.');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            {isSubmitted ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-4">
                                        <i className="ri-check-line text-3xl text-green-600"></i>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
                                    <p className="text-sm text-gray-600 mb-6">Наш менеджер свяжется с вами в ближайшее время</p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="px-6 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
                                    >
                                        Отправить ещё
                                    </button>
                                </div>
                            ) : (
                                <form
                                    id="project-inquiry-form"
                                    onSubmit={handleSubmit}
                                >
                                    <h3 className="text-lg font-bold text-gray-900 mb-1">Оставить заявку</h3>
                                    <p className="text-sm text-gray-500 mb-6">Заполните форму и мы подготовим КП</p>

                                    {error && (
                                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                                            {error}
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Имя *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Ваше имя"
                                                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+7 (___) ___-__-__"
                                                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="email@example.com"
                                                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={(e) => {
                                                    if (e.target.value.length <= 500) {
                                                        setFormData({ ...formData, message: e.target.value });
                                                    }
                                                }}
                                                maxLength={500}
                                                rows={3}
                                                placeholder="Опишите ваш проект или задачу"
                                                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors resize-none"
                                            ></textarea>
                                            <div className="text-xs text-gray-400 text-right mt-1">{formData.message.length}/500</div>
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-3 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
                                        >
                                            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
