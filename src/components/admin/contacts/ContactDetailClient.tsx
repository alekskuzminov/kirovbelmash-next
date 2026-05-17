'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ContactDetail } from '@/lib/crm/actions/contacts';
import ContactFormModal from './ContactFormModal';

interface Props {
    contact: ContactDetail;
}

export default function ContactDetailClient({ contact }: Props) {
    const [showEdit, setShowEdit] = useState(false);

    return (
        <div className="p-6 max-w-4xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/admin/crm/contacts" className="hover:text-gray-700">Контакты</Link>
                <i className="ri-arrow-right-s-line" />
                <span className="text-gray-700">{contact.name}</span>
            </div>

            {/* Header card */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm mb-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">{contact.name}</h1>
                        {contact.company && (
                            <p className="text-sm text-gray-500 mt-0.5">{contact.company}</p>
                        )}
                    </div>
                    <button
                        onClick={() => setShowEdit(true)}
                        className="flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50"
                    >
                        <i className="ri-edit-line" />
                        Редактировать
                    </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-4">
                    {contact.phone && (
                        <a
                            href={`tel:${contact.phone}`}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
                        >
                            <i className="ri-phone-line text-gray-400" />
                            {contact.phone}
                        </a>
                    )}
                    {contact.email && (
                        <a
                            href={`mailto:${contact.email}`}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600"
                        >
                            <i className="ri-mail-line text-gray-400" />
                            {contact.email}
                        </a>
                    )}
                    <span className="flex items-center gap-2 text-sm text-gray-400">
                        <i className="ri-calendar-line" />
                        Добавлен {new Date(contact.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                </div>
            </div>

            {/* Deals */}
            <div>
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3">
                    Сделки ({contact.deals.length})
                </h2>
                {contact.deals.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-sm text-gray-400">
                        Нет сделок
                    </div>
                ) : (
                    <div className="space-y-2">
                        {contact.deals.map((deal) => (
                            <div
                                key={deal.id}
                                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-800">{deal.title}</p>
                                    <div className="mt-0.5 flex items-center gap-3 text-xs text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <span
                                                className="inline-block h-2 w-2 rounded-full"
                                                style={{ backgroundColor: deal.stage.color }}
                                            />
                                            {deal.stage.name}
                                        </span>
                                        {deal.source && (
                                            <span>
                                                {({
                                                    'Вручную': 'Создано вручную',
                                                    'modal': 'Форма на сайте',
                                                    'contact': 'Страница контактов',
                                                    'calculator': 'Калькулятор',
                                                    'general': 'Общая форма',
                                                    'projects': 'Страница проектов',
                                                    'about': 'О компании',
                                                } as Record<string, string>)[deal.source] ?? deal.source}
                                            </span>
                                        )}
                                        <span>{new Date(deal.createdAt).toLocaleDateString('ru-RU')}</span>
                                    </div>
                                </div>
                                {deal.amount && (
                                    <span className="text-sm font-medium text-emerald-600">
                                        {Number(deal.amount).toLocaleString('ru-RU')} ₽
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {showEdit && (
                <ContactFormModal
                    initial={{
                        id: contact.id,
                        name: contact.name,
                        company: contact.company,
                        phone: contact.phone,
                        email: contact.email,
                    }}
                    onClose={() => setShowEdit(false)}
                />
            )}
        </div>
    );
}
