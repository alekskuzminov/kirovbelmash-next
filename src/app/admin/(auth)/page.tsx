import type { Metadata } from 'next';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = { title: 'Админка' };

const ALWAYS_SECTIONS = [
    {
        href: '/admin/crm/deals',
        icon: 'ri-kanban-view',
        title: 'CRM',
        description: 'Сделки, контакты, воронки',
        color: 'bg-blue-50 text-blue-600',
    },
];

const ADMIN_SECTIONS = [
    {
        href: '/admin/users',
        icon: 'ri-team-line',
        title: 'Пользователи',
        description: 'Учётные записи, роли',
        color: 'bg-purple-50 text-purple-600',
    },
];

const COMING_SOON = [
    { icon: 'ri-file-text-line', title: 'Контент', description: 'Блог, страницы, SEO' },
    { icon: 'ri-settings-3-line', title: 'Настройки', description: 'Интеграции, уведомления' },
];

export default async function AdminHubPage() {
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === 'ADMIN';

    const sections = isAdmin ? [...ALWAYS_SECTIONS, ...ADMIN_SECTIONS] : ALWAYS_SECTIONS;

    return (
        <div className="p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Административная панель</h1>
            <p className="text-sm text-gray-500 mb-8">Управление сайтом и CRM</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sections.map((s) => (
                    <Link
                        key={s.href}
                        href={s.href}
                        className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                        <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${s.color}`}>
                            <i className={`${s.icon} text-xl`} />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">{s.title}</p>
                            <p className="text-sm text-gray-500">{s.description}</p>
                        </div>
                    </Link>
                ))}

                {COMING_SOON.map((s) => (
                    <div
                        key={s.title}
                        className="flex items-start gap-4 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-5 opacity-50 cursor-not-allowed"
                    >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                            <i className={`${s.icon} text-xl`} />
                        </div>
                        <div>
                            <p className="font-medium text-gray-500">{s.title}</p>
                            <p className="text-sm text-gray-400">{s.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
