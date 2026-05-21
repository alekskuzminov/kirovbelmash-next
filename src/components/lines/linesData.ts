export interface LineVariant {
    id: string;
    capacity: string;
    name: string;
    price: string;
    power: string;
    rawMaterial: string;
    product: string;
    image: string;
    // Detail page fields
    description: string;
    deliveryWeeks: string;
    rfComplect: string;
    renders: string[];
    schemes: string[];
    composition: string[];

    // New Specs (optional for now)
    installedPower?: string;
    consumedPower?: string;
    staff?: string;
    rawMoisture?: string;
    installationArea?: string;
    ceilingHeight?: string;

    seoTitle?: string;
}

export const lineVariants: Record<'briquetting' | 'granulation' | 'drying', LineVariant[]> = {
    briquetting: [
        {
            id: 'liniya-briketirovaniya-500',
            capacity: '500 кг/час',
            name: 'Линия по производству топливных брикетов 500 кг/час',
            seoTitle: 'Линия брикетирования 500 кг/ч - цена и характеристики',
            price: 'от 10 524 000 руб.',
            power: '101 кВт',
            installedPower: '101 кВт',
            consumedPower: '71 кВт',
            staff: '2-3 человека',
            rawMaterial: 'Опил, щепа, лузга',
            rawMoisture: 'Естественная до 55%',
            product: 'Брикет Pini & Kay',
            installationArea: '200 м²',
            ceilingHeight: 'Не менее 5 м',
            image: '/images/lines/briquetting/briquetting-500/preview-briquette-line-500.jpg',
            description: 'Для переработки опилок, стружки и щепы в топливные брикеты. Цена от 10,5 млн ₽. Проектирование, изготовление, поставка и запуск под ключ.',
            deliveryWeeks: '8 недель',
            rfComplect: 'от 95 %',
            renders: [
                '/images/lines/briquetting/briquetting-500/renders/render-briquette-500-1.webp',
                '/images/lines/briquetting/briquetting-500/renders/render-briquette-500-2.webp',
                '/images/lines/briquetting/briquetting-500/renders/render-briquette-500-3.webp',
                '/images/lines/briquetting/briquetting-500/renders/render-briquette-500-4.webp',
            ],
            schemes: [
                '/images/lines/briquetting/briquetting-500/schemes/scheme-briquette-500-1.webp',
                '/images/lines/briquetting/briquetting-500/schemes/scheme-briquette-500-2.webp',
                '/images/lines/briquetting/briquetting-500/schemes/scheme-briquette-500-3.webp',
                '/images/lines/briquetting/briquetting-500/schemes/scheme-briquette-500-4.webp',
            ],
            composition: [
                'Рубительная машина / измельчитель',
                'Молотковая дробилка',
                'Теплогенератор для сушки',
                'Сушильный барабан',
                'Бункер-накопитель с ворошителем',
                'Пресс для брикетов Pini & Kay',
                'Автомат резки брикетов',
                'Система автоматики и управления',
            ],
        },
        {
            id: 'liniya-briketirovaniya-1000',
            capacity: '800-1000 кг/час',
            name: 'Линия по производству топливных брикетов 1000 кг/час',
            seoTitle: 'Линия брикетирования 1000 кг/ч - цена и характеристики',
            price: 'от 12 946 000 руб.',
            power: '148 кВт',
            installedPower: '148 кВт',
            consumedPower: '104 кВт',
            staff: '2-4 человека',
            rawMaterial: 'Опил, щепа, лузга',
            rawMoisture: 'Естественная до 55%',
            product: 'Брикет Pini & Kay',
            installationArea: '200 м²',
            ceilingHeight: 'Не менее 5 м',
            image: '/images/lines/briquetting/briquetting-1000/preview-briquette-line-1000.webp',
            description: 'Производительное решение для выпуска топливных брикетов из древесного сырья. Цена от 12,9 млн ₽. Поставка, запуск и ввод линии в работу под ключ.',
            deliveryWeeks: '10 недель',
            rfComplect: 'от 95 %',
            renders: [
                '/images/lines/briquetting/briquetting-1000/renders/render-briquette-1000-1.webp',
                '/images/lines/briquetting/briquetting-1000/renders/render-briquette-1000-2.webp',
                '/images/lines/briquetting/briquetting-1000/renders/render-briquette-1000-3.webp',
                '/images/lines/briquetting/briquetting-1000/renders/render-briquette-1000-4.webp',
            ],
            schemes: [
                '/images/lines/briquetting/briquetting-1000/schemes/scheme-briquette-1000-1.webp',
                '/images/lines/briquetting/briquetting-1000/schemes/scheme-briquette-1000-2.webp',
                '/images/lines/briquetting/briquetting-1000/schemes/scheme-briquette-1000-3.webp',
                '/images/lines/briquetting/briquetting-1000/schemes/scheme-briquette-1000-4.webp',
            ],
            composition: [
                'Рубительная машина / измельчитель',
                'Молотковая дробилка (2 шт.)',
                'Теплогенератор для сушки',
                'Сушильный барабан АВМ-1,5',
                'Бункер-накопитель с ворошителем',
                'Пресс для брикетов (2 шт.)',
                'Автомат резки брикетов',
                'Система автоматики и управления',
            ],
        },
        {
            id: 'liniya-briketirovaniya-2000',
            capacity: '2000 кг/час',
            name: 'Линия по производству топливных брикетов 2000 кг/час',
            seoTitle: 'Линия брикетирования 2000 кг/ч - цена и характеристики',
            price: 'от 33 030 000 руб.',
            power: '398 кВт',
            installedPower: '398 кВт',
            consumedPower: '280 кВт',
            staff: '2-3 человека',
            rawMaterial: 'Опил, щепа, лузга',
            rawMoisture: 'Естественная до 55%',
            product: 'Брикет Pini & Kay',
            installationArea: '400 м²',
            ceilingHeight: 'Не менее 6 м',
            image: '/images/lines/briquetting/briquetting-2000/preview-briquette-line-2000.webp',
            description: 'Флагманская линия для крупных производств по переработке древесного сырья. Цена от 33 млн ₽. Подбор, изготовление, поставка и запуск под ключ.',
            deliveryWeeks: '14 недель',
            rfComplect: 'от 95 %',
            renders: [
                '/images/lines/briquetting/briquetting-2000/renders/render-briquette-2000-1.webp',
                '/images/lines/briquetting/briquetting-2000/renders/render-briquette-2000-2.webp',
                '/images/lines/briquetting/briquetting-2000/renders/render-briquette-2000-3.webp',
                '/images/lines/briquetting/briquetting-2000/renders/render-briquette-2000-4.webp',
            ],
            schemes: [
                '/images/lines/briquetting/briquetting-2000/schemes/scheme-briquette-2000-1.webp',
                '/images/lines/briquetting/briquetting-2000/schemes/scheme-briquette-2000-2.webp',
                '/images/lines/briquetting/briquetting-2000/schemes/scheme-briquette-2000-3.webp',
                '/images/lines/briquetting/briquetting-2000/schemes/scheme-briquette-2000-4.webp',
            ],
            composition: [
                'Рубительная машина / измельчитель',
                'Молотковая дробилка (2 шт.)',
                'Теплогенератор ТГМ-1,5',
                'Сушильный барабан АВМ-1,5 (2 шт.)',
                'Бункеры-накопители с ворошителем',
                'Пресс для брикетов Pini & Kay (4 шт.)',
                'Автомат резки брикетов (2 шт.)',
                'Пневмотранспортная система',
                'Упаковочная линия',
                'Система автоматики и управления',
            ],
        },
    ],
    granulation: [
        {
            id: 'liniya-granulirovaniya-500',
            capacity: '500 кг/час',
            name: 'Линия по производству топливных пеллет 500 кг/час',
            price: 'от 9 200 000 руб.',
            power: '97 кВт',
            installedPower: '97 кВт',
            consumedPower: '68 кВт',
            staff: '2-3 человека',
            rawMaterial: 'Опил, щепа, лузга',
            rawMoisture: 'Естественная до 55%',
            product: 'Гранулы 6–8 мм',
            installationArea: '200 м²',
            ceilingHeight: 'Не менее 5 м',
            image: '/images/lines/granulation/granulation-500/preview-pellets-line-500.webp',
            description: 'Стартовая линия гранулирования для производства пеллет класса ENplus. Оптимальна для малого бизнеса и первого вхождения в рынок биотоплива.',
            deliveryWeeks: '8 недель',
            rfComplect: 'от 90 %',
            renders: [
                '/images/lines/granulation/granulation-500/renders/render-pellets-500-1.webp',
                '/images/lines/granulation/granulation-500/renders/render-pellets-500-2.webp',
                '/images/lines/granulation/granulation-500/renders/render-pellets-500-3.webp',
                '/images/lines/granulation/granulation-500/renders/render-pellets-500-4.webp',
            ],
            schemes: [
                '/images/lines/granulation/granulation-500/schemes/scheme-pellets-500-1.webp',
                '/images/lines/granulation/granulation-500/schemes/scheme-pellets-500-2.webp',
                '/images/lines/granulation/granulation-500/schemes/scheme-pellets-500-3.webp',
                '/images/lines/granulation/granulation-500/schemes/scheme-pellets-500-4.webp',
            ],
            composition: [
                'Рубительная машина / измельчитель',
                'Молотковая дробилка',
                'Теплогенератор для сушки',
                'Сушильный барабан',
                'Гранулятор-пеллетайзер ОГМ-1,5',
                'Колонна охлаждения гранул',
                'Бункер-накопитель с ворошителем',
                'Система автоматики и управления',
            ],
        },
        {
            id: 'liniya-granulirovaniya-1000',
            capacity: '1000 кг/час',
            name: 'Линия по производству топливных пеллет 1000 кг/час',
            price: 'от 14 800 000 руб.',
            power: '153 кВт',
            installedPower: '153 кВт',
            consumedPower: '108 кВт',
            staff: '2-3 человека',
            rawMaterial: 'Опил, щепа, лузга',
            rawMoisture: 'Естественная до 55%',
            product: 'Гранулы 6–8 мм',
            installationArea: '200 м²',
            ceilingHeight: 'Не менее 5 м',
            image: '/images/lines/granulation/granulation-1000/preview-pellets-line-1000.webp',
            description: 'Эффективная линия гранулирования с двойной гранулирующей установкой. Идеальна для предприятий со стабильным потоком сырья.',
            deliveryWeeks: '10 недель',
            rfComplect: 'от 90 %',
            renders: [
                '/images/lines/granulation/granulation-1000/renders/render-pellets-1000-1.webp',
                '/images/lines/granulation/granulation-1000/renders/render-pellets-1000-2.webp',
                '/images/lines/granulation/granulation-1000/renders/render-pellets-1000-3.webp',
                '/images/lines/granulation/granulation-1000/renders/render-pellets-1000-4.webp',
            ],
            schemes: [
                '/images/lines/granulation/granulation-1000/schemes/scheme-pellets-1000-1.webp',
                '/images/lines/granulation/granulation-1000/schemes/scheme-pellets-1000-2.webp',
                '/images/lines/granulation/granulation-1000/schemes/scheme-pellets-1000-3.webp',
                '/images/lines/granulation/granulation-1000/schemes/scheme-pellets-1000-4.webp',
            ],
            composition: [
                'Рубительная машина / измельчитель',
                'Молотковая дробилка',
                'Теплогенератор для сушки',
                'Сушильный барабан АВМ-1,5',
                'Гранулятор-пеллетайзер (2 шт.)',
                'Колонна охлаждения гранул',
                'Бункер-накопитель с ворошителем',
                'Система автоматики и управления',
            ],
        },
        {
            id: 'liniya-granulirovaniya-2000',
            capacity: '2000 кг/час',
            name: 'Линия по производству топливных пеллет 2000 кг/час',
            price: 'от 34 511 000 руб.',
            power: '341 кВт',
            installedPower: '341 кВт',
            consumedPower: '240 кВт',
            staff: '2-3 человека',
            rawMaterial: 'Опил, щепа, лузга',
            rawMoisture: 'Естественная до 55%',
            product: 'Гранулы 6–8 мм',
            installationArea: '400 м²',
            ceilingHeight: 'Не менее 6 м',
            image: '/images/lines/granulation/granulation-2000/preview-pellets-line-2000.webp',
            description: 'Максимально производительная линия гранулирования для крупных лесопромышленных холдингов. Полная автоматизация и экспортное качество.',
            deliveryWeeks: '14 недель',
            rfComplect: 'от 90 %',
            renders: [
                '/images/lines/granulation/granulation-2000/renders/render-pellets-2000-1.webp',
                '/images/lines/granulation/granulation-2000/renders/render-pellets-2000-2.webp',
                '/images/lines/granulation/granulation-2000/renders/render-pellets-2000-3.webp',
                '/images/lines/granulation/granulation-2000/renders/render-pellets-2000-4.webp',
            ],
            schemes: [
                '/images/lines/granulation/granulation-2000/schemes/scheme-pellets-2000-1.webp',
                '/images/lines/granulation/granulation-2000/schemes/scheme-pellets-2000-2.webp',
                '/images/lines/granulation/granulation-2000/schemes/scheme-pellets-2000-3.webp',
                '/images/lines/granulation/granulation-2000/schemes/scheme-pellets-2000-4.webp',
            ],
            composition: [
                'Рубительная машина / измельчитель',
                'Молотковая дробилка (2 шт.)',
                'Теплогенератор ТГМ-1,5',
                'Сушильный барабан АВМ-1,5 (2 шт.)',
                'Гранулятор-пеллетайзер (4 шт.)',
                'Колонна охлаждения гранул',
                'Бункеры-накопители с ворошителем',
                'Пневмотранспортная система',
                'Система упаковки и маркировки',
                'Система автоматики и управления',
            ],
        },
    ],
    drying: [
        {
            id: 'sushilnaya-liniya-500',
            capacity: '500 кг/час',
            name: 'Сушильная линия 500 кг/час',
            price: 'от 6 097 000 руб.',
            power: '21 кВт',
            installedPower: '21 кВт',
            consumedPower: '15 кВт',
            staff: '1-2 человека',
            rawMaterial: 'Опил, щепа, лузга',
            rawMoisture: 'Естественная до 55%',
            product: 'Сухой опил, лузга и т.д. влажностью 6-12%',
            installationArea: '150 м²',
            ceilingHeight: 'Не менее 5 м',
            image: '/images/lines/drying/drying-500/preview-drying-line-500.webp',
            description: 'Компактная сушильная линия для подготовки сырья к брикетированию или гранулированию. Обеспечивает стабильную влажность на выходе не более 12%.',
            deliveryWeeks: '6 недель',
            rfComplect: 'от 95 %',
            renders: [
                '/images/lines/drying/drying-500/renders/render-drying-500-1.webp',
                '/images/lines/drying/drying-500/renders/render-drying-500-2.webp',
                '/images/lines/drying/drying-500/renders/render-drying-500-3.webp',
                '/images/lines/drying/drying-500/renders/render-drying-500-4.webp',
            ],
            schemes: [
                '/images/lines/drying/drying-500/schemes/scheme-drying-500-1.webp',
                '/images/lines/drying/drying-500/schemes/scheme-drying-500-2.webp',
                '/images/lines/drying/drying-500/schemes/scheme-drying-500-3.webp',
                '/images/lines/drying/drying-500/schemes/scheme-drying-500-4.webp',
            ],
            composition: [
                'Теплогенератор ТГК-1,0',
                'Сушильный барабан АВМ-0,65',
                'Циклон-осадитель для опилок',
                'Шлюзовой затвор',
                'Вентиляторы рециркуляции',
                'Система автоматики и управления',
            ],
        },
        {
            id: 'sushilnaya-liniya-1000',
            capacity: '1000 кг/час',
            name: 'Сушильная линия 1000 кг/час',
            price: 'от 7 769 000 руб.',
            power: '38 кВт',
            installedPower: '38 кВт',
            consumedPower: '27 кВт',
            staff: '1-2 человека',
            rawMaterial: 'Опил, щепа, лузга',
            rawMoisture: 'Естественная до 55%',
            product: 'Сухой опил, лузга и т.д. влажностью 6-12%',
            installationArea: '150 м²',
            ceilingHeight: 'Не менее 5 м',
            image: '/images/lines/drying/drying-1000/preview-drying-line-1000.webp',
            description: 'Среднеформатная сушильная линия с высокой эффективностью теплообмена. Оптимальное решение для лесопилок и деревообрабатывающих производств.',
            deliveryWeeks: '8 недель',
            rfComplect: 'от 95 %',
            renders: [
                '/images/lines/drying/drying-1000/renders/render-drying-1000-1.webp',
                '/images/lines/drying/drying-1000/renders/render-drying-1000-2.webp',
                '/images/lines/drying/drying-1000/renders/render-drying-1000-3.webp',
                '/images/lines/drying/drying-1000/renders/render-drying-1000-4.webp',
            ],
            schemes: [
                '/images/lines/drying/drying-1000/schemes/scheme-drying-1000-1.webp',
                '/images/lines/drying/drying-1000/schemes/scheme-drying-1000-2.webp',
                '/images/lines/drying/drying-1000/schemes/scheme-drying-1000-3.webp',
                '/images/lines/drying/drying-1000/schemes/scheme-drying-1000-4.webp',
            ],
            composition: [
                'Теплогенератор ТГМ-1,5',
                'Сушильный барабан АВМ-1,5',
                'Циклон-осадитель для опилок УЦ-1600',
                'Шлюзовой затвор',
                'Бункер-накопитель с ворошителем',
                'Вентиляторы рециркуляции',
                'Система автоматики и управления',
            ],
        },
        {
            id: 'sushilnaya-liniya-2000',
            capacity: '2000 кг/час',
            name: 'Сушильная линия 2000 кг/час',
            price: 'от 21 631 000 руб.',
            power: '101 кВт',
            installedPower: '101 кВт',
            consumedPower: '71 кВт',
            staff: '1-2 человека',
            rawMaterial: 'Опил, щепа, лузга',
            rawMoisture: 'Естественная до 55%',
            product: 'Сухой опил, лузга и т.д. влажностью 6-12%',
            installationArea: '250 м²',
            ceilingHeight: 'Не менее 6 м',
            image: '/images/lines/drying/drying-2000/preview-drying-line-2000.webp',
            description: 'Высокопроизводительная сушильная линия для крупнейших лесопромышленных комплексов. Максимальная автоматизация и минимальное потребление энергии.',
            deliveryWeeks: '12 недель',
            rfComplect: 'от 95 %',
            renders: [
                '/images/lines/drying/drying-2000/renders/render-drying-2000-1.webp',
                '/images/lines/drying/drying-2000/renders/render-drying-2000-2.webp',
                '/images/lines/drying/drying-2000/renders/render-drying-2000-3.webp',
                '/images/lines/drying/drying-2000/renders/render-drying-2000-4.webp',
            ],
            schemes: [
                '/images/lines/drying/drying-2000/schemes/scheme-drying-2000-1.webp',
                '/images/lines/drying/drying-2000/schemes/scheme-drying-2000-2.webp',
                '/images/lines/drying/drying-2000/schemes/scheme-drying-2000-3.webp',
                '/images/lines/drying/drying-2000/schemes/scheme-drying-2000-4.webp',
            ],
            composition: [
                'Теплогенератор ТГВГ-1,0 (2 шт.)',
                'Сушильный барабан АВМ-1,5 (2 шт.)',
                'Циклон-осадитель для опилок УЦ-2500 (2 шт.)',
                'Шлюзовой затвор (4 шт.)',
                'Бункеры-накопители с ворошителем',
                'Конвейер подачи сырья',
                'Вентиляторы рециркуляции',
                'Система автоматики и управления',
            ],
        },
    ],
};

// Helper: find any variant by id
export function findLineVariant(id: string): LineVariant | undefined {
    for (const variants of Object.values(lineVariants)) {
        const found = variants.find((v) => v.id === id);
        if (found) return found;
    }
    return undefined;
}

// Helper: get all ids for generateStaticParams
export function getAllLineIds(): string[] {
    return Object.values(lineVariants).flatMap((variants) => variants.map((v) => v.id));
}

// Helper: get back-link for a variant
export function getLineBackLink(id: string): string {
    if (id.startsWith('liniya-briketirovaniya')) return '/linii-briketirovaniya';
    if (id.startsWith('liniya-granulirovaniya')) return '/linii-granulirovaniya';
    return '/sushilnie-linii';
}
