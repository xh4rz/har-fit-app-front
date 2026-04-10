import { create } from 'zustand';
import { Exercise } from '@/infrastructure/interfaces';

export interface RoutineStoreState {
	title: string;
	exercises: Exercise[];
	isSelecting: boolean;
	selectedExercises: Exercise[];
	setIsSelecting: (value: boolean) => void;
	setTitle: (title: string) => void;
	setSelectedExercises: (exercises: Exercise[]) => void;
	toggleExercise: (exercise: Exercise) => void;
	clearSelected: () => void;
	addExercises: (exercises: Exercise[]) => void;
	removeExercise: (id: string) => void;
	clearRoutine: () => void;
	hasExercises: () => boolean;
}

export const useRoutineStore = create<RoutineStoreState>((set, get) => ({
	title: '',
	exercises: [],
	isSelecting: false,
	selectedExercises: [],

	setIsSelecting: (value) => set({ isSelecting: value }),

	setTitle: (title) => set({ title }),

	setSelectedExercises: (exercises) => set({ selectedExercises: exercises }),

	toggleExercise: (item) =>
		set((state) => {
			const exists = state.selectedExercises.some((e) => e.id === item.id);

			return {
				selectedExercises: exists
					? state.selectedExercises.filter((e) => e.id !== item.id)
					: [...state.selectedExercises, item]
			};
		}),

	clearSelected: () => set({ selectedExercises: [] }),

	addExercises: (newExercises) =>
		set(() => ({
			exercises: newExercises
		})),

	removeExercise: (id) =>
		set((state) => ({
			exercises: state.exercises.filter((e) => e.id !== id)
		})),

	clearRoutine: () =>
		set({
			title: '',
			isSelecting: false,
			exercises: [],
			selectedExercises: []
		}),

	hasExercises: () => get().exercises.length > 0
}));
