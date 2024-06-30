// src/utils/fetchMusicFiles.ts
import { MusicFile } from '@/types/MusicFile'
import * as MediaLibrary from 'expo-media-library'

export const fetchMusicFiles = async (
	cursor: string | undefined = undefined,
	limit: number = 50,
): Promise<{ musicFiles: MusicFile[]; hasNextPage: boolean; endCursor: string | undefined }> => {
	const media = await MediaLibrary.getAssetsAsync({
		mediaType: MediaLibrary.MediaType.audio,
		first: limit,
		after: cursor,
	})

	const musicFiles = media.assets as MusicFile[]
	const sortedMusicFiles = musicFiles.sort((a, b) => a.filename.localeCompare(b.filename))

	return {
		musicFiles: sortedMusicFiles,
		hasNextPage: media.hasNextPage,
		endCursor: media.endCursor,
	}
}
