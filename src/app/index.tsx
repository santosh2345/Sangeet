import { defaultStyles } from '@/styles'
import { Text, View } from 'react-native'

export default function MusicScreen() {
	return (
		<View style={defaultStyles.container}>
			<Text
				style={{
					fontSize: 20,
					fontWeight: 'bold',
					color: 'white',
					marginTop: 20,
				}}
			>
				Music Screen
			</Text>
			<Text
				style={{
					fontSize: 20,
					fontWeight: 'bold',
					color: 'white',
					marginTop: 20,
				}}
			>
				Music Screen
			</Text>

			{/* ... other Text components ... */}
		</View>
	)
}
