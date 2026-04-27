import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
    );
}
