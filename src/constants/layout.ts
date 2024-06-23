import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import { colors } from './tokens'

export const StackScreenWithSearchBar: NativeStackNavigationOptions = {
	headerLargeTitle: true,
	headerLargeStyle: {
		backgroundColor: colors.background,
	},
	headerLargeTitleStyle: {
		color: colors.text,
	},
	headerTintColor: colors.text,
	headerTransparent: true,
	headerBlurEffect: 'prominent',
	headerShadowVisible: false,
}
export const StackScreenWithoutSearchBar: NativeStackNavigationOptions = {
	headerTitle: '',
	headerTransparent: true,
	headerBackground: () => null,
	headerBackTitleVisible: false,
	headerBackTitle: 'Back',
	headerBackTitleStyle: { color: 'white' },
	headerTintColor: 'white',
	headerTitleStyle: { color: 'white' },
	headerStyle: {
		backgroundColor: 'transparent',
	},
}
