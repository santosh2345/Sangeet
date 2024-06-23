import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const PlaylistsLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen name="index" options={{ headerTitle: 'Playlists' }} />
			</Stack>
		</View>
	)
}

export default PlaylistsLayout
