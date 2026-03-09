export interface EquipmentItem {
  id: number;
  slug: string;
  seoTitle: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
  features: string[];
  badge?: string;
  power: string;
  capacity: string;
  weight: string;
  gallery?: string[];
}

export const equipmentCategoriesConfig = [
  { name: 'Все', slug: 'all' },
  { name: 'Станки для производства брикетов', slug: 'briketirujushhee-oborudovanie' },
  { name: 'Станки для производства пеллет', slug: 'oborudovanie-dlja-proizvodstva-granul' },
  { name: 'Рубительные машины', slug: 'rubitelnye-mashiny' },
  { name: 'Дробильное оборудование', slug: 'drobilnoe-oborudovanie' },
  { name: 'Бункеры-накопители с ворошителем', slug: 'bunkery-nakopiteli' },
  { name: 'Сушильное оборудование', slug: 'sushilnoe-oborudovanie' },
  { name: 'Пневмотранспортное оборудование', slug: 'pnevmotransportnoe-oborudovanie' },
  { name: 'Приемное оборудование', slug: 'priemnoe-oborudovanie' },
  { name: 'Транспортирующее оборудование', slug: 'transportirujushhee-oborudovanie' },
  { name: 'Сортировочно-просеивающее оборудование', slug: 'sortirovochnoe-oborudovanie' },
];

export const equipmentCategories = equipmentCategoriesConfig.map(c => c.name);

export const equipmentItems: EquipmentItem[] = [
  // Станки для производства брикетов
  {
    id: 1,

    slug: 'avtomat-rezki-briketa',

    seoTitle: 'Автомат резки брикетов',

    name: 'Автомат резки брикетов',

    category: 'Станки для производства брикетов',

    description:

      'Автомат резки брикетов для точной нарезки Pini Kay: чистый рез, механический привод без компрессора, надежная конструкция.',
    image:
      '/images/equipment/briquette-presses/briquette-cutting-machine/preview-briquette-cutting-machine-catalog.webp',
    specs: [
      { label: 'Производительность', value: '500 кг/ч' },
      { label: 'Мощность двигателя', value: '3 кВт' },
      { label: 'Длина реза', value: '50-300 мм' },
      { label: 'Точность реза', value: '±2 мм' },
      { label: 'Габариты (ДxШxВ)', value: '1800x800x1200 мм' },
      { label: 'Масса', value: '450 кг' },
      { label: 'Напряжение', value: '380 В' },
      { label: 'Тип привода', value: 'Электрический' },
    ],
    features: [
      'Автоматическая подача брикетов',
      'Регулировка длины реза',
      'Защита от перегрузки',
      'Низкий уровень шума',
    ],
    badge: 'Хит продаж',
    power: '3 кВт',
    capacity: '500 кг/ч',
    weight: '450 кг',
    gallery: [
      '/images/equipment/briquette-presses/briquette-cutting-machine/briquette-cutting-machine-galery-1.webp',
      '/images/equipment/briquette-presses/briquette-cutting-machine/briquette-cutting-machine-galery-2.webp',
      '/images/equipment/briquette-presses/briquette-cutting-machine/briquette-cutting-machine-galery-3.webp',
      '/images/equipment/briquette-presses/briquette-cutting-machine/briquette-cutting-machine-galery-4.webp',
      '/images/equipment/briquette-presses/briquette-cutting-machine/briquette-cutting-machine-galery-5.webp',
    ],
  },
  {
    id: 2,

    slug: 'press-pbm2-dlya-briketov',

    seoTitle: 'Пресс ПБМ-2 для брикетов Pini Kay',

    name: 'Пресс ПБМ-2 для брикетов Pini Kay',

    category: 'Станки для производства брикетов',

    description:

      'Пресс ПБМ-2 для брикетов Pini Kay: экструдер без связующих, высокий КПД, компактная компоновка, удобное обслуживание и транспортировка.',
    image:
      '/images/equipment/briquette-presses/pini-kay-press-pbm2/preview-pini-kay-press-pbm2-catalog.webp',
    specs: [
      { label: 'Производительность', value: '400 кг/ч' },
      { label: 'Мощность двигателя', value: '30 кВт' },
      { label: 'Форма брикета', value: 'Pini Kay' },
      { label: 'Размер брикета', value: '60x250 мм' },
      { label: 'Габариты (ДxШxВ)', value: '2400x1000x1800 мм' },
      { label: 'Масса', value: '1800 кг' },
      { label: 'Влажность сырья', value: '8-12%' },
      { label: 'Напряжение', value: '380 В' },
    ],
    features: [
      'Производство брикетов Pini Kay',
      'Система охлаждения',
      'Автоматическая подача',
      'Защита от перегрузки',
    ],
    power: '30 кВт',
    capacity: '400 кг/ч',
    weight: '1800 кг',
    gallery: [
      '/images/equipment/briquette-presses/pini-kay-press-pbm2/pini-kay-press-pbm2-galery-1.webp',
      '/images/equipment/briquette-presses/pini-kay-press-pbm2/pini-kay-press-pbm2-galery-2.webp',
      '/images/equipment/briquette-presses/pini-kay-press-pbm2/pini-kay-press-pbm2-galery-3.webp',
    ],
  },
  // Станки для производства пеллет
  {
    id: 3,

    slug: 'granuljator-ogm-1-5',

    seoTitle: 'Гранулятор для пеллет – пеллетайзер ОГМ-1,5',

    name: 'Гранулятор для пеллет – пеллетайзер ОГМ-1,5',

    category: 'Станки для производства пеллет',

    description:

      'Гранулятор ОГМ-1,5 для пеллет из опилок, соломы и лузги: прочные гранулы, усиленный прессующий узел, стабильная работа.',
    image:
      '/images/equipment/pellet-presses/pellet-mill-ogm15/preview-pellet-mill-ogm15-catalog.webp',
    specs: [
      { label: 'Производительность', value: '1500 кг/ч' },
      { label: 'Мощность двигателя', value: '110 кВт' },
      { label: 'Диаметр матрицы', value: '520 мм' },
      { label: 'Диаметр гранул', value: '6-8 мм' },
      { label: 'Габариты (ДxШxВ)', value: '2800x1400x2200 мм' },
      { label: 'Масса', value: '3800 кг' },
      { label: 'Напряжение', value: '380 В' },
      { label: 'Влажность сырья', value: '12-15%' },
    ],
    features: [
      'Кольцевая матрица',
      'Автоматическая смазка',
      'Частотный преобразователь',
      'Датчик температуры',
    ],
    badge: 'Новинка',
    power: '110 кВт',
    capacity: '1500 кг/ч',
    weight: '3800 кг',
    gallery: [
      '/images/equipment/pellet-presses/pellet-mill-ogm15/pellet-mill-ogm15-galery-1.webp',
      '/images/equipment/pellet-presses/pellet-mill-ogm15/pellet-mill-ogm15-galery-2.webp',
    ],
  },
  {
    id: 4,

    slug: 'kolonna-ohlazhdenija',

    seoTitle: 'Колонна охлаждения гранул',

    name: 'Колонна охлаждения гранул',

    category: 'Станки для производства пеллет',

    description:

      'Колонна охлаждения гранул непрерывного действия: снижает температуру и влажность, работает по принципу противотока, выгружает автоматически.',
    image:
      '/images/equipment/pellet-presses/pellet-cooling-column/preview-pellet-cooling-column-catalog.webp',
    specs: [
      { label: 'Производительность', value: '2000 кг/ч' },
      { label: 'Мощность вентилятора', value: '5.5 кВт' },
      { label: 'Высота колонны', value: '4500 мм' },
      { label: 'Диаметр колонны', value: '1200 мм' },
      { label: 'Время охлаждения', value: '10-15 мин' },
      { label: 'Масса', value: '1200 кг' },
      { label: 'Температура на входе', value: '70-90 °C' },
      { label: 'Температура на выходе', value: '25-35 °C' },
    ],
    features: [
      'Равномерное охлаждение',
      'Автоматическая выгрузка',
      'Система распределения воздуха',
      'Датчик температуры',
    ],
    power: '5.5 кВт',
    capacity: '2000 кг/ч',
    weight: '1200 кг',
    gallery: [
      '/images/equipment/pellet-presses/pellet-cooling-column/pellet-cooling-column-galery-1.webp',
      '/images/equipment/pellet-presses/pellet-cooling-column/pellet-cooling-column-galery-2.webp',
      '/images/equipment/pellet-presses/pellet-cooling-column/pellet-cooling-column-galery-3.webp',
      '/images/equipment/pellet-presses/pellet-cooling-column/pellet-cooling-column-galery-4.webp',
    ],
  },
  // Рубительные машины
  {
    id: 5,

    slug: 'rubitelnaya-mashina-dlya-schepy-rdm-22',

    seoTitle: 'Рубительная машина РДМ-22',

    name: 'Рубительная машина РДМ-22',

    category: 'Рубительные машины',

    description:

      'Рубительная машина РДМ-22 для влажных отходов деревообработки: перерабатывает рейки, ветки и горбыль в технологическую щепу.',
    image:
      '/images/equipment/chippers/wood-chipper-rdm22/preview-wood-chipper-rdm22-catalog.webp',
    specs: [
      { label: 'Производительность', value: '5000 кг/ч' },
      { label: 'Мощность двигателя', value: '55 кВт' },
      { label: 'Диаметр диска', value: '450 мм' },
      { label: 'Макс. диаметр бревна', value: '220 мм' },
      { label: 'Размер щепы', value: '5-30 мм' },
      { label: 'Масса', value: '2200 кг' },
      { label: 'Количество ножей', value: '4 шт' },
      { label: 'Напряжение', value: '380 В' },
    ],
    features: [
      'Ножи из инструментальной стали',
      'Гидравлический прижим',
      'Регулировка фракции щепы',
      'Защитный кожух',
    ],
    badge: 'Популярное',
    power: '55 кВт',
    capacity: '5000 кг/ч',
    weight: '2200 кг',
    gallery: [
      '/images/equipment/chippers/wood-chipper-rdm22/wood-chipper-rdm22-galery-1.webp',
      '/images/equipment/chippers/wood-chipper-rdm22/wood-chipper-rdm22-galery-2.webp',
      '/images/equipment/chippers/wood-chipper-rdm22/wood-chipper-rdm22-galery-3.webp',
    ],
  },
  {
    id: 6,

    slug: 'rubitelnaya-mashina-dlya-drevesiny-rbm-55',

    seoTitle: 'Рубительная машина РБМ-55',

    name: 'Рубительная машина РБМ-55',

    category: 'Рубительные машины',

    description:

      'Рубительная машина РБМ-55 для отходов деревообработки: измельчает рейки, ветки, горбыль и бревна в технологическую щепу.',
    image:
      '/images/equipment/chippers/drum-chipper-rbm55/preview-drum-chipper-rbm55-catalog.webp',
    specs: [
      { label: 'Производительность', value: '8000 кг/ч' },
      { label: 'Мощность двигателя', value: '90 кВт' },
      { label: 'Диаметр барабана', value: '600 мм' },
      { label: 'Макс. диаметр бревна', value: '300 мм' },
      { label: 'Размер щепы', value: '5-50 мм' },
      { label: 'Масса', value: '4800 кг' },
      { label: 'Количество ножей', value: '6 шт' },
      { label: 'Напряжение', value: '380 В' },
    ],
    features: [
      'Гидравлическая подача',
      'Быстрая замена ножей',
      'Контрнож с регулировкой',
      'Защита от металла',
    ],
    power: '90 кВт',
    capacity: '8000 кг/ч',
    weight: '4800 кг',
    gallery: [
      '/images/equipment/chippers/drum-chipper-rbm55/drum-chipper-rbm55-galery-1.webp',
    ],
  },
  // Дробильное оборудование
  {
    id: 7,

    slug: 'drobilnaja-ustanovka-kd',

    seoTitle: 'Молотковая дробилка КДЕ',

    name: 'Молотковая дробилка КДЕ',

    category: 'Дробильное оборудование',

    description:

      'Молотковая дробилка КДЕ для древесных и сельхозотходов: измельчает щепу, стружку, шпон, солому и лузгу для дальнейшей переработки.',
    image:
      '/images/equipment/crushers/hammer-mill-kde/preview-hammer-mill-kde-catalog.webp',
    specs: [
      { label: 'Производительность', value: '3000 кг/ч' },
      { label: 'Мощность двигателя', value: '75 кВт' },
      { label: 'Диаметр ротора', value: '800 мм' },
      { label: 'Количество молотков', value: '32 шт' },
      { label: 'Фракция на выходе', value: '1-5 мм' },
      { label: 'Масса', value: '2800 кг' },
      { label: 'Габариты (ДxШxВ)', value: '2400x1600x2000 мм' },
      { label: 'Скорость ротора', value: '2960 об/мин' },
    ],
    features: [
      'Быстрая замена молотков',
      'Реверсивный ротор',
      'Магнитный сепаратор',
      'Виброизоляция корпуса',
    ],
    badge: 'Хит продаж',
    power: '75 кВт',
    capacity: '3000 кг/ч',
    weight: '2800 кг',
  },
  {
    id: 8,

    slug: 'drobilnaja-ustanovka-dss',

    seoTitle: 'Молотковая дробилка ДСС',

    name: 'Молотковая дробилка ДСС',

    category: 'Дробильное оборудование',

    description:

      'Молотковая дробилка ДСС с пневмозагрузкой для зерна и древесного сырья: работает с фракцией до 30 мм и влажностью до 18%.',
    image:
      '/images/equipment/crushers/hammer-mill-dss/preview-hammer-mill-dss-catalog.webp',
    specs: [
      { label: 'Производительность', value: '2000 кг/ч' },
      { label: 'Мощность двигателя', value: '55 кВт' },
      { label: 'Диаметр ротора', value: '500 мм' },
      { label: 'Количество молотков', value: '24 шт' },
      { label: 'Фракция на выходе', value: '0.5-3 мм' },
      { label: 'Масса', value: '1900 кг' },
      { label: 'Габариты (ДxШxВ)', value: '2000x1300x1700 мм' },
      { label: 'Сито', value: 'Сменное, 1-5 мм' },
    ],
    features: [
      'Сменные сита',
      'Автоматическая подача',
      'Защита от перегрузки',
      'Низкий уровень вибрации',
    ],
    power: '55 кВт',
    capacity: '2000 кг/ч',
    weight: '1900 кг',
    gallery: [
      '/images/equipment/crushers/hammer-mill-dss/hammer-mill-dss-galery-1.webp',
      '/images/equipment/crushers/hammer-mill-dss/hammer-mill-dss-galery-2.webp',
      '/images/equipment/crushers/hammer-mill-dss/hammer-mill-dss-galery-3.webp',
    ],
  },
  // Бункеры-накопители с ворошителем
  {
    id: 9,

    slug: 'bunker-nakopitel-v-3-kub-m',

    seoTitle: 'Бункер-накопитель V=3 м³',

    name: 'Бункер-накопитель V=3 м³',

    category: 'Бункеры-накопители с ворошителем',

    description:

      'Бункер-накопитель V=3 м³ для линий переработки: накапливает сырье, стабилизирует поток и обеспечивает равномерную подачу в оборудование.',
    image:
      '/images/equipment/bunkers/bunker-3m3/preview-bunker-3m3-catalog.webp',
    specs: [
      { label: 'Объём бункера', value: '3 м³' },
      { label: 'Мощность ворошителя', value: '1.5 кВт' },
      { label: 'Мощность шнека', value: '2.2 кВт' },
      { label: 'Производительность выгрузки', value: '2 м³/ч' },
      { label: 'Габариты (ДxШxВ)', value: '2000x1500x2200 мм' },
      { label: 'Масса', value: '650 кг' },
      { label: 'Материал корпуса', value: 'Сталь 09Г2С' },
      { label: 'Тип выгрузки', value: 'Шнековая' },
    ],
    features: [
      'Ворошитель предотвращает сводообразование',
      'Шнековая выгрузка',
      'Датчик уровня',
      'Смотровой люк',
    ],
    power: '3.7 кВт',
    capacity: '3 м³',
    weight: '650 кг',
    gallery: [
      '/images/equipment/bunkers/bunker-3m3/bunker-3m3-galery-1.webp',
      '/images/equipment/bunkers/bunker-3m3/bunker-3m3-galery-2.webp',
    ],
  },
  {
    id: 10,

    slug: 'bunker-nakopitel-v-6-kub-m',

    seoTitle: 'Бункер-накопитель V=6 м³',

    name: 'Бункер-накопитель V=6 м³',

    category: 'Бункеры-накопители с ворошителем',

    description:

      'Бункер-накопитель V=6 м³ для производственных линий: работает как буфер и подает сырье дозированно с заданной скоростью.',
    image:
      '/images/equipment/bunkers/bunker-6m3/preview-bunker-6m3-catalog.webp',
    specs: [
      { label: 'Объём бункера', value: '6 м³' },
      { label: 'Мощность ворошителя', value: '2.2 кВт' },
      { label: 'Мощность шнека', value: '3 кВт' },
      { label: 'Производительность выгрузки', value: '4 м³/ч' },
      { label: 'Габариты (ДxШxВ)', value: '2500x2000x2800 мм' },
      { label: 'Масса', value: '1100 кг' },
      { label: 'Материал корпуса', value: 'Сталь 09Г2С' },
      { label: 'Тип выгрузки', value: 'Шнековая' },
    ],
    features: [
      'Усиленный ворошитель',
      'Площадка обслуживания',
      'Автоматический контроль уровня',
      'Аварийная разгрузка',
    ],
    badge: 'Популярное',
    power: '5.2 кВт',
    capacity: '6 м³',
    weight: '1100 кг',
    gallery: [
      '/images/equipment/bunkers/bunker-6m3/bunker-6m3-galery-1.webp',
      '/images/equipment/bunkers/bunker-6m3/bunker-6m3-galery-2.webp',
      '/images/equipment/bunkers/bunker-6m3/bunker-6m3-galery-3.webp',
    ],
  },
  // Сушильное оборудование
  {
    id: 11,

    slug: 'baraban-sushilniy-avm-1-5',

    seoTitle: 'Барабан сушильный АВМ-1,5',

    name: 'Барабан сушильный АВМ-1,5',

    category: 'Сушильное оборудование',

    description:

      'Барабан сушильный АВМ-1,5 для снижения влажности опилок и древесного сырья: стабильно сушит материал и комплектуется трубопроводом.',
    image:
      '/images/equipment/dryers/drum-dryer-avm15/preview-drum-dryer-avm15-catalog.webp',
    specs: [
      { label: 'Производительность', value: '1500 кг/ч' },
      { label: 'Диаметр барабана', value: '2000 мм' },
      { label: 'Длина барабана', value: '10000 мм' },
      { label: 'Мощность привода', value: '11 кВт' },
      { label: 'Температура сушки', value: '250-600 °C' },
      { label: 'Масса', value: '6500 кг' },
      { label: 'Влажность на входе', value: 'до 55%' },
      { label: 'Влажность на выходе', value: '8-12%' },
    ],
    features: [
      'Трёхходовая система сушки',
      'Теплоизоляция корпуса',
      'Автоматический контроль температуры',
      'Искрогасительная система',
    ],
    badge: 'Хит продаж',
    power: '11 кВт',
    capacity: '1500 кг/ч',
    weight: '6500 кг',
    gallery: [
      '/images/equipment/dryers/drum-dryer-avm15/drum-dryer-avm15-galery-1.webp',
      '/images/equipment/dryers/drum-dryer-avm15/drum-dryer-avm15-galery-2.webp',
      '/images/equipment/dryers/drum-dryer-avm15/drum-dryer-avm15-galery-3.webp',
      '/images/equipment/dryers/drum-dryer-avm15/drum-dryer-avm15-galery-4.webp',
      '/images/equipment/dryers/drum-dryer-avm15/drum-dryer-avm15-galery-5.webp',
    ],
  },
  {
    id: 12,

    slug: 'sushilniy-baraban-avm-0-65',

    seoTitle: 'Сушильный барабан АВМ-0,65',

    name: 'Сушильный барабан АВМ-0,65',

    category: 'Сушильное оборудование',

    description:

      'Сушильный барабан АВМ-0,65 для зерна и другого сырья: снижает влажность в потоке теплоносителя и подает сухой материал в циклон.',
    image:
      '/images/equipment/dryers/drum-dryer-avm065/preview-drum-dryer-avm065-catalog.webp',
    specs: [
      { label: 'Производительность', value: '650 кг/ч' },
      { label: 'Диаметр барабана', value: '1400 мм' },
      { label: 'Длина барабана', value: '6000 мм' },
      { label: 'Мощность привода', value: '5.5 кВт' },
      { label: 'Температура сушки', value: '250-500 °C' },
      { label: 'Масса', value: '3200 кг' },
      { label: 'Влажность на входе', value: 'до 50%' },
      { label: 'Влажность на выходе', value: '8-12%' },
    ],
    features: [
      'Компактные размеры',
      'Теплоизоляция',
      'Контроль температуры',
      'Низкое энергопотребление',
    ],
    power: '5.5 кВт',
    capacity: '650 кг/ч',
    weight: '3200 кг',
    gallery: [
      '/images/equipment/dryers/drum-dryer-avm065/drum-dryer-avm065-galery-1.webp',
      '/images/equipment/dryers/drum-dryer-avm065/drum-dryer-avm065-galery-2.webp',
      '/images/equipment/dryers/drum-dryer-avm065/drum-dryer-avm065-galery-3.webp',
      '/images/equipment/dryers/drum-dryer-avm065/drum-dryer-avm065-galery-4.webp',
      '/images/equipment/dryers/drum-dryer-avm065/drum-dryer-avm065-galery-5.webp',
      '/images/equipment/dryers/drum-dryer-avm065/drum-dryer-avm065-galery-6.webp',
      '/images/equipment/dryers/drum-dryer-avm065/drum-dryer-avm065-galery-7.webp',
    ],
  },
  {
    id: 13,

    slug: 'teplogenerator-tgm-1-5',

    seoTitle: 'Теплогенератор ТГМ-1,5',

    name: 'Теплогенератор ТГМ-1,5',

    category: 'Сушильное оборудование',

    description:

      'Теплогенератор ТГМ-1,5 для сжигания древесного топлива: подает тепло для сушки мелкофракционных отходов в барабанах и сушилках.',
    image:
      '/images/equipment/dryers/heat-gen-tgm15/preview-heat-gen-tgm15-catalog.webp',
    specs: [
      { label: 'Тепловая мощность', value: '1500 кВт' },
      { label: 'Расход топлива', value: '300 кг/ч' },
      { label: 'Температура на выходе', value: '400-800 °C' },
      { label: 'Мощность вентилятора', value: '15 кВт' },
      { label: 'Габариты (ДxШxВ)', value: '3500x1800x2400 мм' },
      { label: 'Масса', value: '2800 кг' },
      { label: 'Тип топлива', value: 'Древесные отходы' },
      { label: 'КПД', value: '85%' },
    ],
    features: [
      'Автоматическая подача топлива',
      'Контроль температуры',
      'Система очистки дымовых газов',
      'Искрогаситель',
    ],
    power: '15 кВт',
    capacity: '1500 кВт',
    weight: '2800 кг',
    gallery: [
      '/images/equipment/dryers/heat-gen-tgm15/heat-gen-tgm15-galery-1.webp',
      '/images/equipment/dryers/heat-gen-tgm15/heat-gen-tgm15-galery-2.webp',
      '/images/equipment/dryers/heat-gen-tgm15/heat-gen-tgm15-galery-3.webp',
      '/images/equipment/dryers/heat-gen-tgm15/heat-gen-tgm15-galery-4.webp',
    ],
  },
  {
    id: 14,

    slug: 'teplogenerator-tgk-1-0',

    seoTitle: 'Теплогенератор ТГК-1,0',

    name: 'Теплогенератор ТГК-1,0',

    category: 'Сушильное оборудование',

    description:

      'Теплогенератор ТГК-1,0 для сжигания отходов деревообработки: подает тепло в сушильные барабаны, работает с топливом влажностью до 40%.',
    image:
      '/images/equipment/dryers/heat-gen-tgk10/preview-heat-gen-tgk10-catalog.webp',
    specs: [
      { label: 'Тепловая мощность', value: '1000 кВт' },
      { label: 'Расход топлива', value: '200 кг/ч' },
      { label: 'Температура на выходе', value: '350-700 °C' },
      { label: 'Мощность вентилятора', value: '11 кВт' },
      { label: 'Габариты (ДxШxВ)', value: '3000x1500x2200 мм' },
      { label: 'Масса', value: '2200 кг' },
      { label: 'Тип топлива', value: 'Древесные отходы' },
      { label: 'КПД', value: '82%' },
    ],
    features: [
      'Компактная конструкция',
      'Автоматическая подача',
      'Контроль температуры',
      'Система очистки',
    ],
    power: '11 кВт',
    capacity: '1000 кВт',
    weight: '2200 кг',
    gallery: [
      '/images/equipment/dryers/heat-gen-tgk10/heat-gen-tgk10-galery-1.webp',
    ],
  },
  {
    id: 15,

    slug: 'teplogenerator-tgvg-1-0',

    seoTitle: 'Теплогенератор ТГВГ-1,0',

    name: 'Теплогенератор ТГВГ-1,0',

    category: 'Сушильное оборудование',

    description:

      'Теплогенератор ТГВГ-1,0 вихревого типа: дает тепло для сушки сырья, работает с древесными отходами влажностью до 40%.',
    image:
      '/images/equipment/dryers/heat-gen-tgvg10/preview-heat-gen-tgvg10-catalog.webp',
    specs: [
      { label: 'Тепловая мощность', value: '1000 кВт' },
      { label: 'Расход топлива', value: '180 кг/ч' },
      { label: 'Температура на выходе', value: '400-750 °C' },
      { label: 'Мощность вентилятора', value: '11 кВт' },
      { label: 'Габариты (ДxШxВ)', value: '2800x1600x2300 мм' },
      { label: 'Масса', value: '2400 кг' },
      { label: 'Тип топлива', value: 'Древесные отходы' },
      { label: 'КПД', value: '87%' },
    ],
    features: [
      'Вихревая камера сгорания',
      'Высокий КПД',
      'Автоматическое управление',
      'Низкие выбросы',
    ],
    badge: 'Новинка',
    power: '11 кВт',
    capacity: '1000 кВт',
    weight: '2400 кг',
    gallery: [
      '/images/equipment/dryers/heat-gen-tgvg10/heat-gen-tgvg10-galery-1.webp',
      '/images/equipment/dryers/heat-gen-tgvg10/heat-gen-tgvg10-galery-2.webp',
      '/images/equipment/dryers/heat-gen-tgvg10/heat-gen-tgvg10-galery-3.webp',
    ],
  },
  // Пневмотранспортное оборудование
  {
    id: 16,

    slug: 'tsiklon-osaditel-us-2500',

    seoTitle: 'Циклон-осадитель для опилок УЦ-2500',

    name: 'Циклон-осадитель для опилок УЦ-2500',

    category: 'Пневмотранспортное оборудование',

    description:

      'Циклон-осадитель УЦ-2500 очищает выбросы деревообработки от сухих опилок, стружки и неволокнистой пыли.',
    image:
      '/images/equipment/pneumatic/cyclone-uc2500/preview-cyclone-uc2500-catalog.webp',
    specs: [
      { label: 'Производительность', value: '5000 м³/ч' },
      { label: 'Диаметр циклона', value: '2500 мм' },
      { label: 'Высота циклона', value: '5000 мм' },
      { label: 'Эффективность очистки', value: '98%' },
      { label: 'Масса', value: '1800 кг' },
      { label: 'Материал корпуса', value: 'Сталь 3 мм' },
      { label: 'Тип разгрузки', value: 'Шлюзовой затвор' },
      { label: 'Перепад давления', value: '800-1200 Па' },
    ],
    features: [
      'Высокая эффективность',
      'Шлюзовой затвор',
      'Смотровые люки',
      'Антикоррозийное покрытие',
    ],
    badge: 'Популярное',
    power: '-',
    capacity: '5000 м³/ч',
    weight: '1800 кг',
    gallery: [
      '/images/equipment/pneumatic/cyclone-uc2500/cyclone-uc2500-galery-1.webp',
    ],
  },
  {
    id: 17,

    slug: 'tsiklon-osaditel-us-1600',

    seoTitle: 'Циклон-осадитель для опилок УЦ-1600',

    name: 'Циклон-осадитель для опилок УЦ-1600',

    category: 'Пневмотранспортное оборудование',

    description:

      'Циклон-осадитель УЦ-1600 для очистки технологических выбросов: отделяет сухие опилки, стружку и неслипающуюся пыль.',
    image:
      '/images/equipment/pneumatic/cyclone-uc1600/preview-cyclone-uc1600-catalog.webp',
    specs: [
      { label: 'Производительность', value: '3000 м³/ч' },
      { label: 'Диаметр циклона', value: '1600 мм' },
      { label: 'Высота циклона', value: '3800 мм' },
      { label: 'Эффективность очистки', value: '97%' },
      { label: 'Масса', value: '950 кг' },
      { label: 'Материал корпуса', value: 'Сталь 3 мм' },
      { label: 'Тип разгрузки', value: 'Шлюзовой затвор' },
      { label: 'Перепад давления', value: '700-1000 Па' },
    ],
    features: [
      'Компактные размеры',
      'Эффективная очистка',
      'Шлюзовой затвор',
      'Смотровые люки',
    ],
    power: '-',
    capacity: '3000 м³/ч',
    weight: '950 кг',
    gallery: [
      '/images/equipment/pneumatic/cyclone-uc1600/cyclone-uc1600-galery-1.webp',
    ],
  },
  {
    id: 18,

    slug: 'tsiklon-osaditel-us-100',

    seoTitle: 'Циклон-осадитель для опилок УЦ-100',

    name: 'Циклон-осадитель для опилок УЦ-100',

    category: 'Пневмотранспортное оборудование',

    description:

      'Циклон-осадитель УЦ-100 для деревообработки: очищает выбросы от сухих опилок, стружки и неволокнистой пыли.',
    image:
      '/images/equipment/pneumatic/cyclone-uc100/preview-cyclone-uc100-catalog.webp',
    specs: [
      { label: 'Производительность', value: '1000 м³/ч' },
      { label: 'Диаметр циклона', value: '1000 мм' },
      { label: 'Высота циклона', value: '2500 мм' },
      { label: 'Эффективность очистки', value: '95%' },
      { label: 'Масса', value: '320 кг' },
      { label: 'Материал корпуса', value: 'Сталь 2.5 мм' },
      { label: 'Тип разгрузки', value: 'Ручная/шлюзовая' },
      { label: 'Перепад давления', value: '600-900 Па' },
    ],
    features: [
      'Компактный размер',
      'Простая конструкция',
      'Низкая стоимость',
      'Лёгкий монтаж',
    ],
    power: '-',
    capacity: '1000 м³/ч',
    weight: '320 кг',
    gallery: [
      '/images/equipment/pneumatic/cyclone-uc100/cyclone-uc100-galery-1.webp',
    ],
  },
  {
    id: 19,

    slug: 'zatvor-shlyuzovoy',

    seoTitle: 'Затвор шлюзовой',

    name: 'Затвор шлюзовой',

    category: 'Пневмотранспортное оборудование',

    description:

      'Затвор шлюзовой для непрерывной выгрузки сыпучих продуктов из бункеров, фильтров и циклонов без потери герметичности.',
    image:
      '/images/equipment/pneumatic/airlock-valve/preview-airlock-valve-catalog.webp',
    specs: [
      { label: 'Производительность', value: '5 м³/ч' },
      { label: 'Мощность двигателя', value: '0.75 кВт' },
      { label: 'Размер фланца', value: 'DN 200' },
      { label: 'Количество лопастей', value: '8 шт' },
      { label: 'Масса', value: '85 кг' },
      { label: 'Материал корпуса', value: 'Сталь' },
      { label: 'Материал ротора', value: 'Сталь' },
      { label: 'Скорость вращения', value: '20-30 об/мин' },
    ],
    features: [
      'Герметичная конструкция',
      'Регулировка скорости',
      'Износостойкие лопасти',
      'Простое обслуживание',
    ],
    power: '0.75 кВт',
    capacity: '5 м³/ч',
    weight: '85 кг',
    gallery: [
      '/images/equipment/pneumatic/airlock-valve/airlock-valve-galery-1.webp',
      '/images/equipment/pneumatic/airlock-valve/airlock-valve-galery-2.webp',
      '/images/equipment/pneumatic/airlock-valve/airlock-valve-galery-3.webp',
      '/images/equipment/pneumatic/airlock-valve/airlock-valve-galery-4.webp',
      '/images/equipment/pneumatic/airlock-valve/airlock-valve-galery-5.webp',
    ],
  },
  // Приёмное оборудование
  {
    id: 20,

    slug: 'mekhanicheskoe-zhivoe-dno',

    seoTitle: 'Стокерный склад «Живое дно» – механический',

    name: 'Стокерный склад «Живое дно» – механический',

    category: 'Приемное оборудование',

    description:

      'Механический стокерный склад «Живое дно» для приема, накопления и равномерной подачи опила, щепы и сыпучего сырья без ручного труда.',
    image:
      '/images/equipment/receiving/walking-floor-mechanical/preview-walking-floor-mechanical-catalog.webp',
    specs: [
      { label: 'Объём склада', value: '50 м³' },
      { label: 'Мощность привода', value: '7.5 кВт' },
      { label: 'Производительность выгрузки', value: '20 м³/ч' },
      { label: 'Длина склада', value: '10000 мм' },
      { label: 'Ширина склада', value: '4000 мм' },
      { label: 'Масса', value: '6500 кг' },
      { label: 'Тип дна', value: 'Механическое подвижное' },
      { label: 'Материал', value: 'Сталь 09Г2С' },
    ],
    features: [
      'Механическое подвижное дно',
      'Равномерная выгрузка',
      'Датчик уровня',
      'Защита от перегрузки',
    ],
    badge: 'Хит продаж',
    power: '7.5 кВт',
    capacity: '50 м³',
    weight: '6500 кг',
    gallery: [
      '/images/equipment/receiving/walking-floor-mechanical/walking-floor-mechanical-galery-1.webp',
    ],
  },
  {
    id: 21,

    slug: 'stokernyj-sklad-zhivoe-dno',

    seoTitle: 'Стокерный склад «Живое дно» гидравлический',

    name: 'Стокерный склад «Живое дно» гидравлический',

    category: 'Приемное оборудование',

    description:

      'Гидравлический стокерный склад «Живое дно» объемом 35 м³: накапливает сырье и непрерывно подает его в линию до 6 часов.',
    image:
      '/images/equipment/receiving/walking-floor-hydraulic/preview-walking-floor-hydraulic-catalog.webp',
    specs: [
      { label: 'Объём склада', value: '50 м³' },
      { label: 'Мощность гидростанции', value: '11 кВт' },
      { label: 'Производительность выгрузки', value: '25 м³/ч' },
      { label: 'Длина склада', value: '10000 мм' },
      { label: 'Ширина склада', value: '4000 мм' },
      { label: 'Масса', value: '7200 кг' },
      { label: 'Тип дна', value: 'Гидравлическое подвижное' },
      { label: 'Давление масла', value: '200 бар' },
    ],
    features: [
      'Гидравлический привод',
      'Плавная регулировка',
      'Автоматическое управление',
      'Датчик уровня',
    ],
    power: '11 кВт',
    capacity: '50 м³',
    weight: '7200 кг',
    gallery: [
      '/images/equipment/receiving/walking-floor-hydraulic/walking-floor-hydraulic-galery-1.webp',
      '/images/equipment/receiving/walking-floor-hydraulic/walking-floor-hydraulic-galery-2.webp',
      '/images/equipment/receiving/walking-floor-hydraulic/walking-floor-hydraulic-galery-3.webp',
      '/images/equipment/receiving/walking-floor-hydraulic/walking-floor-hydraulic-galery-4.webp',
      '/images/equipment/receiving/walking-floor-hydraulic/walking-floor-hydraulic-galery-5.webp',
      '/images/equipment/receiving/walking-floor-hydraulic/walking-floor-hydraulic-galery-6.webp',
    ],
  },
  // Транспортирующее оборудование
  {
    id: 22,

    slug: 'transporter-lentochniy',

    seoTitle: 'Транспортер ленточный',

    name: 'Транспортер ленточный',

    category: 'Транспортирующее оборудование',

    description:

      'Транспортер ленточный для стружки, щепы и сельхозсырья: обеспечивает стабильную подачу материала под углом до 45°.',
    image:
      '/images/equipment/conveyors/belt-conveyor/preview-belt-conveyor-catalog.webp',
    specs: [
      { label: 'Производительность', value: '30 м³/ч' },
      { label: 'Ширина ленты', value: '500 мм' },
      { label: 'Длина транспортёра', value: 'до 50 м' },
      { label: 'Мощность привода', value: '5.5 кВт' },
      { label: 'Скорость ленты', value: '1.2 м/с' },
      { label: 'Масса (10 м)', value: '600 кг' },
      { label: 'Угол наклона', value: 'до 20°' },
      { label: 'Тип ленты', value: 'Резинотканевая' },
    ],
    features: ['Желобчатые ролики', 'Натяжное устройство', 'Очистной скребок', 'Защитные борта'],
    power: '5.5 кВт',
    capacity: '30 м³/ч',
    weight: '600 кг',
    gallery: [
      '/images/equipment/conveyors/belt-conveyor/belt-conveyor-galery-1.webp',
      '/images/equipment/conveyors/belt-conveyor/belt-conveyor-galery-2.webp',
      '/images/equipment/conveyors/belt-conveyor/belt-conveyor-galery-3.webp',
      '/images/equipment/conveyors/belt-conveyor/belt-conveyor-galery-4.webp',
    ],
  },
  {
    id: 23,

    slug: 'transporter-tsepnoy-skrebkoviy-z-obrazniy',

    seoTitle: 'Транспортер цепной скребковый Z-образный',

    name: 'Транспортер цепной скребковый Z-образный',

    category: 'Транспортирующее оборудование',

    description:

      'Z-образный цепной скребковый транспортер: перемещает сыпучие материалы по днищу корпуса и подает их в зону выгрузки.',
    image:
      '/images/equipment/conveyors/scraper-conveyor-z/preview-scraper-conveyor-z-catalog.webp',
    specs: [
      { label: 'Производительность', value: '15 м³/ч' },
      { label: 'Мощность привода', value: '7.5 кВт' },
      { label: 'Высота подъёма', value: 'до 15 м' },
      { label: 'Ширина жёлоба', value: '300 мм' },
      { label: 'Скорость цепи', value: '0.5 м/с' },
      { label: 'Масса (10 м)', value: '1200 кг' },
      { label: 'Угол наклона', value: 'до 60°' },
      { label: 'Тип цепи', value: 'Втулочно-роликовая' },
    ],
    features: [
      'Z-образная конфигурация',
      'Герметичный корпус',
      'Натяжная станция',
      'Износостойкие скребки',
    ],
    badge: 'Популярное',
    power: '7.5 кВт',
    capacity: '15 м³/ч',
    weight: '1200 кг',
    gallery: [
      '/images/equipment/conveyors/scraper-conveyor-z/scraper-conveyor-z-galery-1.webp',
    ],
  },
  {
    id: 24,

    slug: 'transporter-tsepnoy-skrebkoviy-pryamoy',

    seoTitle: 'Транспортер цепной скребковый прямой',

    name: 'Транспортер цепной скребковый прямой',

    category: 'Транспортирующее оборудование',

    description:

      'Прямой цепной скребковый транспортер для сыпучих материалов: надежно перемещает сырье по корпусу в зону выгрузки.',
    image:
      '/images/equipment/conveyors/scraper-conveyor-straight/preview-scraper-conveyor-straight-catalog.webp',
    specs: [
      { label: 'Производительность', value: '15 м³/ч' },
      { label: 'Мощность привода', value: '5.5 кВт' },
      { label: 'Длина транспортёра', value: 'до 30 м' },
      { label: 'Ширина жёлоба', value: '300 мм' },
      { label: 'Скорость цепи', value: '0.5 м/с' },
      { label: 'Масса (10 м)', value: '850 кг' },
      { label: 'Угол наклона', value: 'до 45°' },
      { label: 'Тип цепи', value: 'Втулочно-роликовая' },
    ],
    features: [
      'Герметичный корпус',
      'Натяжная станция',
      'Износостойкие скребки',
      'Модульная конструкция',
    ],
    power: '5.5 кВт',
    capacity: '15 м³/ч',
    weight: '850 кг',
    gallery: [
      '/images/equipment/conveyors/scraper-conveyor-straight/scraper-conveyor-straight-galery-1.webp',
      '/images/equipment/conveyors/scraper-conveyor-straight/scraper-conveyor-straight-galery-2.webp',
    ],
  },
  {
    id: 25,

    slug: 'jelevator',

    seoTitle: 'Нория-элеватор',

    name: 'Нория-элеватор',

    category: 'Транспортирующее оборудование',

    description:

      'Нория-элеватор для вертикальной подачи подготовленного сырья и других сыпучих мелкокусковых материалов размером до 40 мм.',
    image:
      '/images/equipment/conveyors/bucket-elevator/preview-bucket-elevator-catalog.webp',
    specs: [
      { label: 'Производительность', value: '20 м³/ч' },
      { label: 'Высота подъёма', value: 'до 25 м' },
      { label: 'Мощность привода', value: '7.5 кВт' },
      { label: 'Ширина ковша', value: '200 мм' },
      { label: 'Скорость ленты', value: '1.6 м/с' },
      { label: 'Масса (10 м)', value: '1100 кг' },
      { label: 'Объём ковша', value: '2.5 л' },
      { label: 'Шаг ковшей', value: '300 мм' },
    ],
    features: [
      'Взрывозащищённое исполнение',
      'Датчик обрыва ленты',
      'Обратный клапан',
      'Смотровые люки',
    ],
    power: '7.5 кВт',
    capacity: '20 м³/ч',
    weight: '1100 кг',
    gallery: [
      '/images/equipment/conveyors/bucket-elevator/bucket-elevator-galery-1.webp',
      '/images/equipment/conveyors/bucket-elevator/bucket-elevator-galery-2.webp',
      '/images/equipment/conveyors/bucket-elevator/bucket-elevator-galery-3.webp',
    ],
  },
  {
    id: 26,

    slug: 'transporter-lentochniy-s-gofrobortom',

    seoTitle: 'Ленточный транспортер с гофробортом',

    name: 'Ленточный транспортер с гофробортом',

    category: 'Транспортирующее оборудование',

    description:

      'Ленточный транспортер с гофробортом и скребками: поднимает гранулы и другие сыпучие материалы под углом до 60°.',
    image:
      '/images/equipment/conveyors/belt-conveyor-sidewall/preview-belt-conveyor-sidewall-catalog.webp',
    specs: [
      { label: 'Производительность', value: '25 м³/ч' },
      { label: 'Ширина ленты', value: '500 мм' },
      { label: 'Высота борта', value: '120 мм' },
      { label: 'Мощность привода', value: '5.5 кВт' },
      { label: 'Скорость ленты', value: '1.0 м/с' },
      { label: 'Масса (10 м)', value: '750 кг' },
      { label: 'Угол наклона', value: 'до 60°' },
      { label: 'Тип ленты', value: 'С гофробортом' },
    ],
    features: ['Гофрированные борта', 'Большой угол наклона', 'Поперечные перегородки', 'Натяжное устройство'],
    power: '5.5 кВт',
    capacity: '25 м³/ч',
    weight: '750 кг',
    gallery: [
      '/images/equipment/conveyors/belt-conveyor-sidewall/belt-conveyor-sidewall-galery-1.webp',
      '/images/equipment/conveyors/belt-conveyor-sidewall/belt-conveyor-sidewall-galery-2.webp',
    ],
  },
  {
    id: 27,

    slug: 'dozator-shnekovyj',

    seoTitle: 'Шнековый питатель',

    name: 'Шнековый питатель',

    category: 'Транспортирующее оборудование',

    description:

      'Шнековый питатель для равномерной и дозированной подачи сырья в дробилки, прессы, сушилки и теплогенераторы.',
    image:
      '/images/equipment/conveyors/screw-feeder/preview-screw-feeder-catalog.webp',
    specs: [
      { label: 'Производительность', value: '10 м³/ч' },
      { label: 'Диаметр шнека', value: '250 мм' },
      { label: 'Длина транспортёра', value: 'до 10 м' },
      { label: 'Мощность привода', value: '3 кВт' },
      { label: 'Скорость вращения', value: '60 об/мин' },
      { label: 'Масса (5 м)', value: '320 кг' },
      { label: 'Угол наклона', value: 'до 30°' },
      { label: 'Материал шнека', value: 'Сталь' },
    ],
    features: ['Дозированная подача', 'Регулировка производительности', 'Герметичный корпус', 'Частотный привод'],
    power: '3 кВт',
    capacity: '10 м³/ч',
    weight: '320 кг',
    gallery: [
      '/images/equipment/conveyors/screw-feeder/screw-feeder-galery-1.webp',
      '/images/equipment/conveyors/screw-feeder/screw-feeder-galery-2.webp',
      '/images/equipment/conveyors/screw-feeder/screw-feeder-galery-3.webp',
      '/images/equipment/conveyors/screw-feeder/screw-feeder-galery-4.webp',
    ],
  },
  {
    id: 28,

    slug: 'transporter-cepnoj-skrebkovyj',

    seoTitle: 'Наклонный L-образный цепной транспортер',

    name: 'Наклонный L-образный цепной транспортер',

    category: 'Транспортирующее оборудование',

    description:

      'Наклонный L-образный цепной транспортер для опила, стружки и щепы: перемещает сыпучие материалы при угле подъема до 45°.',
    image:
      '/images/equipment/conveyors/chain-conveyor-l/preview-chain-conveyor-l-catalog.webp',
    specs: [
      { label: 'Производительность', value: '12 м³/ч' },
      { label: 'Мощность привода', value: '5.5 кВт' },
      { label: 'Высота подъёма', value: 'до 8 м' },
      { label: 'Ширина жёлоба', value: '300 мм' },
      { label: 'Скорость цепи', value: '0.4 м/с' },
      { label: 'Масса (10 м)', value: '950 кг' },
      { label: 'Угол наклона', value: '45°' },
      { label: 'Тип цепи', value: 'Втулочно-роликовая' },
    ],
    features: ['L-образная конфигурация', 'Герметичный корпус', 'Натяжная станция', 'Износостойкие скребки'],
    power: '5.5 кВт',
    capacity: '12 м³/ч',
    weight: '950 кг',
    gallery: [
      '/images/equipment/conveyors/chain-conveyor-l/chain-conveyor-l-galery-1.webp',
      '/images/equipment/conveyors/chain-conveyor-l/chain-conveyor-l-galery-2.webp',
    ],
  },
  // Сортировочно-просеивающее оборудование
  {
    id: 29,

    slug: 'ustrojstvo-proseivajushhee',

    seoTitle: 'Барабанный просеиватель',

    name: 'Барабанный просеиватель',

    category: 'Сортировочно-просеивающее оборудование',

    description:

      'Барабанный просеиватель отделяет щепу от мелкого опила, снижает нагрузку на дробилку и помогает готовить топливо для теплогенератора.',
    image:
      '/images/equipment/screening/rotary-screener/preview-rotary-screener-catalog.webp',
    specs: [
      { label: 'Производительность', value: '8000 кг/ч' },
      { label: 'Диаметр барабана', value: '1500 мм' },
      { label: 'Длина барабана', value: '4000 мм' },
      { label: 'Мощность привода', value: '4 кВт' },
      { label: 'Размер ячейки', value: '5-50 мм' },
      { label: 'Масса', value: '2200 кг' },
      { label: 'Скорость вращения', value: '12-18 об/мин' },
      { label: 'Количество секций', value: '3 шт' },
    ],
    features: ['Трёхсекционный барабан', 'Сменные сетки', 'Плавная регулировка оборотов', 'Система очистки сеток'],
    badge: 'Хит продаж',
    power: '4 кВт',
    capacity: '8000 кг/ч',
    weight: '2200 кг',
    gallery: [
      '/images/equipment/screening/rotary-screener/rotary-screener-galery-1.webp',
      '/images/equipment/screening/rotary-screener/rotary-screener-galery-2.webp',
    ],
  },
  {
    id: 30,

    slug: 'separator-diskovyj',

    seoTitle: 'Дисковый сепаратор',

    name: 'Дисковый сепаратор',

    category: 'Сортировочно-просеивающее оборудование',

    description:

      'Дисковый сепаратор для отделения крупных включений, мусора и кусковых отходов от опила, щепы и других сыпучих материалов.',
    image:
      '/images/equipment/screening/disc-separator/preview-disc-separator-catalog.webp',
    specs: [
      { label: 'Производительность', value: '6000 кг/ч' },
      { label: 'Количество дисков', value: '12 шт' },
      { label: 'Диаметр диска', value: '400 мм' },
      { label: 'Мощность привода', value: '3 кВт' },
      { label: 'Зазор между дисками', value: '10-50 мм' },
      { label: 'Масса', value: '850 кг' },
      { label: 'Габариты (ДxШxВ)', value: '2500x1200x1400 мм' },
      { label: 'Скорость вращения', value: '40-60 об/мин' },
    ],
    features: ['Регулируемый зазор', 'Самоочистка дисков', 'Низкое энергопотребление', 'Простое обслуживание'],
    power: '3 кВт',
    capacity: '6000 кг/ч',
    weight: '850 кг',
    gallery: [
      '/images/equipment/screening/disc-separator/disc-separator-galery-1.webp',
    ],
  },
];
