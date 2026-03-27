import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { loginFormSchema } from '@/modules/auth/validation/loginFormSchema';
import { useAuthStore } from '@/modules/auth/store/useAuthStore';
import { Button, Input, Text } from '@/components/atoms';
import { SignInIcon } from 'phosphor-react-native';
import { ApiError } from '@/infrastructure/interfaces';
import { setFormError } from '@/utils';

type LoginFormData = z.infer<typeof loginFormSchema>;

export const LoginView = () => {
	const { login } = useAuthStore();

	const [loading, setLoading] = useState(false);

	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		watch,
		formState: { errors }
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginFormSchema),
		mode: 'onChange',
		defaultValues: {
			email: '',
			password: ''
		}
	});

	const onLogin = async (data: LoginFormData) => {
		setLoading(true);

		try {
			await login(data.email, data.password);
		} catch (error) {
			const errorObj = error as ApiError;

			if (errorObj.statusCode === 401) {
				setError('root', {
					type: 'custom',
					message: 'Invalid credentials'
				});

				return;
			}

			setFormError(setError, error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const subscription = watch(() => {
			if (errors.root) {
				clearErrors('root');
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, errors.root, clearErrors]);

	return (
		<View className="flex-1 justify-center m-6">
			<Text className="text-4xl mb-12 text-center font-bold text-primary">
				HarFit
				<Text className="text-secondary">App</Text>
			</Text>

			<Input
				autoFocus
				required
				autoCapitalize="none"
				keyboardType="email-address"
				control={control}
				name="email"
				label="Email"
				placeholder="Enter your email"
				error={errors.email}
				disabled={loading}
			/>

			<Input
				required
				control={control}
				autoCapitalize="none"
				name="password"
				label="Password"
				placeholder="Enter your password"
				error={errors.password}
				isPassword={true}
				disabled={loading}
			/>

			{errors.root && (
				<Text className="text-red-500 mb-4">{errors.root.message}</Text>
			)}

			<TouchableOpacity className="items-end">
				<Text className="text-sm text-center text-primary">
					Forgot your Password?
				</Text>
			</TouchableOpacity>

			<Button
				title="Login"
				variant="secondary"
				onPress={handleSubmit(onLogin)}
				iconLeft={<SignInIcon />}
				className="mt-5"
				loading={loading}
			/>

			<Text className="mt-5 text-center">
				Don&apos;t have an account?{' '}
				<Link href="/auth/signup" className="font-bold text-secondary">
					Sign Up
				</Link>
			</Text>
		</View>
	);
};
