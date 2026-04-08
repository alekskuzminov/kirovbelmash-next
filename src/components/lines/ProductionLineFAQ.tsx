import FAQJsonLd from '@/components/ui/FAQJsonLd';

const faqs = [
    {
        question: 'Какие сроки изготовления линии?',
        answer: 'Стандартные сроки — от 8 до 16 недель в зависимости от производительности и комплектации. Точные сроки фиксируются в договоре после согласования технического задания.',
    },
    {
        question: 'Что входит в стоимость линии?',
        answer: 'В стоимость входят проектирование, изготовление всех единиц оборудования и заводские испытания. Монтаж, пусконаладка и обучение персонала — дополнительные услуги, которые можно заказать отдельно или в комплексе со скидкой до 15%.',
    },
    {
        question: 'Какое сырьё подходит для линии?',
        answer: 'Линии работают с опилками, стружкой, щепой, горбылём, лузгой подсолнечника, соломой и другими древесными и сельскохозяйственными отходами. Влажность исходного сырья — до 55%, перед прессованием сырьё проходит сушку до 8–12%.',
    },
    {
        question: 'Какая гарантия на оборудование?',
        answer: 'Гарантия на всё оборудование — 36 месяцев. Сервисная поддержка и поставка запчастей — на весь срок эксплуатации. Запчасти отправляются в день заказа со склада в Кировской области.',
    },
    {
        question: 'Можно ли расширить линию позже?',
        answer: 'Да, все наши линии модульные. Можно добавить второй пресс, увеличить объём сушки или подключить дополнительный бункер без переделки существующего оборудования.',
    },
];

export default function ProductionLineFAQ() {
    return (
        <section className="py-12 sm:py-16 bg-white">
            <FAQJsonLd items={faqs} />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-12">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="w-8 h-0.5 bg-red-500" />
                        <span className="text-red-600 text-sm font-medium tracking-wider uppercase">Вопросы</span>
                        <div className="w-8 h-0.5 bg-red-500" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        Частые вопросы о производственных линиях
                    </h2>
                </div>

                <div className="space-y-3 sm:space-y-4">
                    {faqs.map((faq, idx) => (
                        <details
                            key={idx}
                            className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
                        >
                            <summary className="flex items-center justify-between px-5 sm:px-6 py-4 cursor-pointer list-none">
                                <h3 className="text-sm sm:text-base font-medium text-gray-900 pr-4">{faq.question}</h3>
                                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                                    <i className="ri-add-line text-lg text-gray-400 group-open:hidden" />
                                    <i className="ri-subtract-line text-lg text-red-500 hidden group-open:block" />
                                </div>
                            </summary>
                            <div className="px-5 sm:px-6 pb-4">
                                <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
