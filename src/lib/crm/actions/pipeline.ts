'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';

export interface SerializedStage {
    id: string;
    name: string;
    color: string;
    order: number;
    dealsCount: number;
}

export async function getPipelineWithStages(): Promise<{
    id: string;
    name: string;
    stages: SerializedStage[];
} | null> {
    const pipeline = await prisma.pipeline.findFirst({
        include: {
            stages: {
                include: { _count: { select: { deals: { where: { deletedAt: null } } } } },
                orderBy: { order: 'asc' },
            },
        },
    });

    if (!pipeline) return null;

    return {
        id: pipeline.id,
        name: pipeline.name,
        stages: pipeline.stages.map((s) => ({
            id: s.id,
            name: s.name,
            color: s.color,
            order: s.order,
            dealsCount: s._count.deals,
        })),
    };
}

export async function createStage(
    pipelineId: string,
    name: string,
    color: string = '#6b7280'
): Promise<SerializedStage> {
    const maxOrder = await prisma.stage.aggregate({
        where: { pipelineId },
        _max: { order: true },
    });
    const order = (maxOrder._max.order ?? -1) + 1;

    const stage = await prisma.stage.create({
        data: { name: name.trim(), color, order, pipelineId },
    });

    revalidatePath('/admin/crm/deals');
    revalidatePath('/admin/crm/pipeline');

    return { id: stage.id, name: stage.name, color: stage.color, order: stage.order, dealsCount: 0 };
}

export async function updateStage(
    stageId: string,
    data: { name?: string; color?: string }
): Promise<void> {
    await prisma.stage.update({
        where: { id: stageId },
        data: {
            ...(data.name !== undefined ? { name: data.name.trim() } : {}),
            ...(data.color !== undefined ? { color: data.color } : {}),
        },
    });
    revalidatePath('/admin/crm/deals');
    revalidatePath('/admin/crm/pipeline');
}

export async function deleteStage(
    stageId: string
): Promise<{ ok: true } | { error: 'has_deals'; count: number }> {
    const dealsCount = await prisma.deal.count({
        where: { stageId, deletedAt: null },
    });

    if (dealsCount > 0) {
        return { error: 'has_deals', count: dealsCount };
    }

    await prisma.stage.delete({ where: { id: stageId } });
    revalidatePath('/admin/crm/deals');
    revalidatePath('/admin/crm/pipeline');

    return { ok: true };
}

export async function reorderStages(orderedIds: string[]): Promise<void> {
    await Promise.all(
        orderedIds.map((id, index) =>
            prisma.stage.update({ where: { id }, data: { order: index } })
        )
    );
    revalidatePath('/admin/crm/deals');
    revalidatePath('/admin/crm/pipeline');
}
