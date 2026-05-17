import Image from 'next/image';
import Link from 'next/link';

interface RelatedLine {
    href: string;
    label: string;
    description: string;
    image: string;
}

interface Props {
    lines: RelatedLine[];
    title?: string;
    subtitle?: string;
}

export default function RelatedLinesBlock({ lines, title = 'Смотрите также', subtitle }: Props) {
    return (
        <section className="py-12 sm:py-16 bg-gray-50 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={subtitle ? 'mb-8' : 'mb-8'}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        {title}
                    </h2>
                    {subtitle && (
                        <p className="text-base text-gray-600 max-w-2xl">
                            {subtitle}
                        </p>
                    )}
                </div>
                <div className={`grid grid-cols-1 gap-6 ${lines.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
                    {lines.map((line) => (
                        <Link
                            key={line.href}
                            href={line.href}
                            className="group flex flex-col rounded-2xl overflow-hidden border border-gray-200 bg-white hover:border-red-200 hover:shadow-lg transition-all duration-200"
                        >
                            <div className="relative w-full aspect-[16/9] bg-white p-4">
                                <Image
                                    src={line.image}
                                    alt={line.label}
                                    fill
                                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors leading-snug">
                                    {line.label}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed flex-1">
                                    {line.description}
                                </p>
                                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-red-600">
                                    Подробнее
                                    <i className="ri-arrow-right-line" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
