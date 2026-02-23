"use client";

import { useState } from 'react';
import {
    equipmentTypes,
    productivityOptions,
    rawMaterialOptions,
} from './calculatorData';

interface CalculatorResultProps {
    selectedEquipment: string;
    selectedProductivity: string;
    selectedMaterial: string;
    selectedServices: string[];
    calculation: {
        equipmentCost: number;
        servicesCost: number;
        total: number;
        breakdown: { title: string; price: number }[];
    };
}

function formatPrice(value: number): string {
    return value.toLocaleString('ru-RU');
}

export default function CalculatorResult({
    selectedEquipment,
    selectedProductivity,
    selectedMaterial,
    selectedServices,
    calculation,
}: CalculatorResultProps) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        comment: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const equipment = equipmentTypes.find((e) => e.id === selectedEquipment);
    const productivity = productivityOptions.find((p) => p.id === selectedProductivity);
    const material = rawMaterialOptions.find((m) => m.id === selectedMaterial);
    const hasSelection = !!selectedEquipment;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.phone.trim()) return;
        if (formData.comment.length > 500) return;

        setIsSubmitting(true);
        try {
            const body = new URLSearchParams();
            body.append('name', formData.name);
            body.append('phone', formData.phone);
            body.append('email', formData.email);
            body.append('comment', formData.comment);
            body.append('equipment', equipment?.title || '');
            body.append('productivity', productivity?.label || '');
            body.append('material', material?.label || '');
            body.append('services', calculation.breakdown.map((b) => b.title).join(', '));
            body.append('total_price', `${formatPrice(calculation.total)} ₽`);

            const response = await fetch(
                'https://readdy.ai/api/form/d6ap48ma728k8ctu3en0',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: body.toString(),
                }
            );

            if (response.ok) {
                setIsSubmitted(true);
                setFormData({ name: '', phone: '', email: '', comment: '' });
            }
        } catch (err) {
            console.error('Form error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            {/* Верхняя часть — итог */}
            <div className="p-6 pb-5">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-white/10 rounded-full mb-4">
                    <i className="ri-calculator-line text-sm text-red-400"></i>
                    <span className="text-xs text-gray-300 font-medium">Предварительный расчёт</span>
                </div>

                {hasSelection ? (
                    <>
                        <div className="text-4xl font-bold text-white mb-1">
                            {formatPrice(calculation.total)} ₽
                        </div>
                        <p className="text-sm text-gray-400 mb-6">
                            от {formatPrice(Math.round(calculation.total * 0.9))} до {formatPrice(Math.round(calculation.total * 1.1))} ₽
                        </p>

                        {/* Разбивка */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between py-2.5 border-b border-gray-700/50">
                                <div className="flex items-center space-x-2">
                                    <div className="w-7 h-7 flex items-center justify-center bg-red-600/20 rounded-md">
                                        <i className="ri-settings-3-line text-sm text-red-400"></i>
                                    </div>
                                    <span className="text-sm text-gray-300">{equipment?.title}</span>
                                </div>
                                <span className="text-sm font-medium text-white">{formatPrice(calculation.equipmentCost)} ₽</span>
                            </div>

                            {calculation.breakdown.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between py-2.5 border-b border-gray-700/50">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-7 h-7 flex items-center justify-center bg-red-600/20 rounded-md">
                                            <i className="ri-check-line text-sm text-red-400"></i>
                                        </div>
                                        <span className="text-sm text-gray-300">{item.title}</span>
                                    </div>
                                    <span className="text-sm font-medium text-white">{formatPrice(item.price)} ₽</span>
                                </div>
                            ))}
                        </div>

                        {/* Параметры */}
                        <div className="bg-white/5 rounded-xl p-4 mb-5">
                            <div className="text-xs text-gray-400 font-medium mb-2.5 uppercase tracking-wider">Параметры</div>
                            <div className="space-y-2">
                                {productivity && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-400">Производительность</span>
                                        <span className="text-xs text-gray-200 font-medium">{productivity.label}</span>
                                    </div>
                                )}
                                {material && (
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-400">Сырьё</span>
                                        <span className="text-xs text-gray-200 font-medium">{material.label.split('(')[0].trim()}</span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400">Доп. услуги</span>
                                    <span className="text-xs text-gray-200 font-medium">{selectedServices.length} шт.</span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-10">
                        <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-full mx-auto mb-4">
                            <i className="ri-arrow-left-line text-2xl text-gray-500"></i>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Выберите тип оборудования<br />для начала расчёта
                        </p>
                    </div>
                )}
            </div>

            {/* Форма заявки */}
            {hasSelection && (
                <div className="bg-white rounded-t-2xl p-6">
                    {isSubmitted ? (
                        <div className="text-center py-6">
                            <div className="w-14 h-14 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-3">
                                <i className="ri-check-line text-2xl text-green-600"></i>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 mb-1">Заявка отправлена!</h4>
                            <p className="text-sm text-gray-500 mb-4">Менеджер свяжется с вами в течение 30 минут</p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
                            >
                                Новый расчёт
                            </button>
                        </div>
                    ) : (
                        <form
                            id="calculator-request-form"
                            data-readdy-form
                            onSubmit={handleSubmit}
                        >
                            <h4 className="text-base font-bold text-gray-900 mb-4">Получить точный расчёт</h4>
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Ваше имя *"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Телефон *"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Email"
                                />
                                <div>
                                    <textarea
                                        name="comment"
                                        rows={2}
                                        maxLength={500}
                                        value={formData.comment}
                                        onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                                        className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none"
                                        placeholder="Комментарий к заявке"
                                    ></textarea>
                                    <div className="text-xs text-gray-400 text-right mt-0.5">{formData.comment.length}/500</div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || formData.comment.length > 500}
                                    className="w-full px-6 py-3 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer flex items-center justify-center space-x-2"
                                >
                                    <span>{isSubmitting ? 'Отправка...' : 'Получить точный расчёт'}</span>
                                    {!isSubmitting && <i className="ri-arrow-right-line text-lg"></i>}
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 text-center mt-3">
                                Менеджер свяжется в течение 30 минут
                            </p>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
}
