import { defaultStyles } from '@/styles'
import { useEffect, useState } from 'react'
import { FlatList, PermissionsAndroid, Text, View } from 'react-native'
import RNFS from 'react-native-fs'

interface Track {
	id: string
	name: string

	path: string
}

export const Tlist = () => {
	const [songs, setSongs] = useState<{ id: string; name: string; path: string }[]>([])
	const requestExternalStoragePermission = async () => {
		const readPermission = PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO
		const hasPermission = await PermissionsAndroid.check(readPermission)
		if (hasPermission) {
			console.log('Permission Granted')
			return true
		} else {
			try {
				const status = await PermissionsAndroid.request(readPermission)
				if (status === PermissionsAndroid.RESULTS.GRANTED) {
					console.log('Permission Granted')
					return true
				} else {
					console.log('Permission Denied')
					return false
				}
			} catch (error) {
				console.error('Permission Request Error: ', error)
				return false
			}
		}
	}

	const handleReadDir = async (path: string) => {
		if (await requestExternalStoragePermission()) {
			try {
				const result = await RNFS.readDir(path)
				const audioFiles = result.filter(
					(file) =>
						file.isFile() &&
						(file.name.endsWith('.mp3') ||
							file.name.endsWith('.wav') ||
							file.name.endsWith('.flac') ||
							file.name.endsWith('.m4a')),
				)

				const directories = result.filter((file) => file.isDirectory())

				await Promise.all(
					directories.map(async (directory) => {
						await handleReadDir(directory.path)
					}),
				)

				setSongs((prevState) => [
					...prevState,
					...audioFiles.map((file) => ({
						id: file.path,
						name: file.name,
						path: file.path,
					})),
				])
			} catch (error) {
				console.error('Directory Read Error: ', error)
			}
		}
	}

	useEffect(() => {
		handleReadDir(RNFS.ExternalStorageDirectoryPath)
	}, [])

	const keyExtractor = (item: Track) => item.id

	const renderItem = ({ item }: { item: Track }) => <Text style={styles.fileName}>{item.name}</Text>

	return (
		<View style={defaultStyles.container}>
			<FlatList data={songs} renderItem={renderItem} keyExtractor={keyExtractor} />
		</View>
	)
}

const styles = {
	fileName: {
		fontSize: 14,
		fontWeight: 'bold' as const,
		marginTop: 10,
		color: 'white',
	},
}
