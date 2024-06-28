// App.tsx

import Ionicons from '@expo/vector-icons/Ionicons'
import { AVPlaybackStatus, Audio } from 'expo-av'
import * as MediaLibrary from 'expo-media-library'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface MusicFile {
	uri: string
	filename: string
	duration: number
}

export default function AudioList() {
	const [musicFiles, setMusicFiles] = useState<MusicFile[]>([])
	const [playing, setPlaying] = useState<number>(-1)
	const [sound, setSound] = useState<Audio.Sound | null>(null)
	const [progressDuration, setProgressDuration] = useState<number>(0)

	const fetchMusicFiles = async () => {
		const permission = await MediaLibrary.requestPermissionsAsync()
		if (permission.status === 'granted') {
			const media = await MediaLibrary.getAssetsAsync({
				mediaType: MediaLibrary.MediaType.audio,
			})
			setMusicFiles(media.assets as MusicFile[])
		}
	}

	const playMusic = async (fileUri: string) => {
		const { sound } = await Audio.Sound.createAsync({ uri: fileUri })
		setSound(sound)
		await sound.playAsync()
	}

	const pauseMusic = async () => {
		if (sound) {
			await sound.pauseAsync()
		}
	}

	useEffect(() => {
		if (!sound) return

		sound.setOnPlaybackStatusUpdate(async (status: AVPlaybackStatus) => {
			if (status.isLoaded) {
				if (status.didJustFinish) {
					setPlaying(-1)
					await sound.unloadAsync()
					setSound(null)
				} else {
					setProgressDuration(status.positionMillis / 1000)
				}
			}
		})
	}, [sound])

	useEffect(() => {
		fetchMusicFiles()
	}, [])

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Text style={styles.heading}>Welcome to GeeksforGeeks</Text>
			<View style={styles.list}>
				{musicFiles.map((file, index) => (
					<View key={index}>
						<TouchableOpacity
							onPress={
								playing !== index
									? () => {
											playMusic(file.uri)
											setPlaying(index)
										}
									: () => {
											pauseMusic()
											setPlaying(-1)
										}
							}
							style={styles.playButton}
						>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<Ionicons name={playing !== index ? 'play' : 'pause'} size={30} color="white">
									<Text style={styles.fileName}>{file.filename}</Text>
								</Ionicons>
							</View>
							{/* progress duration if index == currentIndex */}
							<View style={styles.row}>
								{playing === index ? (
									<Text style={styles.fileName}>
										{progressDuration.toFixed(2)} / {file.duration}
									</Text>
								) : null}
							</View>
						</TouchableOpacity>
					</View>
				))}
			</View>
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
	list: {
		marginTop: 20,
		flex: 1,
		flexDirection: 'column',
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
