import { Metadata } from 'next';
import CalculatorHero from '@/components/calculator/CalculatorHero';
import Calculator from '@/components/calculator/Calculator';
import CalculatorFAQ from '@/components/calculator/CalculatorFAQ';

export const metadata: Metadata = {
    title: 'Калькулятор стоимости оборудования',
    description: 'Рассчитайте предварительную стоимость линии брикетирования, гранулирования или сушки онлайн. Точность ±10%. Ответ в течение рабочего дня.',
    alternates: { canonical: '/calculator' },
    openGraph: {
        title: 'Калькулятор стоимости оборудования | КировБелМаш',
        description: 'Онлайн-расчёт стоимости линии брикетирования, гранулирования или сушки. Ответ за 1 рабочий день.',
        url: 'https://kirovbelmash.ru/calculator',
    },
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Насколько точен предварительный расчёт?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Онлайн-калькулятор даёт оценку с точностью ±10%. Точная стоимость определяется после анализа сырья, площадки и технического задания нашими инженерами.',
            },
        },
        {
            '@type': 'Question',
            name: 'Что входит в стоимость оборудования?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Базовая стоимость включает проектирование, изготовление и заводские испытания оборудования. Монтаж, пусконаладка и обучение рассчитываются отдельно как дополнительные услуги.',
            },
        },
        {
            '@type': 'Question',
            name: 'Можно ли заказать только часть услуг?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Да, вы можете выбрать любую комбинацию услуг. Однако при заказе полного комплекса вы получаете скидку до 15% и единого ответственного подрядчика.',
            },
        },
        {
            '@type': 'Question',
            name: 'Какие сроки изготовления оборудования?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Стандартные сроки — от 4 до 12 недель в зависимости от сложности и комплектации. Точные сроки согласовываются при заключении договора.',
            },
        },
        {
            '@type': 'Question',
            name: 'Есть ли рассрочка или лизинг?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Да, мы предлагаем гибкие условия оплаты: рассрочку до 12 месяцев, а также работаем с лизинговыми компаниями. Подробности обсудите с менеджером.',
            },
        },
        {
            '@type': 'Question',
            name: 'Какая гарантия на оборудование?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Стандартная гарантия — 24 месяца. Вы можете выбрать расширенную гарантию до 36 месяцев в дополнительных услугах калькулятора.',
            },
        },
    ],
};

export default function CalculatorPage() {
    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <CalculatorHero />
            <Calculator />
            <CalculatorFAQ />
        </main>
    );
}
