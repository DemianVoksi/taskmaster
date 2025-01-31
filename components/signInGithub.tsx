import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { FaGithub } from 'react-icons/fa';
import SignIn from './sign-in';

const SignInGithub = () => {
	return (
		<Card className='mx-auto w-[400px] sm:mt-[10%] md:sm:mt-[20%] xl:mt-[10%]'>
			<CardHeader className='space-y-1 flex flex-row justify-center items-center'>
				<CardTitle className='text-2xl font-bold'>
					Sign in with Github
				</CardTitle>
			</CardHeader>
			<CardContent className='w-full flex flex-row justify-center'>
				<SignIn />
			</CardContent>
		</Card>
	);
};

export default SignInGithub;
