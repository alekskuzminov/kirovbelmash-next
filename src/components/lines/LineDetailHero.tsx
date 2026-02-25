import Link from 'next/link';
import ContactModalButton from '@/components/common/ContactModalButton';
import { LineVariant } from './linesData';

interface LineDetailHeroProps {
    variant: LineVariant;
    backHref: string;
    backLabel: string;
}

export default function LineDetailHero({ variant, backHref, backLabel }: LineDetailHeroProps) {
    return (
        <div className="mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                {variant.name}
            </h1>

            {/* Price directly under H1 */}
            <p className="text-xl sm:text-2xl font-semibold text-gray-900 mt-4 mb-6">
                <span className="text-gray-900 mr-2">Цена:</span>
                {variant.price}
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                {variant.description}
            </p>

            <div className="flex flex-wrap gap-3">
                <Link
                    href={backHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                >
                    <i className="ri-arrow-left-line" />
                    Назад к выбору моделей
                </Link>
                <ContactModalButton
                    message={`Запрос КП: ${variant.name}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                    Запросить КП
                    <i className="ri-send-plane-line" />
                </ContactModalButton>
            </div>
        </div>
    );
}
