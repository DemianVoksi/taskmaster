import { Dispatch, SetStateAction } from 'react';
import z from 'zod';

export const TaskSchema = z.object({
	text: z.string().min(1),
	deadline: z.coerce.date(),
	done: z.boolean(),
});

export type Task = z.infer<typeof TaskSchema>;

export type FetchedTask = {
	id: number;
	text: string;
	deadline: string | null;
	done: boolean;
};

export type HelperProps = {
	helper: boolean;
	setHelper: Dispatch<SetStateAction<boolean>>;
};

export type TriggerProps = {
	trigger: boolean;
	setTrigger: Dispatch<SetStateAction<boolean>>;
};
