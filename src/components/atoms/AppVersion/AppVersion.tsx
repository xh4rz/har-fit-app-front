import { Text } from 'react-native';
import Constants from 'expo-constants';
import * as Application from 'expo-application';

type AppVersionProps = {
	showBuild?: boolean;
	className?: string;
};

export const AppVersion = ({
	showBuild = false,
	className
}: AppVersionProps) => {
	const version = Constants.expoConfig?.version;

	const build = Application.nativeBuildVersion;

	console.log({ build });

	return (
		<Text className={`text-primary-theme text-center ${className}`}>
			v{version}
			{showBuild && build ? ` (${build})` : ''}
		</Text>
	);
};
