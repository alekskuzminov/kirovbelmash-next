'use client';

import { useState, useTransition } from 'react';
import { createContact, updateContact } from '@/lib/crm/actions/contacts';
import { useRouter } from 'next/navigation';

interface ContactData {
    id?: string;
    name: string;
    company: string | null;
    phone: string | null;
    email: string | null;
}

interface Props {
    initial?: ContactData;
    onClose: () => void;
}

export default function ContactFormModal({ initial, onClose }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [name, setName] = useState(initial?.name ?? '');
    const [company, setCompany] = useState(initial?.company ?? '');
    const [phone, setPhone] = useState(initial?.phone ?? '');
    const [email, setEmail] = useState(initial?.email ?? '');
    const [error, setError] = useState('');

    const isEdit = !!initial?.id;

    function handleSubmit() {
        if (!name.trim()) { setError('Введите имя'); return; }
        setError('');

        startTransition(async () => {
            if (isEdit && initial?.id) {
                await updateContact(initial.id, {
                    name: name.trim(),
                    company: company.trim() || null,
                    phone: phone.trim() || null,
                    email: email.trim() || null,
                });
            } else {
                await createContact({
                    name: name.trim(),
                    company: company.trim() || undefined,
                    phone: phone.trim() || undefined,
                    email: email.trim() || undefined,
                });
            }
            router.refresh();
            onClose();
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-md rounded-xl bg-gray-900 text-gray-100 shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-700 px-5 py-4">
                    <h2 className="font-semibold text-white">
                        {isEdit ? 'Редактировать контакт' : 'Новый контакт'}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <i className="ri-close-line text-xl" />
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Имя *</label>
                        <input
                            autoFocus
                            className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Иван Иванов"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Компания</label>
                        <input
                            className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="ООО Рога и Копыта"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Телефон</label>
                        <input
                            type="tel"
                            className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+7 (900) 000-00-00"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ivan@example.com"
                        />
                    </div>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-700 px-5 py-4">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isPending ? 'Сохранение...' : isEdit ? 'Сохранить' : 'Создать'}
                    </button>
                </div>
            </div>
        </div>
    );
}
