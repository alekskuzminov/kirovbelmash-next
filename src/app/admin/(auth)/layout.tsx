import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { authOptions } from '@/lib/auth';

export default async function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/admin/login');
    }

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
    );
}
