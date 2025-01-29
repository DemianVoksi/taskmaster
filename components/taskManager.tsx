import React from 'react';

const TaskManager = () => {
	type Task = {
		text: string;
		author: string;
		done: boolean;
	};

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
			done: false,
		},
		{ text: 'Blablabla', author: 'demian.voksi@gmail.com', done: false },
		{ text: 'Kupi jezinu', author: 'demian.voksi@gmail.com', done: false },
		{ text: 'Nesto', author: 'demian.voksi@gmail.com', done: false },
		{ text: 'D&D', author: 'demian.voksi@gmail.com', done: false },
	];

	return <div>Task Manager</div>;
};

export default TaskManager;
