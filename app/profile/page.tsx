import Navbar from '@/components/navbar';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import React from 'react';

const Profile = () => {
	const mockProfile = {
		email: 'email@email.com',
		userName: 'Mr. Email Emailsson',
	};

	return (
		<div className='min-w-[100%] h-screen flex flex-col relative font-[family-name:var(--font-geist-sans)]'>
			<Navbar />
			<main className='flex flex-col h-[100%] w-[100%] items-center justify-center'>
				<Card className='h-[50%] w-[25%] md:w-[50%] sm:w-[75%] flex flex-col'>
					<CardHeader className='border border-red-700 w-full flex flex-row items-center justify-between'>
						<CardTitle className='flex flex-row items-center justify-center'>
							{mockProfile.userName}
						</CardTitle>
						<div className='border border-red-700 h-full'>Image div</div>
					</CardHeader>
					<CardContent className='mt-4'>
						<p>{mockProfile.email}</p>
					</CardContent>
				</Card>
			</main>
		</div>
	);
};

export default Profile;
