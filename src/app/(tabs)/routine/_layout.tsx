import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { useThemeColors } from '@/hooks';

export default function RoutineLayout() {
	const theme = useThemeColors();

	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: colors.primary },
				headerTintColor: colors.secondary,
				headerTitleAlign: 'center',
				headerTitleStyle: {
					color: 'white'
				},
				animation: 'slide_from_right',
				contentStyle: {
					backgroundColor: theme.background
				}
			}}
		>
			<Stack.Screen
				name="index"
				options={{ headerShown: true, title: 'Routine' }}
			/>

			<Stack.Screen
				name="create/index"
				options={{
					headerShown: true,
					title: 'Create Rutine'
				}}
			/>

			<Stack.Screen
				name="create/add-exercise/index"
				options={{
					headerShown: true,
					title: 'Select the exercise'
				}}
			/>
		</Stack>
	);
}
