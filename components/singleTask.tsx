'use client';

import { deleteTask, fetchData, toggleDone } from '@/db/actions';
import { FetchedTask } from '@/types/types';
import React, { useEffect, useTransition } from 'react';
import { Button } from './ui/button';
import { TableCell, TableRow } from './ui/table';

type SingleTaskProps = {
	text: string;
	deadline: string | null;
	done: boolean;
	id: number;
	currentTasks: FetchedTask[] | null;
	setCurrentTasks: React.Dispatch<React.SetStateAction<FetchedTask[] | null>>;
};

const SingleTask = ({
	text,
	deadline,
	done,
	id,
	currentTasks,
	setCurrentTasks,
}: SingleTaskProps) => {
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		const loadData = async () => {
			const tasks = await fetchData();
		};

		loadData();
	}, []);

	const handleDelete = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		startTransition(async () => {
			await deleteTask(id);
			const updatedTasks = await fetchData();
			setCurrentTasks(updatedTasks);
		});
	};

	const handleDone = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const isDone = event.target.checked;
		await toggleDone(id, isDone);
		const updatedTasks = await fetchData();
		setCurrentTasks(updatedTasks);
	};

	return (
		<TableRow className={done ? 'bg-green-300 hover:bg-green-300' : ''}>
			<TableCell className='font-medium w-[60%]'>{text}</TableCell>
			<TableCell className='text-center w-[20%]'>{deadline}</TableCell>
			<TableCell className='text-center w-[10%]'>
				{' '}
				<input type='checkbox' id='done' checked={done} onChange={handleDone} />
			</TableCell>
			<TableCell className='text-center w-[10%]'>
				<Button variant='red' disabled={isPending} onClick={handleDelete}>
					{isPending ? 'Deleting...' : 'Delete'}
				</Button>
			</TableCell>
		</TableRow>
	);
};
export default SingleTask;
