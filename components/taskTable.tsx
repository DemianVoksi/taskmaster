'use client';

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { fetchData } from '@/db/actions';
import { useStateContext } from '@/lib/contextProvider';
import { FetchedTask } from '@/types/types';
import React, { useEffect, useState } from 'react';
import SingleTask from './singleTask';

const TaskTable = () => {
	const { currentTasks, setCurrentTasks } = useStateContext();

	useEffect(() => {
		const fetchTasks = async () => {
			const tasks = await fetchData();
			setCurrentTasks(tasks);
		};
		fetchTasks();
	}, []);

	return (
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
						{currentTasks &&
							currentTasks?.map((task) => (
								<SingleTask
									key={task.id}
									text={task.text}
									deadline={task.deadline}
									done={task.done}
									id={task.id}
									currentTasks={currentTasks}
									setCurrentTasks={setCurrentTasks}
								/>
							))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default TaskTable;
