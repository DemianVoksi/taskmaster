'use client';

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { format } from 'date-fns';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CiCalendarDate } from 'react-icons/ci';
import { z } from 'zod';
import SingleTask from './singleTask';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ScrollBar } from './ui/scroll-area';

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

	function handleDateSelect(date: Date | undefined) {
		if (date) {
			form.setValue('deadline', date);
		}
	}

	function handleTimeChange(type: 'hour' | 'minute', value: string) {
		const currentDate = form.getValues('deadline') || new Date();
		let newDate = new Date(currentDate);

		if (type === 'hour') {
			const hour = parseInt(value, 10);
			newDate.setHours(hour);
		} else if (type === 'minute') {
			newDate.setMinutes(parseInt(value, 10));
		}

		form.setValue('deadline', newDate);
	}

	// const mockTasks: Task[] = [
	// 	{
	// 		id: 1,
	// 		text: 'Go to store',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 2,
	// 		text: 'Odi u ducan',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 3,
	// 		text: 'Kupi pigica',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 4,
	// 		text: 'Kupi misa',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 5,
	// 		text: 'Programiranje',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 6,
	// 		text: 'Nesto jako dugo tako da se moze testirati kada je dugacki tekst zato jer moramo',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: true,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 7,
	// 		text: 'Blablabla',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 8,
	// 		text: 'Kupi jezinu',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 9,
	// 		text: 'Nesto',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 10,
	// 		text: 'D&D',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 11,
	// 		text: 'Kafa',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 12,
	// 		text: 'Kazaliste',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 13,
	// 		text: 'Kino',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 14,
	// 		text: 'Kupi misa',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 15,
	// 		text: 'Programiranje opet',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 16,
	// 		text: 'Opet nesto jako dugo tako da se moze testirati kada je dugacki tekst zato jer moramo iako je naporno sve ovo pisati,,a pogotovo po drugi put, zasto nista ne može nika biti jednostavno',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: true,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 17,
	// 		text: 'Blablabladva',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 18,
	// 		text: 'Kupi malog misa',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 19,
	// 		text: 'Nesto dva',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// 	{
	// 		id: 20,
	// 		text: 'D&D homebrew',
	// 		author: 'demian.voksi@gmail.com',
	// 		deadline: '1.2.2025.',
	// 		done: false,
	// 		user: 'Demian Voksi',
	// 		userId: '12345',
	// 	},
	// ];

	// {
	// 	register,
	// 	handleSubmit,
	// 	control,
	// 	formState: { errors },
	// }

	const form = useForm<Task>({ resolver: zodResolver(TaskSchema) });

	function submitter(data: Task) {
		console.log(data);
	}

	return (
		<div className='flex flex-col mt-[30px] w-[50%] sm:w-[90%] md:w-[75%] flex-grow h-full'>
			<div className='w-[100%] mb-[30px] flex flex-col justify-center items-center'>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(submitter)}
						className='flex flex-row justify-center items-center'
					>
						<FormField
							control={form.control}
							name='text'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input placeholder='Enter task' {...field} />
									</FormControl>
									{form.formState.errors.text ? (
										<p className='text-red-700'>
											{form.formState.errors.text.message}
										</p>
									) : (
										<></>
									)}
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='deadline'
							render={({ field }) => (
								<FormItem className='flex flex-col'>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={'outline'}
													className={cn(
														'w-full pl-3 text-left font-normal',
														!field.value && 'text-muted-foreground'
													)}
												>
													{field.value ? (
														format(field.value, 'dd/MM/yyyy HH:mm')
													) : (
														<p className='text-zinc-500'>Deadline</p>
													)}
													<CiCalendarDate className='ml-auto h-4 w-4 opacity-100' />
												</Button>
											</FormControl>
										</PopoverTrigger>
										<PopoverContent className='w-auto p-0'>
											<div className='sm:flex'>
												<Calendar
													mode='single'
													selected={field.value}
													onSelect={handleDateSelect}
													initialFocus
												/>
												<div className='flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'>
													<ScrollArea className='w-64 h-full overflow-y-scroll sm:w-auto'>
														<div className='flex sm:flex-col p-2'>
															{Array.from({ length: 24 }, (_, i) => i)
																.reverse()
																.map((hour) => (
																	<Button
																		key={hour}
																		size='icon'
																		variant={
																			field.value &&
																			field.value.getHours() === hour
																				? 'default'
																				: 'ghost'
																		}
																		className='sm:w-full shrink-0 aspect-square'
																		onClick={() =>
																			handleTimeChange('hour', hour.toString())
																		}
																	>
																		{hour}
																	</Button>
																))}
														</div>
														<ScrollBar
															orientation='horizontal'
															className='sm:hidden'
														/>
													</ScrollArea>
													<ScrollArea className='w-64 sm:w-auto h-full overflow-y-scroll'>
														<div className='flex sm:flex-col p-2'>
															{Array.from({ length: 12 }, (_, i) => i * 5).map(
																(minute) => (
																	<Button
																		key={minute}
																		size='icon'
																		variant={
																			field.value &&
																			field.value.getMinutes() === minute
																				? 'default'
																				: 'ghost'
																		}
																		className='sm:w-full shrink-0 aspect-square'
																		onClick={() =>
																			handleTimeChange(
																				'minute',
																				minute.toString()
																			)
																		}
																	>
																		{minute.toString().padStart(2, '0')}
																	</Button>
																)
															)}
														</div>
														<ScrollBar
															orientation='horizontal'
															className='sm:hidden'
														/>
													</ScrollArea>
												</div>
											</div>
										</PopoverContent>
									</Popover>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type='submit'>Submit</Button>
					</form>
				</Form>
				{/* <form onSubmit={form.handleSubmit(submitter)} className='flex flex-row'>
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
				</form> */}
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
							{/* {mockTasks.map((task) => (
								<SingleTask
									key={task.id}
									text={task.text}
									author={task.author}
									deadline={task.deadline}
									done={task.done}
									id={task.id}
									user={task.user}
									userId={task.userId}
								/>
							))} */}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};

export default TaskManager;
