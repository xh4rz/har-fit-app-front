import { Separator } from '@/components/atoms/Separator/Separator';
import { ThemeContext, ThemeName } from '@/context';
import { Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const themeOptions: { value: ThemeName; label: string; icon: string }[] = [
	{ value: 'system', label: 'System', icon: 'smartphone' },
	{ value: 'light', label: 'Light', icon: 'sun' },
	{ value: 'dark', label: 'Dark', icon: 'moon' }
];

export default function ThemeScreen() {
	const { selectedTheme, setTheme } = useContext(ThemeContext);

	return (
		<View className="flex-1">
			<Text className="text-primary-theme opacity-50 my-2 mx-2 font-semibold">
				Select theme:
			</Text>
			{themeOptions.map((option, index) => (
				<View key={option.value}>
					<TouchableOpacity
						onPress={() => setTheme(option.value)}
						className={`flex-row items-center p-4 ${
							selectedTheme === option.value ? 'bg-purple-600' : 'bg-zinc-800'
						}`}
					>
						<Feather name={option.icon as any} size={24} color="white" />
						<Text className="text-white ml-4 flex-1">{option.label}</Text>
						{selectedTheme === option.value && (
							<Feather name="check" size={24} color="white" />
						)}
					</TouchableOpacity>

					{index !== themeOptions.length - 1 && <Separator />}
				</View>
			))}
		</View>
	);
}
