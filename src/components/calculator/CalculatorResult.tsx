"use client";

import {
    equipmentTypes,
    productivityOptions,
    rawMaterialOptions,
} from './calculatorData';
import CalculatorRequestForm from './CalculatorRequestForm';

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
    const equipment = equipmentTypes.find((e) => e.id === selectedEquipment);
    const productivity = productivityOptions.find((p) => p.id === selectedProductivity);
    const material = rawMaterialOptions.find((m) => m.id === selectedMaterial);
    const hasSelection = !!selectedEquipment;

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
                                    <span className="text-sm font-medium text-white">
                                        {item.price > 0 ? `${formatPrice(item.price)} ₽` : 'по запросу'}
                                    </span>
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
                    <CalculatorRequestForm
                        equipmentTitle={equipment?.title || ''}
                        productivityLabel={productivity?.label || ''}
                        materialLabel={material?.label || ''}
                        servicesText={calculation.breakdown.map((item) => item.title).join(', ')}
                        totalPriceText={`${formatPrice(calculation.total)} ₽`}
                    />
                </div>
            )}
        </div>
    );
}
