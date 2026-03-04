import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactPayload {
    name: string;
    phone: string;
    email?: string;
    company?: string;
    message?: string;
    source?: string;
    extra?: Record<string, string>;
}

const RECIPIENTS = [
    'a.kuzminow@yandex.ru',
];

const SOURCE_LABELS: Record<string, string> = {
    contact: 'Главная страница — форма обратной связи',
    projects: 'Страница проектов — CTA-форма',
    calculator: 'Калькулятор — форма запроса',
    about: 'Страница «О компании» — форма обратной связи',
    modal: 'Модальное окно',
};

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.yandex.ru',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const buildHtml = (data: ContactPayload): string => {
    const sourceLabel = SOURCE_LABELS[data.source || ''] || data.source || 'Неизвестный источник';

    let rows = `
        <tr><td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap">Источник</td><td style="padding:8px 12px">${sourceLabel}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap">Имя</td><td style="padding:8px 12px">${data.name}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap">Телефон</td><td style="padding:8px 12px"><a href="tel:${data.phone}">${data.phone}</a></td></tr>
    `;

    if (data.email) {
        rows += `<tr><td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap">Email</td><td style="padding:8px 12px"><a href="mailto:${data.email}">${data.email}</a></td></tr>`;
    }
    if (data.company) {
        rows += `<tr><td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap">Компания</td><td style="padding:8px 12px">${data.company}</td></tr>`;
    }
    if (data.message) {
        rows += `<tr><td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap">Сообщение</td><td style="padding:8px 12px">${data.message}</td></tr>`;
    }

    if (data.extra) {
        Object.entries(data.extra).forEach(([key, value]) => {
            rows += `<tr><td style="padding:8px 12px;font-weight:600;color:#555;white-space:nowrap">${key}</td><td style="padding:8px 12px">${value}</td></tr>`;
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

        // Validate required fields
        if (!data.name?.trim() || !data.phone?.trim()) {
            return NextResponse.json(
                { error: 'Имя и телефон обязательны' },
                { status: 400 }
            );
        }

        const sourceLabel = SOURCE_LABELS[data.source || ''] || 'Сайт';
        const subject = `Заявка с сайта — ${data.name} (${sourceLabel})`;

        await transporter.sendMail({
            from: `"КировБелМаш Сайт" <${process.env.SMTP_USER}>`,
            to: RECIPIENTS.join(', '),
            subject,
            html: buildHtml(data),
            replyTo: data.email || undefined,
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('[api/contact] Error sending email:', error);
        return NextResponse.json(
            { error: 'Ошибка отправки письма' },
            { status: 500 }
        );
    }
}
