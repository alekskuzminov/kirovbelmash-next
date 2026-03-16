import Image from 'next/image';
import Link from 'next/link';
import { equipmentCatalog } from '@/data/products';

export default function EquipmentCatalog() {
    return (
        <section id="equipment" className="py-12 sm:py-20 bg-gray-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                            <Link href="/oborudovanie" className="hover:text-red-600 transition-colors">
                                Каталог оборудования для линий брикетирования и гранулирования
                            </Link>
                        </h2>
                    </div>
                    <div className="hidden sm:flex items-center">
                        <Link
                            href="/oborudovanie"
                            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-all duration-300"
                        >
                            В каталог
                            <i className="ri-arrow-right-line text-lg group-hover:translate-x-1 transition-transform"></i>
                        </Link>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {equipmentCatalog.map((item, index) => (
                        <Link
                            key={index}
                            href={`/oborudovanie/${item.slug}`}
                            className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
                        >
                            <div className="relative w-full h-52 bg-white p-6">
                                <div className="relative w-full h-full overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.category}
                                        fill
                                        loading="lazy"
                                        className="object-contain object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                    />
                                </div>
                                <span className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md text-[10px] font-semibold text-gray-700 px-2.5 py-1 rounded-lg shadow-sm ring-1 ring-black/5">
                                    {item.count}{' '}
                                    {item.count === 1
                                        ? 'позиция'
                                        : item.count < 5
                                            ? 'позиции'
                                            : 'позиций'}
                                </span>
                            </div>
                            <div className="px-5 pb-5 pt-2 flex flex-col flex-grow bg-white">
                                <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                                    {item.category}
                                </h3>
                                <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-gray-400 group-hover:text-red-600 transition-colors">
                                    <span>Перейти</span>
                                    <i className="ri-arrow-right-line ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></i>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mobile link */}
                <div className="sm:hidden mt-8 text-center">
                    <Link
                        href="/oborudovanie"
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3 w-full text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        Перейти в каталог
                        <i className="ri-arrow-right-line text-lg group-hover:translate-x-1 transition-transform"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
}
