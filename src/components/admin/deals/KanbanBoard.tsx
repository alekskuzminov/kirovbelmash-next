'use client';

import { useCallback, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { closeDeal, deleteDeal, moveDeal, SerializedDeal } from '@/lib/crm/actions/deals';
import CreateDealModal from './CreateDealModal';
import DealModal from './DealModal';

interface Stage {
    id: string;
    name: string;
    color: string;
    order: number;
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
    stages: Stage[];
    deals: SerializedDeal[];
    users: User[];
    contacts: Contact[];
    currentUserId: string;
    pipelineId: string;
}

export default function KanbanBoard({
    stages,
    deals,
    users,
    contacts,
    currentUserId,
    pipelineId,
}: Props) {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [localDeals, setLocalDeals] = useState<SerializedDeal[]>(deals);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [overStageId, setOverStageId] = useState<string | null>(null);
    const [overZone, setOverZone] = useState<'delete' | 'lost' | 'won' | null>(null);
    const dragLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const [filterAssigneeId, setFilterAssigneeId] = useState('');

    const [editingDeal, setEditingDeal] = useState<SerializedDeal | null>(null);
    const [createInStage, setCreateInStage] = useState<string | null>(null);

    const prevDealsRef = useRef(deals);
    if (prevDealsRef.current !== deals) {
        prevDealsRef.current = deals;
        setLocalDeals(deals);
    }

    const filteredDeals = filterAssigneeId
        ? localDeals.filter((deal) => deal.assigneeId === filterAssigneeId)
        : localDeals;

    const dealsByStage = stages.reduce<Record<string, SerializedDeal[]>>((acc, stage) => {
        acc[stage.id] = filteredDeals.filter((deal) => deal.stageId === stage.id);
        return acc;
    }, {});

    const handleDragStart = useCallback((e: React.DragEvent, dealId: string) => {
        e.dataTransfer.setData('dealId', dealId);
        e.dataTransfer.effectAllowed = 'move';
        setDraggingId(dealId);
    }, []);

    const handleDragEnd = useCallback(() => {
        setDraggingId(null);
        setOverStageId(null);
        setOverZone(null);
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent, stageId: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragLeaveTimer.current) {
            clearTimeout(dragLeaveTimer.current);
        }
        setOverStageId(stageId);
    }, []);

    const handleDragLeave = useCallback(() => {
        dragLeaveTimer.current = setTimeout(() => setOverStageId(null), 80);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent, targetStageId: string) => {
            e.preventDefault();
            if (dragLeaveTimer.current) {
                clearTimeout(dragLeaveTimer.current);
            }

            const dealId = e.dataTransfer.getData('dealId');
            setDraggingId(null);
            setOverStageId(null);

            if (!dealId) {
                return;
            }

            const deal = localDeals.find((item) => item.id === dealId);
            if (!deal || deal.stageId === targetStageId) {
                return;
            }

            setLocalDeals((prev) =>
                prev.map((item) =>
                    item.id === dealId ? { ...item, stageId: targetStageId } : item
                )
            );

            startTransition(async () => {
                try {
                    await moveDeal(dealId, targetStageId);
                    router.refresh();
                } catch {
                    setLocalDeals((prev) =>
                        prev.map((item) =>
                            item.id === dealId ? { ...item, stageId: deal.stageId } : item
                        )
                    );
                }
            });
        },
        [localDeals, router, startTransition]
    );

    function handleDealUpdated() {
        setEditingDeal(null);
    }

    const totalAmount = filteredDeals.reduce(
        (sum, deal) => sum + (deal.amount ? parseFloat(deal.amount) : 0),
        0
    );

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold text-gray-900">Сделки</h1>
                    <span className="text-sm text-gray-500">
                        {filteredDeals.length} сделок
                        {totalAmount > 0 && (
                            <span className="ml-2">
                                · {totalAmount.toLocaleString('ru-RU')} ₽
                            </span>
                        )}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <select
                            className="h-9 min-w-44 appearance-none rounded-lg border border-gray-300 bg-white pl-4 pr-10 text-sm text-gray-700 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            value={filterAssigneeId}
                            onChange={(e) => setFilterAssigneeId(e.target.value)}
                        >
                            <option value="">Все ответственные</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex w-9 items-center justify-center text-gray-500">
                            <i className="ri-arrow-down-s-line text-lg" />
                        </div>
                    </div>

                    <Link
                        href="/admin/crm/pipeline"
                        className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
                    >
                        <i className="ri-settings-3-line" />
                        Настроить воронку
                    </Link>

                    <button
                        onClick={() => setCreateInStage(stages[0]?.id ?? null)}
                        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-1.5 text-sm text-white hover:bg-blue-700"
                    >
                        <i className="ri-add-line" />
                        Новая сделка
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto p-4">
                <div className="flex h-full gap-3" style={{ minWidth: `${stages.length * 264}px` }}>
                    {stages.map((stage) => {
                        const stageDeals = dealsByStage[stage.id] ?? [];
                        const stageAmount = stageDeals.reduce(
                            (sum, deal) => sum + (deal.amount ? parseFloat(deal.amount) : 0),
                            0
                        );
                        const isOver = overStageId === stage.id;

                        return (
                            <div
                                key={stage.id}
                                className={`flex w-64 flex-shrink-0 flex-col rounded-xl transition-colors ${
                                    isOver ? 'bg-blue-50' : 'bg-gray-100'
                                }`}
                                onDragOver={(e) => handleDragOver(e, stage.id)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, stage.id)}
                            >
                                <div className="flex items-center justify-between px-3 py-3">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="h-2.5 w-2.5 flex-shrink-0 rounded-full"
                                            style={{ backgroundColor: stage.color }}
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            {stage.name}
                                        </span>
                                        <span className="ml-1 rounded-full bg-gray-200 px-1.5 py-0.5 text-xs text-gray-500">
                                            {stageDeals.length}
                                        </span>
                                    </div>

                                    <button
                                        onClick={() => setCreateInStage(stage.id)}
                                        className="text-gray-400 hover:text-gray-700"
                                        title="Добавить сделку"
                                    >
                                        <i className="ri-add-line text-lg" />
                                    </button>
                                </div>

                                {stageAmount > 0 && (
                                    <div className="px-3 pb-1 text-xs text-gray-400">
                                        {stageAmount.toLocaleString('ru-RU')} ₽
                                    </div>
                                )}

                                <div className="flex-1 space-y-2 overflow-y-auto px-2 pb-3">
                                    {stageDeals.map((deal) => (
                                        <DealCard
                                            key={deal.id}
                                            deal={deal}
                                            isDragging={draggingId === deal.id}
                                            onClick={() => setEditingDeal(deal)}
                                            onDragStart={handleDragStart}
                                            onDragEnd={handleDragEnd}
                                        />
                                    ))}

                                    {stageDeals.length === 0 && (
                                        <div
                                            className={`rounded-lg border-2 border-dashed p-4 text-center text-xs text-gray-400 ${
                                                isOver
                                                    ? 'border-blue-400 bg-blue-50'
                                                    : 'border-gray-300'
                                            }`}
                                        >
                                            Перетащите сюда
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {editingDeal && (
                <DealModal
                    deal={editingDeal}
                    stages={stages}
                    users={users}
                    onClose={() => setEditingDeal(null)}
                    onDeleted={handleDealUpdated}
                />
            )}

            {createInStage && (
                <CreateDealModal
                    pipelineId={pipelineId}
                    stages={stages}
                    users={users}
                    contacts={contacts}
                    defaultAssigneeId={currentUserId}
                    defaultStageId={createInStage}
                    onClose={() => setCreateInStage(null)}
                />
            )}

            {draggingId && (
                <div className="pointer-events-none fixed bottom-6 right-6 z-40 flex items-center gap-3">
                    {(
                        [
                            {
                                key: 'delete',
                                label: 'Удалить',
                                icon: 'ri-delete-bin-line',
                                base: 'bg-red-800/75 text-red-200',
                                active: 'bg-red-700/90 text-white scale-105',
                            },
                            {
                                key: 'lost',
                                label: 'Не реализована',
                                icon: 'ri-close-circle-line',
                                base: 'bg-gray-600/75 text-gray-200',
                                active: 'bg-gray-500/90 text-white scale-105',
                            },
                            {
                                key: 'won',
                                label: 'Успешно завершена',
                                icon: 'ri-checkbox-circle-line',
                                base: 'bg-emerald-800/75 text-emerald-200',
                                active: 'bg-emerald-700/90 text-white scale-105',
                            },
                        ] as const
                    ).map(({ key, label, icon, base, active }) => (
                        <div
                            key={key}
                            className={`pointer-events-auto flex cursor-default flex-col items-center justify-center gap-1.5 rounded-xl px-5 py-4 shadow-lg backdrop-blur-sm transition-all ${
                                overZone === key ? active : base
                            }`}
                            onDragOver={(e) => {
                                e.preventDefault();
                                setOverZone(key);
                            }}
                            onDragLeave={() => setOverZone(null)}
                            onDrop={(e) => {
                                e.preventDefault();
                                const dealId = e.dataTransfer.getData('dealId');
                                setDraggingId(null);
                                setOverZone(null);

                                if (!dealId) {
                                    return;
                                }

                                if (key === 'delete') {
                                    setLocalDeals((prev) =>
                                        prev.filter((deal) => deal.id !== dealId)
                                    );
                                    startTransition(async () => {
                                        await deleteDeal(dealId);
                                        router.refresh();
                                    });
                                } else {
                                    setLocalDeals((prev) =>
                                        prev.filter((deal) => deal.id !== dealId)
                                    );
                                    startTransition(async () => {
                                        await closeDeal(dealId, key === 'won' ? 'WON' : 'LOST');
                                        router.refresh();
                                    });
                                }
                            }}
                        >
                            <i className={`${icon} text-2xl`} />
                            <span className="whitespace-nowrap text-xs font-medium">{label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

interface DealCardProps {
    deal: SerializedDeal;
    isDragging: boolean;
    onClick: () => void;
    onDragStart: (e: React.DragEvent, id: string) => void;
    onDragEnd: () => void;
}

function DealCard({ deal, isDragging, onClick, onDragStart, onDragEnd }: DealCardProps) {
    const displaySource = deal.source === 'Вручную' ? 'Создано вручную' : deal.source;

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, deal.id)}
            onDragEnd={onDragEnd}
            onClick={onClick}
            className={`cursor-pointer select-none rounded-lg bg-white p-2.5 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md hover:ring-blue-300 ${
                isDragging ? 'scale-95 opacity-40' : ''
            }`}
        >
            {/* Строка 1: заголовок + дата */}
            <div className="flex items-start justify-between gap-2">
                <p className="line-clamp-1 text-sm font-medium leading-snug text-gray-800">{deal.title}</p>
                <p className="mt-0.5 shrink-0 whitespace-nowrap text-[10px] text-gray-400">
                    {new Date(deal.createdAt).toLocaleDateString('ru-RU')}
                </p>
            </div>

            {/* Строка 2: контакт */}
            <p className="mt-1 line-clamp-1 text-xs text-gray-500">
                {deal.contact.name}
            </p>

            {/* Строка 3: сумма + источник + аватар */}
            <div className="mt-1.5 flex items-center gap-1.5">
                {deal.amount ? (
                    <span className="text-xs font-medium text-emerald-600">
                        {Number(deal.amount).toLocaleString('ru-RU')} ₽
                    </span>
                ) : (
                    <span className="grow" />
                )}
                <span className="grow" />
                {displaySource && (
                    <span className="max-w-[120px] truncate text-[10px] text-gray-400" title={displaySource}>
                        <i className="ri-map-pin-line mr-0.5" />
                        {displaySource}
                    </span>
                )}
                {deal.assignee && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                        {deal.assignee.name.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>
        </div>
    );
}
