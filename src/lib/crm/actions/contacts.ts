'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { normalizePhone } from '@/lib/phone';

export interface SerializedContact {
    id: string;
    name: string;
    company: string | null;
    phone: string | null;
    email: string | null;
    createdAt: string;
    dealsCount: number;
}

export async function getContacts(search?: string): Promise<SerializedContact[]> {
    const contacts = await prisma.contact.findMany({
        where: {
            deletedAt: null,
            ...(search
                ? {
                      OR: [
                          { name: { contains: search, mode: 'insensitive' } },
                          { company: { contains: search, mode: 'insensitive' } },
                          { phone: { contains: search } },
                          { email: { contains: search, mode: 'insensitive' } },
                      ],
                  }
                : {}),
        },
        include: { _count: { select: { deals: { where: { deletedAt: null } } } } },
        orderBy: { createdAt: 'desc' },
    });

    return contacts.map((c) => ({
        id: c.id,
        name: c.name,
        company: c.company,
        phone: c.phone,
        email: c.email,
        createdAt: c.createdAt.toISOString(),
        dealsCount: c._count.deals,
    }));
}

export interface ContactDetail {
    id: string;
    name: string;
    company: string | null;
    phone: string | null;
    email: string | null;
    createdAt: string;
    deals: Array<{
        id: string;
        title: string;
        amount: string | null;
        source: string | null;
        createdAt: string;
        stage: { id: string; name: string; color: string };
    }>;
}

export async function getContact(id: string): Promise<ContactDetail | null> {
    const contact = await prisma.contact.findUnique({
        where: { id, deletedAt: null },
        include: {
            deals: {
                where: { deletedAt: null },
                include: { stage: { select: { id: true, name: true, color: true } } },
                orderBy: { createdAt: 'desc' },
            },
        },
    });

    if (!contact) return null;

    return {
        id: contact.id,
        name: contact.name,
        company: contact.company,
        phone: contact.phone,
        email: contact.email,
        createdAt: contact.createdAt.toISOString(),
        deals: contact.deals.map((d) => ({
            id: d.id,
            title: d.title,
            amount: d.amount?.toString() ?? null,
            source: d.source,
            createdAt: d.createdAt.toISOString(),
            stage: d.stage,
        })),
    };
}

export async function createContact(data: {
    name: string;
    phone?: string;
    email?: string;
    company?: string;
}): Promise<string> {
    const phoneNormalized = data.phone ? normalizePhone(data.phone) : null;
    const contact = await prisma.contact.create({
        data: {
            name: data.name.trim(),
            phone: data.phone?.trim() || null,
            phoneNormalized,
            email: data.email?.trim() || null,
            company: data.company?.trim() || null,
        },
    });
    revalidatePath('/admin/crm/contacts');
    return contact.id;
}

export async function updateContact(
    id: string,
    data: {
        name?: string;
        phone?: string | null;
        email?: string | null;
        company?: string | null;
    }
): Promise<void> {
    const phoneNormalized =
        data.phone !== undefined ? (data.phone ? normalizePhone(data.phone) : null) : undefined;

    await prisma.contact.update({
        where: { id },
        data: {
            ...(data.name !== undefined ? { name: data.name.trim() } : {}),
            ...(data.phone !== undefined
                ? { phone: data.phone?.trim() || null, phoneNormalized }
                : {}),
            ...(data.email !== undefined ? { email: data.email?.trim() || null } : {}),
            ...(data.company !== undefined ? { company: data.company?.trim() || null } : {}),
        },
    });
    revalidatePath('/admin/crm/contacts');
    revalidatePath(`/admin/crm/contacts/${id}`);
}

export async function deleteContact(id: string): Promise<void> {
    await prisma.contact.update({ where: { id }, data: { deletedAt: new Date() } });
    revalidatePath('/admin/crm/contacts');
}
