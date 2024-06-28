// App.tsx

import Ionicons from '@expo/vector-icons/Ionicons'
import { AVPlaybackStatus, Audio } from 'expo-av'
import * as MediaLibrary from 'expo-media-library'
import { StatusBar } from 'expo-status-bar'
import { memo, useCallback, useEffect, useState } from 'react'
import {
	FlatList,
	ListRenderItemInfo,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'

interface MusicFile {
	id: string
	uri: string
	filename: string
	duration: number
}

const MusicItem = memo(
	({
		item,
		isPlaying,
		onPress,
		progressDuration,
	}: {
		item: MusicFile
		isPlaying: boolean
		onPress: () => void
		progressDuration: number
	}) => {
		return (
			<TouchableOpacity onPress={onPress} style={styles.playButton}>
				<View
					style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
				>
					<Ionicons name={isPlaying ? 'pause' : 'play'} size={30} color="white" />
					<Text style={styles.fileName}>{item.filename}</Text>
				</View>
				{isPlaying && (
					<View style={styles.row}>
						<Text style={styles.fileName}>
							{progressDuration.toFixed(2)} / {item.duration}
						</Text>
					</View>
				)}
			</TouchableOpacity>
		)
	},
)

export default function App() {
	const [musicFiles, setMusicFiles] = useState<MusicFile[]>([])
	const [playing, setPlaying] = useState<number>(-1)
	const [sound, setSound] = useState<Audio.Sound | null>(null)
	const [progressDuration, setProgressDuration] = useState<number>(0)
	const [hasPermission, setHasPermission] = useState<boolean>(false)

	const fetchMusicFiles = async () => {
		if (!hasPermission) {
			return
		}

		const media = await MediaLibrary.getAssetsAsync({
			mediaType: MediaLibrary.MediaType.audio,
			first: 1000, // Adjust this as needed to fetch all audio files
		})

		setMusicFiles(media.assets as MusicFile[])
	}

	const playMusic = async (fileUri: string) => {
		if (sound) {
			await sound.unloadAsync()
		}

		const { sound: newSound } = await Audio.Sound.createAsync({ uri: fileUri })
		setSound(newSound)
		await newSound.playAsync()
	}

	const pauseMusic = async () => {
		if (sound) {
			await sound.pauseAsync()
		}
	}

	useEffect(() => {
		;(async () => {
			const permission = await MediaLibrary.requestPermissionsAsync()
			if (permission.status === 'granted') {
				setHasPermission(true)
				fetchMusicFiles()
			}
		})()
	}, [])

	useEffect(() => {
		if (!sound) return

		sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
			if (status.isLoaded) {
				if (status.didJustFinish) {
					setPlaying(-1)
					sound.unloadAsync()
					setSound(null)
				} else {
					setProgressDuration(status.positionMillis / 1000)
				}
			}
		})
	}, [sound])

	const renderItem = useCallback(
		({ item, index }: ListRenderItemInfo<MusicFile>) => {
			const isPlaying = playing === index
			const onPress = isPlaying
				? () => {
						pauseMusic()
						setPlaying(-1)
					}
				: () => {
						playMusic(item.uri)
						setPlaying(index)
					}

			return (
				<MusicItem
					item={item}
					isPlaying={isPlaying}
					onPress={onPress}
					progressDuration={progressDuration}
				/>
			)
		},
		[playing, progressDuration],
	)

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<FlatList
				data={musicFiles}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				onEndReachedThreshold={0.5}
				initialNumToRender={10}
				maxToRenderPerBatch={10}
				windowSize={21}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	container: {
		backgroundColor: '#fff',
		height: '100%',
		marginTop: 50,
	},
	heading: {
		color: 'green',
		fontSize: 30,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	fileName: {
		fontSize: 18,
		color: 'white',
		fontWeight: 'bold',
	},
	playButton: {
		backgroundColor: 'gray',
		borderRadius: 50,
		padding: 10,
		margin: 10,
	},
})
