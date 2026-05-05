import SiteNavbar from '@/components/feature/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import ContactModal from '@/components/common/ContactModal';
import TrackingCapture from '@/components/common/TrackingCapture';

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <TrackingCapture />
            <SiteNavbar />

            <main>{children}</main>

            <SiteFooter />
            <ContactModal />
        </>
    );
}
