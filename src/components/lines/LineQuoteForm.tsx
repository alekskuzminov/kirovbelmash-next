'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/config/site.config';

interface LineQuoteFormProps {
    lineName: string;
}

export default function LineQuoteForm({ lineName }: LineQuoteFormProps) {
    const [form, setForm] = useState({
        name: '',
        position: '',
        organization: '',
        city: '',
        equipment: lineName,
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: integrate with real form submission
        setSubmitted(true);
    };

    const inputCls =
        'w-full px-4 py-3 text-sm rounded-xl border border-gray-200 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition-all bg-white placeholder-gray-400';

    return (
        <section id="quote-form" className="py-14 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left: Info */}
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                            Получить коммерческое предложение
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            Оставьте заявку, и мы подготовим для вас КП с актуальными ценами на оборудование, включая доставку, монтаж и пусконаладку.
                        </p>

                        <div className="space-y-4">
                            {[
                                { icon: 'ri-phone-line', label: 'Телефон', value: SITE_CONFIG.contacts.phoneFormatted },
                                { icon: 'ri-mail-line', label: 'Электронная почта', value: SITE_CONFIG.contacts.email },
                            ].map(({ icon, label, value }) => (
                                <div key={label} className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                                        <i className={`${icon} text-red-600`} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                                        <p className="text-sm font-semibold text-gray-800">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Checklist */}
                        <div className="mt-8 bg-gray-50 rounded-2xl p-5">
                            <p className="text-sm font-semibold text-gray-700 mb-3">Что входит в КП?</p>
                            {[
                                'Детальная спецификация оборудования',
                                'Технологическая схема линии',
                                'График поставки и монтажа',
                                'Условия гарантии и сервиса',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-2 py-1.5">
                                    <i className="ri-checkbox-circle-fill text-red-600 text-base" />
                                    <span className="text-sm text-gray-600">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div>
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center text-center py-16">
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                    <i className="ri-check-line text-3xl text-green-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
                                <p className="text-gray-500 text-sm">
                                    Мы свяжемся с вами в ближайшее рабочее время.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                                            Имя <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="name"
                                            required
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Иван Иванов"
                                            className={inputCls}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                                            Должность
                                        </label>
                                        <input
                                            name="position"
                                            value={form.position}
                                            onChange={handleChange}
                                            placeholder="Директор, технолог..."
                                            className={inputCls}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                                            Организация <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="organization"
                                            required
                                            value={form.organization}
                                            onChange={handleChange}
                                            placeholder="ООО «Пример»"
                                            className={inputCls}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                                            Город <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            name="city"
                                            required
                                            value={form.city}
                                            onChange={handleChange}
                                            placeholder="Москва"
                                            className={inputCls}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                                        Тип оборудования
                                    </label>
                                    <input
                                        name="equipment"
                                        value={form.equipment}
                                        onChange={handleChange}
                                        className={inputCls}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                                        Сообщение
                                    </label>
                                    <textarea
                                        name="message"
                                        value={form.message}
                                        onChange={handleChange}
                                        rows={4}
                                        placeholder="Дополнительная информация или вопросы..."
                                        className={`${inputCls} resize-none`}
                                    />
                                    <p className="text-xs text-gray-400 mt-1 text-right">
                                        {form.message.length} / 500 символов
                                    </p>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-colors shadow-sm hover:shadow-md cursor-pointer"
                                >
                                    Отправить заявку
                                </button>
                                <p className="text-xs text-gray-400 text-center">
                                    Нажимая кнопку, вы соглашаетесь с{' '}
                                    <Link href="/privacy" className="underline hover:text-gray-600">
                                        политикой конфиденциальности
                                    </Link>
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
