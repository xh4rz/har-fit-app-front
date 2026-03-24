import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { ThemeContext } from '@/context';

interface LoadingProps {
	size?: number | 'large' | 'small';
}

export const Loading = ({ size = 'large' }: LoadingProps) => {
	const { theme } = useContext(ThemeContext);

	return (
		<ActivityIndicator
			size={size}
			color={theme === 'dark' ? 'white' : 'black'}
		/>
	);
};
