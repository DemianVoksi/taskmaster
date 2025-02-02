'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function SignOutClient({ signOut }: { signOut: () => void }) {
	const router = useRouter();

	return (
		<Button
			variant='black'
			onClick={() => {
				signOut();
				router.push('/');
			}}
		>
			Sign out
		</Button>
	);
}
