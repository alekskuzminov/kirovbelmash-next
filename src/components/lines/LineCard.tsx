import Image from 'next/image';
import Link from 'next/link';

import { LineVariant } from './linesData';
import { SITE_CONFIG } from '@/config/site.config';

interface LineCardProps {
    variant: LineVariant;
}

export default function LineCard({ variant }: LineCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
            {/* Image */}
            <div className="relative h-56 sm:h-64 overflow-hidden bg-gray-100">
                {/* Logo watermark */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 z-10 bg-white/80 p-1.5 pr-2.5 rounded-lg backdrop-blur-sm shadow-sm">
                    <Image
                        src={SITE_CONFIG.assets.logo}
                        alt={SITE_CONFIG.assets.logoAlt}
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                    <span className="text-xs font-bold text-gray-900">{SITE_CONFIG.company.name}</span>
                </div>
                <Image
                    src={variant.image}
                    alt={variant.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
                    {variant.name}
                </h3>

                <p className="text-2xl font-bold text-gray-900 mb-4">
                    <span className="text-base font-normal text-gray-500">Цена: </span>
                    {variant.price}
                </p>

                {/* Specs table */}
                <dl className="space-y-2 mb-6 flex-1">
                    {[
                        { label: 'Номинальная мощность', value: variant.power },
                        { label: 'Тип сырья', value: variant.rawMaterial },
                        { label: 'Готовый продукт', value: variant.product },
                    ].map(({ label, value }) => (
                        <div key={label} className="flex gap-4 text-sm">
                            <dt className="text-gray-500 flex-shrink-0 w-44">{label}</dt>
                            <dd className="text-gray-800 font-medium">{value}</dd>
                        </div>
                    ))}
                </dl>

                {/* CTA */}
                <div className="mt-2 text-center">
                    <Link
                        href={`/production-lines/${variant.id}`}
                        className="inline-block px-8 py-3 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-sm"
                    >
                        Подробнее
                    </Link>
                </div>
            </div>
        </div>
    );
}
