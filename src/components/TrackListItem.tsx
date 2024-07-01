import { Text, TouchableHighlight, View } from 'react-native'

export const TracksListItem = () => {
	return (
		<TouchableHighlight>
			<View>
				<Text
					style={{
						color: 'white',
					}}
				>
					Track
				</Text>
			</View>
		</TouchableHighlight>
	)
}
