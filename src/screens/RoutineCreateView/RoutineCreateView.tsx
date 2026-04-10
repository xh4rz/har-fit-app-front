import React, { useEffect, useLayoutEffect } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import { View } from 'react-native';
import { BarbellIcon, PlusIcon } from 'phosphor-react-native';
import { Button, Input, Text } from '@/components/atoms';
import { useRoutineStore } from '@/modules/routine/store/useRoutineStore';
import { ExerciseRoutineItem } from '@/components/molecules';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	RoutineFormData,
	routineFormSchema
} from '@/modules/routine/validation/routineFormSchema';

export const RoutineCreateView = () => {
	const router = useRouter();

	const navigation = useNavigation();

	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		setValue,
		watch,
		formState: { errors }
	} = useForm<RoutineFormData>({
		resolver: zodResolver(routineFormSchema),
		mode: 'onChange',
		defaultValues: {
			title: '',
			exercises: []
		}
	});

	const title = useRoutineStore((state) => state.title);
	const setTitle = useRoutineStore((state) => state.setTitle);
	const hasExercises = useRoutineStore((state) => state.hasExercises);
	const exercises = useRoutineStore((state) => state.exercises);
	const setIsSelecting = useRoutineStore((state) => state.setIsSelecting);
	const clearRoutine = useRoutineStore((state) => state.clearRoutine);

	const { fields, replace } = useFieldArray({
		control,
		name: 'exercises'
	});

	useEffect(() => {
		if (exercises.length === 0) return;

		const mapped = exercises.map((exercise) => ({
			exerciseId: exercise.id,
			sets: []
		}));

		replace(mapped);
	}, [exercises]);

	const onSaveRoutine = async (data: RoutineFormData) => {
		console.log({ data });
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Button
					// title={mode === 'create' ? 'Save' : 'Update'}
					title="Save"
					variant="secondary"
					fullWidth={false}
					disabled={!hasExercises()}
					textClassName="text-secondary font-bold"
					onPress={handleSubmit(onSaveRoutine)}
					// loading={loading}
				/>
			)
		});
	}, []);

	useEffect(() => {
		return () => {
			clearRoutine();
		};
	}, []);

	return (
		<View className="flex-1 items-center p-5 gap-4">
			<Input
				required
				autoCapitalize="words"
				control={control}
				name="title"
				placeholder="Enter Routine Title *"
				error={errors.title}
				variant="line"
			/>

			{!hasExercises() && (
				<View className="justify-center items-center gap-4">
					<BarbellIcon size={32} color="white" />
					<Text>Get started by adding an exercise to your routine.</Text>
				</View>
			)}

			{fields.map((field, index) => {
				const exercise = exercises.find((ex) => ex.id === field.exerciseId);

				if (!exercise) return null;

				return (
					<ExerciseRoutineItem
						key={field.id}
						exercise={exercise}
						index={index}
						control={control}
						errors={errors}
					/>
				);
			})}

			<Button
				title="Add Exercise"
				variant="secondary"
				onPress={() => {
					setIsSelecting(true);
					router.push('/routine/create/add-exercise');
				}}
				iconLeft={<PlusIcon />}
			/>
		</View>
	);
};
