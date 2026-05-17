import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Задачи — Админка',
    robots: { index: false, follow: false },
};

export default function TasksPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center p-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 mb-4">
                <i className="ri-checkbox-line text-3xl text-gray-400" />
            </div>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Задачи</h1>
            <p className="text-sm text-gray-500 max-w-xs">
                Раздел в разработке. Здесь будет список задач по сделкам и контактам.
            </p>
        </div>
    );
}
