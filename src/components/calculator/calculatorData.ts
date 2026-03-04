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
    { id: 'wood', label: 'Древесина (опилки, стружка)', modifier: 1.0 },
    { id: 'agro', label: 'Агроотходы (солома, лузга)', modifier: 1.1 },
    { id: 'peat', label: 'Торф', modifier: 1.15 },
    { id: 'coal', label: 'Угольная пыль / штыб', modifier: 1.2 },
    { id: 'mixed', label: 'Смешанное сырьё', modifier: 1.25 },
];

export const additionalServices = [
    {
        id: 'design',
        title: 'Проектирование',
        desc: 'Разработка проектной документации и 3D-модели',
        price: 350000,
        icon: 'ri-draft-line',
    },
    {
        id: 'installation',
        title: 'Монтаж',
        desc: 'Доставка, сборка и установка на площадке',
        price: 480000,
        icon: 'ri-tools-line',
    },
    {
        id: 'commissioning',
        title: 'Пусконаладка',
        desc: 'Настройка, тестовый запуск, выход на мощность',
        price: 280000,
        icon: 'ri-settings-4-line',
    },
    {
        id: 'training',
        title: 'Обучение персонала',
        desc: 'Теория, практика и сертификация сотрудников',
        price: 150000,
        icon: 'ri-graduation-cap-line',
    },
    {
        id: 'warranty',
        title: 'Расширенная гарантия',
        desc: 'Продление гарантии до 36 месяцев',
        price: 220000,
        icon: 'ri-shield-star-line',
    },
    {
        id: 'automation',
        title: 'Автоматизация',
        desc: 'АСУ ТП, датчики, удалённый мониторинг',
        price: 560000,
        icon: 'ri-cpu-line',
    },
];
