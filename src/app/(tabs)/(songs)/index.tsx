import fetchMusicFiles from '@/components/getSongs'
import { defaultStyles } from '@/styles'
import * as MediaLibrary from 'expo-media-library'
import { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

interface MusicFile {
	id: string
	uri: string
	filename: string
	duration: number
}

const SongsScreen = () => {
	const [hasPermission, setHasPermission] = useState<boolean>(false)
	const [musicFiles, setMusicFiles] = useState<MusicFile[]>([])

	useEffect(() => {
		;(async () => {
			const permission = await MediaLibrary.requestPermissionsAsync()
			if (permission.status === 'granted') {
				setHasPermission(true)
				const songs = await fetchMusicFiles(hasPermission)
				setMusicFiles(songs)
			}
		})()
	}, [hasPermission])
	return (
		<View style={defaultStyles.container}>
			{/* Render music files here */}
			<View style={{ marginTop: 100 }}>
				{musicFiles?.map((file) => (
					<Text style={styles.fileName} key={file.id}>
						{file.filename}
					</Text>
				))}
			</View>
		</View>
	)
}

export default SongsScreen

const styles = {
	fileName: {
		fontSize: 14,
		fontWeight: 'bold',
		color: 'white',
	},
}
