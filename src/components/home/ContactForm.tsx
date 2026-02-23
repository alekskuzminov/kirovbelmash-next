'use client';

import { useState, FormEvent } from 'react';
import { SITE_CONFIG } from '@/config/site.config';
import { submitContactForm } from '@/lib/api';

interface ContactFormProps {
    initialMessage?: string;
    isModal?: boolean;
}

export default function ContactForm({ initialMessage = '', isModal = false }: ContactFormProps = {}) {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        phone: '',
        equipment: '',
        message: initialMessage,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        const ok = await submitContactForm({
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            company: formData.company,
            equipment: formData.equipment,
            message: formData.message,
        });

        if (ok) {
            setSubmitStatus('success');
            setFormData({ name: '', company: '', email: '', phone: '', equipment: '', message: '' });
        } else {
            setSubmitStatus('error');
        }
        setIsSubmitting(false);
    };

    const { contacts } = SITE_CONFIG;

    const formContent = (
        <form id="contact-form" onSubmit={handleSubmit}>
            <div className="space-y-4 sm:space-y-5">
                <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                        Ваше имя <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                        placeholder="Введите ваше имя"
                    />
                </div>

                <div>
                    <label htmlFor="company" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                        Название компании
                    </label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                        placeholder="Введите название компании"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                        Электронная почта <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                        placeholder="your@email.com"
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                        Телефон <span className="text-red-600">*</span>
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                        placeholder="+7 (___) ___-__-__"
                    />
                </div>

                <div>
                    <label htmlFor="equipment" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                        Тип оборудования
                    </label>
                    <select
                        id="equipment"
                        name="equipment"
                        value={formData.equipment}
                        onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all cursor-pointer"
                    >
                        <option value="">Выберите тип оборудования</option>
                        <option value="briquetting">Линия брикетирования</option>
                        <option value="granulation">Линия гранулирования</option>
                        <option value="drying">Сушильное оборудование</option>
                        <option value="crushing">Дробильное оборудование</option>
                        <option value="custom">Индивидуальное решение</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                        Сообщение
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={4}
                        maxLength={500}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none"
                        placeholder="Расскажите о требованиях вашего проекта..."
                    />
                    <div className="text-xs text-gray-500 mt-1 text-right">
                        {formData.message.length}/500 символов
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 sm:py-4 bg-red-600 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </button>

                {submitStatus === 'success' && (
                    <div className="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-xs sm:text-sm text-green-800 text-center">
                            Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.
                        </p>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-xs sm:text-sm text-red-800 text-center">
                            Произошла ошибка. Попробуйте ещё раз или свяжитесь с нами напрямую.
                        </p>
                    </div>
                )}
            </div>
        </form>
    );

    if (isModal) {
        return (
            <div className="bg-white w-full">
                <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 sm:px-8 sm:py-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Получить коммерческое предложение</h2>
                    <p className="text-red-100 text-sm">Оставьте заявку, и мы свяжемся с вами в ближайшее время</p>
                </div>
                <div className="p-6 sm:p-8">{formContent}</div>
            </div>
        );
    }

    return (
        <section id="contact" className="py-12 sm:py-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
                    <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Получить коммерческое предложение
                        </h2>
                        <p className="text-sm sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                            Оставьте заявку, и наши специалисты свяжутся с вами для обсуждения требований проекта и
                            подготовки подробного коммерческого предложения.
                        </p>

                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-red-50 rounded-lg flex-shrink-0">
                                    <i className="ri-phone-line text-xl sm:text-2xl text-red-600"></i>
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">Телефон</h3>
                                    <a
                                        href={`tel:${contacts.phone}`}
                                        className="text-xs sm:text-sm text-gray-600 hover:text-red-600 transition-colors"
                                    >
                                        {contacts.phoneFormatted}
                                    </a>
                                    <p className="text-xs sm:text-sm text-gray-600">{contacts.workingHours}</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-red-50 rounded-lg flex-shrink-0">
                                    <i className="ri-mail-line text-xl sm:text-2xl text-red-600"></i>
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">Электронная почта</h3>
                                    <a
                                        href={`mailto:${contacts.email}`}
                                        className="text-xs sm:text-sm text-gray-600 hover:text-red-600 transition-colors"
                                    >
                                        {contacts.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-red-50 rounded-lg flex-shrink-0">
                                    <i className="ri-map-pin-line text-xl sm:text-2xl text-red-600"></i>
                                </div>
                                <div>
                                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">Адрес</h3>
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        {contacts.address.city}, {contacts.address.region}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-600">{contacts.address.street}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-red-50 rounded-xl border border-red-100">
                            <div className="flex items-start space-x-3">
                                <i className="ri-information-line text-lg sm:text-xl text-red-600 mt-0.5"></i>
                                <div>
                                    <h4 className="text-xs sm:text-sm font-bold text-gray-900 mb-2">Что входит в КП:</h4>
                                    <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                                        {[
                                            'Консультация по подбору оборудования',
                                            'Технические характеристики',
                                            'Стоимость и сроки поставки',
                                            'Варианты монтажа и обучения',
                                        ].map((item) => (
                                            <li key={item} className="flex items-center space-x-2">
                                                <i className="ri-check-line text-red-600"></i>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-5 sm:p-8 rounded-2xl shadow-lg border border-gray-100">
                        {formContent}
                    </div>
                </div>
            </div>
        </section>
    );
}
