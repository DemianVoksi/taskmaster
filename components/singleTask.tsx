import React from 'react';
import { Task } from './taskManager';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { TableCell, TableRow } from './ui/table';

const SingleTask = ({ text, author, done, id }: Task) => {
	return (
		<TableRow>
			<TableCell className='font-medium w-[60%]'>{text}</TableCell>
			<TableCell className='text-center w-[20%]'>{author}</TableCell>
			<TableCell className='text-center w-[10%]'>
				{' '}
				<Checkbox id='done' checked={done && true} />
			</TableCell>
			<TableCell className='text-center w-[10%]'>
				<Button variant='red'>Delete</Button>
			</TableCell>
		</TableRow>
	);
};
export default SingleTask;
