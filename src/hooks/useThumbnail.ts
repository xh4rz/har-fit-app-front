import { useState, useEffect } from 'react';
import * as VideoThumbnails from 'expo-video-thumbnails';

export const useThumbnail = (videoUrl: string) => {
	const [thumbnail, setThumbnail] = useState<string>('');

	useEffect(() => {
		let isMounted = true;

		const generate = async () => {
			if (!videoUrl) return;

			try {
				const { uri } = await VideoThumbnails.getThumbnailAsync(videoUrl);
				if (isMounted) setThumbnail(uri);
			} catch (e) {
				console.error('Error generating thumbnail:', e);
				// todo: hacer imagen feedback si no existe video
				if (isMounted) setThumbnail('');
			}
		};

		generate();

		return () => {
			isMounted = false;
		};
	}, [videoUrl]);

	return thumbnail;
};
