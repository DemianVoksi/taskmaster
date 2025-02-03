'use client';

import { merriweather } from '@/app/layout';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';
import { ModeToggle } from './ui/mode-toggle';

const Navbar = () => {
	const user = true;
	const router = useRouter();
	const { data: session, status } = useSession();

	const handleSignOut = async () => {
		await signOut({ callbackUrl: '/' });
	};

	if (status === 'loading') {
		return <p>Loading...</p>;
	}

	return (
		<nav className='w-full h-14 flex flex-row justify-center items-center sticky top-0 z-50'>
			<div className='w-1/4 h-full flex flex-row justify-center items-center text-black'>
				{status === 'authenticated' ? (
					<p>logged in as {session.user.email}</p>
				) : (
					<p>logged out </p>
				)}
			</div>
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
				{}
				<Button
					onClick={handleSignOut}
					className='px-4 py-2 bg-red-500 text-white rounded'
				>
					Sign Out
				</Button>
			</div>
		</nav>
	);
};

export default Navbar;
