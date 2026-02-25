import Link from 'next/link';

interface LineCompositionProps {
    composition: string[];
    backHref: string;
}

export default function LineComposition({ composition, backHref }: LineCompositionProps) {
    return (
        <section className="py-12 bg-gray-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <i className="ri-list-check-2 text-red-600" />
                    Состав и комплектация линии
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                    {composition.map((item) => (
                        <div
                            key={item}
                            className="flex items-start gap-3 bg-white rounded-xl px-4 py-3.5 border border-gray-100 shadow-sm"
                        >
                            <i className="ri-checkbox-circle-fill text-red-600 text-lg flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-800 font-medium leading-snug">{item}</span>
                        </div>
                    ))}
                </div>
                <div className="text-center">
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-gray-700 bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md rounded-xl transition-all"
                    >
                        <i className="ri-arrow-left-line" />
                        Все линии
                    </Link>
                </div>
            </div>
        </section>
    );
}
