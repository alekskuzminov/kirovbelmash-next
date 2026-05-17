import type { Metadata } from 'next';
import AdminSessionProvider from '@/components/admin/AdminSessionProvider';

export const metadata: Metadata = {
    robots: { index: false, follow: false },
    title: { default: 'CRM', template: '%s | КировБелМаш CRM' },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <AdminSessionProvider>{children}</AdminSessionProvider>;
}
