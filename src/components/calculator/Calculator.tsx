"use client";

import { useState, useMemo } from 'react';
import {
    equipmentTypes,
    productivityOptions,
    rawMaterialOptions,
    additionalServices,
    equipmentPrices,
} from './calculatorData';
import CalculatorResult from './CalculatorResult';

export default function Calculator() {
    const [selectedEquipment, setSelectedEquipment] = useState<string>('');
    const [selectedProductivity, setSelectedProductivity] = useState<string>('p1');
    const [selectedMaterial, setSelectedMaterial] = useState<string>('sawdust');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);

    const toggleService = (id: string) => {
        setSelectedServices((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    };

    const calculation = useMemo(() => {
        const equipment = equipmentTypes.find((e) => e.id === selectedEquipment);
        const productivity = productivityOptions.find((p) => p.id === selectedProductivity);
        const material = rawMaterialOptions.find((m) => m.id === selectedMaterial);

        if (!equipment) {
            return { equipmentCost: 0, servicesCost: 0, total: 0, breakdown: [] };
        }

        const exactBasePrice = (equipmentPrices[selectedEquipment] && productivity)
            ? equipmentPrices[selectedEquipment][productivity.id]
            : equipment.basePrice;

        const prodMultiplier = productivity ? productivity.multiplier : 1;
        const matModifier = material ? material.modifier : 1;
        const equipmentCost = Math.round(exactBasePrice * matModifier);

        let servicesCost = 0;
        const breakdown: { title: string; price: number }[] = [];

        selectedServices.forEach((sId) => {
            const svc = additionalServices.find((s) => s.id === sId);
            if (svc) {
                const svcPrice = Math.round(svc.price * prodMultiplier);
                servicesCost += svcPrice;
                breakdown.push({ title: svc.title, price: svcPrice });
            }
        });

        const total = equipmentCost + servicesCost;

        return { equipmentCost, servicesCost, total, breakdown };
    }, [selectedEquipment, selectedProductivity, selectedMaterial, selectedServices]);

    return (
        <section id="calculator" className="pt-24 sm:pt-32 pb-12 sm:pb-20 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-14">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="w-6 sm:w-8 h-0.5 bg-red-500"></div>
                        <span className="text-red-600 text-xs sm:text-sm font-medium tracking-wider uppercase">Калькулятор</span>
                        <div className="w-6 sm:w-8 h-0.5 bg-red-500"></div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Рассчитайте стоимость
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">
                        Выберите тип оборудования, производительность, сырьё и дополнительные услуги — калькулятор мгновенно покажет предварительную стоимость
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 items-start">
                    {/* Левая панель — параметры */}
                    <div className="lg:col-span-3 space-y-5 sm:space-y-8">
                        {/* Тип оборудования */}
                        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                            <div className="flex items-center space-x-2 mb-4 sm:mb-5">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-red-100 rounded-lg">
                                    <span className="text-red-600 text-xs sm:text-sm font-bold">1</span>
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-gray-900">Тип оборудования</h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                {equipmentTypes.map((eq) => (
                                    <button
                                        key={eq.id}
                                        onClick={() => setSelectedEquipment(eq.id)}
                                        className={`flex flex-col items-center p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer ${selectedEquipment === eq.id
                                            ? 'border-red-500 bg-red-50 shadow-md'
                                            : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white'
                                            }`}
                                    >
                                        <div className={`w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-lg mb-2 sm:mb-2.5 ${selectedEquipment === eq.id ? 'bg-red-600' : 'bg-gray-200'
                                            }`}>
                                            <i className={`${eq.icon} text-lg sm:text-xl ${selectedEquipment === eq.id ? 'text-white' : 'text-gray-600'}`}></i>
                                        </div>
                                        <span className={`text-xs sm:text-sm font-medium text-center ${selectedEquipment === eq.id ? 'text-red-700' : 'text-gray-700'
                                            }`}>
                                            {eq.title}
                                        </span>
                                        <span className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">
                                            от {new Intl.NumberFormat('ru-RU').format(eq.basePrice)} ₽
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Производительность */}
                        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                            <div className="flex items-center space-x-2 mb-4 sm:mb-5">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-red-100 rounded-lg">
                                    <span className="text-red-600 text-xs sm:text-sm font-bold">2</span>
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-gray-900">Производительность</h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                                {productivityOptions.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setSelectedProductivity(opt.id)}
                                        className={`px-3 sm:px-4 py-2.5 sm:py-3.5 rounded-xl border-2 text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${selectedProductivity === opt.id
                                            ? 'border-red-500 bg-red-50 text-red-700 shadow-md'
                                            : 'border-gray-100 bg-gray-50 text-gray-700 hover:border-gray-200 hover:bg-white'
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Тип сырья */}
                        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                            <div className="flex items-center space-x-2 mb-4 sm:mb-5">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-red-100 rounded-lg">
                                    <span className="text-red-600 text-xs sm:text-sm font-bold">3</span>
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-gray-900">Тип сырья</h3>
                            </div>
                            <div className="space-y-2 sm:space-y-2.5">
                                {rawMaterialOptions.map((mat) => (
                                    <button
                                        key={mat.id}
                                        onClick={() => setSelectedMaterial(mat.id)}
                                        className={`w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border-2 transition-all duration-200 cursor-pointer ${selectedMaterial === mat.id
                                            ? 'border-red-500 bg-red-50 shadow-md'
                                            : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white'
                                            }`}
                                    >
                                        <span className={`text-xs sm:text-sm font-medium ${selectedMaterial === mat.id ? 'text-red-700' : 'text-gray-700'
                                            }`}>
                                            {mat.label}
                                        </span>
                                        {mat.modifier > 1 && (
                                            <span className="text-[10px] sm:text-xs text-gray-400">
                                                +{Math.round((mat.modifier - 1) * 100)}%
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Дополнительные услуги */}
                        <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
                            <div className="flex items-center space-x-2 mb-4 sm:mb-5">
                                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-red-100 rounded-lg">
                                    <span className="text-red-600 text-xs sm:text-sm font-bold">4</span>
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-gray-900">Дополнительные услуги</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                                {additionalServices.map((svc) => {
                                    const isSelected = selectedServices.includes(svc.id);
                                    return (
                                        <button
                                            key={svc.id}
                                            onClick={() => toggleService(svc.id)}
                                            className={`flex items-start space-x-3 p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${isSelected
                                                ? 'border-red-500 bg-red-50 shadow-md'
                                                : 'border-gray-100 bg-gray-50 hover:border-gray-200 hover:bg-white'
                                                }`}
                                        >
                                            <div className={`w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5 ${isSelected ? 'bg-red-600' : 'bg-gray-200'
                                                }`}>
                                                <i className={`${svc.icon} text-lg ${isSelected ? 'text-white' : 'text-gray-600'}`}></i>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <span className={`text-sm font-medium ${isSelected ? 'text-red-700' : 'text-gray-800'}`}>
                                                        {svc.title}
                                                    </span>
                                                    <div className={`w-5 h-5 flex items-center justify-center rounded-md flex-shrink-0 ml-2 ${isSelected ? 'bg-red-600' : 'border-2 border-gray-300'
                                                        }`}>
                                                        {isSelected && <i className="ri-check-line text-xs text-white"></i>}
                                                    </div>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{svc.desc}</p>
                                                <span className="text-xs text-gray-400 mt-1 inline-block">
                                                    по запросу
                                                </span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Правая панель — результат */}
                    <div className="lg:col-span-2 lg:sticky lg:top-24">
                        <CalculatorResult
                            selectedEquipment={selectedEquipment}
                            selectedProductivity={selectedProductivity}
                            selectedMaterial={selectedMaterial}
                            selectedServices={selectedServices}
                            calculation={calculation}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
