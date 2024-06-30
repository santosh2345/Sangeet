// src/screens/SongsScreen.tsx
import { defaultStyles } from '@/styles'
import { MusicFile } from '@/types/MusicFile'
import { fetchMusicFiles } from '@/utils/FetchMusicFiles'
import * as MediaLibrary from 'expo-media-library'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

const SongsScreen: React.FC = () => {
	const [hasPermission, setHasPermission] = useState<boolean>(false)
	const [musicFiles, setMusicFiles] = useState<MusicFile[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [endCursor, setEndCursor] = useState<string | undefined>(undefined)
	const [hasNextPage, setHasNextPage] = useState<boolean>(true)

	const loadMusicFiles = useCallback(async () => {
		if (!hasPermission) return

		setIsLoading(true)
		try {
			const result = await fetchMusicFiles(endCursor)
			setMusicFiles((prevFiles) => [...prevFiles, ...result.musicFiles])
			setEndCursor(result.endCursor)
			setHasNextPage(result.hasNextPage)
		} catch (error) {
			console.error('Error fetching music files:', error)
		} finally {
			setIsLoading(false)
		}
	}, [hasPermission, endCursor])

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

	const handleLoadMore = () => {
		if (!isLoading && hasNextPage) {
			loadMusicFiles()
		}
	}

	if (!hasPermission) {
		return (
			<View style={defaultStyles.container}>
				<Text style={styles.fileName}>Permission not granted</Text>
			</View>
		)
	}

	return (
		<View style={defaultStyles.container}>
			<FlatList
				data={musicFiles}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				onEndReached={handleLoadMore}
				onEndReachedThreshold={0.1}
				ListFooterComponent={() =>
					isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null
				}
			/>
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
