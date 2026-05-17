import Link from 'next/link';

interface PrivacyDisclaimerProps {
    className?: string;
}

export default function PrivacyDisclaimer({ className = '' }: PrivacyDisclaimerProps) {
    return (
        <p className={`text-xs text-gray-400 text-center mt-3 ${className}`}>
            Нажимая кнопку, вы соглашаетесь с{' '}
            <Link
                href="/privacy-policy"
                className="text-gray-500 hover:text-red-600 underline transition-colors"
                target="_blank"
                rel="noopener noreferrer"
            >
                политикой конфиденциальности и обработки персональных данных
            </Link>
        </p>
    );
}
