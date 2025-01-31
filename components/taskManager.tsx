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
import { ScrollArea } from '@radix-ui/react-scroll-area';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SingleTask from './singleTask';
import { Button } from './ui/button';
import { DatePicker } from './ui/date-picker';
import { Input } from './ui/input';

export const TaskSchema = z.object({
	id: z.number(),
	text: z.string().min(1),
	author: z.string().min(1),
	deadline: z.string().nullable(),
	done: z.boolean(),
});

export type Task = z.infer<typeof TaskSchema>;

const TaskManager = () => {
	useEffect(() => {
		const table = document.querySelector('.chrome-specific');
		if (
			navigator.userAgent.includes('Chrome') &&
			!navigator.userAgent.includes('Edge')
		) {
			table?.classList.add('chrome-only');
		}
	}, []);

	const mockTasks: Task[] = [
		{
			id: 1,
			text: 'Go to store',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 2,
			text: 'Odi u ducan',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 3,
			text: 'Kupi pigica',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 4,
			text: 'Kupi misa',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 5,
			text: 'Programiranje',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 6,
			text: 'Nesto jako dugo tako da se moze testirati kada je dugacki tekst zato jer moramo',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: true,
		},
		{
			id: 7,
			text: 'Blablabla',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 8,
			text: 'Kupi jezinu',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 9,
			text: 'Nesto',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 10,
			text: 'D&D',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 11,
			text: 'Kafa',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 12,
			text: 'Kazaliste',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 13,
			text: 'Kino',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 14,
			text: 'Kupi misa',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 15,
			text: 'Programiranje opet',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 16,
			text: 'Opet nesto jako dugo tako da se moze testirati kada je dugacki tekst zato jer moramo iako je naporno sve ovo pisati,,a pogotovo po drugi put, zasto nista ne može nika biti jednostavno',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: true,
		},
		{
			id: 17,
			text: 'Blablabladva',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 18,
			text: 'Kupi malog misa',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 19,
			text: 'Nesto dva',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
		{
			id: 20,
			text: 'D&D homebrew',
			author: 'demian.voksi@gmail.com',
			deadline: '1.2.2025.',
			done: false,
		},
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
		<div className='flex flex-col mt-[30px] w-[50%] sm:w-[90%] md:w-[75%] flex-grow h-full'>
			<div className='w-[100%] mb-[30px] flex flex-col justify-center items-center'>
				<form onSubmit={handleSubmit(submitter)} className='flex flex-row'>
					<div className='ml-5 flex flex-row justify-center'>
						<Input
							{...register('text')}
							placeholder='Enter new task'
							className='m-2'
						/>
					</div>
					<div className='ml-5 flex flex-col justify-center'>
						<DatePicker />
					</div>
					<div className='ml-5 flex flex-col justify-center'>
						<Button type='submit' variant='green'>
							Submit
						</Button>
					</div>
				</form>
			</div>
			<div className='flex-grow overflow-hidden'>
				<Table className='chrome-specific'>
					<TableHeader className='sticky top-0 z-10'>
						<TableRow>
							<TableHead className='w-[60%]'>Task</TableHead>
							<TableHead className='text-center w-[20%]'>Deadline</TableHead>
							<TableHead className='text-center w-[10%]'>Done</TableHead>
							<TableHead className='text-right w-[10%]'></TableHead>
						</TableRow>
					</TableHeader>
				</Table>
				<div className='overflow-y-auto max-h-[calc(100vh-250px)]'>
					<Table className='w-full'>
						<TableBody>
							{mockTasks.map((task) => (
								<SingleTask
									key={task.id}
									text={task.text}
									author={task.author}
									deadline={task.deadline}
									done={task.done}
									id={task.id}
								/>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default TaskManager;
