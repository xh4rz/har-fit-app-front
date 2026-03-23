import { AppVersion, Text } from '@/components/atoms';
import { Separator } from '@/components/atoms/Separator/Separator';
import { AntDesign, Feather } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import {
	SectionList,
	SectionListData,
	TouchableOpacity,
	View
} from 'react-native';

const sections: SectionListData<{
	id: number;
	title: string;
	icon: React.ReactNode;
	href: Href;
	status: 'incoming' | 'active';
}>[] = [
	{
		title: 'Profile Info',
		data: [
			{
				id: 1,
				title: 'Profile',
				icon: <AntDesign name="user" size={20} color="white" />,
				href: '/',
				status: 'incoming'
			}
		]
	},
	{
		title: 'Appearance',
		data: [
			{
				id: 3,
				title: 'Theme',
				icon: <Feather name="moon" size={20} color="white" />,
				href: '/profile/settings/theme',
				status: 'active'
			}
		]
	},
	{
		title: 'Support',
		data: [
			{
				id: 4,
				title: 'Help',
				icon: <AntDesign name="question" size={20} color="white" />,
				href: '/',
				status: 'incoming'
			}
		]
	}
];

export default function SettingsScreen() {
	const router = useRouter();

	return (
		<View className="flex-1">
			<SectionList
				sections={sections}
				keyExtractor={(item, index) => item.id.toString() + index}
				renderItem={({ item }) => {
					const isDisabled = item.status === 'incoming';

					return (
						<TouchableOpacity
							className={`flex-row gap-6 p-4 items-center ${
								isDisabled ? 'bg-zinc-900 opacity-50' : 'bg-zinc-800'
							}`}
							activeOpacity={0.3}
							disabled={isDisabled}
							onPress={() => {
								if (!isDisabled) router.navigate(item.href);
							}}
						>
							{item.icon}

							<Text className="font-medium flex-1">{item.title}</Text>

							{isDisabled && (
								<View className="bg-secondary px-2 py-1 rounded-full mr-2">
									<Text className="text-xs font-bold">Incoming</Text>
								</View>
							)}

							<AntDesign name="right" size={14} color="white" />
						</TouchableOpacity>
					);
				}}
				renderSectionHeader={({ section: { title } }) => (
					<Text className="text-primary-theme opacity-50 my-2 mx-2">
						{title}
					</Text>
				)}
				ItemSeparatorComponent={() => <Separator />}
				ListFooterComponent={() => <AppVersion showBuild />}
			/>
		</View>
	);
}
