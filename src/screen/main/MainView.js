import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Utility } from '@common'

import { ChargeMapView, BottomSheetView } from '@screens/main/subviews'
import { states as mainStates, actions as mainActions } from '@screens/main/state'

const MainView = ({ navigation }) => {
  const dispatch = useDispatch()
  const { myLocation, markerDatas, loading } = useSelector(mainStates)

  useEffect(() => {
    if (Utility.isNil(myLocation)) {
      return
    }

    _fetchSearchLocation(myLocation.latitude, myLocation.longitude)
  }, [myLocation])

  const _fetchSearchLocation = async (latitude, longitude) => {
    dispatch(
      mainActions.fetchSearchLocation({
        params: {
          latitude: latitude,
          longitude: longitude,
          zoom: 10.0,
        },
      }),
    )
  }

  return (
    <View style={styles.container}>
      <ChargeMapView markerDatas={markerDatas} />
      <BottomSheetView />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default MainView
