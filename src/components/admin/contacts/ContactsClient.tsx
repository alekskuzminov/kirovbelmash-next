'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SerializedContact, deleteContact } from '@/lib/crm/actions/contacts';
import ContactFormModal from './ContactFormModal';

interface Props {
    contacts: SerializedContact[];
}

export default function ContactsClient({ contacts }: Props) {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [search, setSearch] = useState('');
    const [showCreate, setShowCreate] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const filtered = search
        ? contacts.filter(
              (c) =>
                  c.name.toLowerCase().includes(search.toLowerCase()) ||
                  c.company?.toLowerCase().includes(search.toLowerCase()) ||
                  c.phone?.includes(search) ||
                  c.email?.toLowerCase().includes(search.toLowerCase())
          )
        : contacts;

    function handleDelete(id: string) {
        startTransition(async () => {
            await deleteContact(id);
            setDeletingId(null);
            router.refresh();
        });
    }

    return (
        <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Контакты</h1>
                    <p className="text-sm text-gray-500 mt-0.5">{contacts.length} контактов</p>
                </div>
                <button
                    onClick={() => setShowCreate(true)}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                >
                    <i className="ri-add-line" />
                    Новый контакт
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                    className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Поиск по имени, компании, телефону..."
                />
                {search && (
                    <button
                        onClick={() => setSearch('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 max-w-sm"
                    >
                        <i className="ri-close-line" />
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                        <tr>
                            <th className="px-4 py-3 text-left font-medium">Имя</th>
                            <th className="px-4 py-3 text-left font-medium">Компания</th>
                            <th className="px-4 py-3 text-left font-medium">Телефон</th>
                            <th className="px-4 py-3 text-left font-medium">Email</th>
                            <th className="px-4 py-3 text-center font-medium">Сделки</th>
                            <th className="px-4 py-3 text-left font-medium">Добавлен</th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                                    {search ? 'Ничего не найдено' : 'Контактов ещё нет'}
                                </td>
                            </tr>
                        )}
                        {filtered.map((contact) => (
                            <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3">
                                    <Link
                                        href={`/admin/crm/contacts/${contact.id}`}
                                        className="font-medium text-gray-900 hover:text-blue-600"
                                    >
                                        {contact.name}
                                    </Link>
                                </td>
                                <td className="px-4 py-3 text-gray-600">{contact.company ?? '—'}</td>
                                <td className="px-4 py-3 text-gray-600">
                                    {contact.phone ? (
                                        <a href={`tel:${contact.phone}`} className="hover:text-blue-600">
                                            {contact.phone}
                                        </a>
                                    ) : '—'}
                                </td>
                                <td className="px-4 py-3 text-gray-600">
                                    {contact.email ? (
                                        <a href={`mailto:${contact.email}`} className="hover:text-blue-600">
                                            {contact.email}
                                        </a>
                                    ) : '—'}
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {contact.dealsCount > 0 ? (
                                        <span className="inline-flex items-center justify-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                                            {contact.dealsCount}
                                        </span>
                                    ) : (
                                        <span className="text-gray-300">0</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-gray-400 text-xs">
                                    {new Date(contact.createdAt).toLocaleDateString('ru-RU')}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1 justify-end">
                                        <Link
                                            href={`/admin/crm/contacts/${contact.id}`}
                                            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                                            title="Открыть"
                                        >
                                            <i className="ri-eye-line text-base" />
                                        </Link>
                                        {deletingId === contact.id ? (
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => handleDelete(contact.id)}
                                                    className="rounded px-2 py-1 text-xs bg-red-600 text-white hover:bg-red-700"
                                                >
                                                    Да
                                                </button>
                                                <button
                                                    onClick={() => setDeletingId(null)}
                                                    className="rounded px-2 py-1 text-xs text-gray-400 hover:text-gray-700"
                                                >
                                                    Нет
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setDeletingId(contact.id)}
                                                className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                                                title="Удалить"
                                            >
                                                <i className="ri-delete-bin-line text-base" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showCreate && <ContactFormModal onClose={() => setShowCreate(false)} />}
        </div>
    );
}
