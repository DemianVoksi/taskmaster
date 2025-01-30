import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';

const LoginOrRegisterPrompt = () => {
	return (
		<Tabs
			defaultValue='login'
			className='w-[400px] mt-[40%] sm:mt-[10%] xl:mt-[10%]'
		>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger value='login'>Login</TabsTrigger>
				<TabsTrigger value='register'>Register</TabsTrigger>
			</TabsList>
			<TabsContent value='login'>
				<LoginForm />
			</TabsContent>
			<TabsContent value='register'>
				<RegisterForm />
			</TabsContent>
		</Tabs>
	);
};

export default LoginOrRegisterPrompt;
