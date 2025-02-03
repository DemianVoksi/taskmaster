import { DrizzleAdapter } from '@auth/drizzle-adapter';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { db } from './db/drizzle';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [GitHub],
	adapter: DrizzleAdapter(db),
	callbacks: {
		async session({ session, user }) {
			session.user.id = user.id;
			return session;
		},
	},
});
