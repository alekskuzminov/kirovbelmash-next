'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { moveDealToStage } from '@/lib/crm/deals';

export interface SerializedDeal {
    id: string;
    title: string;
    amount: string | null;
    source: string | null;
    createdAt: string;
    updatedAt: string;
    stageId: string;
    pipelineId: string;
    assigneeId: string | null;
    contact: {
        id: string;
        name: string;
        company: string | null;
        phone: string | null;
    };
    assignee: { id: string; name: string } | null;
    notes: Array<{
        id: string;
        text: string;
        createdAt: string;
        author: { name: string } | null;
    }>;
}

export async function getDeals(filters?: {
    stageId?: string;
    assigneeId?: string;
}): Promise<SerializedDeal[]> {
    const deals = await prisma.deal.findMany({
        where: {
            deletedAt: null,
            ...(filters?.stageId ? { stageId: filters.stageId } : {}),
            ...(filters?.assigneeId ? { assigneeId: filters.assigneeId } : {}),
        },
        include: {
            contact: { select: { id: true, name: true, company: true, phone: true } },
            assignee: { select: { id: true, name: true } },
            notes: {
                include: { author: { select: { name: true } } },
                orderBy: { createdAt: 'desc' },
            },
        },
        orderBy: { createdAt: 'desc' },
    });

    return deals.map((d) => ({
        id: d.id,
        title: d.title,
        amount: d.amount?.toString() ?? null,
        source: d.source,
        createdAt: d.createdAt.toISOString(),
        updatedAt: d.updatedAt.toISOString(),
        stageId: d.stageId,
        pipelineId: d.pipelineId,
        assigneeId: d.assigneeId,
        contact: d.contact,
        assignee: d.assignee,
        notes: d.notes.map((n) => ({
            id: n.id,
            text: n.text,
            createdAt: n.createdAt.toISOString(),
            author: n.author,
        })),
    }));
}

export async function createDeal(data: {
    title: string;
    contactId: string;
    stageId: string;
    pipelineId: string;
    amount?: string;
    source?: string;
    assigneeId?: string;
}): Promise<void> {
    const deal = await prisma.deal.create({
        data: {
            title: data.title,
            contactId: data.contactId,
            stageId: data.stageId,
            pipelineId: data.pipelineId,
            amount: data.amount ? parseFloat(data.amount) : null,
            source: data.source || null,
            assigneeId: data.assigneeId || null,
        },
    });
    await prisma.dealStageEvent.create({
        data: { dealId: deal.id, toStageId: data.stageId },
    });
    revalidatePath('/admin/deals');
}

export async function updateDeal(
    id: string,
    data: {
        title?: string;
        amount?: string | null;
        source?: string | null;
        assigneeId?: string | null;
        stageId?: string;
    }
): Promise<void> {
    const session = await getServerSession(authOptions);
    const currentDeal = await prisma.deal.findUnique({ where: { id }, select: { stageId: true } });

    if (data.stageId && currentDeal && data.stageId !== currentDeal.stageId) {
        await moveDealToStage(id, data.stageId, session?.user?.id);
    }

    await prisma.deal.update({
        where: { id },
        data: {
            ...(data.title !== undefined ? { title: data.title } : {}),
            ...(data.amount !== undefined
                ? { amount: data.amount ? parseFloat(data.amount) : null }
                : {}),
            ...(data.source !== undefined ? { source: data.source } : {}),
            ...(data.assigneeId !== undefined ? { assigneeId: data.assigneeId } : {}),
        },
    });
    revalidatePath('/admin/deals');
}

export async function deleteDeal(id: string): Promise<void> {
    await prisma.deal.update({ where: { id }, data: { deletedAt: new Date() } });
    revalidatePath('/admin/deals');
}

export async function moveDeal(dealId: string, newStageId: string): Promise<void> {
    const session = await getServerSession(authOptions);
    await moveDealToStage(dealId, newStageId, session?.user?.id);
    revalidatePath('/admin/deals');
}

export async function addNote(dealId: string, text: string): Promise<void> {
    const session = await getServerSession(authOptions);
    await prisma.note.create({
        data: { dealId, text, authorId: session?.user?.id ?? null },
    });
    revalidatePath('/admin/deals');
}
