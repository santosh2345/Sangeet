import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { View } from 'react-native'

const ArtistsLayout = () => {
	return (
		<View style={defaultStyles.container}>
			<Stack>
				<Stack.Screen name="index" options={{ headerTitle: 'Artists' }} />
			</Stack>
		</View>
	)
}

export default ArtistsLayout
