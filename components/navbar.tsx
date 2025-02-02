import { merriweather } from '@/app/layout';
import { auth } from '@/auth';
import { Session } from 'next-auth';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import SignIn from './sign-in';
import SignInClient from './sign-in-client';
import { Button } from './ui/button';
import { ModeToggle } from './ui/mode-toggle';

const Navbar = () => {
	const user = true;

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
				<Link href='/profile'>Profile</Link>
				<Link href='/'>Home</Link>
			</div>
		</nav>
	);
};

export default Navbar;
