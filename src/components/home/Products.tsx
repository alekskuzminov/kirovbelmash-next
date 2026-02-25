import Image from 'next/image';
import Link from 'next/link';
import { briquettingLines } from '@/data/products';

const lineUrls: Record<number, string> = {
    1: '/linii-briketirovaniya',
    2: '/linii-granulirovaniya',
    3: '/sushilnie-linii',
};

export default function Products() {
    return (
        <section id="production-lines" className="py-12 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 sm:mb-12">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 tracking-tight">
                        Линии полного цикла
                    </h2>
                    <p className="text-sm sm:text-lg text-gray-600 max-w-3xl">
                        Комплексные производственные линии для переработки древесных отходов
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {briquettingLines.map((line) => (
                        <div
                            key={line.id}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="relative w-full h-64 bg-white overflow-hidden">
                                <Image
                                    src={line.image}
                                    alt={line.name}
                                    fill
                                    loading="lazy"
                                    className="object-contain object-center group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <div className="w-full h-px bg-gray-200" />
                            <div className="p-5 sm:p-6">
                                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-900">
                                    {line.name}
                                </h3>
                                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                                    {line.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-red-600 font-semibold text-xs sm:text-sm">
                                        {line.capacity}
                                    </span>
                                    <Link
                                        href={lineUrls[line.id]}
                                        className="px-4 sm:px-6 py-2 sm:py-2.5 bg-red-600 text-white text-xs sm:text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
                                    >
                                        Подробнее
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
