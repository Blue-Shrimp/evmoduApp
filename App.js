import React from 'react'
import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { default as TabNavigation } from '@screens/TabNavigation'

const App = () => {
  const Stack = createStackNavigator()

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TabNavigation"
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            presentation: 'fullScreenModal',
          }}>
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
