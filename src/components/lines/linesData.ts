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
}

export const lineVariants: Record<'briquetting' | 'granulation' | 'drying', LineVariant[]> = {
    briquetting: [
        {
            id: 'liniya-briketirovaniya-500',
            capacity: '500 кг/час',
            name: 'Линия по производству топливных брикетов 500 кг/час',
            price: 'от 10 524 000 руб.',
            power: '101 кВт',
            rawMaterial: 'Опил, щепа, горбыль, лузга',
            product: 'Топливный брикет Pini & Kay',
            image: '/images/lines/briquetting/preview-briquette-line.jpg',
            description: 'Комплексное решение для переработки древесных отходов в высококачественные топливные брикеты. Идеален для предприятий любого масштаба.',
            deliveryWeeks: '8 недель',
            rfComplect: 'от 95 %',
            renders: [
                '/images/lines/briquetting/briquetting-500/renders/render-1.jpg',
                '/images/lines/briquetting/briquetting-500/renders/render-2.jpg',
                '/images/lines/briquetting/briquetting-500/renders/render-3.jpg',
                '/images/lines/briquetting/briquetting-500/renders/render-4.jpg',
            ],
            schemes: [
                '/images/lines/briquetting/briquetting-500/schemes/scheme-1.jpg',
                '/images/lines/briquetting/briquetting-500/schemes/scheme-2.jpg',
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
            capacity: '1000 кг/час',
            name: 'Линия по производству топливных брикетов 1000 кг/час',
            price: 'от 12 946 000 руб.',
            power: '148 кВт',
            rawMaterial: 'Опил, щепа, горбыль, лузга',
            product: 'Топливный брикет Pini & Kay',
            image: '/images/lines/briquetting/preview-briquette-line.jpg',
            description: 'Производительная линия брикетирования с двойной загрузкой для крупных деревообрабатывающих предприятий и лесозаготовительных комплексов.',
            deliveryWeeks: '10 недель',
            rfComplect: 'от 95 %',
            renders: [
                '/images/lines/briquetting/briquetting-1000/renders/render-1.jpg',
                '/images/lines/briquetting/briquetting-1000/renders/render-2.jpg',
                '/images/lines/briquetting/briquetting-1000/renders/render-3.jpg',
                '/images/lines/briquetting/briquetting-1000/renders/render-4.jpg',
            ],
            schemes: [
                '/images/lines/briquetting/briquetting-1000/schemes/scheme-1.jpg',
                '/images/lines/briquetting/briquetting-1000/schemes/scheme-2.jpg',
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
            id: 'liniya-briketirovaniya-1200',
            capacity: '1200 кг/час',
            name: 'Линия по производству топливных брикетов 1200 кг/час',
            price: 'от 23 173 000 руб.',
            power: '255 кВт',
            rawMaterial: 'Опил, щепа, горбыль, лузга',
            product: 'Топливный брикет Pini & Kay',
            image: '/images/lines/briquetting/preview-briquette-line.jpg',
            description: 'Высокопроизводительная линия брикетирования для промышленного уровня переработки древесины. Полная автоматизация всех процессов.',
            deliveryWeeks: '12 недель',
            rfComplect: 'от 95 %',
            renders: [
                '/images/lines/briquetting/briquetting-1200/renders/render-1.jpg',
                '/images/lines/briquetting/briquetting-1200/renders/render-2.jpg',
                '/images/lines/briquetting/briquetting-1200/renders/render-3.jpg',
                '/images/lines/briquetting/briquetting-1200/renders/render-4.jpg',
            ],
            schemes: [
                '/images/lines/briquetting/briquetting-1200/schemes/scheme-1.jpg',
                '/images/lines/briquetting/briquetting-1200/schemes/scheme-2.jpg',
            ],
            composition: [
                'Рубительная машина / измельчитель',
                'Молотковая дробилка',
                'Теплогенератор ТГМ-1,5',
                'Сушильный барабан АВМ-1,5',
                'Бункер-накопитель с ворошителем V=6 м³',
                'Пресс для брикетов Pini & Kay (3 шт.)',
                'Автомат резки брикетов',
                'Пневмотранспортная система',
                'Система автоматики и управления',
            ],
        },
        {
            id: 'liniya-briketirovaniya-2000',
            capacity: '2000 кг/час',
            name: 'Линия по производству топливных брикетов 2000 кг/час',
            price: 'от 33 030 000 руб.',
            power: '398 кВт',
            rawMaterial: 'Опил, щепа, горбыль, лузга',
            product: 'Топливный брикет Pini & Kay',
            image: '/images/lines/briquetting/preview-briquette-line.jpg',
            description: 'Флагманская линия брикетирования для крупнейших производств. Максимальная производительность и полный контроль качества на каждом этапе.',
            deliveryWeeks: '14 недель',
            rfComplect: 'от 95 %',
            renders: [
                '/images/lines/briquetting/briquetting-2000/renders/render-1.jpg',
                '/images/lines/briquetting/briquetting-2000/renders/render-2.jpg',
                '/images/lines/briquetting/briquetting-2000/renders/render-3.jpg',
                '/images/lines/briquetting/briquetting-2000/renders/render-4.jpg',
            ],
            schemes: [
                '/images/lines/briquetting/briquetting-2000/schemes/scheme-1.jpg',
                '/images/lines/briquetting/briquetting-2000/schemes/scheme-2.jpg',
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
            power: '95 кВт',
            rawMaterial: 'Опил, щепа, солома, лузга',
            product: 'Топливная пеллета ENplus A1/A2',
            image: '/images/lines/granulation/preview-granulation-line.jpg',
            description: 'Стартовая линия гранулирования для производства пеллет класса ENplus. Оптимальна для малого бизнеса и первого вхождения в рынок биотоплива.',
            deliveryWeeks: '8 недель',
            rfComplect: 'от 90 %',
            renders: [
                '/images/lines/granulation/granulation-500/renders/render-1.jpg',
                '/images/lines/granulation/granulation-500/renders/render-2.jpg',
                '/images/lines/granulation/granulation-500/renders/render-3.jpg',
                '/images/lines/granulation/granulation-500/renders/render-4.jpg',
            ],
            schemes: [
                '/images/lines/granulation/granulation-500/schemes/scheme-1.jpg',
                '/images/lines/granulation/granulation-500/schemes/scheme-2.jpg',
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
            power: '165 кВт',
            rawMaterial: 'Опил, щепа, солома, лузга',
            product: 'Топливная пеллета ENplus A1/A2',
            image: '/images/lines/granulation/preview-granulation-line.jpg',
            description: 'Эффективная линия гранулирования с двойной гранулирующей установкой. Идеальна для предприятий со стабильным потоком сырья.',
            deliveryWeeks: '10 недель',
            rfComplect: 'от 90 %',
            renders: [
                '/images/lines/granulation/granulation-1000/renders/render-1.jpg',
                '/images/lines/granulation/granulation-1000/renders/render-2.jpg',
                '/images/lines/granulation/granulation-1000/renders/render-3.jpg',
                '/images/lines/granulation/granulation-1000/renders/render-4.jpg',
            ],
            schemes: [
                '/images/lines/granulation/granulation-1000/schemes/scheme-1.jpg',
                '/images/lines/granulation/granulation-1000/schemes/scheme-2.jpg',
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
            id: 'liniya-granulirovaniya-1200',
            capacity: '1200 кг/час',
            name: 'Линия по производству топливных пеллет 1200 кг/час',
            price: 'от 21 500 000 руб.',
            power: '240 кВт',
            rawMaterial: 'Опил, щепа, солома, лузга',
            product: 'Топливная пеллета ENplus A1/A2',
            image: '/images/lines/granulation/preview-granulation-line.jpg',
            description: 'Промышленная линия гранулирования с высокой производительностью. Обеспечивает стабильный выпуск пеллет европейского качества ENplus A1.',
            deliveryWeeks: '12 недель',
            rfComplect: 'от 90 %',
            renders: [
                '/images/lines/granulation/granulation-1200/renders/render-1.jpg',
                '/images/lines/granulation/granulation-1200/renders/render-2.jpg',
                '/images/lines/granulation/granulation-1200/renders/render-3.jpg',
                '/images/lines/granulation/granulation-1200/renders/render-4.jpg',
            ],
            schemes: [
                '/images/lines/granulation/granulation-1200/schemes/scheme-1.jpg',
                '/images/lines/granulation/granulation-1200/schemes/scheme-2.jpg',
            ],
            composition: [
                'Рубительная машина / измельчитель',
                'Молотковая дробилка',
                'Теплогенератор ТГМ-1,5',
                'Сушильный барабан АВМ-1,5',
                'Гранулятор-пеллетайзер (3 шт.)',
                'Колонна охлаждения гранул',
                'Бункер-накопитель V=6 м³',
                'Пневмотранспортная система',
                'Система автоматики и управления',
            ],
        },
        {
            id: 'liniya-granulirovaniya-2000',
            capacity: '2000 кг/час',
            name: 'Линия по производству топливных пеллет 2000 кг/час',
            price: 'от 31 700 000 руб.',
            power: '380 кВт',
            rawMaterial: 'Опил, щепа, солома, лузга',
            product: 'Топливная пеллета ENplus A1/A2',
            image: '/images/lines/granulation/preview-granulation-line.jpg',
            description: 'Максимально производительная линия гранулирования для крупных лесопромышленных холдингов. Полная автоматизация и экспортное качество.',
            deliveryWeeks: '14 недель',
            rfComplect: 'от 90 %',
            renders: [
                '/images/lines/granulation/granulation-2000/renders/render-1.jpg',
                '/images/lines/granulation/granulation-2000/renders/render-2.jpg',
                '/images/lines/granulation/granulation-2000/renders/render-3.jpg',
                '/images/lines/granulation/granulation-2000/renders/render-4.jpg',
            ],
            schemes: [
                '/images/lines/granulation/granulation-2000/schemes/scheme-1.jpg',
                '/images/lines/granulation/granulation-2000/schemes/scheme-2.jpg',
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
            price: 'от 4 100 000 руб.',
            power: '45 кВт',
            rawMaterial: 'Опил, щепа, кора, лузга',
            product: 'Сухое сырьё W ≤ 12%',
            image: '/images/lines/drying/preview-drying-line.jpg',
            description: 'Компактная сушильная линия для подготовки сырья к брикетированию или гранулированию. Обеспечивает стабильную влажность на выходе не более 12%.',
            deliveryWeeks: '6 недель',
            rfComplect: 'от 95 %',
            renders: [
                '/images/lines/drying/drying-500/renders/render-1.jpg',
                '/images/lines/drying/drying-500/renders/render-2.jpg',
                '/images/lines/drying/drying-500/renders/render-3.jpg',
                '/images/lines/drying/drying-500/renders/render-4.jpg',
            ],
            schemes: [
                '/images/lines/drying/drying-500/schemes/scheme-1.jpg',
                '/images/lines/drying/drying-500/schemes/scheme-2.jpg',
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
            price: 'от 6 800 000 руб.',
            power: '80 кВт',
            rawMaterial: 'Опил, щепа, кора, лузга',
            product: 'Сухое сырьё W ≤ 12%',
            image: '/images/lines/drying/preview-drying-line.jpg',
            description: 'Среднеформатная сушильная линия с высокой эффективностью теплообмена. Оптимальное решение для лесопилок и деревообрабатывающих производств.',
            deliveryWeeks: '8 недель',
            rfComplect: 'от 95 %',
            renders: [
                '/images/lines/drying/drying-1000/renders/render-1.jpg',
                '/images/lines/drying/drying-1000/renders/render-2.jpg',
                '/images/lines/drying/drying-1000/renders/render-3.jpg',
                '/images/lines/drying/drying-1000/renders/render-4.jpg',
            ],
            schemes: [
                '/images/lines/drying/drying-1000/schemes/scheme-1.jpg',
                '/images/lines/drying/drying-1000/schemes/scheme-2.jpg',
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
            id: 'sushilnaya-liniya-1200',
            capacity: '1200 кг/час',
            name: 'Сушильная линия 1200 кг/час',
            price: 'от 9 400 000 руб.',
            power: '110 кВт',
            rawMaterial: 'Опил, щепа, кора, лузга',
            product: 'Сухое сырьё W ≤ 12%',
            image: '/images/lines/drying/preview-drying-line.jpg',
            description: 'Промышленная сушильная линия для крупных деревообрабатывающих предприятий. Обеспечивает непрерывную сушку сырья с точным контролем влажности.',
            deliveryWeeks: '10 недель',
            rfComplect: 'от 95 %',
            renders: [
                '/images/lines/drying/drying-1200/renders/render-1.jpg',
                '/images/lines/drying/drying-1200/renders/render-2.jpg',
                '/images/lines/drying/drying-1200/renders/render-3.jpg',
                '/images/lines/drying/drying-1200/renders/render-4.jpg',
            ],
            schemes: [
                '/images/lines/drying/drying-1200/schemes/scheme-1.jpg',
                '/images/lines/drying/drying-1200/schemes/scheme-2.jpg',
            ],
            composition: [
                'Теплогенератор ТГМ-1,5',
                'Сушильный барабан АВМ-1,5',
                'Циклон-осадитель для опилок УЦ-2500',
                'Шлюзовой затвор (2 шт.)',
                'Бункер-накопитель V=6 м³',
                'Конвейер подачи сырья',
                'Вентиляторы рециркуляции',
                'Система автоматики и управления',
            ],
        },
        {
            id: 'sushilnaya-liniya-2000',
            capacity: '2000 кг/час',
            name: 'Сушильная линия 2000 кг/час',
            price: 'от 14 600 000 руб.',
            power: '170 кВт',
            rawMaterial: 'Опил, щепа, кора, лузга',
            product: 'Сухое сырьё W ≤ 12%',
            image: '/images/lines/drying/preview-drying-line.jpg',
            description: 'Высокопроизводительная сушильная линия для крупнейших лесопромышленных комплексов. Максимальная автоматизация и минимальное потребление энергии.',
            deliveryWeeks: '12 недель',
            rfComplect: 'от 95 %',
            renders: [
                '/images/lines/drying/drying-2000/renders/render-1.jpg',
                '/images/lines/drying/drying-2000/renders/render-2.jpg',
                '/images/lines/drying/drying-2000/renders/render-3.jpg',
                '/images/lines/drying/drying-2000/renders/render-4.jpg',
            ],
            schemes: [
                '/images/lines/drying/drying-2000/schemes/scheme-1.jpg',
                '/images/lines/drying/drying-2000/schemes/scheme-2.jpg',
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
