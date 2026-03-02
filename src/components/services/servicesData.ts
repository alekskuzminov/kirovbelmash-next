export const servicesData = [
    {
        id: 'design',
        number: '01',
        title: 'Проектирование',
        subtitle: 'Инженерные решения под ключ',
        icon: 'ri-draft-line',
        shortDesc:
            'Разработка проектной документации, 3D-моделирование и расчёт технологических линий с учётом специфики вашего сырья.',
        description:
            'Наши инженеры разрабатывают индивидуальные проектные решения для каждого клиента. Мы учитываем тип сырья, требуемую производительность, доступные площади и бюджет. Каждый проект проходит многоступенчатую проверку и согласование.',
        features: [
            'Анализ сырья и подбор оптимальной технологии',
            'Разработка технологической схемы производства',
            '3D-моделирование оборудования и компоновки',
            'Расчёт энергопотребления и производительности',
            'Подготовка полного комплекта проектной документации',
            'Согласование с надзорными органами',
        ],
        stats: { value: '120+', label: 'проектов разработано' },
        duration: 'от 2 до 6 недель',
        image:
            'https://readdy.ai/api/search-image?query=professional%20engineers%20working%20on%20industrial%20equipment%20blueprints%20and%203D%20CAD%20models%20on%20large%20monitors%20in%20modern%20engineering%20office%20warm%20lighting%20technical%20drawings%20and%20schematics%20visible%20clean%20workspace&width=800&height=600&seq=svcdesign1&orientation=landscape',
    },
    {
        id: 'installation',
        number: '02',
        title: 'Монтаж',
        subtitle: 'Профессиональная установка оборудования',
        icon: 'ri-tools-line',
        shortDesc:
            'Доставка, сборка и установка оборудования на вашей площадке силами опытных монтажных бригад.',
        description:
            'Монтажные работы выполняются квалифицированными специалистами с многолетним опытом. Мы обеспечиваем полный цикл — от разгрузки и размещения до подключения коммуникаций и проверки всех узлов.',
        features: [
            'Подготовка фундаментов и площадок',
            'Доставка и разгрузка оборудования',
            'Механический монтаж и сборка линий',
            'Подключение электрики и автоматики',
            'Монтаж систем аспирации и вентиляции',
            'Проверка и тестирование всех соединений',
        ],
        stats: { value: '80+', label: 'объектов смонтировано' },
        duration: 'от 1 до 4 недель',
        image:
            'https://readdy.ai/api/search-image?query=industrial%20workers%20installing%20heavy%20manufacturing%20equipment%20in%20factory%20hall%20using%20crane%20and%20tools%20professional%20installation%20process%20safety%20helmets%20and%20vests%20warm%20industrial%20lighting%20wide%20angle&width=800&height=600&seq=svcinstall1&orientation=landscape',
    },
    {
        id: 'commissioning',
        number: '03',
        title: 'Пусконаладка',
        subtitle: 'Запуск и настройка производства',
        icon: 'ri-settings-4-line',
        shortDesc:
            'Тонкая настройка оборудования, выход на проектную мощность и оптимизация технологических параметров.',
        description:
            'Пусконаладочные работы — ключевой этап, от которого зависит эффективность всего производства. Наши инженеры настраивают каждый узел, проводят пробные запуски и добиваются стабильной работы на проектной мощности.',
        features: [
            'Проверка и калибровка датчиков и приборов',
            'Настройка режимов работы оборудования',
            'Пробные запуски с тестовым сырьём',
            'Выход на проектную производительность',
            'Оптимизация энергопотребления',
            'Составление технологического регламента',
        ],
        stats: { value: '98%', label: 'успешных запусков' },
        duration: 'от 3 до 10 дней',
        image:
            'https://readdy.ai/api/search-image?query=engineer%20in%20safety%20gear%20adjusting%20and%20calibrating%20industrial%20machinery%20control%20panel%20with%20digital%20displays%20and%20gauges%20in%20modern%20factory%20setting%20warm%20lighting%20professional%20commissioning%20process&width=800&height=600&seq=svccommission1&orientation=landscape',
    },
    {
        id: 'training',
        number: '04',
        title: 'Обучение персонала',
        subtitle: 'Передача знаний и навыков',
        icon: 'ri-graduation-cap-line',
        shortDesc:
            'Теоретическое и практическое обучение ваших сотрудников работе с оборудованием и обслуживанию линий.',
        description:
            'Мы не просто поставляем оборудование — мы обучаем ваш персонал грамотной эксплуатации и обслуживанию. Программа включает теорию, практику на реальном оборудовании и аттестацию.',
        features: [
            'Теоретический курс по устройству оборудования',
            'Практическое обучение на рабочих местах',
            'Инструктаж по технике безопасности',
            'Обучение диагностике и устранению неисправностей',
            'Выдача сертификатов о прохождении обучения',
            'Техническая поддержка после обучения',
        ],
        stats: { value: '500+', label: 'специалистов обучено' },
        duration: 'от 3 до 7 дней',
        image:
            'https://readdy.ai/api/search-image?query=professional%20industrial%20training%20session%20with%20instructor%20teaching%20group%20of%20factory%20workers%20about%20heavy%20machinery%20operation%20in%20modern%20workshop%20classroom%20setting%20with%20equipment%20visible%20warm%20lighting&width=800&height=600&seq=svctrain1&orientation=landscape',
    },
];

// Тип для отдельной услуги
export type Service = typeof servicesData[0];

export const serviceProcess = [
    {
        step: 1,
        title: 'Заявка',
        desc: 'Вы оставляете заявку, мы связываемся для обсуждения задачи',
        icon: 'ri-chat-3-line',
    },
    {
        step: 2,
        title: 'Анализ',
        desc: 'Изучаем сырьё, площадку и требования к производительности',
        icon: 'ri-search-eye-line',
    },
    {
        step: 3,
        title: 'Проект',
        desc: 'Разрабатываем проектную документацию и согласовываем',
        icon: 'ri-file-list-3-line',
    },
    {
        step: 4,
        title: 'Производство',
        desc: 'Изготавливаем оборудование на собственном заводе',
        icon: 'ri-building-2-line',
    },
    {
        step: 5,
        title: 'Монтаж',
        desc: 'Доставляем и устанавливаем оборудование на объекте',
        icon: 'ri-tools-line',
    },
    {
        step: 6,
        title: 'Запуск',
        desc: 'Настраиваем, обучаем персонал и запускаем производство',
        icon: 'ri-rocket-line',
    },
];

export const serviceAdvantages = [
    {
        title: 'Собственное производство',
        desc: 'Полный контроль качества на каждом этапе изготовления оборудования',
        icon: 'ri-building-4-line',
    },
    {
        title: 'Опыт с 2011 года',
        desc: 'Более 14 лет успешной работы в сфере промышленного оборудования',
        icon: 'ri-calendar-check-line',
    },
    {
        title: 'Гарантия 24 месяца',
        desc: 'Расширенная гарантия на всё поставляемое оборудование и работы',
        icon: 'ri-shield-check-line',
    },
    {
        title: 'Сервисная поддержка',
        desc: 'Оперативная техническая поддержка и поставка запасных частей',
        icon: 'ri-customer-service-2-line',
    },
    {
        title: 'Индивидуальный подход',
        desc: 'Каждый проект разрабатывается под конкретные задачи клиента',
        icon: 'ri-user-star-line',
    },
    {
        title: 'География — вся Россия',
        desc: 'Работаем по всей территории РФ и в странах СНГ',
        icon: 'ri-map-pin-range-line',
    },
];
