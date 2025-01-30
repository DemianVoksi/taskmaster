'use client';

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SingleTask from './singleTask';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const TaskSchema = z.object({
	id: z.number(),
	text: z.string().min(1),
	author: z.string().min(1),
	done: z.boolean(),
});

export type Task = z.infer<typeof TaskSchema>;

const TaskManager = () => {
	const mockTasks: Task[] = [
		{
			id: 1,
			text: 'Go to store',
			author: 'demian.voksi@gmail.com',
			done: false,
		},
		{
			id: 2,
			text: 'Odi u ducan',
			author: 'demian.voksi@gmail.com',
			done: false,
		},
		{
			id: 3,
			text: 'Kupi pigica',
			author: 'demian.voksi@gmail.com',
			done: false,
		},
		{ id: 4, text: 'Kupi misa', author: 'demian.voksi@gmail.com', done: false },
		{
			id: 5,
			text: 'Programiranje',
			author: 'demian.voksi@gmail.com',
			done: false,
		},
		{
			id: 6,
			text: 'Nesto jako dugo tako da se moze testirati kada je dugacki tekst zato jer moramo',
			author: 'demian.voksi@gmail.com',
			done: true,
		},
		{ id: 7, text: 'Blablabla', author: 'demian.voksi@gmail.com', done: false },
		{
			id: 8,
			text: 'Kupi jezinu',
			author: 'demian.voksi@gmail.com',
			done: false,
		},
		{ id: 9, text: 'Nesto', author: 'demian.voksi@gmail.com', done: false },
		{ id: 10, text: 'D&D', author: 'demian.voksi@gmail.com', done: false },
	];

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<Task>({ resolver: zodResolver(TaskSchema) });

	function submitter(data: Task) {
		console.log(data);
	}
	return (
		<div className='mt-[30px] w-[50%] sm:w-[90%] md:w-[75%]'>
			<div className='w-[100%] mb-[30px] flex flex-col justify-center items-center'>
				<form onSubmit={handleSubmit(submitter)} className='flex flex-row'>
					<div>
						<Input
							{...register('text')}
							placeholder='Enter new task'
							className='m-2'
						/>
						<Input
							{...register('author')}
							placeholder='Enter the author'
							className='m-2'
						/>
					</div>
					<div className='ml-5 flex flex-col justify-center'>
						<Button type='submit' variant='green'>
							Submit
						</Button>
					</div>
				</form>
			</div>
			{/* scrollable table: https://stackoverflow.com/questions/78141855/how-to-get-scrollable-table-in-shadcn-ui */}
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className='w-[60%]'>Task</TableHead>
						<TableHead className='text-center'>Author</TableHead>
						<TableHead className='text-center'>Done</TableHead>
						<TableHead className='text-right'></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{mockTasks.map((task) => (
						<SingleTask
							key={task.id}
							text={task.text}
							author={task.author}
							done={task.done}
							id={task.id}
						/>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default TaskManager;
