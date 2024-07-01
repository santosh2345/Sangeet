// src/screens/SongsScreen.tsx
import { defaultStyles } from '@/styles'
import { MusicFile } from '@/types/MusicFile'
import { fetchMusicFiles } from '@/utils/FetchMusicFiles'
import * as MediaLibrary from 'expo-media-library'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'

const SongsScreen: React.FC = () => {
	const [hasPermission, setHasPermission] = useState<boolean>(false)
	const [musicFiles, setMusicFiles] = useState<MusicFile[]>([])

	const loadMusicFiles = useCallback(async () => {
		if (!hasPermission) return

		try {
			const result = await fetchMusicFiles()
			setMusicFiles(result.musicFiles)
		} catch (error) {
			console.error('Error fetching music files:', error)
		} finally {
		}
	}, [hasPermission])

	useEffect(() => {
		;(async () => {
			const permission = await MediaLibrary.requestPermissionsAsync()
			setHasPermission(permission.status === 'granted')
		})()
	}, [])

	useEffect(() => {
		if (hasPermission) {
			loadMusicFiles()
		}
	}, [hasPermission, loadMusicFiles])

	const renderItem = ({ item }: { item: MusicFile }) => (
		<Text style={styles.fileName}>{item.filename}</Text>
	)

	const keyExtractor = (item: MusicFile) => item.id

	if (!hasPermission) {
		return (
			<View style={defaultStyles.container}>
				<Text style={styles.fileName}>Permission not granted</Text>
			</View>
		)
	}

	return (
		<View style={defaultStyles.container}>
			<FlatList data={musicFiles} renderItem={renderItem} keyExtractor={keyExtractor} />
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

export default SongsScreen
