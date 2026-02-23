// TODO: перенести контент из SPA

interface EquipmentPageProps {
    params: Promise<{ id: string }>;
}

export default async function EquipmentPage({ params }: EquipmentPageProps) {
    const { id } = await params;

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold">Оборудование: {id}</h1>
        </div>
    );
}
