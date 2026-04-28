'use client';

import { useState, useTransition, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SerializedDeal, moveDeal } from '@/lib/crm/actions/deals';
import DealModal from './DealModal';
import CreateDealModal from './CreateDealModal';

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
    pipelineId: string;
}

export default function KanbanBoard({ stages, deals, users, contacts, pipelineId }: Props) {
    const router = useRouter();
    const [, startTransition] = useTransition();

    // Local state for optimistic drag-and-drop
    const [localDeals, setLocalDeals] = useState<SerializedDeal[]>(deals);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [overStageId, setOverStageId] = useState<string | null>(null);
    const dragLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Filters
    const [filterAssigneeId, setFilterAssigneeId] = useState('');

    // Modals
    const [editingDeal, setEditingDeal] = useState<SerializedDeal | null>(null);
    const [createInStage, setCreateInStage] = useState<string | null>(null);

    // Sync localDeals when parent re-renders with fresh server data
    const prevDealsRef = useRef(deals);
    if (prevDealsRef.current !== deals) {
        prevDealsRef.current = deals;
        setLocalDeals(deals);
    }

    const filteredDeals = filterAssigneeId
        ? localDeals.filter((d) => d.assigneeId === filterAssigneeId)
        : localDeals;

    const dealsByStage = stages.reduce<Record<string, SerializedDeal[]>>((acc, stage) => {
        acc[stage.id] = filteredDeals.filter((d) => d.stageId === stage.id);
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
    }, []);

    const handleDragOver = useCallback(
        (e: React.DragEvent, stageId: string) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            if (dragLeaveTimer.current) clearTimeout(dragLeaveTimer.current);
            setOverStageId(stageId);
        },
        []
    );

    const handleDragLeave = useCallback(() => {
        dragLeaveTimer.current = setTimeout(() => setOverStageId(null), 80);
    }, []);

    const handleDrop = useCallback(
        (e: React.DragEvent, targetStageId: string) => {
            e.preventDefault();
            if (dragLeaveTimer.current) clearTimeout(dragLeaveTimer.current);
            const dealId = e.dataTransfer.getData('dealId');
            setDraggingId(null);
            setOverStageId(null);

            if (!dealId) return;
            const deal = localDeals.find((d) => d.id === dealId);
            if (!deal || deal.stageId === targetStageId) return;

            // Optimistic update
            setLocalDeals((prev) =>
                prev.map((d) => (d.id === dealId ? { ...d, stageId: targetStageId } : d))
            );

            startTransition(async () => {
                try {
                    await moveDeal(dealId, targetStageId);
                    router.refresh();
                } catch {
                    // revert on error
                    setLocalDeals((prev) =>
                        prev.map((d) => (d.id === dealId ? { ...d, stageId: deal.stageId } : d))
                    );
                }
            });
        },
        [localDeals, router, startTransition]
    );

    function handleDealUpdated() {
        setEditingDeal(null);
    }

    const totalAmount = filteredDeals.reduce((sum, d) => sum + (d.amount ? parseFloat(d.amount) : 0), 0);

    return (
        <div className="flex h-full flex-col">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
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
                    <select
                        className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={filterAssigneeId}
                        onChange={(e) => setFilterAssigneeId(e.target.value)}
                    >
                        <option value="">Все ответственные</option>
                        {users.map((u) => (
                            <option key={u.id} value={u.id}>{u.name}</option>
                        ))}
                    </select>
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

            {/* Kanban columns */}
            <div className="flex-1 overflow-x-auto p-4">
                <div className="flex h-full gap-3" style={{ minWidth: `${stages.length * 264}px` }}>
                    {stages.map((stage) => {
                        const stageDeals = dealsByStage[stage.id] ?? [];
                        const stageAmount = stageDeals.reduce(
                            (sum, d) => sum + (d.amount ? parseFloat(d.amount) : 0),
                            0
                        );
                        const isOver = overStageId === stage.id;

                        return (
                            <div
                                key={stage.id}
                                className={`flex w-64 flex-shrink-0 flex-col rounded-xl transition-colors ${isOver ? 'bg-blue-50' : 'bg-gray-100'}`}
                                onDragOver={(e) => handleDragOver(e, stage.id)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, stage.id)}
                            >
                                {/* Column header */}
                                <div className="flex items-center justify-between px-3 py-3">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="h-2.5 w-2.5 rounded-full flex-shrink-0"
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

                                {/* Cards */}
                                <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-2">
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
                                        <div className={`rounded-lg border-2 border-dashed p-4 text-center text-xs text-gray-400 ${isOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}>
                                            Перетащите сюда
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Deal edit modal */}
            {editingDeal && (
                <DealModal
                    deal={editingDeal}
                    stages={stages}
                    users={users}
                    onClose={() => setEditingDeal(null)}
                    onDeleted={handleDealUpdated}
                />
            )}

            {/* Create deal modal */}
            {createInStage && (
                <CreateDealModal
                    pipelineId={pipelineId}
                    stages={stages}
                    users={users}
                    contacts={contacts}
                    defaultStageId={createInStage}
                    onClose={() => setCreateInStage(null)}
                />
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
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, deal.id)}
            onDragEnd={onDragEnd}
            onClick={onClick}
            className={`cursor-pointer rounded-lg bg-white p-3 shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:ring-blue-300 transition-all select-none ${isDragging ? 'opacity-40 scale-95' : ''}`}
        >
            <p className="text-sm font-medium text-gray-800 leading-snug">{deal.title}</p>
            <p className="mt-1 text-xs text-gray-500">
                {deal.contact.name}
                {deal.contact.company && (
                    <span className="text-gray-400"> · {deal.contact.company}</span>
                )}
            </p>
            <div className="mt-2 flex items-center justify-between">
                {deal.amount ? (
                    <span className="text-xs font-medium text-emerald-600">
                        {Number(deal.amount).toLocaleString('ru-RU')} ₽
                    </span>
                ) : (
                    <span />
                )}
                {deal.assignee && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">
                        {deal.assignee.name.charAt(0).toUpperCase()}
                    </span>
                )}
            </div>
            {deal.source && (
                <p className="mt-1 text-xs text-gray-400">
                    <i className="ri-map-pin-line mr-0.5" />
                    {deal.source}
                </p>
            )}
        </div>
    );
}
