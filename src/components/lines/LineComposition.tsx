import Link from 'next/link';
import { equipmentCategoriesConfig } from '@/data/equipment';

// Mapping from composition item substrings/names to actual catalog categories
const categoryMap: { [key: string]: string } = {
    // Станки для производства брикетов
    'Пресс брикетирующий': 'Станки для производства брикетов',
    'Прес брикетирующий': 'Станки для производства брикетов',
    'Пресс-экструдер': 'Станки для производства брикетов',
    'Пресс экструдер': 'Станки для производства брикетов',
    'Пресс для брикетов': 'Станки для производства брикетов',
    'Автомат резки брикет': 'Станки для производства брикетов',
    'Станок для автоматической торцовки': 'Станки для производства брикетов',
    // Станки для производства пеллет
    'Гранулятор': 'Станки для производства пеллет',
    'Пресс-гранулятор': 'Станки для производства пеллет',
    'Пресс гранулятор': 'Станки для производства пеллет',
    'Колонна охлаждения': 'Станки для производства пеллет',
    'Охладитель': 'Станки для производства пеллет',
    'Элеватор': 'Станки для производства пеллет',
    // Рубительные машины
    'Рубительная машина': 'Рубительные машины',
    // Дробильное оборудование
    'Дробильная установка': 'Дробильное оборудование',
    'Молотковая дробилка': 'Дробильное оборудование',
    'Шредер': 'Дробильное оборудование',
    // Бункеры-накопители
    'Бункер-накопитель': 'Бункеры-накопители с ворошителем',
    'Бункер накопитель': 'Бункеры-накопители с ворошителем',
    'Бункер-приемный': 'Бункеры-накопители с ворошителем',
    'Бункер приемный': 'Бункеры-накопители с ворошителем',
    'Бункер промежуточный': 'Бункеры-накопители с ворошителем',
    // Сушильное оборудование
    'Теплогенератор': 'Сушильное оборудование',
    'Барабан сушильный': 'Сушильное оборудование',
    'Сушильный барабан': 'Сушильное оборудование',
    'Сушка опилок': 'Сушильное оборудование',
    // Пневмотранспортное оборудование
    'Циклон': 'Пневмотранспортное оборудование',
    'Шлюзовой затвор': 'Пневмотранспортное оборудование',
    'Затвор шлюзовой': 'Пневмотранспортное оборудование',
    'Вентилятор': 'Пневмотранспортное оборудование',
    'Пневмотранспортная система': 'Пневмотранспортное оборудование',
    // Приемное оборудование
    'Живое дно': 'Приемное оборудование',
    'Подвижный пол': 'Приемное оборудование',
    'Подвижнй пол': 'Приемное оборудование',
    'Подача сырья': 'Приемное оборудование',
    'подача сырья': 'Приемное оборудование',
    // Транспортирующее оборудование
    'Транспортер': 'Транспортирующее оборудование',
    'Конвейер': 'Транспортирующее оборудование',
    'Дозатор шнековый': 'Транспортирующее оборудование',
    // Сортировочно-просеивающее оборудование
    'Сепаратор': 'Сортировочно-просеивающее оборудование',
    'Просеивающее устройство': 'Сортировочно-просеивающее оборудование',
    'Устройство просеивающее': 'Сортировочно-просеивающее оборудование',
    'камнедробления': 'Сортировочно-просеивающее оборудование',
};

function getCategorySlug(categoryName: string): string | null {
    const category = equipmentCategoriesConfig.find(c => c.name === categoryName);
    return category ? category.slug : null;
}

function getCategoryForComposition(item: string): string | null {
    const excludePatterns = [
        'Система автоматики', 'Система упаковки', 'Система дымоудаления',
        'Дымоудаление', 'Система фильтрации', 'Фильтровальная установка',
        'Электрощит', 'Электронные весы', 'Весы электронные',
        'Линия автоматической упаковки', 'Задвижка шиберная',
    ];
    if (excludePatterns.some(p => item.includes(p))) {
        return null;
    }
    for (const [key, category] of Object.entries(categoryMap)) {
        if (item.toLowerCase().includes(key.toLowerCase())) {
            return category;
        }
    }
    return null; // No match found, leave unclickable or default
}

export default function LineComposition({ composition }: { composition: string[] }) {
    return (
        <div className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                <i className="ri-list-check-2 text-red-600" />
                Состав и комплектация линии
            </h2>
            <div className="rounded-xl border border-gray-100 overflow-hidden">
                {composition.map((item, idx) => {
                    const categoryName = getCategoryForComposition(item);
                    const slug = categoryName ? getCategorySlug(categoryName) : null;
                    const isClickable = !!slug;
                    const rowClass = `flex items-center gap-3 px-4 py-2.5 ${idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`;

                    if (isClickable) {
                        return (
                            <Link
                                key={`${idx}-${item}`}
                                href={`/oborudovanie/${slug}`}
                                className={`${rowClass} hover:bg-red-50/60 transition-colors group`}
                            >
                                <span className="text-xs text-gray-400 w-5 text-right flex-shrink-0">{idx + 1}</span>
                                <span className="text-sm text-gray-800 group-hover:text-red-700 transition-colors">{item}</span>
                                <i className="ri-arrow-right-up-line text-red-400 group-hover:text-red-600 text-sm ml-auto flex-shrink-0 transition-colors" />
                            </Link>
                        );
                    }

                    return (
                        <div key={`${idx}-${item}`} className={rowClass}>
                            <span className="text-xs text-gray-400 w-5 text-right flex-shrink-0">{idx + 1}</span>
                            <span className="text-sm text-gray-600">{item}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
