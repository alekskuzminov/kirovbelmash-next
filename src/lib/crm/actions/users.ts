'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export interface SerializedUser {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'MANAGER';
    isActive: boolean;
    createdAt: string;
}

async function requireAdmin() {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error('Не авторизован');
    if (session.user.role !== 'ADMIN') throw new Error('Доступ запрещён');
    return session;
}

export async function getUsers(): Promise<SerializedUser[]> {
    await requireAdmin();

    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
    });

    return users.map((u) => ({
        ...u,
        role: u.role as 'ADMIN' | 'MANAGER',
        createdAt: u.createdAt.toISOString(),
    }));
}

export async function createUser(data: {
    name: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'MANAGER';
}): Promise<void> {
    await requireAdmin();

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new Error('Пользователь с таким email уже существует');

    const hashed = await bcrypt.hash(data.password, 10);
    await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashed,
            role: data.role,
        },
    });

    revalidatePath('/admin/users');
}

export async function updateUser(
    id: string,
    data: { name?: string; email?: string; role?: 'ADMIN' | 'MANAGER' },
): Promise<void> {
    await requireAdmin();

    if (data.email) {
        const existing = await prisma.user.findFirst({
            where: { email: data.email, NOT: { id } },
        });
        if (existing) throw new Error('Пользователь с таким email уже существует');
    }

    await prisma.user.update({ where: { id }, data });
    revalidatePath('/admin/users');
}

export async function toggleUserActive(id: string): Promise<void> {
    const session = await requireAdmin();

    if (session.user.id === id) throw new Error('Нельзя деактивировать собственную учётную запись');

    const user = await prisma.user.findUniqueOrThrow({ where: { id } });

    // Проверка: нельзя деактивировать последнего активного ADMIN
    if (user.role === 'ADMIN' && user.isActive) {
        const activeAdmins = await prisma.user.count({
            where: { role: 'ADMIN', isActive: true },
        });
        if (activeAdmins <= 1) throw new Error('Нельзя деактивировать единственного активного администратора');
    }

    await prisma.user.update({ where: { id }, data: { isActive: !user.isActive } });
    revalidatePath('/admin/users');
}

export async function changePassword(id: string, newPassword: string): Promise<void> {
    await requireAdmin();

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id }, data: { password: hashed } });
    revalidatePath('/admin/users');
}

export async function changeOwnPassword(
    currentPassword: string,
    newPassword: string,
): Promise<void> {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error('Не авторизован');

    const user = await prisma.user.findUniqueOrThrow({
        where: { id: session.user.id },
        select: { password: true },
    });

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) throw new Error('Текущий пароль неверен');

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: session.user.id }, data: { password: hashed } });
}
