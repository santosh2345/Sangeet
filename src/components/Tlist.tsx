import { defaultStyles } from '@/styles'
import { useCallback, useEffect, useState } from 'react'
import { FlatList, PermissionsAndroid, StyleSheet, Text, View } from 'react-native'
import RNFS from 'react-native-fs'

interface Track {
	id: string
	name: string
	path: string
}

const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.flac', '.m4a']

export const Tlist = () => {
	const [songs, setSongs] = useState<Track[]>([])

	const requestExternalStoragePermission = useCallback(async () => {
		const readPermission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO
		try {
			const status = await PermissionsAndroid.request(readPermission)
			return status === PermissionsAndroid.RESULTS.GRANTED
		} catch (error) {
			console.error('Permission Request Error:', error)
			return false
		}
	}, [])

	const handleReadDir = useCallback(
		async (path: string) => {
			if (!(await requestExternalStoragePermission())) return

			try {
				const result = await RNFS.readDir(path)
				const audioFiles = result.filter(
					(file) => file.isFile() && AUDIO_EXTENSIONS.some((ext) => file.name.endsWith(ext)),
				)

				const newSongs = audioFiles.map((file) => ({
					id: file.path,
					name: file.name,
					path: file.path,
				}))

				setSongs((prevSongs) => [...prevSongs, ...newSongs])

				const directories = result.filter((file) => file.isDirectory())
				await Promise.all(directories.map((directory) => handleReadDir(directory.path)))
			} catch (error) {
				console.error('Directory Read Error:', error)
			}
		},
		[requestExternalStoragePermission],
	)

	useEffect(() => {
		handleReadDir(RNFS.ExternalStorageDirectoryPath)
	}, [handleReadDir])

	const renderItem = useCallback(
		({ item }: { item: Track }) => <Text style={styles.fileName}>{item.name}</Text>,

		[],
	)

	return (
		<View style={defaultStyles.container}>
			<FlatList data={songs} renderItem={renderItem} keyExtractor={(item) => item.id} />
		</View>
	)
}

const styles = StyleSheet.create({
	fileName: {
		fontSize: 14,
		fontWeight: 'bold',
		marginTop: 10,
		color: 'white',
	},
})