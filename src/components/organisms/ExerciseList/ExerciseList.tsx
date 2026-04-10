import { FlatList, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Exercise } from '@/infrastructure/interfaces';
import { Button, Separator, Text } from '@/components/atoms';
import { ExerciseItem } from '@/components/molecules';
import { useRoutineStore } from '@/modules/routine/store/useRoutineStore';

type ExerciseListProps = {
	data: Exercise[] | undefined;
	onPress: (id: string, title: string) => void;
	selectable?: boolean;
};

export const ExerciseList = ({
	data,
	onPress,
	selectable = false
}: ExerciseListProps) => {
	const router = useRouter();
	const addExercises = useRoutineStore((state) => state.addExercises);
	const selectedExercises = useRoutineStore((state) => state.selectedExercises);
	const toggleExercise = useRoutineStore((state) => state.toggleExercise);

	const handlePress = (item: Exercise) => {
		if (selectable) {
			toggleExercise(item);
		} else {
			onPress(item.id, item.title);
		}
	};

	return (
		<View>
			<FlatList
				className="h-[90%]"
				data={data}
				renderItem={({ item }) => (
					<ExerciseItem
						exercise={item}
						isSelected={selectedExercises.some((e) => e.id === item.id)}
						onPress={() => handlePress(item)}
					/>
				)}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={Separator}
				ListEmptyComponent={
					<View className="flex-1 items-center justify-center">
						<Text className="text-center">No exercises available</Text>
					</View>
				}
				contentContainerStyle={{
					flexGrow: 1,
					flex: 1,
					height: 200,
					paddingBottom: 80
				}}
			/>

			{selectable && selectedExercises.length > 0 && (
				<View className="absolute bottom-4 left-0 right-0">
					<Button
						title={`Add Exercises (${selectedExercises.length})`}
						onPress={() => {
							addExercises(selectedExercises);

							router.dismiss();
						}}
					/>
				</View>
			)}
		</View>
	);
};
