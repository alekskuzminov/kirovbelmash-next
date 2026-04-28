'use client';

import { useState, useTransition } from 'react';
import { SerializedDeal } from '@/lib/crm/actions/deals';
import { updateDeal, deleteDeal, addNote } from '@/lib/crm/actions/deals';
import { useRouter } from 'next/navigation';

interface Stage {
    id: string;
    name: string;
    color: string;
}

interface User {
    id: string;
    name: string;
}

interface Props {
    deal: SerializedDeal;
    stages: Stage[];
    users: User[];
    onClose: () => void;
    onDeleted?: () => void;
}

export default function DealModal({ deal, stages, users, onClose, onDeleted }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [title, setTitle] = useState(deal.title);
    const [amount, setAmount] = useState(deal.amount ?? '');
    const [source, setSource] = useState(deal.source ?? '');
    const [assigneeId, setAssigneeId] = useState(deal.assigneeId ?? '');
    const [stageId, setStageId] = useState(deal.stageId);
    const [noteText, setNoteText] = useState('');
    const [notes, setNotes] = useState(deal.notes);
    const [confirmDelete, setConfirmDelete] = useState(false);

    function handleSave() {
        startTransition(async () => {
            await updateDeal(deal.id, {
                title: title.trim() || deal.title,
                amount: amount || null,
                source: source || null,
                assigneeId: assigneeId || null,
                stageId,
            });
            router.refresh();
            onClose();
        });
    }

    function handleAddNote() {
        if (!noteText.trim()) return;
        const text = noteText.trim();
        startTransition(async () => {
            await addNote(deal.id, text);
            setNotes((prev) => [
                { id: Date.now().toString(), text, createdAt: new Date().toISOString(), author: null },
                ...prev,
            ]);
            setNoteText('');
            router.refresh();
        });
    }

    function handleDelete() {
        startTransition(async () => {
            await deleteDeal(deal.id);
            router.refresh();
            onDeleted?.();
            onClose();
        });
    }

    const currentStage = stages.find((s) => s.id === stageId);

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-16 overflow-y-auto">
            <div className="w-full max-w-2xl rounded-xl bg-gray-900 text-gray-100 shadow-2xl">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-gray-700 p-5">
                    <div className="flex-1">
                        <input
                            className="w-full bg-transparent text-lg font-semibold text-white placeholder-gray-500 focus:outline-none"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Название сделки"
                        />
                        <p className="mt-1 text-sm text-gray-400">
                            <i className="ri-user-line mr-1" />
                            {deal.contact.name}
                            {deal.contact.company && (
                                <span className="ml-1 text-gray-500">· {deal.contact.company}</span>
                            )}
                        </p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <i className="ri-close-line text-xl" />
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-0 divide-x divide-gray-700">
                    {/* Left: details */}
                    <div className="p-5 space-y-4">
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Этап</label>
                            <select
                                className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={stageId}
                                onChange={(e) => setStageId(e.target.value)}
                            >
                                {stages.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.name}
                                    </option>
                                ))}
                            </select>
                            {currentStage && (
                                <div
                                    className="mt-1.5 h-1 rounded-full"
                                    style={{ backgroundColor: currentStage.color }}
                                />
                            )}
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

                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Источник</label>
                            <input
                                className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                                placeholder="откуда заявка"
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
                                    <option key={u.id} value={u.id}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="text-xs text-gray-500">
                            Создана: {new Date(deal.createdAt).toLocaleDateString('ru-RU')}
                        </div>
                    </div>

                    {/* Right: notes */}
                    <div className="flex flex-col p-5">
                        <p className="text-xs text-gray-400 mb-3">Заметки</p>
                        <div className="flex gap-2 mb-3">
                            <input
                                className="flex-1 rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={noteText}
                                onChange={(e) => setNoteText(e.target.value)}
                                placeholder="Добавить заметку..."
                                onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                            />
                            <button
                                onClick={handleAddNote}
                                disabled={isPending || !noteText.trim()}
                                className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                <i className="ri-send-plane-line" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto max-h-52 space-y-2">
                            {notes.length === 0 && (
                                <p className="text-xs text-gray-600 italic">Заметок нет</p>
                            )}
                            {notes.map((n) => (
                                <div key={n.id} className="rounded-lg bg-gray-800 p-3">
                                    <p className="text-sm text-gray-200">{n.text}</p>
                                    <p className="mt-1 text-xs text-gray-500">
                                        {new Date(n.createdAt).toLocaleString('ru-RU')}
                                        {n.author && ` · ${n.author.name}`}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-gray-700 px-5 py-4">
                    {!confirmDelete ? (
                        <button
                            onClick={() => setConfirmDelete(true)}
                            className="text-sm text-red-400 hover:text-red-300"
                        >
                            <i className="ri-delete-bin-line mr-1" />
                            Удалить
                        </button>
                    ) : (
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-red-400">Удалить сделку?</span>
                            <button
                                onClick={handleDelete}
                                disabled={isPending}
                                className="rounded bg-red-600 px-3 py-1 text-xs text-white hover:bg-red-700"
                            >
                                Да
                            </button>
                            <button
                                onClick={() => setConfirmDelete(false)}
                                className="text-xs text-gray-400 hover:text-white"
                            >
                                Отмена
                            </button>
                        </div>
                    )}
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={isPending}
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {isPending ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
