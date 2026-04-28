'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import ChangePasswordModal from './users/ChangePasswordModal';

const CRM_NAV = [
    { href: '/admin/crm/deals', label: 'Сделки', icon: 'ri-kanban-view' },
    { href: '/admin/crm/contacts', label: 'Контакты', icon: 'ri-contacts-book-2-line' },
    { href: '/admin/crm/tasks', label: 'Задачи', icon: 'ri-checkbox-line' },
];

const SETTINGS_NAV = [
    { href: '/admin/users', label: 'Пользователи', icon: 'ri-team-line' },
];

export default function AdminSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const isAdmin = session?.user?.role === 'ADMIN';
    const [showChangePassword, setShowChangePassword] = useState(false);

    return (
        <>
            <aside className="flex h-screen w-56 flex-col bg-gray-900 text-gray-300">
                <div className="px-5 py-5 border-b border-gray-700">
                    <Link href="/admin" className="text-white font-semibold text-sm leading-tight hover:text-gray-200 transition-colors">
                        КировБелМаш<br />
                        <span className="text-gray-400 font-normal">Админка</span>
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto py-3">
                    <Link
                        href="/admin"
                        className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                            pathname === '/admin'
                                ? 'bg-gray-700 text-white'
                                : 'hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                        <i className="ri-home-4-line text-lg" />
                        Обзор
                    </Link>

                    <p className="px-5 pt-4 pb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">CRM</p>

                    {CRM_NAV.map(({ href, label, icon }) => {
                        const active = pathname.startsWith(href);
                        return (
                            <Link
                                key={href}
                                href={href}
                                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                                    active
                                        ? 'bg-gray-700 text-white'
                                        : 'hover:bg-gray-800 hover:text-white'
                                }`}
                            >
                                <i className={`${icon} text-lg`} />
                                {label}
                            </Link>
                        );
                    })}

                    {isAdmin && (
                        <>
                            <p className="px-5 pt-4 pb-1 text-xs font-medium text-gray-500 uppercase tracking-wider">Настройки</p>
                            {SETTINGS_NAV.map(({ href, label, icon }) => {
                                const active = pathname.startsWith(href);
                                return (
                                    <Link
                                        key={href}
                                        href={href}
                                        className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                                            active
                                                ? 'bg-gray-700 text-white'
                                                : 'hover:bg-gray-800 hover:text-white'
                                        }`}
                                    >
                                        <i className={`${icon} text-lg`} />
                                        {label}
                                    </Link>
                                );
                            })}
                        </>
                    )}
                </nav>

                <div className="border-t border-gray-700 p-4 space-y-1">
                    {session?.user && (
                        <div className="px-1 pb-2 border-b border-gray-700 mb-2">
                            <p className="text-xs text-gray-400 truncate">{session.user.name}</p>
                            <button
                                onClick={() => setShowChangePassword(true)}
                                className="flex items-center gap-2 mt-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                <i className="ri-key-2-line" />
                                Сменить пароль
                            </button>
                        </div>
                    )}
                    <button
                        onClick={() => signOut({ callbackUrl: '/admin/login' })}
                        className="flex w-full items-center gap-3 px-1 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                    >
                        <i className="ri-logout-box-line text-lg" />
                        Выйти
                    </button>
                </div>
            </aside>

            {showChangePassword && session?.user && (
                <ChangePasswordModal
                    userId={session.user.id}
                    userName={session.user.name ?? ''}
                    isSelf={true}
                    onClose={() => setShowChangePassword(false)}
                />
            )}
        </>
    );
}
