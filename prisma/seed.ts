import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Admin user
    const existing = await prisma.user.findUnique({ where: { email: 'admin@kirovbelmash.ru' } });
    if (!existing) {
        await prisma.user.create({
            data: {
                email: 'admin@kirovbelmash.ru',
                name: 'Администратор',
                password: await bcrypt.hash('Admin123!', 12),
                role: 'ADMIN',
            },
        });
        console.log('Admin user created: admin@kirovbelmash.ru / Admin123!');
    }

    // Default pipeline
    const pipeline = await prisma.pipeline.findFirst();
    if (!pipeline) {
        await prisma.pipeline.create({
            data: {
                name: 'Основная воронка',
                order: 0,
                stages: {
                    create: [
                        { name: 'Разобрать', order: 0, color: '#6b7280' },
                        { name: 'Маловероятные', order: 1, color: '#f59e0b' },
                        { name: 'Перспективные', order: 2, color: '#3b82f6' },
                        { name: 'Очень перспективные', order: 3, color: '#8b5cf6' },
                        { name: 'Перестал отвечать', order: 4, color: '#ef4444' },
                        { name: 'Не отвечает', order: 5, color: '#9ca3af' },
                    ],
                },
            },
        });
        console.log('Default pipeline created');
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
