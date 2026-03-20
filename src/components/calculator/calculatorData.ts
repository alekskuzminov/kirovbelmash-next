export const equipmentPrices: Record<string, Record<string, number>> = {
    briquetting: {
        p1: 10524000,
        p2: 12946000,
        p3: 23173000,
        p4: 33030000,
    },
    granulation: {
        p1: 9200000,
        p2: 14800000,
        p3: 23302000,
        p4: 34511000,
    },
    drying: {
        p1: 6097000,
        p2: 7769000,
        p3: 15005000,
        p4: 21631000,
    }
};

export const equipmentTypes = [
    {
        id: 'briquetting',
        title: 'Брикетирование',
        icon: 'ri-shape-line',
        basePrice: 10524000,
    },
    {
        id: 'granulation',
        title: 'Гранулирование',
        icon: 'ri-bubble-chart-line',
        basePrice: 9200000,
    },
    {
        id: 'drying',
        title: 'Сушка',
        icon: 'ri-fire-line',
        basePrice: 6097000,
    },
];

export const productivityOptions = [
    { id: 'p1', label: '500 кг/час', multiplier: 1.0 },
    { id: 'p2', label: '1000 кг/час', multiplier: 1.35 },
    { id: 'p3', label: '1200 кг/час', multiplier: 1.8 },
    { id: 'p4', label: '2000 кг/час', multiplier: 2.5 },
];

export const rawMaterialOptions = [
    { id: 'shavings', label: 'Стружка сухая (влажность до 14%)', modifier: 1.00 },
    { id: 'sawdust', label: 'Опил естественной влажности', modifier: 1.03 },
    { id: 'chips', label: 'Щепа естественной влажности', modifier: 1.05 },
    { id: 'slabs', label: 'Горбыль, тонкомер естественной влажности', modifier: 1.07 },
];

export const additionalServices = [
    {
        id: 'design',
        title: 'Проектирование',
        desc: 'Разработка проектной документации и 3D-модели',
        price: 0,
        icon: 'ri-draft-line',
    },
    {
        id: 'installation',
        title: 'Монтаж',
        desc: 'Доставка, сборка и установка на площадке',
        price: 0,
        icon: 'ri-tools-line',
    },
    {
        id: 'commissioning',
        title: 'Пусконаладка',
        desc: 'Настройка, тестовый запуск, выход на мощность',
        price: 0,
        icon: 'ri-settings-4-line',
    },
    {
        id: 'training',
        title: 'Обучение персонала',
        desc: 'Теория, практика и сервисное обслуживание',
        price: 0,
        icon: 'ri-graduation-cap-line',
    },
];
