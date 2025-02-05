import z from 'zod';

export const TaskSchema = z.object({
	id: z.number(),
	text: z.string().min(1),
	author: z.string().min(1),
	deadline: z.date(), //change into date
	done: z.boolean(),
	user: z.string().nonempty(),
	userId: z.string().nonempty(),
});

export type Task = z.infer<typeof TaskSchema>;
