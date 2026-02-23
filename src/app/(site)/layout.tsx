import SiteNavbar from '@/components/feature/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <SiteNavbar />

            <main>{children}</main>

            <SiteFooter />
        </>
    );
}
