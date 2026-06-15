import Link from 'next/link';
import ContactModalButton from '@/components/common/ContactModalButton';
import FAQSection, { FAQItem } from '@/components/ui/FAQSection';

const intentPaths = [
    {
        icon: 'ri-building-2-line',
        title: 'Нужно запустить производство с нуля',
        description:
            'Подберём линию полного цикла: от приёма и подготовки сырья до прессования и резки готового брикета.',
        href: '#variants',
        linkLabel: 'Сравнить готовые линии',
    },
    {
        icon: 'ri-tools-line',
        title: 'Сырьё уже подготовлено',
        description:
            'Если влажность и фракция подходят для прессования, можно рассматривать отдельный пресс и участок резки.',
        href: '/oborudovanie/briketirujushhee-oborudovanie',
        linkLabel: 'Посмотреть станки',
    },
    {
        icon: 'ri-route-line',
        title: 'Нужно определить состав оборудования',
        description:
            'Состав линии зависит от вида сырья, его влажности, фракции и требуемой производительности.',
        href: '#selection',
        linkLabel: 'Подобрать схему по сырью',
    },
];

const productionStages = [
    {
        icon: 'ri-inbox-archive-line',
        title: 'Приём сырья',
        description: 'Бункер или приёмник обеспечивает равномерную подачу материала в линию.',
    },
    {
        icon: 'ri-hammer-line',
        title: 'Измельчение',
        description: 'Щепу и крупную фракцию измельчают. Для горбыля и обрезков добавляют рубительную машину.',
    },
    {
        icon: 'ri-temp-cold-line',
        title: 'Сушка',
        description: 'Сушильный участок нужен, если влажность сырья превышает 14%.',
    },
    {
        icon: 'ri-database-2-line',
        title: 'Накопление',
        description: 'Бункер перед прессом выравнивает подачу подготовленного сырья.',
    },
    {
        icon: 'ri-settings-5-line',
        title: 'Прессование',
        description: 'Пресс ПБМ формирует брикет Pini Kay из сырья влажностью 8–12% и фракцией до 5 мм.',
    },
    {
        icon: 'ri-scissors-cut-line',
        title: 'Резка',
        description: 'Непрерывный брус охлаждается и нарезается на брикеты заданной длины.',
    },
    {
        icon: 'ri-archive-stack-line',
        title: 'Упаковка',
        description: 'Упаковочный участок добавляется к линии, если он нужен по схеме сбыта.',
    },
];

const selectionRows = [
    {
        material: 'Сухие опилки или стружка',
        condition: 'Влажность 8–12%, фракция до 5 мм',
        equipment: 'Накопительный бункер, пресс ПБМ, охлаждение и резка',
        solution: 'Участок прессования',
    },
    {
        material: 'Свежие опилки или стружка',
        condition: 'Влажность выше 14%',
        equipment: 'Приём сырья, сушильный участок, бункер, пресс и резка',
        solution: 'Линия полного цикла',
    },
    {
        material: 'Технологическая щепа',
        condition: 'Фракция 10–40 мм, часто высокая влажность',
        equipment: 'Дробилка, сушильный участок, накопление, пресс и резка',
        solution: 'Линия с подготовкой щепы',
    },
    {
        material: 'Горбыль, рейка, обрезки',
        condition: 'Крупнокусковые древесные отходы',
        equipment: 'Рубительная машина, затем оборудование для щепы',
        solution: 'Индивидуальная комплектация',
    },
];

const projectSteps = [
    {
        number: '01',
        title: 'Фиксируем исходные данные',
        description: 'Вид сырья, влажность, фракцию, объём сырьевой базы и план выпуска.',
    },
    {
        number: '02',
        title: 'Составляем технологическую схему',
        description: 'Определяем, какие участки действительно нужны и как разместить их в помещении.',
    },
    {
        number: '03',
        title: 'Изготавливаем оборудование',
        description: 'Производим и комплектуем линию под согласованную схему и производительность.',
    },
    {
        number: '04',
        title: 'Монтируем и запускаем',
        description: 'Проводим монтаж, пусконаладку и обучение операторов на площадке заказчика.',
    },
];

const faqs: FAQItem[] = [
    {
        question: 'Можно ли начать производство с одного пресса?',
        answer:
            'Да, если сырьё уже подготовлено: влажность 8–12%, фракция до 5 мм и стабильная подача. Для свежих опилок, щепы или крупнокусковых отходов потребуются дополнительные участки подготовки.',
    },
    {
        question: 'Когда в линии нужна сушилка?',
        answer:
            'Сушильный участок нужен, когда влажность сырья превышает 14%. Перед прессованием Pini Kay рабочая влажность должна находиться в диапазоне 8–12%.',
    },
    {
        question: 'Можно ли перерабатывать горбыль и обрезки?',
        answer:
            'Можно, но рубительная машина не входит в базовый состав линии. Она измельчает горбыль и обрезки в щепу, после чего сырьё проходит дальнейшее измельчение, сушку и прессование.',
    },
    {
        question: 'Как выбрать производительность линии?',
        answer:
            'Сначала определяют доступный объём сырья и план продаж, затем проверяют электроснабжение и площадь помещения. Готовые линии рассчитаны на 500, 800–1000 и 2000 кг готовых брикетов в час.',
    },
    {
        question: 'Что входит в поставку линии под ключ?',
        answer:
            'Формат под ключ включает проектирование, производство оборудования, монтаж, пусконаладку, обучение персонала, гарантийное и постгарантийное обслуживание.',
    },
];

export function BriquettingIntentPaths() {
    return (
        <section className="py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-8 sm:mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-0.5 bg-red-500" />
                        <span className="text-sm font-medium tracking-wider uppercase text-red-600">С чего начать</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Вам нужна готовая линия или отдельное оборудование?
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                        Один и тот же запрос может означать разные задачи. Выберите ближайший сценарий,
                        чтобы сразу перейти к подходящему решению.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {intentPaths.map((path) => (
                        <Link
                            key={path.title}
                            href={path.href}
                            className="group rounded-2xl border border-gray-200 bg-gray-50 p-6 sm:p-7 hover:border-red-200 hover:bg-red-50/40 hover:shadow-md transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 flex items-center justify-center mb-5 group-hover:border-red-200">
                                <i className={`${path.icon} text-2xl text-red-600`} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{path.title}</h3>
                            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-5">
                                {path.description}
                            </p>
                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-600">
                                {path.linkLabel}
                                <i className="ri-arrow-right-line transition-transform group-hover:translate-x-1" />
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function BriquettingEquipmentFlow() {
    return (
        <section className="py-12 sm:py-16 bg-gray-950 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-10 sm:mb-12">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-0.5 bg-red-500" />
                        <span className="text-sm font-medium tracking-wider uppercase text-red-400">Состав производства</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        Какое оборудование потребуется для выпуска брикетов
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                        Полная цепочка состоит из семи участков. Часть из них можно убрать, если сырьё
                        уже высушено и измельчено, или добавить, если на входе крупные древесные отходы.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {productionStages.map((stage, index) => (
                        <div
                            key={stage.title}
                            className="relative rounded-xl border border-white/10 bg-white/5 p-5"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center">
                                    <i className={`${stage.icon} text-xl text-red-400`} />
                                </div>
                                <span className="text-xs font-semibold text-gray-500">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold mb-2">{stage.title}</h3>
                            <p className="text-sm text-gray-400 leading-relaxed">{stage.description}</p>
                        </div>
                    ))}

                    <div className="rounded-xl border border-red-500/30 bg-red-600/10 p-5 flex flex-col justify-between">
                        <div>
                            <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center mb-4">
                                <i className="ri-question-answer-line text-xl text-white" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">Не знаете, что оставить?</h3>
                            <p className="text-sm text-gray-300 leading-relaxed">
                                Достаточно сообщить вид сырья, влажность и нужную производительность.
                            </p>
                        </div>
                        <ContactModalButton
                            message="Подбор состава линии брикетирования по сырью"
                            className="mt-5 inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-red-600 text-sm font-semibold text-white hover:bg-red-700 transition-colors cursor-pointer"
                        >
                            Подобрать состав линии
                        </ContactModalButton>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function BriquettingSelectionMatrix() {
    return (
        <section id="selection" className="py-12 sm:py-16 bg-white scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mb-8 sm:mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-0.5 bg-red-500" />
                        <span className="text-sm font-medium tracking-wider uppercase text-red-600">Подбор по сырью</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        От состояния сырья зависит состав линии
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                        Ниже четыре типовых сценария. Точную комплектацию определяют после проверки
                        влажности, фракции и требуемой производительности.
                    </p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
                    <table className="w-full min-w-[860px] border-collapse bg-white text-sm">
                        <thead>
                            <tr className="bg-gray-900 text-white">
                                <th className="px-5 py-4 text-left font-semibold">Исходное сырьё</th>
                                <th className="px-5 py-4 text-left font-semibold">Состояние</th>
                                <th className="px-5 py-4 text-left font-semibold">Что потребуется</th>
                                <th className="px-5 py-4 text-left font-semibold">Формат решения</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectionRows.map((row, index) => (
                                <tr
                                    key={row.material}
                                    className={`border-t border-gray-100 ${index % 2 === 1 ? 'bg-gray-50/70' : ''}`}
                                >
                                    <td className="px-5 py-5 font-semibold text-gray-900">{row.material}</td>
                                    <td className="px-5 py-5 text-gray-600">{row.condition}</td>
                                    <td className="px-5 py-5 text-gray-600">{row.equipment}</td>
                                    <td className="px-5 py-5">
                                        <span className="inline-flex rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                                            {row.solution}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 px-5 py-4 flex items-start gap-3">
                    <i className="ri-information-line text-xl text-amber-700 mt-0.5" />
                    <p className="text-sm sm:text-base text-amber-950 leading-relaxed">
                        Горбыль и кусковые отходы не относятся к штатному сырью базовой линии.
                        Для них отдельно добавляется рубительная машина, которая переводит материал в щепу.
                    </p>
                </div>
            </div>
        </section>
    );
}

export function BriquettingProjectApproach() {
    return (
        <section className="py-12 sm:py-16 bg-gray-50 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-0.5 bg-red-500" />
                            <span className="text-sm font-medium tracking-wider uppercase text-red-600">Проект под ключ</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-5">
                            Сначала сырьё и площадка. Потом модель линии
                        </h2>
                        <div className="space-y-4 text-base text-gray-600 leading-relaxed">
                            <p>
                                Производительность сама по себе не определяет комплектацию. Две линии
                                на 1000 кг/ч могут заметно отличаться, если одна работает на сухой
                                стружке, а другая на влажной щепе.
                            </p>
                            <p>
                                Поэтому готовые модели служат отправной точкой. Итоговую схему
                                уточняют под фактическое сырьё, электроснабжение и доступную площадь.
                            </p>
                        </div>
                        <ContactModalButton
                            message="Обсуждение проекта линии брикетирования"
                            className="mt-7 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-red-600 text-sm font-semibold text-white hover:bg-red-700 transition-colors cursor-pointer"
                        >
                            Обсудить проект с технологом
                            <i className="ri-arrow-right-line" />
                        </ContactModalButton>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {projectSteps.map((step) => (
                            <div key={step.number} className="rounded-xl bg-white border border-gray-200 p-5 sm:p-6">
                                <span className="text-sm font-bold text-red-600">{step.number}</span>
                                <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2">{step.title}</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export function BriquettingConceptFAQ() {
    return (
        <FAQSection
            items={faqs}
            title="Вопросы о выборе линии и отдельных станков"
            description="Коротко о том, когда нужен полный цикл, а когда достаточно отдельного оборудования."
            includeSchema={false}
        />
    );
}
