import { Button } from '@/components/atoms';
import { router } from 'expo-router';
import { Text, View } from 'react-native';

export default function WelcomeScreen() {
	return (
		<View className="flex-1 justify-center items-center px-5">
			<Text className="text-3xl mb-2.5 text-center font-medium text-primary-theme">
				Welcome to
			</Text>

			<Text className="text-4xl mb-12 text-center font-bold text-primary">
				HarFit<Text className="text-secondary">App</Text>
			</Text>

			<Text className="text-base text-center mb-10 leading-6 text-primary-theme">
				Your workouts, your progress, your best self.
			</Text>

			<View className="w-full gap-4">
				<Button
					title="Login"
					variant="secondary"
					className="p-4"
					textClassName="font-semibold"
					onPress={() => router.push('/auth/login')}
				/>

				<Button
					title="Create Account"
					variant="outline"
					className="p-4"
					textClassName="font-semibold"
					onPress={() => router.push('/auth/signup')}
				/>
			</View>
		</View>
	);
}
