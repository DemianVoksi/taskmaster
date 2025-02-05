'use client';

import React, { useEffect } from 'react';
import NewTaskForm from './newTaskForm';
import TaskTable from './taskTable';

const TaskManager = () => {
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

	return (
		<div className='flex flex-col mt-[30px] w-[50%] sm:w-[90%] md:w-[75%] flex-grow h-full'>
			<NewTaskForm />
			<TaskTable />
		</div>
	);
};

export default TaskManager;
