import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Utility, Favorites } from '@common'
import { Session } from '@network'

import { ChargeMapView, BottomSheetView } from '@screens/main/subviews'
import { states as mainStates, actions as mainActions } from '@screens/main/state'
import { states as authStates, actions as authActions } from '@screens/mypage/state'

const MainView = ({ navigation }) => {
  const dispatch = useDispatch()
  const { myLocation, markerDatas, loading } = useSelector(mainStates)
  const { done, error } = useSelector(authStates)

  useEffect(() => {
    _checkSession()
    _fetchFavorite()
  }, [])

  useEffect(() => {
    if (Utility.isNil(myLocation)) {
      return
    }

    _fetchSearchLocation(myLocation.latitude, myLocation.longitude)
  }, [myLocation])

  const _checkSession = async () => {
    if (await Session.isLogIned()) {
      await Session.refresh()
    }
  }

  const _fetchFavorite = async () => {
    dispatch(mainActions.setFavorites(await Favorites.favorites()))
  }

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
      <ChargeMapView navigation={navigation} markerDatas={markerDatas} />
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
