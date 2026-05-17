"use client";

import { useState, FormEvent } from 'react';
import { submitContactForm } from '@/lib/api';
import { sendMetrikaGoal } from '@/lib/metrika';
import PrivacyDisclaimer from '@/components/ui/PrivacyDisclaimer';

export default function ContactsForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [hp, setHp] = useState('');
    const [formLoadedAt] = useState(() => Date.now());
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.email) {
            setSubmitStatus('error');
            return;
        }
        if (formData.message.length > 500) {
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        const ok = await submitContactForm({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
            hp,
            ts: formLoadedAt,
        });

        if (ok) {
            setSubmitStatus('success');
            setFormData({ name: '', phone: '', email: '', message: '' });
            sendMetrikaGoal('form_submit');
        } else {
            setSubmitStatus('error');
        }
        setIsSubmitting(false);
    };

    return (
        <section className="py-12 sm:py-16 bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 sm:mb-10">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Напишите нам</h2>
                    <p className="text-sm text-gray-600">
                        Оставьте заявку и наши специалисты свяжутся с вами в ближайшее время
                    </p>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-5 sm:p-8">
                    <form id="contacts-page-form" onSubmit={handleSubmit}>
                        <div
                            aria-hidden="true"
                            style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
                        >
                            <label htmlFor="cp-website">Website</label>
                            <input
                                type="text"
                                id="cp-website"
                                name="website"
                                tabIndex={-1}
                                autoComplete="off"
                                value={hp}
                                onChange={(e) => setHp(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <div>
                                <label htmlFor="cp-name" className="block text-sm font-semibold text-gray-900 mb-2">
                                    Ваше имя <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="cp-name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Введите ваше имя"
                                />
                            </div>
                            <div>
                                <label htmlFor="cp-phone" className="block text-sm font-semibold text-gray-900 mb-2">
                                    Телефон <span className="text-red-600">*</span>
                                </label>
                                <input
                                    type="tel"
                                    id="cp-phone"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                    placeholder="+7 (___) ___-__-__"
                                />
                            </div>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="cp-email" className="block text-sm font-semibold text-gray-900 mb-2">
                                Email <span className="text-red-600">*</span>
                            </label>
                            <input
                                type="email"
                                id="cp-email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="cp-message" className="block text-sm font-semibold text-gray-900 mb-2">
                                Сообщение
                            </label>
                            <textarea
                                id="cp-message"
                                name="message"
                                rows={5}
                                maxLength={500}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none"
                                placeholder="Опишите ваш запрос..."
                            ></textarea>
                            <div className="text-xs text-gray-500 mt-1 text-right">
                                {formData.message.length}/500 символов
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-4 bg-red-600 text-white text-base font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                        >
                            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                        </button>

                        {submitStatus === 'success' && (
                            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <p className="text-sm text-green-800 text-center">
                                    Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.
                                </p>
                            </div>
                        )}

                        {submitStatus === 'error' && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-sm text-red-800 text-center">
                                    Произошла ошибка. Попробуйте ещё раз или свяжитесь с нами напрямую.
                                </p>
                            </div>
                        )}

                        <PrivacyDisclaimer />
                    </form>
                </div>
            </div>
        </section>
    );
}
