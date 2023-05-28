import React from 'react'
import { StyleSheet, Text, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { default as MainView } from '@screens/main/MainView'
import { default as ChargeView } from '@screens/charge/ChargeView'
import { default as PayView } from '@screens/pay/PayView'
import { default as MyCarView } from '@screens/mycar/MyCarView'
import { default as MyPageView } from '@screens/mypage/MyPageView'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  const tabLabel = (focused, color, route) => {
    return <Text style={{ color: focused ? 'skyblue' : color, fontSize: 11 }}>{route.name}</Text>
  }

  return (
    <Tab.Navigator
      initialRouteName="충전소찾기"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarLabel: ({ focused, color }) => {
          return tabLabel(focused, color, route)
        },
      })}>
      <Tab.Screen name="충전소찾기" component={MainView} />
      <Tab.Screen name="대리충전" component={ChargeView} />
      <Tab.Screen name="모두페이" component={PayView} />
      <Tab.Screen name="마이카" component={MyCarView} />
      <Tab.Screen name="마이페이지" component={MyPageView} />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabPlusIcon: { width: 38, height: 38 },
  tabIcon: { width: 28, height: 28 },
})

export default TabNavigation
