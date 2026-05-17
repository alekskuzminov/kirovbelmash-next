import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Admin user
    const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@kirovbelmash.ru';
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD;

    if (!adminPassword) {
        throw new Error(
            'INITIAL_ADMIN_PASSWORD env var is required. Set it before running seed:\n' +
            '  INITIAL_ADMIN_PASSWORD=your_password npx prisma db seed'
        );
    }

    const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!existing) {
        await prisma.user.create({
            data: {
                email: adminEmail,
                name: 'Администратор',
                password: await bcrypt.hash(adminPassword, 12),
                role: 'ADMIN',
            },
        });
        console.log(`Admin user created: ${adminEmail}`);
    } else {
        console.log(`Admin user already exists: ${adminEmail}`);
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
