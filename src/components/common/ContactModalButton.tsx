'use client';

import type { ReactNode } from 'react';
import { openContactModal } from '@/components/common/ContactModal';

const DEFAULT_MODAL_MESSAGE =
    '\u0417\u0430\u044f\u0432\u043a\u0430 \u043d\u0430 \u043e\u0431\u0440\u0430\u0442\u043d\u044b\u0439 \u0437\u0432\u043e\u043d\u043e\u043a';

interface ContactModalButtonProps {
    className?: string;
    message?: string;
    children: ReactNode;
}

export default function ContactModalButton({
    className,
    message = DEFAULT_MODAL_MESSAGE,
    children,
}: ContactModalButtonProps) {
    return (
        <button
            type="button"
            onClick={() => openContactModal(message)}
            className={className}
        >
            {children}
        </button>
    );
}
