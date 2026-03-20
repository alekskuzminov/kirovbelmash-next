export default function CalculatorFAQ() {
    const faqs = [
        {
            q: 'Насколько точен предварительный расчёт?',
            a: 'Онлайн-калькулятор даёт оценку с точностью ±10%. Точная стоимость определяется после анализа сырья, площадки и технического задания нашими инженерами.',
        },
        {
            q: 'Что входит в стоимость оборудования?',
            a: 'Базовая стоимость включает проектирование, изготовление и заводские испытания оборудования. Монтаж, пусконаладка и обучение рассчитываются отдельно как дополнительные услуги.',
        },
        {
            q: 'Можно ли заказать только часть услуг?',
            a: 'Да, вы можете выбрать любую комбинацию услуг. Однако при заказе полного комплекса вы получаете скидку до 15% и единого ответственного подрядчика.',
        },
        {
            q: 'Какие сроки изготовления оборудования?',
            a: 'Стандартные сроки — от 4 до 12 недель в зависимости от сложности и комплектации. Точные сроки согласовываются при заключении договора.',
        },
        {
            q: 'Есть ли рассрочка или лизинг?',
            a: 'Да, мы предлагаем гибкие условия оплаты: рассрочку до 12 месяцев, а также работаем с лизинговыми компаниями. Подробности обсудите с менеджером.',
        },
        {
            q: 'Какая гарантия на оборудование?',
            a: 'Гарантия на всё поставляемое оборудование — 36 месяцев. Сервисная поддержка — на весь срок эксплуатации.',
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="w-8 h-0.5 bg-red-500"></div>
                        <span className="text-red-600 text-sm font-medium tracking-wider uppercase">Вопросы</span>
                        <div className="w-8 h-0.5 bg-red-500"></div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Частые вопросы</h2>
                    <p className="text-base text-gray-600">Ответы на популярные вопросы о расчёте стоимости</p>
                </div>

                <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
                    {faqs.map((faq, idx) => (
                        <details
                            key={idx}
                            className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
                            itemScope
                            itemProp="mainEntity"
                            itemType="https://schema.org/Question"
                        >
                            <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none">
                                <h4 className="text-sm font-medium text-gray-900 pr-4" itemProp="name">
                                    <a href="#calculator" className="hover:text-red-600 transition-colors">{faq.q}</a>
                                </h4>
                                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                                    <i className="ri-add-line text-lg text-gray-400 group-open:hidden"></i>
                                    <i className="ri-subtract-line text-lg text-red-500 hidden group-open:block"></i>
                                </div>
                            </summary>
                            <div
                                className="px-6 pb-4"
                                itemScope
                                itemProp="acceptedAnswer"
                                itemType="https://schema.org/Answer"
                            >
                                <p className="text-sm text-gray-600 leading-relaxed" itemProp="text">{faq.a}</p>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
