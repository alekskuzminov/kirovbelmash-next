import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import KanbanBoard from '@/components/admin/deals/KanbanBoard';
import { authOptions } from '@/lib/auth';
import { getDeals } from '@/lib/crm/actions/deals';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Сделки' };

export default async function DealsPage() {
    const session = await getServerSession(authOptions);

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
            <div className="flex h-full items-center justify-center p-6">
                <p className="text-gray-500">
                    Воронка не найдена. Запустите seed для создания дефолтной воронки.
                </p>
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
                currentUserId={session?.user?.id ?? ''}
                pipelineId={pipeline.id}
            />
        </div>
    );
}
