import type { ReactNode } from 'react';

export interface FAQItem {
    question: string;
    /** Текст ответа. Может быть строкой или JSX (со ссылками и т.п.). */
    answer: ReactNode;
    /**
     * Plain-текст ответа для schema.org JSON-LD.
     * Обязателен, если `answer` — JSX. Если `answer` — строка, не нужен.
     */
    answerText?: string;
}

interface FAQSectionProps {
    items: FAQItem[];
    title: ReactNode;
    description?: ReactNode;
    /** Дополнительные классы на корневую `<section>`. По умолчанию — `bg-white py-12 sm:py-16`. */
    className?: string;
}

const getAnswerText = (item: FAQItem): string => {
    if (typeof item.answer === 'string') return item.answer;
    if (item.answerText) return item.answerText;
    if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn(`FAQSection: item "${item.question}" has JSX answer but no answerText for JSON-LD`);
    }
    return '';
};

export default function FAQSection({ items, title, description, className }: FAQSectionProps) {
    const schema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: getAnswerText(item),
            },
        })),
    };

    return (
        <section className={className ?? 'py-12 sm:py-16 bg-white'}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-10 sm:mb-12">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="w-8 h-0.5 bg-red-500" />
                        <span className="text-red-600 text-sm font-medium tracking-wider uppercase">Вопросы</span>
                        <div className="w-8 h-0.5 bg-red-500" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{title}</h2>
                    {description && <p className="text-base text-gray-600">{description}</p>}
                </div>

                <div className="space-y-3 sm:space-y-4">
                    {items.map((item, idx) => (
                        <details
                            key={idx}
                            className="group bg-gray-50 rounded-xl border border-gray-100 overflow-hidden"
                        >
                            <summary className="flex items-center justify-between px-5 sm:px-6 py-4 cursor-pointer list-none">
                                <h3 className="text-sm sm:text-base font-medium text-gray-900 pr-4">{item.question}</h3>
                                <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
                                    <i className="ri-add-line text-lg text-gray-400 group-open:hidden" />
                                    <i className="ri-subtract-line text-lg text-red-500 hidden group-open:block" />
                                </div>
                            </summary>
                            <div className="px-5 sm:px-6 pb-4">
                                <div className="text-sm text-gray-600 leading-relaxed">{item.answer}</div>
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
