import { MusicFile } from '@/types/MusicFile'
import RNMusicFiles from 'react-native-get-music-files'

// Fetches all music files from the device
export const fetchMusicFiles = async () => {
	let allMusicFiles: MusicFile[] = []

	const media = await RNMusicFiles.getAll({
		duration: true,
		cover: true,
		genre: true,
		title: true,
		batchNumber: 5, // Number of songs per batch
		minimumSongDuration: 10000, // Get only songs with a minimum duration (in milliseconds)
	})

	console.log('media is : ', media)

	allMusicFiles = [...allMusicFiles, ...(media as unknown as MusicFile[])]

	const sortedMusicFiles = allMusicFiles.sort((a, b) => a.title.localeCompare(b.title))

	return {
		musicFiles: sortedMusicFiles,
	}
}

// // src/utils/fetchMusicFiles.ts
// import { MusicFile } from '@/types/MusicFile'
// import * as MediaLibrary from 'expo-media-library'

// // Fetches all music files from the device
// export const fetchMusicFiles = async () => {
// 	let allMusicFiles: MusicFile[] = []
// 	let endCursor: string | undefined

// 	const media = await MediaLibrary.getAssetsAsync({
// 		mediaType: MediaLibrary.MediaType.audio,
// 		first: 20, // You can adjust this number if needed
// 		after: endCursor,
// 	})
// 	console.log('media is : ', media)

// 	allMusicFiles = [...allMusicFiles, ...(media.assets as MusicFile[])]
// 	endCursor = media.endCursor

// 	const sortedMusicFiles = allMusicFiles.sort((a, b) => a.filename.localeCompare(b.filename))

// 	return {
// 		musicFiles: sortedMusicFiles,
// 	}
// }
