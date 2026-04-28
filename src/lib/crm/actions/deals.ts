'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { moveDealToStage } from '@/lib/crm/deals';
import { s3 } from '@/lib/s3';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';

export interface SerializedDeal {
    id: string;
    title: string;
    amount: string | null;
    source: string | null;
    city: string | null;
    documentUrl: string | null;
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
        email: string | null;
    };
    assignee: { id: string; name: string } | null;
    notes: Array<{
        id: string;
        text: string;
        createdAt: string;
        author: { name: string } | null;
    }>;
    stageEvents: Array<{
        id: string;
        createdAt: string;
        toStageId: string;
        fromStage: { name: string } | null;
        toStage: { name: string };
        actor: { name: string } | null;
    }>;
    taskCount: number;
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
            contact: { select: { id: true, name: true, company: true, phone: true, email: true } },
            assignee: { select: { id: true, name: true } },
            notes: {
                include: { author: { select: { name: true } } },
                orderBy: { createdAt: 'desc' },
            },
            stageEvents: {
                orderBy: { createdAt: 'desc' },
                include: {
                    fromStage: { select: { name: true } },
                    toStage: { select: { name: true } },
                    actor: { select: { name: true } },
                },
            },
            _count: { select: { tasks: { where: { done: false } } } },
        },
        orderBy: { createdAt: 'desc' },
    });

    return deals.map((d) => ({
        id: d.id,
        title: d.title,
        amount: d.amount?.toString() ?? null,
        source: d.source,
        city: d.city,
        documentUrl: d.documentUrl,
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
        stageEvents: d.stageEvents.map((e) => ({
            id: e.id,
            createdAt: e.createdAt.toISOString(),
            toStageId: e.toStageId,
            fromStage: e.fromStage,
            toStage: e.toStage,
            actor: e.actor,
        })),
        taskCount: d._count.tasks,
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
    revalidatePath('/admin/crm/deals');
}

export async function updateDeal(
    id: string,
    data: {
        title?: string;
        amount?: string | null;
        source?: string | null;
        city?: string | null;
        documentUrl?: string | null;
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
            ...(data.city !== undefined ? { city: data.city } : {}),
            ...(data.documentUrl !== undefined ? { documentUrl: data.documentUrl } : {}),
            ...(data.assigneeId !== undefined ? { assigneeId: data.assigneeId } : {}),
        },
    });
    revalidatePath('/admin/crm/deals');
}

export async function deleteDeal(id: string): Promise<void> {
    await prisma.deal.update({ where: { id }, data: { deletedAt: new Date() } });
    revalidatePath('/admin/crm/deals');
}

export async function moveDeal(dealId: string, newStageId: string): Promise<void> {
    const session = await getServerSession(authOptions);
    await moveDealToStage(dealId, newStageId, session?.user?.id);
    revalidatePath('/admin/crm/deals');
}

export async function addNote(dealId: string, text: string): Promise<void> {
    const session = await getServerSession(authOptions);
    await prisma.note.create({
        data: { dealId, text, authorId: session?.user?.id ?? null },
    });
    revalidatePath('/admin/crm/deals');
}

export async function deleteDealDocument(dealId: string): Promise<void> {
    const bucket = process.env.S3_BUCKET;
    const key = `crm/deals/${dealId}/doc.pdf`;

    if (bucket) {
        try {
            await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
        } catch {
            // Ignore S3 errors — file may already be gone
        }
    }

    await prisma.deal.update({
        where: { id: dealId },
        data: { documentUrl: null },
    });
    revalidatePath('/admin/crm/deals');
}
