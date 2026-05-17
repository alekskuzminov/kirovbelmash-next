import { historyTimeline } from '@/data/about';

export default function HistoryTimeline() {
    return (
        <section id="history" className="py-16 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-16">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="w-8 h-0.5 bg-red-500"></div>
                        <span className="text-red-600 text-sm font-medium tracking-wider uppercase">Путь развития</span>
                        <div className="w-8 h-0.5 bg-red-500"></div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                        История компании
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto">
                        От небольшой мастерской до ведущего производителя промышленного оборудования в России
                    </p>
                </div>

                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 hidden lg:block"></div>

                    <div className="space-y-6 sm:space-y-12 lg:space-y-0">
                        {historyTimeline.map((item, index) => {
                            const isLeft = index % 2 === 0;
                            return (
                                <div key={index} className="relative lg:mb-16 last:lg:mb-0">
                                    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                                        <div className="w-14 h-14 flex items-center justify-center bg-red-600 rounded-full shadow-lg border-4 border-white">
                                            <i className={`${item.icon} text-xl text-white`}></i>
                                        </div>
                                    </div>

                                    <div className={`lg:flex items-center ${isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                                        <div className={`lg:w-1/2 ${isLeft ? 'lg:pr-20 lg:text-right' : 'lg:pl-20 lg:text-left'}`}>
                                            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                                                <div className="flex items-center space-x-3 mb-3 lg:hidden">
                                                    <div className="w-10 h-10 flex items-center justify-center bg-red-600 rounded-full">
                                                        <i className={`${item.icon} text-lg text-white`}></i>
                                                    </div>
                                                    <span className="text-2xl font-bold text-red-600">{item.year}</span>
                                                </div>
                                                <div className={`hidden lg:block text-2xl font-bold text-red-600 mb-2 ${isLeft ? 'text-right' : 'text-left'}`}>
                                                    {item.year}
                                                </div>
                                                <h3 className={`text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
                                                    {item.title}
                                                </h3>
                                                <p className={`text-sm text-gray-500 leading-relaxed ${isLeft ? 'lg:text-right' : 'lg:text-left'}`}>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="hidden lg:block lg:w-1/2"></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
