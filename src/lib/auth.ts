import { NextAuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
    session: { strategy: 'jwt' },
    pages: { signIn: '/admin/login' },
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Пароль', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    select: { id: true, email: true, name: true, password: true, role: true, isActive: true },
                });

                if (!user) return null;

                const valid = await bcrypt.compare(credentials.password, user.password);
                if (!valid) return null;

                if (!user.isActive) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        },
    },
};

export async function requireSession() {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error('Не авторизован');
    return session;
}

export async function requireAdmin() {
    const session = await requireSession();
    if (session.user.role !== 'ADMIN') throw new Error('Доступ запрещён');
    return session;
}
