'use client';

import { useState, useTransition, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    SerializedStage,
    createStage,
    updateStage,
    deleteStage,
    reorderStages,
} from '@/lib/crm/actions/pipeline';

interface Props {
    pipelineId: string;
    initialStages: SerializedStage[];
}

export default function PipelineSettings({ pipelineId, initialStages }: Props) {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [stages, setStages] = useState<SerializedStage[]>(initialStages);

    // Add new stage
    const [addingName, setAddingName] = useState('');
    const [addingColor, setAddingColor] = useState('#6b7280');
    const [showAddForm, setShowAddForm] = useState(false);

    // Inline editing
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingName, setEditingName] = useState('');
    const [editingColor, setEditingColor] = useState('');

    // Error per stage
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Drag state
    const dragIndexRef = useRef<number | null>(null);
    const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
    const [overIndex, setOverIndex] = useState<number | null>(null);

    function startEdit(stage: SerializedStage) {
        setEditingId(stage.id);
        setEditingName(stage.name);
        setEditingColor(stage.color);
    }

    function cancelEdit() {
        setEditingId(null);
    }

    function saveEdit(stageId: string) {
        if (!editingName.trim()) return;
        const newName = editingName.trim();
        const newColor = editingColor;

        setStages((prev) =>
            prev.map((s) => (s.id === stageId ? { ...s, name: newName, color: newColor } : s))
        );
        setEditingId(null);

        startTransition(async () => {
            await updateStage(stageId, { name: newName, color: newColor });
            router.refresh();
        });
    }

    function handleDelete(stageId: string) {
        startTransition(async () => {
            const result = await deleteStage(stageId);
            if ('error' in result) {
                setErrors((prev) => ({
                    ...prev,
                    [stageId]: `Нельзя удалить — ${result.count} ${pluralDeals(result.count)} в этом этапе`,
                }));
            } else {
                setStages((prev) => prev.filter((s) => s.id !== stageId));
                setErrors((prev) => {
                    const next = { ...prev };
                    delete next[stageId];
                    return next;
                });
                router.refresh();
            }
        });
    }

    async function handleAdd() {
        if (!addingName.trim()) return;
        const name = addingName.trim();
        const color = addingColor;

        setAddingName('');
        setAddingColor('#6b7280');
        setShowAddForm(false);

        startTransition(async () => {
            const stage = await createStage(pipelineId, name, color);
            setStages((prev) => [...prev, stage]);
            router.refresh();
        });
    }

    // Drag-and-drop handlers
    function handleDragStart(index: number) {
        dragIndexRef.current = index;
        setDraggingIndex(index);
    }

    function handleDragOver(e: React.DragEvent, index: number) {
        e.preventDefault();
        setOverIndex(index);
    }

    function handleDragEnd() {
        setDraggingIndex(null);
        setOverIndex(null);
        dragIndexRef.current = null;
    }

    function handleDrop(e: React.DragEvent, dropIndex: number) {
        e.preventDefault();
        const fromIndex = dragIndexRef.current;
        if (fromIndex === null || fromIndex === dropIndex) {
            handleDragEnd();
            return;
        }

        const newStages = [...stages];
        const [moved] = newStages.splice(fromIndex, 1);
        newStages.splice(dropIndex, 0, moved);
        const reordered = newStages.map((s, i) => ({ ...s, order: i }));

        setStages(reordered);
        setDraggingIndex(null);
        setOverIndex(null);
        dragIndexRef.current = null;

        startTransition(async () => {
            await reorderStages(reordered.map((s) => s.id));
            router.refresh();
        });
    }

    return (
        <div className="max-w-2xl">
            <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                {stages.length === 0 && (
                    <div className="px-6 py-8 text-center text-sm text-gray-400">
                        Этапов ещё нет. Добавьте первый.
                    </div>
                )}

                <ul>
                    {stages.map((stage, index) => {
                        const isDragging = draggingIndex === index;
                        const isOver = overIndex === index;

                        return (
                            <li
                                key={stage.id}
                                draggable
                                onDragStart={() => handleDragStart(index)}
                                onDragOver={(e) => handleDragOver(e, index)}
                                onDrop={(e) => handleDrop(e, index)}
                                onDragEnd={handleDragEnd}
                                className={`flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-b-0 transition-colors select-none ${
                                    isDragging ? 'opacity-40' : ''
                                } ${isOver && !isDragging ? 'bg-blue-50' : 'bg-white'}`}
                            >
                                {/* Drag handle */}
                                <i className="ri-draggable text-gray-300 cursor-grab text-lg flex-shrink-0" />

                                {editingId === stage.id ? (
                                    <>
                                        <input
                                            type="color"
                                            value={editingColor}
                                            onChange={(e) => setEditingColor(e.target.value)}
                                            className="h-7 w-7 rounded cursor-pointer border-0 p-0 flex-shrink-0"
                                            title="Цвет этапа"
                                        />
                                        <input
                                            type="text"
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') saveEdit(stage.id);
                                                if (e.key === 'Escape') cancelEdit();
                                            }}
                                            autoFocus
                                            className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            onClick={() => saveEdit(stage.id)}
                                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Сохранить
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="text-sm text-gray-400 hover:text-gray-600"
                                        >
                                            Отмена
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div
                                            className="h-4 w-4 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: stage.color }}
                                        />
                                        <span className="flex-1 text-sm text-gray-800">{stage.name}</span>
                                        {stage.dealsCount > 0 && (
                                            <span className="text-xs text-gray-400">
                                                {stage.dealsCount} {pluralDeals(stage.dealsCount)}
                                            </span>
                                        )}
                                        {errors[stage.id] && (
                                            <span className="text-xs text-red-500">{errors[stage.id]}</span>
                                        )}
                                        <button
                                            onClick={() => startEdit(stage)}
                                            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                            title="Переименовать"
                                        >
                                            <i className="ri-pencil-line text-base" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(stage.id)}
                                            className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                                            title="Удалить этап"
                                        >
                                            <i className="ri-delete-bin-line text-base" />
                                        </button>
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* Add stage form */}
                {showAddForm ? (
                    <div className="flex items-center gap-3 px-4 py-3 border-t border-gray-100">
                        <i className="ri-draggable text-gray-200 text-lg flex-shrink-0" />
                        <input
                            type="color"
                            value={addingColor}
                            onChange={(e) => setAddingColor(e.target.value)}
                            className="h-7 w-7 rounded cursor-pointer border-0 p-0 flex-shrink-0"
                            title="Цвет этапа"
                        />
                        <input
                            type="text"
                            value={addingName}
                            onChange={(e) => setAddingName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAdd();
                                if (e.key === 'Escape') setShowAddForm(false);
                            }}
                            autoFocus
                            placeholder="Название этапа"
                            className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleAdd}
                            disabled={!addingName.trim()}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium disabled:opacity-40"
                        >
                            Добавить
                        </button>
                        <button
                            onClick={() => setShowAddForm(false)}
                            className="text-sm text-gray-400 hover:text-gray-600"
                        >
                            Отмена
                        </button>
                    </div>
                ) : (
                    <div className="border-t border-gray-100 px-4 py-3">
                        <button
                            onClick={() => setShowAddForm(true)}
                            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                        >
                            <i className="ri-add-line" />
                            Добавить этап
                        </button>
                    </div>
                )}
            </div>

            <p className="mt-4 text-xs text-gray-400">
                Перетащите строки, чтобы изменить порядок этапов в воронке.
                Удалить этап можно только если в нём нет активных сделок.
            </p>
        </div>
    );
}

function pluralDeals(n: number): string {
    if (n % 10 === 1 && n % 100 !== 11) return 'сделка';
    if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return 'сделки';
    return 'сделок';
}
