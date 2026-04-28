import type { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { getPipelineWithStages } from '@/lib/crm/actions/pipeline';
import PipelineSettings from '@/components/admin/pipeline/PipelineSettings';

export const metadata: Metadata = { title: 'Настройки воронки' };

export default async function PipelinePage() {
    const pipeline = await getPipelineWithStages();

    if (!pipeline) {
        return (
            <div className="flex items-center justify-center h-full p-6">
                <p className="text-gray-500">Воронка не найдена. Запустите seed для создания дефолтной воронки.</p>
            </div>
        );
    }

    return (
        <div className="p-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/admin/crm/deals" className="hover:text-gray-700">Сделки</Link>
                <i className="ri-arrow-right-s-line" />
                <span className="text-gray-700">Настройки воронки</span>
            </div>

            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900">Настройки воронки</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Управление этапами воронки <span className="font-medium text-gray-700">{pipeline.name}</span>
                </p>
            </div>

            <PipelineSettings pipelineId={pipeline.id} initialStages={pipeline.stages} />
        </div>
    );
}
