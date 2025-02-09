'use client';

import { deleteTask, fetchData } from '@/db/actions';
import { useGlobalState } from '@/lib/context-d';
import { FetchedTask } from '@/types/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useTransition } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
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
	const router = useRouter();

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

	return (
		<TableRow>
			<TableCell className='font-medium w-[60%]'>{text}</TableCell>
			<TableCell className='text-center w-[20%]'>{deadline}</TableCell>
			<TableCell className='text-center w-[10%]'>
				{' '}
				<Checkbox id='done' checked={done && true} />
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
