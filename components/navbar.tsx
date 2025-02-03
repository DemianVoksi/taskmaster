'use client';

import { merriweather } from '@/app/layout';
import { Session } from 'next-auth';
import { signOut } from 'next-auth/react'; // Import from next-auth/react
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import SignIn from './sign-in';
import SignInClient from './sign-in-client';
import { Button } from './ui/button';
import { ModeToggle } from './ui/mode-toggle';

const Navbar = () => {
	const user = true;
	const router = useRouter();

	const handleSignOut = async () => {
		// await fetch('/api/auth/signout', { method: 'POST' }); // Call the API route
		await signOut({ callbackUrl: '/' }); // Redirect to home after signing out
		// router.refresh(); // Optional: Refresh the page to clear session state
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
				<Link href='/profile'>Profile</Link>
				<Link href='/'>Home</Link>
				<button
					onClick={handleSignOut}
					className='px-4 py-2 bg-red-500 text-white rounded'
				>
					Sign Out
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
