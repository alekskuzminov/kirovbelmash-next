import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getUsers } from '@/lib/crm/actions/users';
import UsersClient from '@/components/admin/users/UsersClient';

export const metadata: Metadata = {
    title: 'Пользователи — Админка',
    robots: { index: false, follow: false },
};

export default async function UsersPage() {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== 'ADMIN') redirect('/admin/');

    const users = await getUsers();

    return (
        <div className="p-8">
            <UsersClient users={users} currentUserId={session.user.id} />
        </div>
    );
}
