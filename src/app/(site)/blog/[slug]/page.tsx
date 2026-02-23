// TODO: перенести контент из SPA

interface BlogArticlePageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogArticlePage({
    params,
}: BlogArticlePageProps) {
    const { slug } = await params;

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-4xl font-bold">Статья: {slug}</h1>
        </div>
    );
}
