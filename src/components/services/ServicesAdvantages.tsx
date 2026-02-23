import { serviceAdvantages } from './servicesData';

export default function ServicesAdvantages() {
    const advantages = Array.isArray(serviceAdvantages) ? serviceAdvantages : [];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="w-8 h-0.5 bg-red-500" />
                        <span className="text-red-600 text-sm font-medium tracking-wider uppercase">
                            Преимущества
                        </span>
                        <div className="w-8 h-0.5 bg-red-500" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Почему выбирают нас
                    </h2>
                    <p className="text-base text-gray-600 max-w-2xl mx-auto">
                        Надёжный партнёр для реализации промышленных проектов любой сложности
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {advantages.length > 0 ? (
                        advantages.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:border-red-100 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 flex items-center justify-center bg-red-50 rounded-xl mb-4 group-hover:bg-red-600 transition-colors duration-300">
                                    <i
                                        className={`${item.icon ?? ''} text-2xl text-red-600 group-hover:text-white transition-colors duration-300`}
                                        aria-hidden="true"
                                    />
                                </div>
                                <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-gray-500">
                            Нет доступных преимуществ.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
