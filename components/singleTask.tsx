'use client';

import { deleteTask, fetchData } from '@/db/actions';
import { useGlobalState } from '@/lib/context';
import { FetchedTask } from '@/types/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useTransition } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { TableCell, TableRow } from './ui/table';

const SingleTask = ({ text, deadline, done, id }: FetchedTask) => {
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
