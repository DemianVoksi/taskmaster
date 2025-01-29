import { boolean, integer, pgTable, text } from 'drizzle-orm/pg-core';
export const todo = pgTable('todo', {
	id: integer('id').primaryKey(),
	text: text('text').notNull(),
	author: text('author'),
	done: boolean('done').default(false).notNull(),
});
