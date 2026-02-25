import Image from 'next/image';
import { advantages } from '@/data/products';

export default function Advantages() {
    return (
        <section className="relative py-12 sm:py-20 overflow-hidden">
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src="/images/backgrounds/advantages-bg.webp"
                    alt="Производственное оборудование"
                    fill
                    loading="lazy"
                    className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-950/60 via-gray-950/50 to-gray-950/60" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white">
                        Почему выбирают КировБелМаш
                    </h2>
                    <p className="text-sm sm:text-lg text-gray-300 max-w-3xl mx-auto px-2">
                        Ведущий производитель промышленного оборудования с проверенным опытом
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                    {advantages.map((advantage, index) => (
                        <div
                            key={index}
                            className="group bg-gray-800/50 backdrop-blur-sm p-5 sm:p-8 rounded-xl border border-gray-700/50 hover:bg-gray-800/80 transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-4 sm:mb-6">
                                <div className="w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center bg-red-600 rounded-xl group-hover:bg-white transition-colors duration-300">
                                    <i className={`${advantage.icon} text-2xl sm:text-3xl text-white group-hover:text-red-600 transition-colors duration-300`}></i>
                                </div>
                                <div className="text-2xl sm:text-3xl font-bold text-red-600">{advantage.value}</div>
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-white">
                                {advantage.title}
                            </h3>
                            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                                {advantage.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
