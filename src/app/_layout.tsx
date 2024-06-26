import { SafeAreaProvider } from 'react-native-safe-area-context'
import MusicScreen from '.'

const App = () => {
	return (
		<SafeAreaProvider>
			<RootNavigation />

			<MusicScreen />

			{/* <StatusBar style="auto" /> */}
		</SafeAreaProvider>
	)
}

// const RootNavigation = () => {
// 	return (
// 		<Stack>
// 			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
// 		</Stack>
// 	)
// }

export default App
