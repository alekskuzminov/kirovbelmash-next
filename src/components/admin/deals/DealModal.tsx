'use client';

import { useRef, useState, useTransition } from 'react';
import { SerializedDeal } from '@/lib/crm/actions/deals';
import { updateDeal, deleteDeal, addNote, deleteDealDocument } from '@/lib/crm/actions/deals';
import { useRouter } from 'next/navigation';
import PdfPreviewModal from './PdfPreviewModal';

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

type ActivityItem =
    | {
          type: 'note';
          id: string;
          createdAt: string;
          text: string;
          author: { name: string } | null;
      }
    | {
          type: 'stage';
          id: string;
          createdAt: string;
          fromStage: { name: string } | null;
          toStage: { name: string };
          actor: { name: string } | null;
      };

function formatDate(iso: string) {
    return new Date(iso).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function calcDaysInStage(deal: SerializedDeal): number {
    const lastEvent = deal.stageEvents.find((e) => e.toStageId === deal.stageId);
    const since = lastEvent ? new Date(lastEvent.createdAt) : new Date(deal.createdAt);
    return Math.max(0, Math.floor((Date.now() - since.getTime()) / 86400000));
}

export default function DealModal({ deal, stages, users, onClose, onDeleted }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [title, setTitle] = useState(deal.title);
    const [amount, setAmount] = useState(deal.amount ?? '');
    const [source, setSource] = useState(deal.source ?? '');
    const [city, setCity] = useState(deal.city ?? '');
    const [assigneeId, setAssigneeId] = useState(deal.assigneeId ?? '');
    const [stageId, setStageId] = useState(deal.stageId);
    const [noteText, setNoteText] = useState('');
    const [notes, setNotes] = useState(deal.notes);
    const [documentUrl, setDocumentUrl] = useState(deal.documentUrl ?? '');
    const [isUploadingDoc, setIsUploadingDoc] = useState(false);
    const [showPdfPreview, setShowPdfPreview] = useState(false);
    const [confirmDeleteDoc, setConfirmDeleteDoc] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const activity: ActivityItem[] = [
        ...notes.map((n) => ({ type: 'note' as const, ...n })),
        ...deal.stageEvents.map((e) => ({ type: 'stage' as const, ...e })),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const daysInStage = calcDaysInStage(deal);
    const currentStage = stages.find((s) => s.id === stageId);

    function handleSave() {
        startTransition(async () => {
            await updateDeal(deal.id, {
                title: title.trim() || deal.title,
                amount: amount || null,
                source: source || null,
                city: city || null,
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

    async function handleDocUpload(file: File) {
        setIsUploadingDoc(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('dealId', deal.id);
            const res = await fetch('/api/crm/upload-deal-doc', { method: 'POST', body: formData });
            if (!res.ok) throw new Error('Upload failed');
            const { url } = (await res.json()) as { url: string };
            setDocumentUrl(url);
            router.refresh();
        } finally {
            setIsUploadingDoc(false);
        }
    }

    function handleDocDelete() {
        startTransition(async () => {
            await deleteDealDocument(deal.id);
            setDocumentUrl('');
            setConfirmDeleteDoc(false);
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

    return (
        <>
            <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-16 overflow-y-auto">
                <div className="w-full max-w-2xl rounded-xl bg-gray-900 text-gray-100 shadow-2xl">

                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 border-b border-gray-700 p-5">
                        <div className="flex-1 min-w-0">
                            <input
                                className="w-full bg-transparent text-lg font-semibold text-white placeholder-gray-500 focus:outline-none"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Название сделки"
                            />
                            <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                                <a
                                    href={`/admin/crm/contacts/${deal.contact.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
                                >
                                    <i className="ri-user-line" />
                                    {deal.contact.name}
                                    {deal.contact.company && (
                                        <span className="text-gray-500">· {deal.contact.company}</span>
                                    )}
                                </a>
                            </div>
                            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                                {deal.contact.phone && (
                                    <a
                                        href={`tel:${deal.contact.phone}`}
                                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200"
                                    >
                                        <i className="ri-phone-line" />
                                        {deal.contact.phone}
                                    </a>
                                )}
                                {deal.contact.email && (
                                    <a
                                        href={`mailto:${deal.contact.email}`}
                                        className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-200"
                                    >
                                        <i className="ri-mail-line" />
                                        {deal.contact.email}
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <span className="rounded-full bg-gray-700 px-2 py-0.5 text-xs text-gray-300">
                                {daysInStage}{' '}
                                {daysInStage === 1 ? 'день' : daysInStage >= 2 && daysInStage <= 4 ? 'дня' : 'дней'}
                            </span>
                            <button onClick={onClose} className="text-gray-400 hover:text-white">
                                <i className="ri-close-line text-xl" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-0 divide-x divide-gray-700">
                        {/* Left: fields */}
                        <div className="p-5 space-y-4">
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
                                <label className="block text-xs text-gray-400 mb-1">Город</label>
                                <input
                                    className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    placeholder="Не указан"
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
                                        <option key={u.id} value={u.id}>{u.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="text-xs text-gray-500 space-y-0.5">
                                <div>Создана: {new Date(deal.createdAt).toLocaleDateString('ru-RU')}</div>
                                <div>Обновлена: {new Date(deal.updatedAt).toLocaleDateString('ru-RU')}</div>
                            </div>

                            {/* Document block */}
                            <div className="border-t border-gray-700 pt-4">
                                <p className="text-xs text-gray-400 mb-2">Документ (КП)</p>

                                {!documentUrl ? (
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isUploadingDoc}
                                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-gray-600 px-3 py-2 text-xs text-gray-400 hover:border-gray-400 hover:text-gray-200 disabled:opacity-50"
                                    >
                                        {isUploadingDoc ? (
                                            <>
                                                <i className="ri-loader-4-line animate-spin" />
                                                Загрузка...
                                            </>
                                        ) : (
                                            <>
                                                <i className="ri-upload-cloud-line" />
                                                Загрузить КП (PDF)
                                            </>
                                        )}
                                    </button>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2">
                                            <i className="ri-file-pdf-line text-red-400 shrink-0" />
                                            <span className="flex-1 truncate text-xs text-gray-200">КП.pdf</span>
                                            <button
                                                onClick={() => setShowPdfPreview(true)}
                                                className="text-xs text-blue-400 hover:text-blue-300 shrink-0"
                                            >
                                                Просмотр
                                            </button>
                                            <button
                                                onClick={() => fileInputRef.current?.click()}
                                                className="text-gray-400 hover:text-white shrink-0"
                                                title="Заменить файл"
                                            >
                                                <i className="ri-pencil-line text-sm" />
                                            </button>
                                            <button
                                                onClick={() => setConfirmDeleteDoc(true)}
                                                className="text-gray-400 hover:text-red-400 shrink-0"
                                                title="Удалить файл"
                                            >
                                                <i className="ri-delete-bin-line text-sm" />
                                            </button>
                                        </div>
                                        {confirmDeleteDoc && (
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className="text-red-400">Удалить документ?</span>
                                                <button
                                                    onClick={handleDocDelete}
                                                    disabled={isPending}
                                                    className="rounded bg-red-600 px-2 py-0.5 text-white hover:bg-red-700"
                                                >
                                                    Да
                                                </button>
                                                <button
                                                    onClick={() => setConfirmDeleteDoc(false)}
                                                    className="text-gray-400 hover:text-white"
                                                >
                                                    Отмена
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".pdf"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) void handleDocUpload(file);
                                        e.target.value = '';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Right: activity feed */}
                        <div className="flex flex-col p-5">
                            <p className="text-xs text-gray-400 mb-3">Активность</p>

                            {/* Note input */}
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

                            {/* Feed */}
                            <div className="flex-1 overflow-y-auto max-h-64 space-y-2">
                                {activity.length === 0 && (
                                    <p className="text-xs text-gray-600 italic">Нет активности</p>
                                )}
                                {activity.map((item) => (
                                    <div key={item.id} className="rounded-lg bg-gray-800 p-3">
                                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1">
                                            <i className={item.type === 'note' ? 'ri-message-2-line' : 'ri-git-branch-line'} />
                                            <span>{formatDate(item.createdAt)}</span>
                                            {item.type === 'note' && item.author && (
                                                <span>· {item.author.name}</span>
                                            )}
                                            {item.type === 'stage' && item.actor && (
                                                <span>· {item.actor.name}</span>
                                            )}
                                        </div>
                                        {item.type === 'note' ? (
                                            <p className="text-sm text-gray-200">{item.text}</p>
                                        ) : (
                                            <p className="text-sm text-gray-300">
                                                {'Этап: '}
                                                <span className="text-gray-400">
                                                    {item.fromStage?.name ?? '-'}
                                                </span>
                                                {' -> '}
                                                <span className="text-white">{item.toStage.name}</span>
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* No tasks warning */}
                            {deal.taskCount === 0 && (
                                <div className="mt-3 flex items-center gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 px-3 py-2 text-xs text-yellow-400">
                                    <i className="ri-alarm-warning-line shrink-0" />
                                    Нет задач - рекомендуем добавить
                                </div>
                            )}
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

            {showPdfPreview && documentUrl && (
                <PdfPreviewModal url={documentUrl} onClose={() => setShowPdfPreview(false)} />
            )}
        </>
    );
}
