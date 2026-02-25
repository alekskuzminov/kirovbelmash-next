'use client';

import StaticLeadForm from '@/components/common/StaticLeadForm';

interface CalculatorRequestFormProps {
    equipmentTitle: string;
    productivityLabel: string;
    materialLabel: string;
    servicesText: string;
    totalPriceText: string;
}

export default function CalculatorRequestForm({
    equipmentTitle,
    productivityLabel,
    materialLabel,
    servicesText,
    totalPriceText,
}: CalculatorRequestFormProps) {
    return (
        <StaticLeadForm
            formId="calculator-request-form"
            endpoint="https://readdy.ai/api/form/d6ap48ma728k8ctu3en0"
            title="Получить точный расчет"
            titleClassName="text-base font-bold text-gray-900 mb-4"
            submitLabel="Получить точный расчет"
            successTitle="Заявка отправлена!"
            successText="Менеджер свяжется с вами в течение 30 минут"
            resetLabel="Новый расчет"
            requiredErrorText="Пожалуйста, заполните имя и телефон"
            submitErrorText="Ошибка отправки. Попробуйте позже."
            networkErrorText="Ошибка соединения. Попробуйте позже."
            messageFieldName="comment"
            messageLabel="Комментарий"
            messagePlaceholder="Комментарий к заявке"
            messageRows={2}
            footerNote="Менеджер свяжется в течение 30 минут"
            showSubmitArrow={true}
            extraPayload={{
                equipment: equipmentTitle,
                productivity: productivityLabel,
                material: materialLabel,
                services: servicesText,
                total_price: totalPriceText,
            }}
            buttonClassName="w-full px-6 py-3 bg-red-600 text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer flex items-center justify-center space-x-2"
            successWrapperClassName="text-center py-6"
            successTitleClassName="text-lg font-bold text-gray-900 mb-1"
            successTextClassName="text-sm text-gray-500 mb-4"
            resetButtonClassName="px-5 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
        />
    );
}
