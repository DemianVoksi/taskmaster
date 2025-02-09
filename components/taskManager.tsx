import { HelperProps, TriggerProps } from '@/types/types';
import React, { useEffect } from 'react';
import NewTaskForm from './newTaskForm';
import TaskTable from './taskTable';

const TaskManager = () => {
	return (
		<div className='flex flex-col mt-[30px] w-[50%] sm:w-[90%] md:w-[75%] flex-grow h-full'>
			<NewTaskForm />
			<TaskTable />
		</div>
	);
};

export default TaskManager;
