'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (result?.error) {
            setError('Неверный email или пароль');
        } else {
            router.push('/admin');
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">КировБелМаш</h1>
                    <p className="mt-1 text-sm text-gray-500">Вход в CRM</p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="rounded-xl bg-white px-8 py-8 shadow-sm border border-gray-200"
                >
                    <div className="space-y-4">
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">Пароль</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                            />
                        </div>
                        {error && <p className="text-sm text-red-600">{error}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-red-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-800 disabled:opacity-60 transition"
                        >
                            {loading ? 'Входим...' : 'Войти'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
