import { Metadata } from 'next';
import CalculatorHero from '@/components/calculator/CalculatorHero';
import Calculator from '@/components/calculator/Calculator';
import CalculatorFAQ from '@/components/calculator/CalculatorFAQ';

export const metadata: Metadata = {
    title: 'Калькулятор стоимости оборудования | Кировбелмаш',
    description: 'Рассчитайте предварительную стоимость промышленного оборудования и дополнительных услуг онлайн.',
};

export default function CalculatorPage() {
    return (
        <main>
            <CalculatorHero />
            <Calculator />
            <CalculatorFAQ />
        </main>
    );
}
