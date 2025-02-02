'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function SignInClient({ signIn }: { signIn: () => void }) {
	const router = useRouter();

	return (
		<Button
			variant='black'
			onClick={() => {
				signIn();
				router.push('/');
			}}
		>
			Sign out
		</Button>
	);
}
