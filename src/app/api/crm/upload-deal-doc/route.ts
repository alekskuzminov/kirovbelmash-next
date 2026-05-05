import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { s3 } from '@/lib/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { prisma } from '@/lib/prisma';

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

    const deal = await prisma.deal.findUnique({ where: { id: dealId }, select: { id: true } });
    if (!deal) {
        return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    if (file.type !== 'application/pdf') {
        return NextResponse.json({ error: 'Only PDF files are allowed' }, { status: 400 });
    }

    const maxSize = 20 * 1024 * 1024;
    if (file.size > maxSize) {
        return NextResponse.json({ error: 'File size must not exceed 20 MB' }, { status: 400 });
    }

    const bucket = process.env.S3_BUCKET_NAME;
    if (!bucket) {
        return NextResponse.json({ error: 'S3 bucket not configured' }, { status: 500 });
    }

    const key = `crm/deals/${dealId}/doc.pdf`;
    const buffer = Buffer.from(await file.arrayBuffer());

    await s3.send(
        new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: buffer,
            ContentType: 'application/pdf',
        })
    );

    const url = `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${key}`;

    await prisma.deal.update({
        where: { id: dealId },
        data: { documentUrl: url },
    });

    return NextResponse.json({ url });
}
