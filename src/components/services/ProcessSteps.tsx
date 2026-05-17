import { serviceProcess } from './servicesData';

export default function ProcessSteps() {
    return (
        <section id="process" className="py-12 sm:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-14">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="w-8 h-0.5 bg-red-500"></div>
                        <span className="text-red-600 text-sm font-medium tracking-wider uppercase">
                            Этапы работы
                        </span>
                        <div className="w-8 h-0.5 bg-red-500"></div>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Как мы работаем
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto">
                        Прозрачный и отлаженный процесс — от первого обращения до запуска вашего
                        производства
                    </p>
                </div>

                <div className="relative">
                    {/* Horizontal line shown only on large screens */}
                    <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-6 lg:gap-4">
                        {serviceProcess.map((item, index) => (
                            <div key={index} className="relative group">
                                <div className="bg-white rounded-xl border border-gray-100 p-3 sm:p-5 text-center hover:shadow-lg hover:border-red-100 transition-all duration-300 relative z-10">
                                    <div className="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center bg-red-50 rounded-xl mx-auto mb-2 sm:mb-4 group-hover:bg-red-600 transition-colors duration-300">
                                        <i
                                            className={`${item.icon} text-lg sm:text-2xl text-red-600 group-hover:text-white transition-colors duration-300`}
                                        ></i>
                                    </div>
                                    <div className="text-[10px] sm:text-xs font-bold text-red-600 mb-1 sm:mb-2">
                                        Шаг {item.step}
                                    </div>
                                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 sm:mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed hidden sm:block">{item.desc}</p>
                                </div>
                                {/* Arrow connector between steps (except after the last step) */}
                                {index < serviceProcess.length - 1 && (
                                    <div className="hidden lg:flex absolute top-1/2 -right-2 z-20 w-4 h-4 items-center justify-center -translate-y-1/2">
                                        <i className="ri-arrow-right-s-line text-gray-300 text-lg"></i>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
