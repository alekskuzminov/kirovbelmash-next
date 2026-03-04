'use client';

import { useState } from 'react';
import PrivacyDisclaimer from '@/components/ui/PrivacyDisclaimer';

interface StaticLeadFormProps {
    formId: string;
    title: string;
    subtitle?: string;
    submitLabel: string;
    submittingLabel?: string;
    successTitle: string;
    successText: string;
    resetLabel: string;
    requiredErrorText: string;
    submitErrorText: string;
    networkErrorText: string;
    source?: string;
    messageFieldName?: string;
    messageLabel?: string;
    messagePlaceholder?: string;
    messageRows?: number;
    messageMaxLength?: number;
    footerNote?: string;
    showSubmitArrow?: boolean;
    extraPayload?: Record<string, string>;
    titleClassName?: string;
    subtitleClassName?: string;
    buttonClassName?: string;
    successWrapperClassName?: string;
    successTitleClassName?: string;
    successTextClassName?: string;
    resetButtonClassName?: string;
}

export default function StaticLeadForm({
    formId,
    title,
    subtitle,
    submitLabel,
    submittingLabel = 'Отправка...',
    successTitle,
    successText,
    resetLabel,
    requiredErrorText,
    submitErrorText,
    networkErrorText,
    source = 'general',
    messageFieldName: _messageFieldName,
    messageLabel = 'Сообщение',
    messagePlaceholder = 'Опишите ваш проект или задачу',
    messageRows = 3,
    messageMaxLength = 500,
    footerNote,
    showSubmitArrow = false,
    extraPayload,
    titleClassName = 'text-lg font-bold text-gray-900 mb-1',
    subtitleClassName = 'text-sm text-gray-500 mb-6',
    buttonClassName = 'w-full py-3 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap',
    successWrapperClassName = 'flex flex-col items-center justify-center py-8 text-center',
    successTitleClassName = 'text-lg font-bold text-gray-900 mb-2',
    successTextClassName = 'text-sm text-gray-600 mb-6',
    resetButtonClassName = 'px-6 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap',
}: StaticLeadFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name.trim() || !formData.phone.trim()) {
            setError(requiredErrorText);
            return;
        }

        if (formData.message.length > messageMaxLength) {
            setError(submitErrorText);
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    message: formData.message,
                    source,
                    extra: extraPayload,
                }),
            });

            if (res.ok) {
                setIsSubmitted(true);
                setFormData({ name: '', phone: '', email: '', message: '' });
            } else {
                setError(submitErrorText);
            }
        } catch {
            setError(networkErrorText);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className={successWrapperClassName}>
                <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mb-4">
                    <i className="ri-check-line text-3xl text-green-600"></i>
                </div>
                <h3 className={successTitleClassName}>{successTitle}</h3>
                <p className={successTextClassName}>{successText}</p>
                <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className={resetButtonClassName}
                >
                    {resetLabel}
                </button>
            </div>
        );
    }

    return (
        <form id={formId} onSubmit={handleSubmit}>
            <h3 className={titleClassName}>{title}</h3>
            {subtitle && <p className={subtitleClassName}>{subtitle}</p>}

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                <div>
                    <label htmlFor={`${formId}-name`} className="block text-sm font-medium text-gray-700 mb-1">
                        Имя *
                    </label>
                    <input
                        type="text"
                        id={`${formId}-name`}
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ваше имя"
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                        required
                    />
                </div>

                <div>
                    <label htmlFor={`${formId}-phone`} className="block text-sm font-medium text-gray-700 mb-1">
                        Телефон *
                    </label>
                    <input
                        type="tel"
                        id={`${formId}-phone`}
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                        required
                    />
                </div>

                <div>
                    <label htmlFor={`${formId}-email`} className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail
                    </label>
                    <input
                        type="email"
                        id={`${formId}-email`}
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@example.com"
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors"
                    />
                </div>

                <div>
                    <label htmlFor={`${formId}-message`} className="block text-sm font-medium text-gray-700 mb-1">
                        {messageLabel}
                    </label>
                    <textarea
                        id={`${formId}-message`}
                        name="message"
                        value={formData.message}
                        onChange={(e) => {
                            if (e.target.value.length <= messageMaxLength) {
                                setFormData({ ...formData, message: e.target.value });
                            }
                        }}
                        maxLength={messageMaxLength}
                        rows={messageRows}
                        placeholder={messagePlaceholder}
                        className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-colors resize-none"
                    ></textarea>
                    <div className="text-xs text-gray-400 text-right mt-1">{formData.message.length}/{messageMaxLength}</div>
                </div>

                <button type="submit" disabled={isSubmitting} className={buttonClassName}>
                    <span>{isSubmitting ? submittingLabel : submitLabel}</span>
                    {!isSubmitting && showSubmitArrow && <i className="ri-arrow-right-line text-lg"></i>}
                </button>
            </div>

            {footerNote ? (
                <p className="text-xs text-gray-400 text-center mt-3">
                    {footerNote}
                </p>
            ) : (
                <PrivacyDisclaimer />
            )}
        </form>
    );
}
