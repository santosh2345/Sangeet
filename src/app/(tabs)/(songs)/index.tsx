// src/screens/SongsScreen.tsx
import { Tlist } from '@/components/Tlist'
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
				{/* <TracksListItem /> */}
				<Tlist />
				{/* <TracksList /> */}
			</Text>
		</View>
	)
}

export default SongsScreen
