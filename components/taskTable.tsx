import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import React, { useEffect } from 'react';
import SingleTask from './singleTask';

const TaskTable = () => {
	useEffect(() => {
		const table = document.querySelector('.chrome-specific');
		if (
			navigator.userAgent.includes('Chrome') &&
			!navigator.userAgent.includes('Edge')
		) {
			table?.classList.add('chrome-only');
		}
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
						{/* fetch tasks, map them into <SingleTask/> */}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default TaskTable;
