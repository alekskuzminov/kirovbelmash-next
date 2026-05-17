'use client';

import StaticLeadForm from '@/components/common/StaticLeadForm';

export default function AboutCTAForm() {
    return (
        <StaticLeadForm
            formId="about-callback-form"
            source="about"
            title="Обратная связь"
            titleClassName="text-xl font-bold text-gray-900 mb-5"
            submitLabel="Отправить заявку"
            successTitle="Заявка отправлена!"
            successText="Мы свяжемся с вами в ближайшее время"
            resetLabel="Отправить еще"
            requiredErrorText="Пожалуйста, заполните имя и телефон"
            submitErrorText="Ошибка отправки. Попробуйте позже."
            networkErrorText="Ошибка соединения. Попробуйте позже."
            messagePlaceholder="Опишите вашу задачу"
            buttonClassName="w-full px-6 py-3 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer"
            successWrapperClassName="text-center py-12"
            successTitleClassName="text-xl font-bold text-gray-900 mb-2"
            successTextClassName="text-sm text-gray-500"
            resetButtonClassName="mt-6 px-6 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer"
        />
    );
}
