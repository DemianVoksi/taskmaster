'use client';

import { merriweather } from '@/app/layout';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
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
			<div className='w-1/4 h-full flex flex-row justify-center items-center text-black'></div>
			<div
				className={`w-1/2 h-full flex flex-row justify-center items-center pl-5 text-black-700 font-merriweather font-normal text-[25px]`}
			>
				Taskmaster
			</div>
			<div className='w-1/4 h-full flex flex-row justify-end items-center pr-5'>
				<div className='pr-3'>
					<ModeToggle />
				</div>{' '}
				{status === 'authenticated' && (
					<div>
						<DropdownMenu>
							<DropdownMenuTrigger className='bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-50 hover:text-zinc-900 hover:border-2 hover:border-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:border-2 dark:hover:border-zinc-50 dark:hover:text-zinc-50 flex justify-center items-center px-3 py-2 rounded-md'>
								{session?.user.name}
							</DropdownMenuTrigger>
							<DropdownMenuContent className='flex flex-col'>
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<Link
									href='/profile'
									className='bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-50 hover:text-zinc-900 hover:border-2 hover:border-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:border-2 dark:hover:border-zinc-50 dark:hover:text-zinc-50 flex justify-center items-center px-3 py-2 rounded-md mb-2'
								>
									Profile
								</Link>
								<Link
									href='/'
									className='bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-50 hover:text-zinc-900 hover:border-2 hover:border-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:border-2 dark:hover:border-zinc-50 dark:hover:text-zinc-50 flex justify-center items-center px-3 py-2 rounded-md mb-2'
								>
									Home
								</Link>
								<Button onClick={handleSignOut} variant='red'>
									Sign Out
								</Button>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				)}
				{/* <Link href='/profile'>Profile</Link>
				<Link href='/'>Home</Link>
				{}
				<Button
					onClick={handleSignOut}
					className='px-4 py-2 bg-red-500 text-white rounded'
				>
					Sign Out
				</Button> */}
			</div>
		</nav>
	);
};

export default Navbar;
