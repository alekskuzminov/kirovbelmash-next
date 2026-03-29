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
  {
    name: 'Все',
    slug: 'all',
    seoTitle: 'Каталог оборудования',
    seoDescription: 'Каталог промышленного оборудования для производства брикетов, пеллет и переработки древесины. Полный каталог станков и линий.'
  },
  {
    name: 'Станки для производства брикетов',
    slug: 'briketirujushhee-oborudovanie',
    seoTitle: 'Станки для изготовления топливных брикетов из опилок',
    seoDescription: 'Станок для изготовления топливных брикетов из опилок: шнековый пресс ПБМ-2 (Pini Kay), автомат резки. Купить станок для производства брикетов — цена от производителя, доставка по России.'
  },
  {
    name: 'Станки для производства пеллет',
    slug: 'oborudovanie-dlja-proizvodstva-granul',
    seoTitle: 'Станки для изготовления пеллетов из опилок',
    seoDescription: 'Станок для производства пеллет из опилок: гранулятор ОГМ-1,5, колонна охлаждения гранул. Купить станок для изготовления пеллетов — цена от производителя, доставка по России.'
  },
  {
    name: 'Рубительные машины',
    slug: 'rubitelnye-mashiny',
    seoTitle: 'Рубительные машины',
    seoDescription: 'Рубительные машины для переработки древесных отходов в технологическую щепу: решения для линий пеллетирования и брикетирования.'
  },
  {
    name: 'Дробильное оборудование',
    slug: 'drobilnoe-oborudovanie',
    seoTitle: 'Дробильное оборудование',
    seoDescription: 'Дробильное оборудование для измельчения древесного и сельскохозяйственного сырья: стабильная подготовка материала к переработке.'
  },
  {
    name: 'Бункеры-накопители с ворошителем',
    slug: 'bunkery-nakopiteli',
    seoTitle: 'Бункеры-накопители с ворошителем',
    seoDescription: 'Бункеры-накопители с ворошителем для накопления сырья, выравнивания потока и равномерной подачи материала в технологическую линию.'
  },
  {
    name: 'Сушильное оборудование',
    slug: 'sushilnoe-oborudovanie',
    seoTitle: 'Сушильное оборудование',
    seoDescription: 'Сушильное оборудование для снижения влажности опилок, зерна и другого сырья перед гранулированием, брикетированием и хранением.'
  },
  {
    name: 'Пневмотранспортное оборудование',
    slug: 'pnevmotransportnoe-oborudovanie',
    seoTitle: 'Пневмотранспортное оборудование',
    seoDescription: 'Пневмотранспортное оборудование для перемещения опилок, стружки и пыли между узлами линии с сохранением стабильности процесса.'
  },
  {
    name: 'Приемное оборудование',
    slug: 'priemnoe-oborudovanie',
    seoTitle: 'Приемное оборудование',
    seoDescription: 'Приемное оборудование для накопления, приема и подготовки сырья к дальнейшей подаче в сушильные, дробильные и прессовые узлы.'
  },
  {
    name: 'Транспортирующее оборудование',
    slug: 'transportirujushhee-oborudovanie',
    seoTitle: 'Транспортирующее оборудование',
    seoDescription: 'Транспортирующее оборудование для подачи опилок, щепы, гранул и других сыпучих материалов между агрегатами производственной линии.'
  },
  {
    name: 'Сортировочно-просеивающее оборудование',
    slug: 'sortirovochnoe-oborudovanie',
    seoTitle: 'Сортировочно-просеивающее оборудование',
    seoDescription: 'Сортировочно-просеивающее оборудование для отделения крупных включений, щепы и мусора от опила и другого сыпучего сырья.'
  },
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
      { label: 'Производительность', value: 'до 1000 кг/час' },
      { label: 'Установленная мощность', value: '4 кВт' },
      { label: 'Масса', value: '150 кг' },
      { label: 'Габаритные размеры', value: '1,6x1,1x1,8 м' },
      { label: 'Длина желоба', value: '65 мм' },
      { label: 'Ширина желоба', value: '65 мм' },
      { label: 'Размер получаемого брикета (длина)', value: '150-450 мм' },
      { label: 'Частота вращения шпинделя', value: '7000 об/мин' },
      { label: 'Источник электроэнергии', value: '380/50 В/Гц' },
      { label: 'Обслуживающий персонал', value: '1 человек' },
    ],
    features: [
      'Автоматическая подача брикетов',
      'Регулировка длины реза',
      'Защита от перегрузки',
      'Низкий уровень шума',
    ],
    badge: 'Хит продаж',
    power: '4 кВт',
    capacity: 'до 1000 кг/час',
    weight: '150 кг',
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

    seoTitle: 'Пресс для топливных брикетов из опилок ПБМ-2 — купить от производителя',

    name: 'Пресс ПБМ-2 для брикетов Pini Kay',

    category: 'Станки для производства брикетов',

    description:

      'Шнековый пресс ПБМ-2 для производства брикетов Pini Kay из опилок без связующих. Производительность 500–1000 кг/ч, компактная компоновка. Цена от производителя, доставка по РФ.',
    image:
      '/images/equipment/briquette-presses/pini-kay-press-pbm2/preview-pini-kay-press-pbm2-catalog.webp',
    specs: [
      { label: 'Производительность', value: '500-1000 кг/час' },
      { label: 'Влажность исходного сырья', value: '8-12 %' },
      { label: 'Масса', value: '1100 кг' },
      { label: 'Размер фракции сырья', value: '1-5 мм' },
      { label: 'Источник электроэнергии', value: '380В, 50Гц' },
      { label: 'Количество нагревательных элементов', value: '3-4 шт' },
      { label: 'Мощность двигателя привода ворошителя', value: '0,55 кВт' },
      { label: 'Мощность нагревательного элемента обжига', value: '2,7 кВт' },
    ],
    features: [
      'Производство брикетов Pini Kay',
      'Система охлаждения',
      'Автоматическая подача',
      'Защита от перегрузки',
    ],
    power: '0,55 кВт',
    capacity: '500-1000 кг/час',
    weight: '1100 кг',
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

    seoTitle: 'Гранулятор для пеллет ОГМ-1,5 — купить от производителя',

    name: 'Гранулятор для пеллет – пеллетайзер ОГМ-1,5',

    category: 'Станки для производства пеллет',

    description:

      'Гранулятор ОГМ-1,5 для производства пеллет из опилок, соломы и лузги: производительность 0,9–1,2 т/ч, матрица 6–8 мм, кольцевой пресс. Цена от завода, доставка по России.',
    image:
      '/images/equipment/pellet-presses/pellet-mill-ogm15/preview-pellet-mill-ogm15-catalog.webp',
    specs: [
      { label: 'Производительность', value: '0,9-1,2 т/ч' },
      { label: 'Мощность двигателя пресса', value: '75-90 кВт' },
      { label: 'Частота вращения матрицы', value: '140 об/мин' },
      { label: 'Масса', value: '2,1 т' },
      { label: 'Диаметр отверстий в матрице', value: '6-8 мм' },
      { label: 'Источник электроэнергии', value: '380/50 В/Гц' },
      { label: 'Габариты', value: 'Длина — 2407 мм, Ширина — 765 мм, Высота — 1430 мм' },
    ],
    features: [
      'Кольцевая матрица',
      'Автоматическая смазка',
      'Частотный преобразователь',
      'Датчик температуры',
    ],
    badge: 'Новинка',
    power: '75-90 кВт',
    capacity: '0,9-1,2 т/ч',
    weight: '2,1 т',
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
      { label: 'Производительность', value: 'до 2 т/ч' },
      { label: 'Мощность двигателя вибростола', value: '1,5 кВт' },
      { label: 'Мощность двигателя вентилятора', value: '5-11 кВт' },
      { label: 'Масса', value: '980 кг' },
      { label: 'Источник электроэнергии', value: '380В, 50Гц' },
    ],
    features: [
      'Равномерное охлаждение',
      'Автоматическая выгрузка',
      'Система распределения воздуха',
      'Датчик температуры',
    ],
    power: '5-11 кВт',
    capacity: 'до 2 т/ч',
    weight: '980 кг',
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
      { label: 'Производительность', value: 'до 8 м3/ч' },
      { label: 'Мощность дробилки', value: '22 кВт' },
      { label: 'Частота вращения', value: '1390 об/мин' },
      { label: 'Масса', value: '895 кг' },
      { label: 'Количество ножей', value: '4 шт' },
      { label: 'Диаметр диска', value: '780 мм' },
      { label: 'Размеры загрузочного окна', value: '175x240 мм' },
      { label: 'Габариты', value: 'Длина — 2204 мм, Ширина — 930 мм, Высота — 850 мм' },
    ],
    features: [
      'Ножи из инструментальной стали',
      'Гидравлический прижим',
      'Регулировка фракции щепы',
      'Защитный кожух',
    ],
    badge: 'Популярное',
    power: '22 кВт',
    capacity: 'до 8 м3/ч',
    weight: '895 кг',
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
      { label: 'Производительность', value: 'от 20 м3/ч' },
      { label: 'Мощность дробилки', value: '55 кВт' },
      { label: 'Частота вращения', value: '500 об/мин' },
      { label: 'Масса', value: '3527 кг' },
      { label: 'Количество ножей', value: '6 шт' },
      { label: 'Диаметр барабана', value: '650 мм' },
      { label: 'Размеры загрузочного окна', value: '330x600 мм' },
      { label: 'Габариты', value: 'Длина — 2280 мм, Ширина — 1349 мм, Высота — 1335 мм' },
    ],
    features: [
      'Гидравлическая подача',
      'Быстрая замена ножей',
      'Контрнож с регулировкой',
      'Защита от металла',
    ],
    power: '55 кВт',
    capacity: 'от 20 м3/ч',
    weight: '3527 кг',
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
      { label: 'Производительность', value: '5-6 м3/ч' },
      { label: 'Мощность двигателя', value: '22-37 кВт' },
      { label: 'Кол-во молотков', value: '90 шт' },
      { label: 'Масса', value: '780 кг' },
      { label: 'Частота вращения ротора', value: '3000 об/мин' },
      { label: 'Обслуживающий персонал', value: '1 чел' },
      { label: 'Габариты', value: 'Длина — 1240 мм, Ширина — 820 мм, Высота — 910 мм' },
    ],
    features: [
      'Быстрая замена молотков',
      'Реверсивный ротор',
      'Магнитный сепаратор',
      'Виброизоляция корпуса',
    ],
    badge: 'Хит продаж',
    power: '22-37 кВт',
    capacity: '5-6 м3/ч',
    weight: '780 кг',
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
      { label: 'Производительность', value: '6 м3/ч' },
      { label: 'Мощность двигателя', value: '22-30 кВт' },
      { label: 'Кол-во молотков', value: '28 шт' },
      { label: 'Масса', value: '555 кг' },
      { label: 'Частота вращения ротора', value: '3000 об/мин' },
      { label: 'Ширина ротора', value: '106 мм' },
    ],
    features: [
      'Сменные сита',
      'Автоматическая подача',
      'Защита от перегрузки',
      'Низкий уровень вибрации',
    ],
    power: '22-30 кВт',
    capacity: '6 м3/ч',
    weight: '555 кг',
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
      { label: 'Объем бункера', value: '3 м³' },
      { label: 'Мощность электродвигателя ворошителя', value: '2,2 кВт' },
      { label: 'Скорость подачи сырья дозирующим устройством', value: '500-3000 кг/ч' },
      { label: 'Масса', value: '700 кг' },
      { label: 'Мощность электродвигателя дозирующего устройства', value: '1,1 кВт' },
      { label: 'Источник электроэнергии', value: 'трехфазная сеть 380 В, 50 Гц' },
    ],
    features: [
      'Ворошитель предотвращает сводообразование',
      'Шнековая выгрузка',
      'Датчик уровня',
      'Смотровой люк',
    ],
    power: '2,2 кВт',
    capacity: '500-3000 кг/ч',
    weight: '700 кг',
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
      { label: 'Объем бункера', value: '6 м³' },
      { label: 'Мощность электродвигателя ворошителя', value: '3,0 кВт' },
      { label: 'Скорость подачи сырья дозирующим устройством', value: '500-3000 кг/ч' },
      { label: 'Масса', value: '1200 кг' },
      { label: 'Мощность электродвигателя дозирующего устройства', value: '1,1 кВт' },
      { label: 'Источник электроэнергии', value: 'трехфазная сеть 380 В, 50 Гц' },
    ],
    features: [
      'Усиленный ворошитель',
      'Площадка обслуживания',
      'Автоматический контроль уровня',
      'Аварийная разгрузка',
    ],
    badge: 'Популярное',
    power: '3,0 кВт',
    capacity: '500-3000 кг/ч',
    weight: '1200 кг',
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
      { label: 'Производительность', value: '2 т/ч' },
      { label: 'Скорость вращения', value: '4-6 об/мин' },
      { label: 'Температура на входе', value: '400-600 С°' },
      { label: 'Температура на выходе', value: '80-100 С°' },
      { label: 'Вид сырья', value: 'опил, стружка и др.' },
      { label: 'Габариты', value: 'Длина — 9450 мм, Ширина — 2900 мм, Высота — 3065 мм' },
    ],
    features: [
      'Трёхходовая система сушки',
      'Теплоизоляция корпуса',
      'Автоматический контроль температуры',
      'Искрогасительная система',
    ],
    badge: 'Хит продаж',
    power: '',
    capacity: '2 т/ч',
    weight: '',
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
      { label: 'Производительность', value: 'До 1,5 т/ч' },
      { label: 'Скорость вращения', value: '4-7 об/мин' },
      { label: 'Температура на входе', value: '400-600 С°' },
      { label: 'Температура на выходе', value: '80-100 С°' },
      { label: 'Вид сырья', value: 'опил, стружка и др.' },
      { label: 'Габариты', value: 'Длина — 3980 мм, Ширина — 2510 мм, Высота — 2685 мм' },
    ],
    features: [
      'Компактные размеры',
      'Теплоизоляция',
      'Контроль температуры',
      'Низкое энергопотребление',
    ],
    power: '',
    capacity: 'До 1,5 т/ч',
    weight: '',
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
      { label: 'Производительность', value: '1,5 МВт' },
      { label: 'Температура газов', value: '800 С°' },
      { label: 'Расход газов', value: '12500 кг/час' },
      { label: 'Масса', value: '17000 кг' },
      { label: 'Вид топлива', value: 'древесные отходы' },
      { label: 'Габариты', value: 'Длина — 4930 мм, Ширина — 1840 мм, Высота — 3260 мм' },
    ],
    features: [
      'Автоматическая подача топлива',
      'Контроль температуры',
      'Система очистки дымовых газов',
      'Искрогаситель',
    ],
    power: '',
    capacity: '1,5 МВт',
    weight: '17000 кг',
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
      { label: 'Производительность', value: '1,0 МВт' },
      { label: 'Температура газов', value: '400-800 С°' },
      { label: 'Расход газов', value: '12500 кг/час' },
      { label: 'Масса', value: '15000 кг' },
      { label: 'Вид топлива', value: 'Древесные отходы' },
      { label: 'Габариты', value: 'Длина — 5600 мм, Ширина — 1600 мм, Высота — 1840 мм' },
    ],
    features: [
      'Компактная конструкция',
      'Автоматическая подача',
      'Контроль температуры',
      'Система очистки',
    ],
    power: '',
    capacity: '1,0 МВт',
    weight: '15000 кг',
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
      { label: 'Производительность', value: '1,0 МВт' },
      { label: 'Температура газов', value: '400-800 С°' },
      { label: 'Расход газов', value: '12500 кг/час' },
      { label: 'Масса', value: '5800 кг' },
      { label: 'Вид топлива', value: 'Древесные отходы' },
      { label: 'Габариты', value: 'Длина — 2245 мм, Ширина — 1500 мм, Высота — 2070 мм' },
    ],
    features: [
      'Вихревая камера сгорания',
      'Высокий КПД',
      'Автоматическое управление',
      'Низкие выбросы',
    ],
    badge: 'Новинка',
    power: '',
    capacity: '1,0 МВт',
    weight: '5800 кг',
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
      { label: 'Производительность', value: '11800-15400 м3/ч' },
      { label: 'Масса', value: '2500 кг' },
      { label: 'Высота корпуса', value: '1210 мм' },
      { label: 'Общая высота циклона', value: '4950 мм' },
      { label: 'Диаметр корпуса', value: '2500 мм' },
      { label: 'Диаметр отверстия для сырья', value: '596 мм' },
      { label: 'Размер входного отверстия', value: '650x650 мм' },
      { label: 'Размер выходного отверстия', value: '650x650 мм' },
    ],
    features: [
      'Высокая эффективность',
      'Шлюзовой затвор',
      'Смотровые люки',
      'Антикоррозийное покрытие',
    ],
    badge: 'Популярное',
    power: '-',
    capacity: '11800-15400 м3/ч',
    weight: '2500 кг',
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
      { label: 'Производительность', value: '8700-11600 м3/ч' },
      { label: 'Масса', value: '830 кг' },
      { label: 'Высота корпуса', value: '750 мм' },
      { label: 'Общая высота циклона', value: '4675 мм' },
      { label: 'Диаметр корпуса', value: '1600 мм' },
      { label: 'Диаметр отверстия для сырья', value: '400 мм' },
      { label: 'Размер входного отверстия', value: '500 мм' },
      { label: 'Размер выходного отверстия', value: '670 мм' },
    ],
    features: [
      'Компактные размеры',
      'Эффективная очистка',
      'Шлюзовой затвор',
      'Смотровые люки',
    ],
    power: '-',
    capacity: '8700-11600 м3/ч',
    weight: '830 кг',
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
      { label: 'Производительность', value: '3260-4350 м3/ч' },
      { label: 'Масса', value: '315 кг' },
      { label: 'Высота корпуса', value: '650 мм' },
      { label: 'Общая высота циклона', value: '3210 мм' },
      { label: 'Диаметр корпуса', value: '1060 мм' },
      { label: 'Диаметр отверстия для сырья', value: '300 мм' },
      { label: 'Размер входного отверстия', value: '310 мм' },
      { label: 'Размер выходного отверстия', value: '310 мм' },
    ],
    features: [
      'Компактный размер',
      'Простая конструкция',
      'Низкая стоимость',
      'Лёгкий монтаж',
    ],
    power: '-',
    capacity: '3260-4350 м3/ч',
    weight: '315 кг',
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
      { label: 'Производительность', value: '6 — 30 м.куб/час' },
      { label: 'Мощность привода', value: '0,75 — 2,2 кВт' },
    ],
    features: [
      'Герметичная конструкция',
      'Регулировка скорости',
      'Износостойкие лопасти',
      'Простое обслуживание',
    ],
    power: '0,75 — 2,2 кВт',
    capacity: '6 — 30 м.куб/час',
    weight: '',
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
      { label: 'Производительность', value: '16 м3/ч' },
      { label: 'Электропотребление', value: '4 кВт' },
      { label: 'Объем', value: '16 м3' },
      { label: 'Масса', value: '3160 кг' },
      { label: 'Размер фракции', value: 'до 100 мм' },
    ],
    features: [
      'Механическое подвижное дно',
      'Равномерная выгрузка',
      'Датчик уровня',
      'Защита от перегрузки',
    ],
    badge: 'Хит продаж',
    power: '4 кВт',
    capacity: '16 м3/ч',
    weight: '3160 кг',
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
      { label: 'Производительность', value: 'до 10 м3/ч' },
      { label: 'Электропотребление', value: '7,5 кВт' },
      { label: 'Объем', value: '35 м3' },
      { label: 'Масса', value: '2300 кг' },
      { label: 'Размер фракции', value: 'до 100 мм' },
    ],
    features: [
      'Гидравлический привод',
      'Плавная регулировка',
      'Автоматическое управление',
      'Датчик уровня',
    ],
    power: '7,5 кВт',
    capacity: 'до 10 м3/ч',
    weight: '2300 кг',
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
      { label: 'Производительность', value: 'до 1т/ч' },
      { label: 'Размер фракции', value: 'до 50 мм' },
      { label: 'Мощность электродвигателя', value: '1,5 кВт' },
      { label: 'Скорость движения ленты', value: '0,9 м/с' },
      { label: 'Частота вращения барабанов', value: '37,5 об/мин' },
      { label: 'Длина конвейера', value: '2-10 м' },
      { label: 'Подключение', value: '380В, 50Гц' },
    ],
    features: ['Желобчатые ролики', 'Натяжное устройство', 'Очистной скребок', 'Защитные борта'],
    power: '1,5 кВт',
    capacity: 'до 1т/ч',
    weight: '',
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
      { label: 'Производительность', value: 'до 25 м.куб/час' },
      { label: 'Размер фракции', value: 'до 50 мм' },
      { label: 'Мощность электродвигателя', value: '4 кВт' },
      { label: 'Скорость движения цепи', value: '0,2-0,6 м/с' },
      { label: 'Шаг скребков', value: '252 мм' },
      { label: 'Цепь', value: 'М56-2-63-1 ГОСТ 588-81' },
      { label: 'Подключение', value: '380В, 50Гц' },
    ],
    features: [
      'Z-образная конфигурация',
      'Герметичный корпус',
      'Натяжная станция',
      'Износостойкие скребки',
    ],
    badge: 'Популярное',
    power: '4 кВт',
    capacity: 'до 25 м.куб/час',
    weight: '',
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
      { label: 'Производительность', value: 'до 25 м.куб/час' },
      { label: 'Размер фракции', value: 'до 50 мм' },
      { label: 'Мощность электродвигателя', value: '4кВт' },
      { label: 'Скорость движения цепи', value: '0,2-0,6 м/с' },
      { label: 'Шаг скребков', value: '252 мм' },
      { label: 'Цепь', value: 'М56-2-63-1 ГОСТ588-81' },
      { label: 'Подключение', value: '380 В, 50 Гц' },
    ],
    features: [
      'Герметичный корпус',
      'Натяжная станция',
      'Износостойкие скребки',
      'Модульная конструкция',
    ],
    power: '4 кВт',
    capacity: 'до 25 м.куб/час',
    weight: '',
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
      { label: 'Мощность электродвигателя', value: '2,2* кВт' },
      { label: 'Масса', value: '300* кг' },
      { label: 'Ширина ковша', value: '100-125 мм' },
      { label: 'Способ разгрузки', value: 'гравитационный' },
      { label: 'Шаг ковшей', value: '400* мм' },
      { label: 'Тип тягового органа', value: 'ременный' },
      { label: 'Скорость движения ходовой части', value: '1,45 м/с' },
      { label: 'Источник электроэнергии', value: '380 В, 50 Гц' },
      { label: 'Производительность: сухой опил / гранулы', value: '2 т/ч / 10 т/ч' },
      { label: 'Объемная масса сырья: сухой опил / гранулы', value: '120 кг/М3 / 600 кг/М3' },
    ],
    features: [
      'Взрывозащищённое исполнение',
      'Датчик обрыва ленты',
      'Обратный клапан',
      'Смотровые люки',
    ],
    power: '2,2 кВт',
    capacity: '2 т/ч / 10 т/ч',
    weight: '300 кг',
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
      { label: 'Производительность', value: 'до 10 м3/ч' },
      { label: 'Размер фракции', value: 'до 50 мм' },
      { label: 'Мощность электродвигателя', value: '1,5 кВт' },
      { label: 'Подключение', value: '380В, 50Гц' },
    ],
    features: ['Гофрированные борта', 'Большой угол наклона', 'Поперечные перегородки', 'Натяжное устройство'],
    power: '1,5 кВт',
    capacity: 'до 10 м3/ч',
    weight: '',
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
      { label: 'Производительность', value: 'до 45 м3/ч' },
      { label: 'Диаметр шнека', value: '100-400 мм' },
      { label: 'Шаг шнека', value: '60-400 мм' },
      { label: 'Длина шнека', value: 'до 7 м' },
    ],
    features: ['Дозированная подача', 'Регулировка производительности', 'Герметичный корпус', 'Частотный привод'],
    power: '',
    capacity: 'до 45 м3/ч',
    weight: '',
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
      { label: 'Производительность', value: 'до 25 м3/ч' },
      { label: 'Размер фракции', value: 'до 50 мм' },
      { label: 'Мощность электродвигателя', value: '4 кВт' },
      { label: 'Скорость движения цепи', value: '0,2-0,6 м/с' },
      { label: 'Шаг скребков', value: '252 мм' },
      { label: 'Цепь', value: 'М56-2-63-1 ГОСТ588-81' },
      { label: 'Подключение', value: '380 В, 50 Гц' },
    ],
    features: ['L-образная конфигурация', 'Герметичный корпус', 'Натяжная станция', 'Износостойкие скребки'],
    power: '4 кВт',
    capacity: 'до 25 м3/ч',
    weight: '',
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
      { label: 'Производительность', value: '0-12 м3/ч' },
      { label: 'Размер получаемой фракции', value: '5 мм' },
      { label: 'Масса', value: '250 кг' },
      { label: 'Подключение', value: '380В, 50Гц' },
      { label: 'Мощность электродвигателя сита', value: '1,5 кВт' },
      { label: 'Мощность электродвигателя камнедробилки', value: '1,1 кВт' },
      { label: 'Габариты', value: 'Длина — 3170 мм, Ширина — 1290 мм, Высота — 1460 мм' },
    ],
    features: ['Трёхсекционный барабан', 'Сменные сетки', 'Плавная регулировка оборотов', 'Система очистки сеток'],
    badge: 'Хит продаж',
    power: '1,5 кВт',
    capacity: '0-12 м3/ч',
    weight: '250 кг',
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
      { label: 'Производительность', value: '22 м3/ч' },
      { label: 'Мощность привода дисковых валов', value: '4,5 кВт' },
      { label: 'Мощность привода камнедробилки', value: '0,18 кВт' },
      { label: 'Масса', value: '360 кг' },
      { label: 'Подключение', value: '380 В, 50 Гц' },
    ],
    features: ['Регулируемый зазор', 'Самоочистка дисков', 'Низкое энергопотребление', 'Простое обслуживание'],
    power: '4,5 кВт',
    capacity: '22 м3/ч',
    weight: '360 кг',
    gallery: [
      '/images/equipment/screening/disc-separator/disc-separator-galery-1.webp',
    ],
  },
];
