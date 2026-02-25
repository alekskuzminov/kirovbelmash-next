'use client';

import StaticLeadForm from '@/components/common/StaticLeadForm';

export default function ProjectsCTAForm() {
    return (
        <StaticLeadForm
            formId="project-inquiry-form"
            endpoint="https://readdy.ai/api/form/d6ao3sua728k8ctu3e30"
            title="Оставить заявку"
            subtitle="Заполните форму и мы подготовим КП"
            submitLabel="Отправить заявку"
            successTitle="Заявка отправлена!"
            successText="Наш менеджер свяжется с вами в ближайшее время"
            resetLabel="Отправить еще"
            requiredErrorText="Пожалуйста, заполните имя и телефон"
            submitErrorText="Ошибка отправки. Попробуйте позже."
            networkErrorText="Ошибка соединения. Попробуйте позже."
        />
    );
}
