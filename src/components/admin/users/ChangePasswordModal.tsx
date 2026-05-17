'use client';

import { useState, useTransition } from 'react';
import { changePassword, changeOwnPassword } from '@/lib/crm/actions/users';
import { useRouter } from 'next/navigation';

interface Props {
    userId: string;
    userName: string;
    isSelf: boolean;
    onClose: () => void;
}

export default function ChangePasswordModal({ userId, userName, isSelf, onClose }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    function handleSubmit() {
        if (isSelf && !currentPassword.trim()) { setError('Введите текущий пароль'); return; }
        if (!newPassword.trim()) { setError('Введите новый пароль'); return; }
        if (newPassword !== confirmPassword) { setError('Пароли не совпадают'); return; }
        if (newPassword.length < 6) { setError('Пароль должен быть не менее 6 символов'); return; }
        setError('');

        startTransition(async () => {
            try {
                if (isSelf) {
                    await changeOwnPassword(currentPassword, newPassword);
                } else {
                    await changePassword(userId, newPassword);
                }
                setSuccess(true);
                router.refresh();
                setTimeout(onClose, 1200);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Ошибка смены пароля');
            }
        });
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="w-full max-w-sm rounded-xl bg-gray-900 text-gray-100 shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-700 px-5 py-4">
                    <h2 className="font-semibold text-white">
                        {isSelf ? 'Смена пароля' : `Пароль: ${userName}`}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <i className="ri-close-line text-xl" />
                    </button>
                </div>

                <div className="p-5 space-y-4">
                    {isSelf && (
                        <div>
                            <label className="block text-xs text-gray-400 mb-1">Текущий пароль</label>
                            <input
                                autoFocus
                                type="password"
                                className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Новый пароль</label>
                        <input
                            autoFocus={!isSelf}
                            type="password"
                            className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">Повторите пароль</label>
                        <input
                            type="password"
                            className="w-full rounded-lg bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        />
                    </div>
                    {error && <p className="text-sm text-red-400">{error}</p>}
                    {success && <p className="text-sm text-green-400">Пароль успешно изменён</p>}
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
                        disabled={isPending || success}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50"
                    >
                        {isPending ? 'Сохранение...' : 'Изменить пароль'}
                    </button>
                </div>
            </div>
        </div>
    );
}
