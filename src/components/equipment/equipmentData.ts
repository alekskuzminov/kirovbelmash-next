export interface EquipmentItem {
  id: number;
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
}

export const equipmentCategories = [
  'Все',
  'Станки для производства брикетов',
  'Станки для производства пеллет',
  'Рубительные машины',
  'Дробильное оборудование',
  'Бункеры-накопители с ворошителем',
  'Сушильное оборудование',
  'Пневмотранспортное оборудование',
  'Приемное оборудование',
  'Транспортирующее оборудование',
  'Сортировочно-просеивающее оборудование',
];

export const equipmentItems: EquipmentItem[] = [
  // Станки для производства брикетов
  {
    id: 1,
    name: 'Автомат резки брикетов',
    category: 'Станки для производства брикетов',
    description:
      'Автоматическая система резки брикетов для получения изделий заданной длины. Обеспечивает точную резку и высокую производительность при минимальном участии оператора.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20automatic%20briquette%20cutting%20machine%20heavy%20duty%20steel%20construction%20with%20conveyor%20and%20blade%20system%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography%20high%20detail&width=600&height=400&seq=eq101&orientation=landscape',
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
  },
  {
    id: 2,
    name: 'Пресс ПБМ-2 для брикетов Pini Kay',
    category: 'Станки для производства брикетов',
    description:
      'Специализированный пресс для производства брикетов типа Pini Kay с характерной формой и центральным отверстием. Высокое качество брикетов и стабильная работа.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20pini%20kay%20briquette%20press%20machine%20heavy%20duty%20steel%20frame%20with%20hydraulic%20system%20and%20hopper%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq102&orientation=landscape',
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
  },
  // Станки для производства пеллет
  {
    id: 3,
    name: 'Гранулятор для пеллет – пеллетайзер ОГМ-1,5',
    category: 'Станки для производства пеллет',
    description:
      'Высокопроизводительный гранулятор с кольцевой матрицей для производства топливных пеллет. Надёжная конструкция и стабильное качество гранул.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20ring%20die%20pellet%20mill%20granulator%20machine%20large%20steel%20equipment%20with%20feeding%20system%20and%20motor%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq103&orientation=landscape',
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
  },
  {
    id: 4,
    name: 'Колонна охлаждения гранул',
    category: 'Станки для производства пеллет',
    description:
      'Вертикальная колонна для охлаждения готовых пеллет после гранулятора. Обеспечивает равномерное охлаждение и подготовку гранул к упаковке.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20vertical%20pellet%20cooling%20column%20tower%20steel%20structure%20with%20air%20distribution%20system%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq104&orientation=landscape',
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
  },
  // Рубительные машины
  {
    id: 5,
    name: 'Рубительная машина РДМ-22',
    category: 'Рубительные машины',
    description:
      'Дисковая рубительная машина для первичного измельчения древесины. Перерабатывает брёвна, горбыль и обрезки в технологическую щепу.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20disc%20wood%20chipper%20machine%20large%20steel%20equipment%20with%20feeding%20chute%20and%20discharge%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq105&orientation=landscape',
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
  },
  {
    id: 6,
    name: 'Рубительная машина РБМ-55',
    category: 'Рубительные машины',
    description:
      'Барабанная рубительная машина для переработки крупных древесных отходов. Высокая производительность и равномерная фракция щепы.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20drum%20wood%20chipper%20machine%20large%20rotating%20drum%20with%20blades%20steel%20frame%20heavy%20duty%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq106&orientation=landscape',
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
  },
  // Дробильное оборудование
  {
    id: 7,
    name: 'Молотковая дробилка КДЕ',
    category: 'Дробильное оборудование',
    description:
      'Высокопроизводительная молотковая дробилка для измельчения древесных отходов и щепы. Обеспечивает равномерную фракцию на выходе.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20hammer%20mill%20crusher%20machine%20heavy%20duty%20steel%20construction%20with%20large%20hopper%20and%20motor%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq107&orientation=landscape',
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
    name: 'Молотковая дробилка ДСС',
    category: 'Дробильное оборудование',
    description:
      'Дробилка для вторичного измельчения щепы в мелкую фракцию. Равномерный помол и высокая надёжость при непрерывной работе.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20wood%20chip%20shredder%20grinder%20machine%20steel%20body%20with%20large%20inlet%20and%20electric%20motor%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq108&orientation=landscape',
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
  },
  // Бункеры-накопители с ворошителем
  {
    id: 9,
    name: 'Бункер-накопитель V=3 м³',
    category: 'Бункеры-накопители с ворошителем',
    description:
      'Компактный бункер-накопитель с ворошителем для хранения и равномерной подачи сыпучих материалов. Предотвращает сводообразование.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20storage%20hopper%20bin%20with%20agitator%20stirrer%20mechanism%20compact%20steel%20container%20with%20legs%20and%20discharge%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq109&orientation=landscape',
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
  },
  {
    id: 10,
    name: 'Бункер-накопитель V=6 м³',
    category: 'Бункеры-накопители с ворошителем',
    description:
      'Бункер-накопитель среднего объёма с ворошителем для производственных линий. Надёжная система выгрузки и контроля уровня.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20storage%20silo%20hopper%20with%20agitator%20system%20medium%20steel%20construction%20with%20platform%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq110&orientation=landscape',
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
  },
  // Сушильное оборудование
  {
    id: 11,
    name: 'Барабан сушильный АВМ-1,5',
    category: 'Сушильное оборудование',
    description:
      'Промышленная барабанная сушилка для снижения влажности сырья перед брикетированием или гранулированием. Высокая эффективность теплообмена.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20rotary%20drum%20dryer%20large%20cylindrical%20steel%20equipment%20with%20support%20frame%20and%20drive%20motor%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq111&orientation=landscape',
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
  },
  {
    id: 12,
    name: 'Сушильный барабан АВМ-0,65',
    category: 'Сушильное оборудование',
    description:
      'Компактная барабанная сушилка для малых и средних производств. Эффективная сушка при минимальных энергозатратах.',
    image:
      'https://readdy.ai/api/search-image?query=compact%20industrial%20rotary%20drum%20dryer%20medium%20cylindrical%20steel%20equipment%20with%20support%20frame%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq112&orientation=landscape',
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
  },
  {
    id: 13,
    name: 'Теплогенератор ТГМ-1,5',
    category: 'Сушильное оборудование',
    description:
      'Теплогенератор для сушильных комплексов. Работает на древесных отходах, обеспечивает стабильную температуру теплоносителя.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20heat%20generator%20furnace%20steel%20construction%20with%20combustion%20chamber%20and%20air%20blower%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq113&orientation=landscape',
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
  },
  {
    id: 14,
    name: 'Теплогенератор ТГК-1,0',
    category: 'Сушильное оборудование',
    description:
      'Компактный теплогенератор для небольших сушильных установок. Эффективное сжигание древесных отходов и стабильная работа.',
    image:
      'https://readdy.ai/api/search-image?query=compact%20industrial%20heat%20generator%20furnace%20medium%20steel%20construction%20with%20combustion%20chamber%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq114&orientation=landscape',
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
  },
  {
    id: 15,
    name: 'Теплогенератор ТГВГ-1,0',
    category: 'Сушильное оборудование',
    description:
      'Вихревой теплогенератор для сушильных комплексов. Высокая эффективность сжигания и равномерный нагрев теплоносителя.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20vortex%20heat%20generator%20furnace%20steel%20construction%20with%20cyclone%20chamber%20and%20blower%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq115&orientation=landscape',
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
  },
  // Пневмотранспортное оборудование
  {
    id: 16,
    name: 'Циклон-осадитель для опилок УЦ-2500',
    category: 'Пневмотранспортное оборудование',
    description:
      'Крупный циклон-осадитель для отделения опилок и пыли из воздушного потока. Высокая эффективность очистки и большая производительность.',
    image:
      'https://readdy.ai/api/search-image?query=large%20industrial%20cyclone%20separator%20dust%20collector%20tall%20steel%20conical%20structure%20with%20inlet%20and%20discharge%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq116&orientation=landscape',
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
  },
  {
    id: 17,
    name: 'Циклон-осадитель для опилок УЦ-1600',
    category: 'Пневмотранспортное оборудование',
    description:
      'Циклон среднего размера для отделения опилок из воздушного потока. Оптимален для средних производственных линий.',
    image:
      'https://readdy.ai/api/search-image?query=medium%20industrial%20cyclone%20separator%20dust%20collector%20steel%20conical%20structure%20with%20inlet%20pipe%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq117&orientation=landscape',
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
  },
  {
    id: 18,
    name: 'Циклон-осадитель для опилок УЦ-100',
    category: 'Пневмотранспортное оборудование',
    description:
      'Компактный циклон для малых производств и локальной очистки воздуха от опилок и пыли. Простая конструкция и надёжная работа.',
    image:
      'https://readdy.ai/api/search-image?query=compact%20industrial%20cyclone%20separator%20small%20dust%20collector%20steel%20conical%20structure%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq118&orientation=landscape',
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
  },
  {
    id: 19,
    name: 'Затвор шлюзовой',
    category: 'Пневмотранспортное оборудование',
    description:
      'Шлюзовой затвор для герметичной выгрузки материала из циклонов и бункеров. Предотвращает подсос воздуха в систему.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20rotary%20airlock%20valve%20feeder%20steel%20housing%20with%20rotor%20and%20motor%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq119&orientation=landscape',
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
  },
  // Приёмное оборудование
  {
    id: 20,
    name: 'Стокерный склад «Живое дно» – механический',
    category: 'Приемное оборудование',
    description:
      'Стокерный склад с механическим подвижным дном для хранения и равномерной подачи сыпучих материалов. Надёжная механическая конструкция.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20walking%20floor%20storage%20system%20mechanical%20moving%20floor%20large%20steel%20structure%20with%20chain%20drive%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq120&orientation=landscape',
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
  },
  {
    id: 21,
    name: 'Стокерный склад «Живое дно» гидравлический',
    category: 'Приемное оборудование',
    description:
      'Стокерный склад с гидравлическим подвижным дном. Плавная регулировка скорости подачи и высокая надёжость гидропривода.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20hydraulic%20walking%20floor%20storage%20system%20large%20steel%20structure%20with%20hydraulic%20cylinders%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq121&orientation=landscape',
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
  },
  // Транспортирующее оборудование
  {
    id: 22,
    name: 'Транспортер ленточный',
    category: 'Транспортирующее оборудование',
    description:
      'Ленточный конвейер для горизонтального и наклонного перемещения сыпучих материалов. Универсальное решение для производственных линий.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20belt%20conveyor%20long%20rubber%20belt%20transport%20system%20with%20steel%20frame%20rollers%20and%20motor%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq122&orientation=landscape',
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
  },
  {
    id: 23,
    name: 'Транспортер цепной скребковый Z-образный',
    category: 'Транспортирующее оборудование',
    description:
      'Z-образный скребковый транспортёр для вертикального и горизонтального перемещения материалов. Герметичная конструкция.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20Z-shaped%20scraper%20chain%20conveyor%20vertical%20and%20horizontal%20steel%20enclosed%20transport%20system%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq123&orientation=landscape',
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
  },
  {
    id: 24,
    name: 'Транспортер цепной скребковый прямой',
    category: 'Транспортирующее оборудование',
    description:
      'Прямой скребковый транспортёр для горизонтального перемещения сыпучих материалов. Надёжная конструкция и простое обслуживание.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20straight%20scraper%20chain%20conveyor%20horizontal%20steel%20enclosed%20transport%20system%20with%20drive%20unit%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq124&orientation=landscape',
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
  },
  {
    id: 25,
    name: 'Нория-элеватор',
    category: 'Транспортирующее оборудование',
    description:
      'Вертикальный ковшовый элеватор для подъёма сыпучих материалов на высоту. Компактная конструкция и высокая производительность.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20bucket%20elevator%20vertical%20conveyor%20tall%20steel%20structure%20with%20motor%20and%20housing%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq125&orientation=landscape',
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
  },
  {
    id: 26,
    name: 'Ленточный транспортер с гофробортом',
    category: 'Транспортирующее оборудование',
    description:
      'Ленточный конвейер с гофрированными бортами для транспортировки под большим углом наклона. Предотвращает просыпание материала.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20belt%20conveyor%20with%20corrugated%20sidewalls%20cleated%20belt%20transport%20system%20steep%20incline%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq126&orientation=landscape',
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
  },
  {
    id: 27,
    name: 'Шнековый питатель',
    category: 'Транспортирующее оборудование',
    description:
      'Шнековый транспортёр для дозированной подачи сыпучих материалов. Точная регулировка производительности и герметичная конструкция.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20screw%20feeder%20auger%20conveyor%20steel%20tube%20with%20spiral%20blade%20and%20motor%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq127&orientation=landscape',
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
  },
  {
    id: 28,
    name: 'Наклонный L-образный цепной транспортер',
    category: 'Транспортирующее оборудование',
    description:
      'L-образный скребковый транспортёр для подъёма материалов под углом. Сочетает горизонтальный и наклонный участки.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20L-shaped%20inclined%20scraper%20chain%20conveyor%20angular%20steel%20enclosed%20transport%20system%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq128&orientation=landscape',
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
  },
  // Сортировочно-просеивающее оборудование
  {
    id: 29,
    name: 'Барабанный просеиватель',
    category: 'Сортировочно-просеивающее оборудование',
    description:
      'Барабанный грохот для сортировки щепы, опилок и других сыпучих материалов. Вращающийся барабан обеспечивает эффективное разделение по фракциям.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20trommel%20drum%20screen%20separator%20rotating%20cylindrical%20steel%20mesh%20equipment%20with%20frame%20and%20motor%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq129&orientation=landscape',
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
  },
  {
    id: 30,
    name: 'Дисковый сепаратор',
    category: 'Сортировочно-просеивающее оборудование',
    description:
      'Дисковый сепаратор для отделения крупных включений и сортировки материала. Эффективное разделение по размеру частиц.',
    image:
      'https://readdy.ai/api/search-image?query=industrial%20disc%20separator%20screening%20machine%20rotating%20discs%20steel%20frame%20with%20motor%20on%20clean%20light%20gray%20factory%20floor%20professional%20product%20photography&width=600&height=400&seq=eq130&orientation=landscape',
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
  },
];
