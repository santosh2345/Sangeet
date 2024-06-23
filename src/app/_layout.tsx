import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
	return (
		<SafeAreaProvider>
			<RootNavigation />

			<StatusBar style="auto" />
		</SafeAreaProvider>
	)
}

const RootNavigation = () => {}

export default App
