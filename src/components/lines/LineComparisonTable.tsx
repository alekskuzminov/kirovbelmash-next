import Link from 'next/link';
import { LineVariant } from './linesData';

interface LineComparisonTableProps {
    variants: LineVariant[];
    ctaHref?: string;
}

export default function LineComparisonTable({ variants, ctaHref = '/contacts' }: LineComparisonTableProps) {
    return (
        <section className="py-12 sm:py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Сравнение моделей
                    </h2>
                    <p className="text-base text-gray-600">
                        Все характеристики в одной таблице — выберите подходящую производительность
                    </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                    <table className="w-full min-w-[600px] border-collapse bg-white text-sm">
                        <thead>
                            <tr className="bg-gray-900 text-white">
                                <th className="py-3 px-4 text-left font-semibold w-44 text-xs uppercase tracking-wide">
                                    Характеристика
                                </th>
                                {variants.map((v) => (
                                    <th key={v.id} className="py-3 px-4 text-center font-semibold text-xs uppercase tracking-wide">
                                        {v.capacity}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {/* --- Технические характеристики --- */}
                            <tr className="bg-red-600 text-white">
                                <td colSpan={variants.length + 1} className="py-2 px-4 text-xs font-bold uppercase tracking-wider">
                                    Технические характеристики
                                </td>
                            </tr>

                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-gray-600 font-medium">Производительность</td>
                                {variants.map((v) => (
                                    <td key={v.id} className="py-3 px-4 text-center font-semibold text-gray-900">
                                        {v.capacity}
                                    </td>
                                ))}
                            </tr>

                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-gray-600 font-medium">Уст. мощность</td>
                                {variants.map((v) => (
                                    <td key={v.id} className="py-3 px-4 text-center text-gray-900">
                                        {v.installedPower ?? v.power}
                                    </td>
                                ))}
                            </tr>

                            <tr className="border-b border-gray-100 hover:bg-gray-50 bg-gray-50/50">
                                <td className="py-3 px-4 text-gray-600 font-medium">Потребл. мощность</td>
                                {variants.map((v) => (
                                    <td key={v.id} className="py-3 px-4 text-center text-gray-900">
                                        {v.consumedPower ?? '-'}
                                    </td>
                                ))}
                            </tr>

                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-gray-600 font-medium">Тип сырья</td>
                                {variants.map((v) => (
                                    <td key={v.id} className="py-3 px-4 text-center text-gray-700">
                                        {v.rawMaterial}
                                    </td>
                                ))}
                            </tr>

                            <tr className="border-b border-gray-100 hover:bg-gray-50 bg-gray-50/50">
                                <td className="py-3 px-4 text-gray-600 font-medium">Влажность сырья</td>
                                {variants.map((v) => (
                                    <td key={v.id} className="py-3 px-4 text-center text-gray-700">
                                        {v.rawMoisture ?? '-'}
                                    </td>
                                ))}
                            </tr>

                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-gray-600 font-medium">Площадь установки</td>
                                {variants.map((v) => (
                                    <td key={v.id} className="py-3 px-4 text-center text-gray-700">
                                        {v.installationArea ?? '-'}
                                    </td>
                                ))}
                            </tr>

                            <tr className="border-b border-gray-100 hover:bg-gray-50 bg-gray-50/50">
                                <td className="py-3 px-4 text-gray-600 font-medium">Высота потолков</td>
                                {variants.map((v) => (
                                    <td key={v.id} className="py-3 px-4 text-center text-gray-700">
                                        {v.ceilingHeight ?? '-'}
                                    </td>
                                ))}
                            </tr>

                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-gray-600 font-medium">Персонал</td>
                                {variants.map((v) => (
                                    <td key={v.id} className="py-3 px-4 text-center text-gray-700">
                                        {v.staff ?? '-'}
                                    </td>
                                ))}
                            </tr>

                            {/* --- Коммерческие условия --- */}
                            <tr className="bg-red-600 text-white">
                                <td colSpan={variants.length + 1} className="py-2 px-4 text-xs font-bold uppercase tracking-wider">
                                    Коммерческие условия
                                </td>
                            </tr>

                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-3 px-4 text-gray-600 font-medium">Цена</td>
                                {variants.map((v) => (
                                    <td key={v.id} className="py-3 px-4 text-center font-bold text-gray-900">
                                        {v.price}
                                    </td>
                                ))}
                            </tr>

                            <tr className="border-b border-gray-100 hover:bg-gray-50 bg-gray-50/50">
                                <td className="py-3 px-4 text-gray-600 font-medium">Срок изготовления</td>
                                {variants.map((v) => (
                                    <td key={v.id} className="py-3 px-4 text-center text-gray-700">
                                        {v.deliveryWeeks}
                                    </td>
                                ))}
                            </tr>

                            <tr className="hover:bg-gray-50">
                                <td className="py-3 px-4 text-gray-600 font-medium">Рос. комплектующие</td>
                                {variants.map((v) => (
                                    <td key={v.id} className="py-3 px-4 text-center text-gray-700">
                                        {v.rfComplect}
                                    </td>
                                ))}
                            </tr>

                            {/* CTA row */}
                            <tr className="bg-gray-50 border-t border-gray-200">
                                <td className="py-4 px-4 text-gray-500 text-xs">Получить КП</td>
                                {variants.map((v) => (
                                    <td key={v.id} className="py-4 px-4 text-center">
                                        <Link
                                            href={ctaHref}
                                            className="inline-block px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
                                        >
                                            Запросить КП
                                        </Link>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
