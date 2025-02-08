'use client';

import { addTask, fetchData } from '@/db/actions';
import { useGlobalState } from '@/lib/context';
import { cn } from '@/lib/utils';
import { HelperProps, Task, TaskSchema, TriggerProps } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CiCalendarDate } from 'react-icons/ci';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

const NewTaskForm = () => {
	// useEffect(() => {

	// }, []);

	const session = useSession();
	// const router = useRouter();

	const form = useForm<Task>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			text: '',
			done: false,
		},
	});

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

	function formatDeadlineToString(deadline: Date) {
		const parsedDate = Date.parse(deadline.toISOString());
		if (isNaN(parsedDate)) {
			throw new Error('Invalid date format');
		}

		const date = new Date(parsedDate);

		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		const hours = date.getHours().toString().padStart(2, '0');
		const minutes = date.getMinutes().toString().padStart(2, '0');
		const seconds = date.getSeconds().toString().padStart(2, '0');
		const fullDateTime = `${day}.${month}.${year}. ${hours}:${minutes}:${seconds}`;
		return fullDateTime;
	}

	async function submitter(data: Task) {
		const deadline = formatDeadlineToString(data.deadline);
		try {
			await addTask(data.text, data.done, deadline);
		} catch (error) {
			console.error(error);
		}
	}

	if (session.status === 'loading') {
		return <div>Loading...</div>;
	}

	if (!session) {
		return <div>Error: No session data available</div>;
	}

	return (
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
							<FormItem className='mr-1'>
								<FormControl>
									<Input placeholder='Enter task' {...field} />
								</FormControl>
								{form.formState.errors.text && (
									<p className='text-red-700'>
										{form.formState.errors.text.message}
									</p>
								)}
								{form.formState.errors.root && (
									<p className='text-red-700'>
										{form.formState.errors.root.message}
									</p>
								)}
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='deadline'
						render={({ field }) => (
							<FormItem className='flex flex-col mr-1'>
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
		</div>
	);
};

export default NewTaskForm;
