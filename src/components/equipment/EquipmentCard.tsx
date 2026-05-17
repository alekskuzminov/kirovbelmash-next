import Image from 'next/image';
import Link from 'next/link';
import { EquipmentItem } from './equipmentData';

interface EquipmentCardProps {
    item: EquipmentItem;
    index: number;
}

export default function EquipmentCard({ item, index }: EquipmentCardProps) {
    const badgeColors: Record<string, string> = {
        'Хит продаж': 'bg-red-500 text-white',
        'Новинка': 'bg-emerald-500 text-white',
        'Популярное': 'bg-amber-500 text-white',
    };

    return (
        <div
            className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-red-200 transition-all duration-300 hover:shadow-xl relative flex flex-col h-full"
            style={{ animationDelay: `${index * 60}ms` }}
        >

            <Link href={`/oborudovanie/${item.slug}`} className="block relative w-full h-48 sm:h-64 bg-white overflow-hidden flex-shrink-0">
                <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-800 rounded-lg shadow-sm flex items-center gap-1.5">
                        <i className="ri-eye-line text-sm"></i>
                        Подробнее
                    </span>
                </div>
            </Link>

            <div className="p-4 sm:p-5 flex flex-col flex-1">
                <div className="text-[10px] sm:text-xs font-medium text-red-600 uppercase tracking-wider mb-1 sm:mb-1.5">
                    {item.category}
                </div>

                <Link href={`/oborudovanie/${item.slug}`} className="block block group-hover:text-red-600 transition-colors">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1.5 sm:mb-2 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                        {item.name}
                    </h3>
                </Link>

                <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                    {item.specs.slice(0, 3).map((spec, idx) => {
                        let shortLabel = spec.label;
                        if (shortLabel.toLowerCase() === 'производительность') shortLabel = 'Произв.';
                        else if (shortLabel.toLowerCase() === 'мощность двигателя') shortLabel = 'Мощность';
                        else if (shortLabel.toLowerCase() === 'тепловая мощность') shortLabel = 'Мощность';
                        else if (shortLabel.toLowerCase() === 'максимальный диаметр бревна') shortLabel = 'Макс. бревно';

                        return (
                            <div key={idx} className="flex flex-col items-center justify-center bg-gray-50 rounded-lg py-2 px-1 text-center">
                                <span className="text-[9px] sm:text-[10px] text-gray-500 leading-tight mb-1">{shortLabel}</span>
                                <span className="text-[10px] sm:text-xs font-semibold text-gray-900 truncate w-full">{spec.value}</span>
                            </div>
                        )
                    })}
                </div>

                <Link
                    href={`/oborudovanie/${item.slug}`}
                    className="w-full py-2 sm:py-2.5 bg-gray-900 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-red-600 transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2 mt-auto"
                >
                    Характеристики
                    <i className="ri-arrow-right-line text-sm sm:text-base"></i>
                </Link>
            </div>
        </div>
    );
}
