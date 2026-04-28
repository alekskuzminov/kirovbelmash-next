'use client';

import { useState, useTransition } from 'react';
import { createDeal } from '@/lib/crm/actions/deals';
import { useRouter } from 'next/navigation';

interface Stage {
    id: string;
    name: string;
}

interface User {
    id: string;
    name: string;
}

interface Contact {
    id: string;
    name: string;
    company: string | null;
    phone: string | null;
}

interface Props {
    pipelineId: string;
    stages: Stage[];
    users: User[];
    contacts: Contact[];
    defaultStageId?: string;
    onClose: () => void;
}

export default function CreateDealModal({
    pipelineId,
    stages,
    users,
    contacts,
    defaultStageId,
    onClose,
}: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [title, setTitle] = useState('');
    const [contactId, setContactId] = useState('');
    const [contactSearch, setContactSearch] = useState('');
    const [stageId, setStageId] = useState(defaultStageId ?? stages[0]?.id ?? '');
    const [amount, setAmount] = useState('');
    const [source, setSource] = useState('');
    const [assigneeId, setAssigneeId] = useState('');
    const [error, setError] = useState('');

    const filteredContacts = contactSearch
        ? contacts.filter(
              (c) =>
                  c.name.toLowerCase().includes(contactSearch.toLowerCase()) ||
                  c.company?.toLowerCase().includes(contactSearch.toLowerCase()) ||
                  c.phone?.includes(contactSearch)
          )
        : contacts;

    function handleSubmit() {
        if (!title.trim()) { setError('Введите название сделки'); return; }
        if (!contactId) { setError('Выберите контакт'); return; }
        setError('');

        startTransition(async () => {
            await createDeal({
                title: title.trim(),
                contactId,
                stageId,
                pipelineId,
                amount: amount || undefined,
                source: source || undefined,
                assigneeId: assigneeId || undefined,
            });
            router.refresh();
            onClose();
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-md rounded-xl bg-gray-900 text-gray-100 shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-700 px-5 py-4">
                    <h2 className="font-semibold text-white">Новая сделка</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <i className="ri-close-line text-xl" />
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Название *</label>
                        <input
                            autoFocus
                            className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Линия брикетирования, 2 т/ч"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Контакт *</label>
                        <input
                            className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 mb-2"
                            value={contactSearch}
                            onChange={(e) => { setContactSearch(e.target.value); setContactId(''); }}
                            placeholder="Поиск по имени, компании, телефону"
                        />
                        <div className="max-h-36 overflow-y-auto rounded-lg border border-gray-700">
                            {filteredContacts.length === 0 && (
                                <p className="px-3 py-2 text-xs text-gray-500">Ничего не найдено</p>
                            )}
                            {filteredContacts.slice(0, 20).map((c) => (
                                <button
                                    key={c.id}
                                    type="button"
                                    onClick={() => { setContactId(c.id); setContactSearch(c.name + (c.company ? ` (${c.company})` : '')); }}
                                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-700 ${contactId === c.id ? 'bg-gray-700 text-white' : 'text-gray-300'}`}
                                >
                                    {c.name}
                                    {c.company && <span className="text-gray-500 ml-1">· {c.company}</span>}
                                    {c.phone && <span className="text-gray-500 ml-1">· {c.phone}</span>}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Этап</label>
                            <select
                                className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={stageId}
                                onChange={(e) => setStageId(e.target.value)}
                            >
                                {stages.map((s) => (
                                    <option key={s.id} value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Сумма, ₽</label>
                            <input
                                type="number"
                                className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Источник</label>
                            <input
                                className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                                placeholder="сайт, звонок..."
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Ответственный</label>
                            <select
                                className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={assigneeId}
                                onChange={(e) => setAssigneeId(e.target.value)}
                            >
                                <option value="">Не назначен</option>
                                {users.map((u) => (
                                    <option key={u.id} value={u.id}>{u.name}</option>
                                ))}
                            </select>
                        </div>
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
                        {isPending ? 'Создание...' : 'Создать'}
                    </button>
                </div>
            </div>
        </div>
    );
}
