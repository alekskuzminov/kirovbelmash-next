// TODO: перенести контент из SPA

interface ProductionLinePageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductionLinePage({
    params,
}: ProductionLinePageProps) {
    const { id } = await params;

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold">Производственная линия: {id}</h1>
        </div>
    );
}
