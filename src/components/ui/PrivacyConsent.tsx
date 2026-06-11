'use client';

import Link from 'next/link';

interface PrivacyConsentProps {
    /** Уникален в пределах страницы — на странице может быть несколько форм */
    id: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    className?: string;
}

/**
 * Чекбокс согласия на обработку персональных данных (152-ФЗ).
 * Не предотмечен и обязателен: предотмеченный чекбокс юридически
 * приравнивается к отсутствию согласия.
 */
export default function PrivacyConsent({ id, checked, onChange, className = '' }: PrivacyConsentProps) {
    return (
        <label htmlFor={id} className={`flex items-start gap-2.5 cursor-pointer select-none ${className}`}>
            <input
                type="checkbox"
                id={id}
                name="privacyConsent"
                required
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="mt-0.5 w-4 h-4 shrink-0 accent-red-600 cursor-pointer"
            />
            <span className="text-xs text-gray-500 leading-relaxed">
                Я даю согласие на обработку моих персональных данных в соответствии с{' '}
                <Link
                    href="/privacy-policy"
                    className="text-gray-600 hover:text-red-600 underline transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    политикой конфиденциальности
                </Link>{' '}
                <span className="text-red-600">*</span>
            </span>
        </label>
    );
}
