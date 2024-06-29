import * as MediaLibrary from 'expo-media-library'

interface MusicFile {
	id: string
	uri: string
	filename: string
	duration: number
}

const fetchMusicFiles = async (hasPermission: boolean) => {
	if (!hasPermission) {
		console.log('first grant the permission')
		return
	}

	const media = await MediaLibrary.getAssetsAsync({
		mediaType: MediaLibrary.MediaType.audio,
		first: 10, // Adjust this as needed to fetch all audio files
	})

	// Sort music files alphabetically by filename
	const sortedMusicFiles = (media.assets as MusicFile[]).sort((a, b) =>
		a.filename.localeCompare(b.filename),
	)

	console.log('this is called')

	return sortedMusicFiles

	// setMusicFiles(sortedMusicFiles)
}

export default fetchMusicFiles
