import Link from 'next/link';

// Mapping from composition item substrings/names to actual catalog categories
const categoryMap: { [key: string]: string } = {
    'Рубительная машина': 'Рубительные машины',
    'Молотковая дробилка': 'Дробильное оборудование',
    'Теплогенератор': 'Сушильное оборудование',
    'Сушильный барабан': 'Сушильное оборудование',
    'Бункер-накопитель': 'Бункеры-накопители с ворошителем',
    'Пресс для брикетов': 'Станки для производства брикетов',
    'Автомат резки брикетов': 'Станки для производства брикетов',
    'Гранулятор': 'Станки для производства пеллет',
    'Колонна охлаждения': 'Сортировочно-просеивающее оборудование', // Assuming cooling/sorting might go together or just general
    'Пневмотранспортная система': 'Пневмотранспортное оборудование',
    'Циклон': 'Пневмотранспортное оборудование',
    'Шлюзовой затвор': 'Пневмотранспортное оборудование',
    'Вентилятор': 'Пневмотранспортное оборудование',
    'Конвейер': 'Транспортирующее оборудование',
};

function getCategoryForComposition(item: string): string | null {
    if (item.includes('Система автоматики') || item.includes('Система упаковки')) {
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
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <i className="ri-list-check-2 text-red-600" />
                Состав и комплектация линии
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {composition.map((item) => {
                    const category = getCategoryForComposition(item);
                    const isClickable = !!category;

                    const content = (
                        <>
                            <i className="ri-checkbox-circle-fill text-red-600 text-lg flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-800 font-medium leading-snug">{item}</span>
                        </>
                    );

                    if (isClickable) {
                        return (
                            <Link
                                key={item}
                                href={`/oborudovanie?category=${encodeURIComponent(category)}`}
                                className="flex items-start gap-3 bg-white hover:bg-red-50/50 rounded-xl px-4 py-3.5 border border-gray-100 hover:border-red-100 shadow-sm hover:shadow-md transition-all group"
                            >
                                <i className="ri-checkbox-circle-fill text-red-500 group-hover:text-red-600 text-lg flex-shrink-0 mt-0.5 transition-colors" />
                                <span className="text-sm text-gray-800 group-hover:text-red-900 font-medium leading-snug transition-colors">
                                    {item}
                                </span>
                            </Link>
                        );
                    }

                    return (
                        <div
                            key={item}
                            className="flex items-start gap-3 bg-white rounded-xl px-4 py-3.5 border border-gray-100 shadow-sm"
                        >
                            {content}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
