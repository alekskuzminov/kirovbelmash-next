import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';
import { normalizePhone } from '@/lib/phone';

interface ContactPayload {
    name: string;
    phone: string;
    email?: string;
    company?: string;
    message?: string;
    source?: string;
    extra?: Record<string, string>;
    visitParams?: Record<string, string>;
    hp?: string;   // honeypot — must be empty
    ts?: number;   // form mount timestamp (client Date.now())
}

const RECIPIENTS = [
    'a.kuzminow@yandex.ru',
    'sale@kirovbelmash.ru',
];

// Minimum time between form mount and submit. Bots typically submit instantly.
const MIN_FORM_TIME_MS = 2000;

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.yandex.ru',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const escapeHtml = (s: string): string =>
    s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

const isValidPhone = (s: string): boolean => {
    const digits = s.replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
};

const VOWELS_RE = /[аеёиоуыэюяaeiouy]/i;
const NAME_CHARS_RE = /^[\p{L}\s'\-.]+$/u;

const isValidName = (s: string): boolean => {
    const trimmed = s.trim();
    if (trimmed.length < 2 || trimmed.length > 60) return false;
    if (!NAME_CHARS_RE.test(trimmed)) return false;
    // Random strings like "fHdgIAybXzeDofCAMNwyuUZt" pass the char-class check
    // but have an unnatural vowel ratio — reject those.
    if (!VOWELS_RE.test(trimmed)) return false;
    const letters = trimmed.replace(/[^\p{L}]/gu, '');
    if (letters.length >= 8) {
        const vowels = letters.match(/[аеёиоуыэюяaeiouy]/gi) ?? [];
        const ratio = vowels.length / letters.length;
        if (ratio < 0.15 || ratio > 0.75) return false;
    }
    return true;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const looksLikeGibberish = (s: string): boolean => {
    const trimmed = s.trim();
    if (trimmed.length < 12) return false;
    if (/\s/.test(trimmed)) return false; // has spaces → likely real text
    const letters = trimmed.replace(/[^\p{L}]/gu, '');
    if (letters.length < 10) return false;
    const vowels = letters.match(/[аеёиоуыэюяaeiouy]/gi) ?? [];
    const ratio = vowels.length / letters.length;
    return ratio < 0.15 || ratio > 0.75;
};

const buildHtml = (data: ContactPayload): string => {
    const name = escapeHtml(data.name);
    const phone = escapeHtml(data.phone);
    const phoneHref = data.phone.replace(/[^+\d]/g, ''); // only + and digits — safe in href

    let rows = `
        <tr><td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap">Имя</td><td style="padding:8px 12px">${name}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap">Телефон</td><td style="padding:8px 12px"><a href="tel:${phoneHref}">${phone}</a></td></tr>
    `;

    if (data.email) {
        const email = escapeHtml(data.email);
        const emailHref = encodeURIComponent(data.email);
        rows += `<tr><td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap">Email</td><td style="padding:8px 12px"><a href="mailto:${emailHref}">${email}</a></td></tr>`;
    }
    if (data.company) {
        rows += `<tr><td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap">Компания</td><td style="padding:8px 12px">${escapeHtml(data.company)}</td></tr>`;
    }
    if (data.message) {
        rows += `<tr><td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap">Сообщение</td><td style="padding:8px 12px">${escapeHtml(data.message)}</td></tr>`;
    }

    if (data.extra) {
        Object.entries(data.extra).forEach(([key, value]) => {
            rows += `<tr><td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap">${escapeHtml(key)}</td><td style="padding:8px 12px">${escapeHtml(String(value))}</td></tr>`;
        });
    }

    return `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <div style="background:#b91c1c;padding:20px 24px;border-radius:8px 8px 0 0">
                <h2 style="margin:0;color:#fff;font-size:18px">Новая заявка с сайта КировБелМаш</h2>
            </div>
            <table style="width:100%;border-collapse:collapse;background:#f9fafb;border-radius:0 0 8px 8px">
                ${rows}
            </table>
            <p style="margin-top:16px;font-size:12px;color:#9ca3af">Письмо отправлено автоматически с сайта kirovbelmash.ru</p>
        </div>
    `;
};

export async function POST(request: NextRequest) {
    try {
        const data: ContactPayload = await request.json();

        // Anti-spam 1: honeypot. Real users cannot see the field; bots fill all inputs.
        // Silently accept to avoid giving feedback that would help tuning.
        if (typeof data.hp === 'string' && data.hp.trim() !== '') {
            return NextResponse.json({ ok: true });
        }

        // Anti-spam 2: time-to-submit. Bots submit instantly.
        if (typeof data.ts !== 'number' || Date.now() - data.ts < MIN_FORM_TIME_MS) {
            return NextResponse.json({ ok: true });
        }

        // Required fields
        if (!data.name?.trim() || !data.phone?.trim()) {
            return NextResponse.json(
                { error: 'Имя и телефон обязательны' },
                { status: 400 }
            );
        }

        // Format validation
        if (!isValidName(data.name)) {
            return NextResponse.json(
                { error: 'Некорректное имя' },
                { status: 400 }
            );
        }
        if (!isValidPhone(data.phone)) {
            return NextResponse.json(
                { error: 'Некорректный номер телефона' },
                { status: 400 }
            );
        }
        if (data.email && data.email.trim()) {
            if (data.email.length > 254) {
                return NextResponse.json({ error: 'Некорректный email' }, { status: 400 });
            }
            if (!EMAIL_RE.test(data.email.trim())) {
                return NextResponse.json(
                    { error: 'Некорректный email' },
                    { status: 400 }
                );
            }
        }
        if (data.company && data.company.length > 200) {
            return NextResponse.json({ error: 'Некорректное название компании' }, { status: 400 });
        }
        if (data.message) {
            if (data.message.length > 2000 || looksLikeGibberish(data.message)) {
                return NextResponse.json(
                    { error: 'Некорректное сообщение' },
                    { status: 400 }
                );
            }
        }

        const nameForSubject = data.name.trim().slice(0, 60);
        const subject = `Заявка с сайта — ${nameForSubject}`;

        await transporter.sendMail({
            from: `"КировБелМаш Сайт" <${process.env.SMTP_USER}>`,
            to: RECIPIENTS.join(', '),
            subject,
            html: buildHtml(data),
            replyTo: data.email || undefined,
        });

        // Save to CRM — email is the priority; DB failure must not affect response
        try {
            const phoneNormalized = data.phone ? normalizePhone(data.phone) : null;

            // Find or create contact by normalized phone (deduplication)
            let contact = phoneNormalized
                ? await prisma.contact.findFirst({ where: { phoneNormalized, deletedAt: null } })
                : null;

            if (!contact) {
                contact = await prisma.contact.create({
                    data: {
                        name: data.name.trim(),
                        phone: data.phone?.trim() || null,
                        phoneNormalized,
                        email: data.email?.trim() || null,
                        company: data.company?.trim() || null,
                    },
                });
            }

            // Find default pipeline first stage
            const pipeline = await prisma.pipeline.findFirst({
                include: { stages: { orderBy: { order: 'asc' }, take: 1 } },
            });

            if (pipeline && pipeline.stages.length > 0) {
                const firstStage = pipeline.stages[0];

                // Build deal title: message → extra values → fallback
                const trim60 = (s: string) => s.length > 60 ? s.slice(0, 60).trimEnd() + '…' : s;
                let dealTitle = 'Входящая заявка';
                if (data.message?.trim()) {
                    dealTitle = trim60(data.message.trim());
                } else if (data.extra && Object.keys(data.extra).length > 0) {
                    const joined = Object.values(data.extra).filter(Boolean).join(', ');
                    if (joined) dealTitle = trim60(joined);
                }

                const deal = await prisma.deal.create({
                    data: {
                        title: dealTitle,
                        contactId: contact.id,
                        stageId: firstStage.id,
                        pipelineId: pipeline.id,
                        source: data.source || 'Сайт',
                        visitParams: data.visitParams ?? undefined,
                    },
                });
                await prisma.dealStageEvent.create({
                    data: { dealId: deal.id, toStageId: firstStage.id },
                });
            }
        } catch (dbError) {
            console.error('[api/contact] DB save failed (email already sent):', dbError);
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('[api/contact] Error sending email:', error);
        return NextResponse.json(
            { error: 'Ошибка отправки письма' },
            { status: 500 }
        );
    }
}
