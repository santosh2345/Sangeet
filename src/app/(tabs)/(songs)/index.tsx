// src/screens/SongsScreen.tsx
import { TracksListItem } from '@/components/TrackListItem'
import { defaultStyles } from '@/styles'
import React from 'react'
import { Text, View } from 'react-native'

const SongsScreen = () => {
	return (
		<View style={defaultStyles.container}>
			<Text
				style={{
					color: 'white',
					marginTop: 100,
				}}
			>
				Songs
				<TracksListItem />
				<Tli
				{/* <TracksList /> */}
			</Text>
		</View>
	)
}

export default SongsScreen
