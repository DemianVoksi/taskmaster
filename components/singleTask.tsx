import React from 'react';
import { Task } from './taskManager';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { TableCell, TableRow } from './ui/table';

const SingleTask = ({ text, author, done, id }: Task) => {
	return (
		<TableRow>
			<TableCell className='font-medium'>{text}</TableCell>
			<TableCell className='text-center'>{author}</TableCell>
			<TableCell className='text-center'>
				{' '}
				<Checkbox id='done' checked={done && true} />
			</TableCell>
			<TableCell className='text-right'>
				<Button variant='red'>Delete</Button>
			</TableCell>
		</TableRow>
	);
};
export default SingleTask;
