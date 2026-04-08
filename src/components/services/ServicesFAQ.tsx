import FAQJsonLd from '@/components/ui/FAQJsonLd';

const faqs = [
    {
        question: 'Можно заказать только одну услугу, без полного комплекса?',
        answer: 'Да, каждая услуга доступна отдельно. Но при заказе полного комплекса (проектирование + монтаж + пусконаладка + обучение) вы получаете скидку до 15% и единого ответственного подрядчика за весь проект.',
    },
    {
        question: 'В каких регионах вы оказываете услуги?',
        answer: 'Мы работаем по всей России. Наши монтажные бригады выполнили проекты в 35+ регионах — от Калининграда до Дальнего Востока. Командировочные расходы включаются в стоимость услуги.',
    },
    {
        question: 'Сколько времени занимает монтаж линии?',
        answer: 'Монтаж занимает от 1 до 4 недель в зависимости от сложности и производительности линии. Точные сроки согласовываются на этапе проектирования и фиксируются в договоре.',
    },
    {
        question: 'Что входит в обучение персонала?',
        answer: 'Обучение включает теоретическую подготовку и практическую работу на оборудовании. Ваши операторы учатся управлять линией, выполнять ежедневное обслуживание и диагностировать типовые неисправности. Срок обучения — 3–5 рабочих дней.',
    },
];

export default function ServicesFAQ() {
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
                        Частые вопросы об услугах
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
