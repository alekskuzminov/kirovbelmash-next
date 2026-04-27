import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Сделки' };

export default function DealsPage() {
    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold text-gray-900">Сделки</h1>
            <p className="mt-2 text-sm text-gray-500">Kanban-доска — следующий этап разработки.</p>
        </div>
    );
}
