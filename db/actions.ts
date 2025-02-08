'use server';

import { auth } from '@/auth';
import { db } from '@/db/drizzle';
import { todo } from '@/db/schema';
import { eq, not } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function fetchData() {
	const session = await auth();
	const userId = session?.user?.id!;
	const data = await db.select().from(todo).where(eq(todo.userId, userId));

	return data;
}

export async function addTask(text: string, done: boolean, deadline: string) {
	const session = await auth();
	const userId = session?.user?.id!;

	await db.insert(todo).values({
		text: text,
		done: done,
		userId: userId,
		deadline: deadline,
	});

	revalidatePath('/');
}

export async function deleteTask(id: number) {
	await db.delete(todo).where(eq(todo.id, id));
	revalidatePath('/');
}

export async function toggleDone(id: number) {
	await db
		.update(todo)
		.set({
			done: not(todo.done),
		})
		.where(eq(todo.id, id));
	revalidatePath('/');
}

export async function editTodo(id: number, text: string) {
	await db
		.update(todo)
		.set({
			text: text,
		})
		.where(eq(todo.id, id));
	revalidatePath('/');
}
