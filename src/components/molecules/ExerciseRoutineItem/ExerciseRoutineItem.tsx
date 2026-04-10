import { View } from 'react-native';
import { Image, Text } from '@/components/atoms';
import { Exercise } from '@/infrastructure/interfaces';
import { useThumbnail } from '@/hooks';
import { RoutineFormData } from '@/modules/routine/validation/routineFormSchema';
import { Control, FieldErrors } from 'react-hook-form';
import { ExerciseRoutineInputSets } from '../ExerciseRoutineInputSets';

type ExerciseItemProps = {
	exercise: Exercise;
	index: number;
	control: Control<RoutineFormData>;
	errors: FieldErrors<RoutineFormData>;
};

export const ExerciseRoutineItem = ({
	exercise,
	index,
	control,
	errors
}: ExerciseItemProps) => {
	const thumbnail = useThumbnail(exercise.video);

	return (
		<View className="w-full gap-2">
			<View className="flex flex-row gap-2 items-center">
				<View className="w-[40px] h-[40px] rounded-full overflow-hidden">
					<Image url={thumbnail} />
				</View>
				<View className="flex-1 ml-2">
					<Text className="text-primary">{exercise.title}</Text>
					<Text className="text-white/40">{exercise.primaryMuscle.name}</Text>
				</View>
			</View>
			<ExerciseRoutineInputSets
				control={control}
				exerciseIndex={index}
				error={errors.exercises}
			/>
		</View>
	);
};
