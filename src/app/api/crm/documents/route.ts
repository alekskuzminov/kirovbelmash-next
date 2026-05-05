import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { s3 } from '@/lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { prisma } from '@/lib/prisma';

const ALLOWED_TYPES: Record<string, string> = {
    'application/pdf': '.pdf',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
};

const MAX_SIZE = 20 * 1024 * 1024;

function sanitizeFilename(name: string): string {
    return name.replace(/[^a-zA-Z0-9а-яА-ЯёЁ._-]/g, '_').slice(0, 100);
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const dealId = formData.get('dealId') as string | null;

    if (!file || !dealId) {
        return NextResponse.json({ error: 'file and dealId are required' }, { status: 400 });
    }

    if (!ALLOWED_TYPES[file.type]) {
        return NextResponse.json({ error: 'File type not allowed' }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
        return NextResponse.json({ error: 'File size must not exceed 20 MB' }, { status: 400 });
    }

    const deal = await prisma.deal.findUnique({ where: { id: dealId }, select: { id: true } });
    if (!deal) {
        return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    const bucket = process.env.S3_BUCKET_NAME;
    if (!bucket) {
        return NextResponse.json({ error: 'S3 bucket not configured' }, { status: 500 });
    }

    const sanitized = sanitizeFilename(file.name);
    const filename = `${Date.now()}-${sanitized}`;
    const s3Key = `crm/deals/${dealId}/${filename}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    await s3.send(
        new PutObjectCommand({
            Bucket: bucket,
            Key: s3Key,
            Body: buffer,
            ContentType: file.type,
        })
    );

    const s3Url = `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${s3Key}`;

    const doc = await prisma.document.create({
        data: {
            filename,
            originalName: file.name,
            s3Key,
            s3Url,
            size: file.size,
            mimeType: file.type,
            dealId,
            uploadedById: session.user.id,
        },
        select: { id: true, originalName: true, s3Url: true, size: true, mimeType: true, createdAt: true },
    });

    return NextResponse.json({
        ...doc,
        createdAt: doc.createdAt.toISOString(),
    });
}
