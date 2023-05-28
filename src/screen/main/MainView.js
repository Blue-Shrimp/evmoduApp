import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import { states as mainStates, actions as mainActions } from '@screens/main/state'

const MypageScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const { myLocation, loading } = useSelector(mainStates)

  console.log(myLocation)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: myLocation?.latitude,
            longitude: myLocation?.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default MypageScreen
