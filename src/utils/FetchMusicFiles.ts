// src/utils/fetchMusicFiles.ts
import { MusicFile } from '@/types/MusicFile'
import * as MediaLibrary from 'expo-media-library'

// Fetches all music files from the device
export const fetchMusicFiles = async (): Promise<{
	musicFiles: MusicFile[]
}> => {
	let allMusicFiles: MusicFile[] = []
	let hasNextPage = true
	let endCursor: string | undefined

	while (hasNextPage) {
		const media = await MediaLibrary.getAssetsAsync({
			mediaType: MediaLibrary.MediaType.audio,
			first: 1000, // You can adjust this number if needed
			after: endCursor,
		})

		allMusicFiles = [...allMusicFiles, ...(media.assets as MusicFile[])]
		hasNextPage = media.hasNextPage
		endCursor = media.endCursor
	}

	const sortedMusicFiles = allMusicFiles.sort((a, b) => a.filename.localeCompare(b.filename))

	return {
		musicFiles: sortedMusicFiles,
	}
}
