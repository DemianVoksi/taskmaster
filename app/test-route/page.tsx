'use client';

import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const Test = () => {
	const [date, setDate] = useState<Date>();

	// function generateCurrentDate(date: Date) {
	// 	const currentDate = date;
	// 	const currentYear = currentDate.getFullYear();
	// 	const currentMonth = currentDate.getMonth();
	// 	const currentDay = currentDate.getDate();
	// 	const currentHour = currentDate.getHours();
	// 	const currentMinute = currentDate.getMinutes();
	// 	const currentSecond = currentDate.getSeconds();
	// 	const finalDate = `${currentDay}.${currentMonth}.${currentYear}, ${currentHour}:${currentMinute}:${currentSecond}`;
	// 	return finalDate;
	// }

	return (
		<div className='min-w-[100%] h-screen flex flex-col items-center justify-center relative font-[family-name:var(--font-geist-sans)]'>
			<div>
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant={'outline'}
							className={cn(
								'w-[240px] justify-start text-left font-normal',
								!date && 'text-muted-foreground'
							)}
						>
							<CalendarIcon />
							{date ? format(date, 'PPP') : <span>Set deadline</span>}
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-auto p-0' align='start'>
						<Calendar
							mode='single'
							selected={date}
							onSelect={setDate}
							initialFocus
						/>
					</PopoverContent>
				</Popover>
			</div>
			{/* <div className='mt-[500px]'>{generateCurrentDate(date!)}</div> */}
		</div>
	);
};

export default Test;
