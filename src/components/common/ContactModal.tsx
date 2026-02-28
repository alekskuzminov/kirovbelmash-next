'use client';

import { useState, useEffect, useCallback } from 'react';
import ContactForm from '@/components/home/ContactForm';

let openModalFn: ((initialMessage?: string, title?: string) => void) | null = null;

export function openContactModal(initialMessage: string = '', title?: string) {
    if (openModalFn) openModalFn(initialMessage, title);
}

export default function ContactModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [modalTitle, setModalTitle] = useState<string | undefined>(undefined);

    const open = useCallback((msg: string = '', title?: string) => {
        setMessage(msg);
        setModalTitle(title);
        setIsOpen(true);
    }, []);

    useEffect(() => {
        openModalFn = open;
        return () => {
            openModalFn = null;
        };
    }, [open]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const close = () => setIsOpen(false);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) close();
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6"
            onClick={handleBackdropClick}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn pointer-events-none"></div>

            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl animate-scaleIn overflow-hidden max-h-screen overflow-y-auto">
                <button
                    onClick={close}
                    className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors cursor-pointer text-white"
                    aria-label="Закрыть"
                >
                    <i className="ri-close-line text-lg"></i>
                </button>

                <div className="modal-form-wrapper">
                    <ContactForm initialMessage={message} isModal={true} modalTitle={modalTitle} />
                </div>
            </div>
        </div>
    );
}
