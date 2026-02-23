// TODO: перенести контент из SPA

interface ProjectDetailPageProps {
    params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({
    params,
}: ProjectDetailPageProps) {
    const { id } = await params;

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold">Проект: {id}</h1>
        </div>
    );
}
