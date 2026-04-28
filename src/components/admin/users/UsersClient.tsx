'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toggleUserActive } from '@/lib/crm/actions/users';
import type { SerializedUser } from '@/lib/crm/actions/users';
import UserFormModal from './UserFormModal';
import ChangePasswordModal from './ChangePasswordModal';

interface Props {
    users: SerializedUser[];
    currentUserId: string;
}

export default function UsersClient({ users, currentUserId }: Props) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [showCreate, setShowCreate] = useState(false);
    const [editUser, setEditUser] = useState<SerializedUser | null>(null);
    const [changePasswordFor, setChangePasswordFor] = useState<SerializedUser | null>(null);
    const [togglingId, setTogglingId] = useState<string | null>(null);
    const [toggleError, setToggleError] = useState<string | null>(null);

    function handleToggleActive(user: SerializedUser) {
        setToggleError(null);
        setTogglingId(user.id);
        startTransition(async () => {
            try {
                await toggleUserActive(user.id);
                router.refresh();
            } catch (e) {
                setToggleError(e instanceof Error ? e.message : 'Ошибка');
            } finally {
                setTogglingId(null);
            }
        });
    }

    const activeAdmins = users.filter((u) => u.role === 'ADMIN' && u.isActive).length;

    function canToggle(user: SerializedUser): boolean {
        if (user.id === currentUserId) return false;
        if (user.role === 'ADMIN' && user.isActive && activeAdmins <= 1) return false;
        return true;
    }

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Пользователи</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Учётные записи и доступ</p>
                </div>
                <button
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                >
                    <i className="ri-user-add-line" />
                    Добавить пользователя
                </button>
            </div>

            {toggleError && (
                <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                    {toggleError}
                </div>
            )}

            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-100 bg-gray-50">
                            <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Имя</th>
                            <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Роль</th>
                            <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                            <th className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Создан</th>
                            <th className="px-5 py-3" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className={`transition-colors ${!user.isActive ? 'opacity-50' : 'hover:bg-gray-50'}`}
                            >
                                <td className="px-5 py-3.5 font-medium text-gray-900">
                                    {user.name}
                                    {user.id === currentUserId && (
                                        <span className="ml-2 text-xs text-gray-400">(вы)</span>
                                    )}
                                </td>
                                <td className="px-5 py-3.5 text-gray-600">{user.email}</td>
                                <td className="px-5 py-3.5">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                        user.role === 'ADMIN'
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {user.role === 'ADMIN' ? 'Администратор' : 'Менеджер'}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                        user.isActive
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-600'
                                    }`}>
                                        {user.isActive ? 'Активен' : 'Деактивирован'}
                                    </span>
                                </td>
                                <td className="px-5 py-3.5 text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                                </td>
                                <td className="px-5 py-3.5">
                                    <div className="flex items-center justify-end gap-1">
                                        <button
                                            title="Редактировать"
                                            onClick={() => setEditUser(user)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                                        >
                                            <i className="ri-pencil-line" />
                                        </button>
                                        <button
                                            title="Сменить пароль"
                                            onClick={() => setChangePasswordFor(user)}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                                        >
                                            <i className="ri-key-2-line" />
                                        </button>
                                        <button
                                            title={user.isActive ? 'Деактивировать' : 'Активировать'}
                                            onClick={() => handleToggleActive(user)}
                                            disabled={!canToggle(user) || togglingId === user.id || isPending}
                                            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                                                user.isActive
                                                    ? 'text-gray-400 hover:bg-red-50 hover:text-red-500'
                                                    : 'text-gray-400 hover:bg-green-50 hover:text-green-600'
                                            }`}
                                        >
                                            <i className={user.isActive ? 'ri-user-forbid-line' : 'ri-user-follow-line'} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showCreate && <UserFormModal onClose={() => setShowCreate(false)} />}
            {editUser && <UserFormModal initial={editUser} onClose={() => setEditUser(null)} />}
            {changePasswordFor && (
                <ChangePasswordModal
                    userId={changePasswordFor.id}
                    userName={changePasswordFor.name}
                    isSelf={changePasswordFor.id === currentUserId}
                    onClose={() => setChangePasswordFor(null)}
                />
            )}
        </>
    );
}
