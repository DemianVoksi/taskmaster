'use client';

import { merriweather } from '@/app/layout';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';
import { ModeToggle } from './ui/mode-toggle';
const Navbar = () => {
	const user = true;
	const router = useRouter();
	const pathname = usePathname();

	const goToProfile = () => {
		router.push('/profile');
	};

	const goHome = () => {
		router.push('/');
	};

	return (
		<nav className='w-full h-14 flex flex-row justify-center items-center sticky top-0 z-50'>
			<div className='w-1/4 h-full flex flex-row justify-center items-center text-white'></div>
			<div
				className={`w-1/2 h-full flex flex-row justify-center items-center pl-5 text-black-700 font-merriweather font-normal text-[25px]`}
			>
				Taskmaster
			</div>
			<div className='w-1/4 h-full flex flex-row justify-end items-center pr-5'>
				<div className='pr-3'>
					<ModeToggle />
				</div>{' '}
				{user && pathname === '/' ? (
					<Button variant='black' onClick={goToProfile}>
						Profile
					</Button>
				) : (
					<Button variant='black' onClick={goHome}>
						Home
					</Button>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
