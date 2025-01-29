import LoginOrRegisterPrompt from '@/components/loginOrRegisterPrompt';
import Navbar from '@/components/navbar';
import TaskManager from '@/components/taskManager';

export default function Home() {
	const user = false;

	return (
		<div className='min-w-[100%] h-screen flex flex-col relative font-[family-name:var(--font-geist-sans)]'>
			<Navbar />
			<main className='flex flex-col h-[100%] w-[100%] justify-center items-center'>
				{user ? <TaskManager /> : <LoginOrRegisterPrompt />}
			</main>
		</div>
	);
}
