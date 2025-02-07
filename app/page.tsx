import { auth } from '@/auth';
import Navbar from '@/components/navbar';
import SignInGithub from '@/components/signInGithub';
import TaskManager from '@/components/taskManager';

export default async function Home() {
	const session = await auth();
	return (
		<div className='min-w-[100%] h-screen flex flex-col relative font-[family-name:var(--font-geist-sans)]'>
			<Navbar />
			<main className='flex flex-col h-[100%] w-[100%] items-center'>
				{session?.user.id ? <TaskManager /> : <SignInGithub />}
			</main>
		</div>
	);
}
