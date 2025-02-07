'use server';

import { auth } from '@/auth';
import { db } from '@/db/drizzle';
import { todo } from '@/db/schema';
import { eq, not } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function fetchData() {
	const data = await db.select().from(todo); // add filter by userId
	const parsedData = data.map((task) => ({
		...task,
		deadline: task.deadline ? new Date(task.deadline) : undefined,
	}));
	return parsedData;
}

export async function addTask(text: string, done: boolean, deadline: Date) {
	const parsedDeadline =
		typeof deadline === 'string' ? new Date(deadline) : deadline;

	const session = await auth();
	const userId = session?.user?.id!;

	await db.insert(todo).values({
		text: text,
		done: done,
		userId: userId,
		deadline: parsedDeadline.toISOString().split('T')[0],
	});
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
