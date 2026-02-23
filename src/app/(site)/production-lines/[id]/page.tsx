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
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 leading-tight">Производственная линия: {id}</h1>
        </div>
    );
}
