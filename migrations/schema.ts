import { sql } from 'drizzle-orm';
import {
	boolean,
	date,
	foreignKey,
	integer,
	pgSequence,
	pgTable,
	text,
	timestamp,
} from 'drizzle-orm/pg-core';

export const todoIdSeq = pgSequence('todo_id_seq', {
	startWith: '1',
	increment: '1',
	minValue: '1',
	maxValue: '9223372036854775807',
	cache: '1',
	cycle: false,
});

export const verificationToken = pgTable('verificationToken', {
	identifier: text().notNull(),
	token: text().notNull(),
	expires: timestamp({ mode: 'string' }).notNull(),
});

export const user = pgTable('user', {
	id: text().primaryKey().notNull(),
	name: text(),
	email: text().notNull(),
	emailVerified: timestamp({ mode: 'string' }),
	image: text(),
});

export const account = pgTable(
	'account',
	{
		userId: text().notNull(),
		type: text().notNull(),
		provider: text().notNull(),
		providerAccountId: text().notNull(),
		refreshToken: text('refresh_token'),
		accessToken: text('access_token'),
		expiresAt: integer('expires_at'),
		tokenType: text('token_type'),
		scope: text(),
		idToken: text('id_token'),
		sessionState: text('session_state'),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: 'account_userId_user_id_fk',
		}).onDelete('cascade'),
	]
);

export const session = pgTable(
	'session',
	{
		sessionToken: text().primaryKey().notNull(),
		userId: text().notNull(),
		expires: timestamp({ mode: 'string' }).notNull(),
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: 'session_userId_user_id_fk',
		}).onDelete('cascade'),
	]
);

export const todo = pgTable('todo', {
	id: integer()
		.default(sql`nextval('todo_id_seq'::regclass)`)
		.primaryKey()
		.notNull(),
	text: text().notNull(),
	done: boolean().default(false).notNull(),
	userId: text().notNull(),
	deadline: date(),
});
