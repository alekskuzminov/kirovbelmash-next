import { LineVariant } from './linesData';

interface LineSpecsProps {
    variant: LineVariant;
}

const specs = (v: LineVariant) => [
    { label: 'Производительность', value: v.capacity },
    { label: 'Номинальная мощность', value: v.power },
    { label: 'Тип сырья', value: v.rawMaterial },
    { label: 'Готовый продукт', value: v.product },
    { label: 'Срок поставки', value: v.deliveryWeeks },
    { label: 'Доля комплектации РФ', value: v.rfComplect },
];

export default function LineSpecs({ variant }: LineSpecsProps) {
    return (
        <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-table-line text-red-600" />
                Технические характеристики
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                {specs(variant).map(({ label, value }, i) => (
                    <div
                        key={label}
                        className={`flex gap-3 px-5 py-3.5 text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/70'}`}
                    >
                        <span className="text-gray-500 w-1/2">{label}</span>
                        <span className="text-gray-900 font-semibold w-1/2">{value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
