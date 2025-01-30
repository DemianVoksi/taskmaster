import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React from 'react';
import SingleTask from './singleTask';

export type Task = {
	text: string;
	author: string;
	done: boolean;
};

const TaskManager = () => {
	const mockTasks: Task[] = [
		{
			text: 'Go to store',
			author: 'demian.voksi@gmail.com',
			done: false,
		},
		{ text: 'Odi u ducan', author: 'demian.voksi@gmail.com', done: false },
		{ text: 'Kupi pigica', author: 'demian.voksi@gmail.com', done: false },
		{ text: 'Kupi misa', author: 'demian.voksi@gmail.com', done: false },
		{ text: 'Programiranje', author: 'demian.voksi@gmail.com', done: false },
		{
			text: 'Nesto jako dugo tako da se moze testirati kada je dugacki tekst zato jer moramo',
			author: 'demian.voksi@gmail.com',
			done: true,
		},
		{ text: 'Blablabla', author: 'demian.voksi@gmail.com', done: false },
		{ text: 'Kupi jezinu', author: 'demian.voksi@gmail.com', done: false },
		{ text: 'Nesto', author: 'demian.voksi@gmail.com', done: false },
		{ text: 'D&D', author: 'demian.voksi@gmail.com', done: false },
	];

	return (
		<div className='mt-[5%] w-[50%] sm:w-[90%] md:w-[75%]'>
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
							text={task.text}
							author={task.author}
							done={task.done}
						/>
					))}
				</TableBody>
			</Table>
		</div>
	);
};

export default TaskManager;
