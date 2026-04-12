import { Stack, useFocusEffect } from 'expo-router';
import { colors } from '@/constants/colors';
import { useThemeColors } from '@/hooks';
import { useRoutineStore } from '@/modules/routine/store/useRoutineStore';

export default function RoutineLayout() {
	const theme = useThemeColors();

	const clearRoutine = useRoutineStore((state) => state.clearRoutine);

	useFocusEffect(() => {
		return () => {
			clearRoutine();
		};
	});

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

			<Stack.Screen
				name="edit/[id]"
				options={{
					headerShown: true,
					title: 'Edit Routine'
				}}
			/>
		</Stack>
	);
}
