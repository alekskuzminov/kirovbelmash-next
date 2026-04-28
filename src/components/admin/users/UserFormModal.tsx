'use client';

import { useState, useTransition } from 'react';
import { createUser, updateUser } from '@/lib/crm/actions/users';
import type { SerializedUser } from '@/lib/crm/actions/users';
import { useRouter } from 'next/navigation';

interface Props {
    initial?: SerializedUser;
    onClose: () => void;
}

export default function UserFormModal({ initial, onClose }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [name, setName] = useState(initial?.name ?? '');
    const [email, setEmail] = useState(initial?.email ?? '');
    const [role, setRole] = useState<'ADMIN' | 'MANAGER'>(initial?.role ?? 'MANAGER');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isEdit = !!initial?.id;

    function handleSubmit() {
        if (!name.trim()) { setError('Введите имя'); return; }
        if (!email.trim()) { setError('Введите email'); return; }
        if (!isEdit && !password.trim()) { setError('Введите пароль'); return; }
        setError('');

        startTransition(async () => {
            try {
                if (isEdit && initial?.id) {
                    await updateUser(initial.id, { name: name.trim(), email: email.trim(), role });
                } else {
                    await createUser({ name: name.trim(), email: email.trim(), password, role });
                }
                router.refresh();
                onClose();
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Ошибка сохранения');
            }
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-md rounded-xl bg-gray-900 text-gray-100 shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-700 px-5 py-4">
                    <h2 className="font-semibold text-white">
                        {isEdit ? 'Редактировать пользователя' : 'Добавить менеджера'}
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
                        <label className="block text-xs text-gray-400 mb-1">Email *</label>
                        <input
                            type="email"
                            className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ivan@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Роль</label>
                        <select
                            className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={role}
                            onChange={(e) => setRole(e.target.value as 'ADMIN' | 'MANAGER')}
                        >
                            <option value="MANAGER">Менеджер</option>
                            <option value="ADMIN">Администратор</option>
                        </select>
                    </div>
                    {!isEdit && (
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Пароль *</label>
                            <input
                                type="password"
                                className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Минимум 6 символов"
                            />
                        </div>
                    )}
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
