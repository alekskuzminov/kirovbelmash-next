// TODO: авторизация и UI админки

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {/* TODO: навигация админ-панели */}
            <div className="min-h-screen">{children}</div>
        </>
    );
}
