import React from 'react';
import { View } from 'react-native';
import { Loading, Text } from '@/components/atoms';

export const LoadingView = ({ titleLoading }: { titleLoading: string }) => {
	return (
		<View className="flex-1 items-center justify-center">
			<Loading />
			<Text className="mt-4">Loading {`${titleLoading}`}...</Text>
		</View>
	);
};
