export const equipmentTypes = [
    {
        id: 'briquetting',
        title: 'Брикетирование',
        icon: 'ri-shape-line',
        basePrice: 2800000,
    },
    {
        id: 'granulation',
        title: 'Гранулирование',
        icon: 'ri-bubble-chart-line',
        basePrice: 3200000,
    },
    {
        id: 'drying',
        title: 'Сушка',
        icon: 'ri-fire-line',
        basePrice: 1800000,
    },
    {
        id: 'crushing',
        title: 'Дробление',
        icon: 'ri-hammer-line',
        basePrice: 1500000,
    },
    {
        id: 'conveyor',
        title: 'Транспортёры',
        icon: 'ri-route-line',
        basePrice: 900000,
    },
    {
        id: 'complex',
        title: 'Комплексная линия',
        icon: 'ri-building-2-line',
        basePrice: 6500000,
    },
];

export const productivityOptions = [
    { id: 'p1', label: '2–5 т/сут', multiplier: 1.0 },
    { id: 'p2', label: '5–10 т/сут', multiplier: 1.35 },
    { id: 'p3', label: '10–20 т/сут', multiplier: 1.8 },
    { id: 'p4', label: '20–40 т/сут', multiplier: 2.5 },
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
