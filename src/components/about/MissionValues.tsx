import Image from 'next/image';

export default function MissionValues() {
    const values = [
        {
            icon: 'ri-shield-star-line',
            title: 'Качество',
            description: 'Каждая единица оборудования проходит многоступенчатый контроль качества. Мы используем только проверенные материалы и комплектующие.',
        },
        {
            icon: 'ri-lightbulb-line',
            title: 'Инновации',
            description: 'Постоянно совершенствуем конструкции и технологии. 12 патентов подтверждают наш вклад в развитие отрасли.',
        },
        {
            icon: 'ri-team-line',
            title: 'Партнёрство',
            description: 'Строим долгосрочные отношения с клиентами. 98% заказчиков рекомендуют нас и возвращаются за новым оборудованием.',
        },
        {
            icon: 'ri-customer-service-2-line',
            title: 'Ответственность',
            description: 'Полное сопровождение на всех этапах: от проектирования до пусконаладки и гарантийного обслуживания.',
        },
    ];

    return (
        <section className="py-12 sm:py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
                    <div>
                        <div className="flex items-center space-x-2 mb-3">
                            <div className="w-6 sm:w-8 h-0.5 bg-red-500"></div>
                            <span className="text-red-600 text-xs sm:text-sm font-medium tracking-wider uppercase">Миссия и ценности</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-5">
                            Создаём оборудование,<br />которому доверяют
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-6 sm:mb-8">
                            Наша миссия — обеспечить российские предприятия надёжным и производительным оборудованием
                            для переработки биомассы. Мы верим, что качественное оборудование — основа успешного бизнеса наших клиентов.
                        </p>
                        <div className="relative w-full h-[200px] sm:h-[300px] rounded-xl overflow-hidden">
                            <Image
                                src="/images/backgrounds/about-mission-bg.webp"
                                alt="Производственный цех КировБелМаш"
                                fill
                                className="object-cover object-top"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {values.map((item, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl p-5 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-red-50 rounded-lg mb-3 sm:mb-4 group-hover:bg-red-600 transition-colors duration-300">
                                    <i className={`${item.icon} text-xl sm:text-2xl text-red-600 group-hover:text-white transition-colors duration-300`}></i>
                                </div>
                                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1.5 sm:mb-2">{item.title}</h3>
                                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
