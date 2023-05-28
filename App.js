import React, { Fragment } from 'react'
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'

import '@network/Fetch'

import { Provider } from 'react-redux'
import createStore from '@stores'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { default as TabNavigation } from '@screens/TabNavigation'

const App = () => {
  const Stack = createStackNavigator()

  const store = createStore()

  return (
    <Fragment>
      <StatusBar barStyle={Platform.select({ ios: 'dark-content', android: 'default' })} />
      <Provider store={store}>
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
      </Provider>
    </Fragment>
  )
}

export default App
