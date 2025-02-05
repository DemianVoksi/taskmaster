'use client';

import { addTask } from '@/db/actions';
import { cn } from '@/lib/utils';
import { Task, TaskSchema } from '@/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { CiCalendarDate } from 'react-icons/ci';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ScrollArea, ScrollBar } from './ui/scroll-area';

const NewTaskForm = () => {
	const session = useSession();

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

	async function submitter(data: Task) {
		try {
			await addTask(data.text, data.done, data.deadline);
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	}

	console.log(form.formState.errors); // Log errors to debug
	console.log(session);

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
							<FormItem>
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
		</div>
	);
};

export default NewTaskForm;
