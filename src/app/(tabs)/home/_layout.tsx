import { Stack } from 'expo-router';
import { colors } from '@/constants/colors';
import { useThemeColors } from '@/hooks';

export default function HomeLayout() {
	const theme = useThemeColors();

	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerStyle: { backgroundColor: colors.primary },
				headerTintColor: colors.secondary,
				headerTitleAlign: 'center',
				animation: 'slide_from_right',
				contentStyle: {
					backgroundColor: theme.background
				}
			}}
		>
			<Stack.Screen
				name="index"
				options={{ headerShown: true, title: 'Home' }}
			/>
		</Stack>
	);
}
