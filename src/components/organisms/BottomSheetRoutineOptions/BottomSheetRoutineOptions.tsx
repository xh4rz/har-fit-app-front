import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '../BottomSheetModal';
import {
	CaretRightIcon,
	PencilSimpleIcon,
	TrashIcon
} from 'phosphor-react-native';
import { Text } from '@/components/atoms';
import { colors } from '@/constants/colors';

interface Props {
	show: boolean;
	setShow: (value: boolean) => void;
	onEditRoutine: () => void;
	onDeleteRoutine: () => void;
}

export const BottomSheetRoutineOptions = ({
	show,
	setShow,
	onEditRoutine,
	onDeleteRoutine
}: Props) => {
	const sections = [
		{
			title: 'Edit Routine',
			icon: <PencilSimpleIcon color="white" />,
			onPress: onEditRoutine
		},
		{
			title: 'Delete Routine',
			icon: <TrashIcon color={colors.error} />,
			onPress: onDeleteRoutine
		}
	];

	return (
		<BottomSheetModal title="Select Option" show={show} setShow={setShow}>
			<View className="m-6">
				{sections.map((i, index) => (
					<TouchableOpacity
						key={index}
						className="flex-row gap-6 p-4 items-center"
						activeOpacity={0.3}
						onPress={() => {
							i.onPress();
							setShow(false);
						}}
					>
						{i.icon}
						<Text
							className={`${index === 1 ? 'text-red-500' : 'text-white'} font-medium flex-1`}
						>
							{i.title}
						</Text>
						<CaretRightIcon
							size={14}
							color={index === 1 ? colors.error : 'white'}
						/>
					</TouchableOpacity>
				))}
			</View>
		</BottomSheetModal>
	);
};
