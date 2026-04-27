'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

const NAV = [
    { href: '/admin/deals', label: 'Сделки', icon: 'ri-kanban-view' },
    { href: '/admin/contacts', label: 'Контакты', icon: 'ri-contacts-book-2-line' },
    { href: '/admin/tasks', label: 'Задачи', icon: 'ri-checkbox-line' },
    { href: '/admin/users', label: 'Пользователи', icon: 'ri-team-line' },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-screen w-56 flex-col bg-gray-900 text-gray-300">
            <div className="px-5 py-5 border-b border-gray-700">
                <span className="text-white font-semibold text-sm leading-tight">
                    КировБелМаш<br />
                    <span className="text-gray-400 font-normal">CRM</span>
                </span>
            </div>

            <nav className="flex-1 overflow-y-auto py-4">
                {NAV.map(({ href, label, icon }) => {
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
            </nav>

            <div className="border-t border-gray-700 p-4">
                <button
                    onClick={() => signOut({ callbackUrl: '/admin/login' })}
                    className="flex w-full items-center gap-3 px-1 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                    <i className="ri-logout-box-line text-lg" />
                    Выйти
                </button>
            </div>
        </aside>
    );
}
