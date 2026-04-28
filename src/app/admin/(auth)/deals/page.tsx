import type { Metadata } from 'next';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { getDeals } from '@/lib/crm/actions/deals';
import KanbanBoard from '@/components/admin/deals/KanbanBoard';

export const metadata: Metadata = { title: 'Сделки' };

export default async function DealsPage() {
    const [pipeline, deals, users, contacts] = await Promise.all([
        prisma.pipeline.findFirst({
            include: { stages: { orderBy: { order: 'asc' } } },
        }),
        getDeals(),
        prisma.user.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
        prisma.contact.findMany({
            where: { deletedAt: null },
            select: { id: true, name: true, company: true, phone: true },
            orderBy: { name: 'asc' },
        }),
    ]);

    if (!pipeline) {
        return (
            <div className="flex items-center justify-center h-full p-6">
                <p className="text-gray-500">Воронка не найдена. Запустите seed для создания дефолтной воронки.</p>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col">
            <KanbanBoard
                stages={pipeline.stages}
                deals={deals}
                users={users}
                contacts={contacts}
                pipelineId={pipeline.id}
            />
        </div>
    );
}
