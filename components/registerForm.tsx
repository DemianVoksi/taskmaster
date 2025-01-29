import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RegisterForm = () => {
	return (
		<Card className='mx-auto max-w-sm h-[430px]'>
			<CardHeader>
				<CardTitle className='text-2xl'>Register</CardTitle>
				<CardDescription>
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-4'>
				<div className='space-y-2'>
					<Label htmlFor='email'>Email</Label>
					<Input
						id='email'
						type='email'
						placeholder='me@example.com'
						required
					/>
				</div>
				<div className='space-y-2'>
					<Label htmlFor='password'>Password</Label>
					<Input id='password' type='password' required />
				</div>
				<div className='space-y-2'>
					<Label htmlFor='confirm-password'>Confirm Password</Label>
					<Input id='confirm-password' type='password' required />
				</div>
				<Button className='w-full'>Register</Button>
			</CardContent>
		</Card>
	);
};

export default RegisterForm;
