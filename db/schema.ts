import type { AdapterAccount } from '@auth/core/adapters';
import { sql } from 'drizzle-orm';
import {
	boolean,
	date,
	integer,
	pgTable,
	primaryKey,
	text,
	timestamp,
	unique,
} from 'drizzle-orm/pg-core';

export const users = pgTable(
	'user',
	{
		id: text('id').notNull().primaryKey().unique(),
		name: text('name'),
		email: text('email').notNull().unique(),
		emailVerified: timestamp('emailVerified', { mode: 'date' }),
		image: text('image'),
	},
	(table) => [
		{
			emailUnique: unique('user_email_unique').on(table.email),
		},
	]
);

export const todo = pgTable('todo', {
	id: integer('id')
		.primaryKey()
		.default(sql`nextval('todo_id_seq')`),
	text: text('text').notNull(),
	done: boolean('done').default(false).notNull(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	deadline: date('deadline', { mode: 'string' }),
});

export const accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state'),
	},
	(account) => [
		{
			compoundKey: primaryKey({
				columns: [account.provider, account.providerAccountId],
			}),
		},
	]
);

export const sessions = pgTable('session', {
	sessionToken: text('sessionToken').notNull().primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull(),
	},
	(vt) => [
		{
			compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
		},
	]
);
