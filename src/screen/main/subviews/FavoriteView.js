import React, { useEffect, useState } from 'react'
import { StyleSheet, View, TouchableOpacity, Text, FlatList, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { SafeBaseView } from '@components'
import { Favorites } from '@common'

import { states as mainStates, actions as mainActions } from '@screens/main/state'

const FavoriteView = ({ navigation }) => {
  const dispatch = useDispatch()
  const { myLocation, favorites, loading } = useSelector(mainStates)

  const _goDetail = item => {
    const current = {
      toInitialRegion: !myLocation.toInitialRegion,
      latitude: item.location.latitude,
      longitude: item.location.longitude,
      latitudeDelta: myLocation.latitudeDelta,
      longitudeDelta: myLocation.longitudeDelta,
    }
    dispatch(mainActions.setDetailClick({ isClick: true, id: item.id }))
    dispatch(mainActions.setMyLocation(current))
    navigation.pop()
  }

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.listItemConatiner} onPress={() => _goDetail(item)}>
        <View style={styles.headerContainer}>
          <View style={styles.headerView}>
            <Text style={styles.blackText}>{item.operator.name} </Text>
            <Text style={styles.blackText}>{item.is_available_moducard ? '모두페이' : ''}</Text>
          </View>
          <TouchableOpacity
            onPress={async () => {
              await Favorites.delete({ id: item.id })
              dispatch(mainActions.setFavorites(await Favorites.favorites()))
            }}>
            <Image style={styles.startImg} source={require('@images/star.png')} />
          </TouchableOpacity>
        </View>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.addressText}>{item.address}</Text>
        <View style={styles.parkingView}>
          <Text style={{ ...styles.parkingText, marginRight: 5 }}>{item.parking_fee > 0 ? '유료주차' : '무료주차'}</Text>
          <Text style={styles.parkingText}>{item.is_open_space ? '완전개방' : '부분개방'}</Text>
        </View>
        <View style={styles.chargersView}>
          <Text style={styles.blackText}>급속 </Text>
          <Text style={item.count_fast_chargers > 0 ? styles.dodgerblueText : styles.grayText}>{item.count_fast_chargers}대</Text>
          <Text> · </Text>
          <Text style={styles.blackText}>완속 </Text>
          <Text style={item.count_slow_chargers > 0 ? styles.dodgerblueText : styles.grayText}>{item.count_slow_chargers}대</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const _noDataView = () => {
    return (
      <View style={styles.noDataView}>
        <Text style={styles.noDataText}>아직 즐겨찾는 충전소가 없으시네요!</Text>
      </View>
    )
  }

  return (
    <SafeBaseView style={{ flex: 1 }} hasTitleBar={true} title={'즐겨찾기'} navigationBarOptions={{ skipLeft: false }} navigation={navigation}>
      <View style={styles.container}>
        <FlatList data={favorites.data} renderItem={_renderItem} keyExtractor={(item, index) => index} ListEmptyComponent={_noDataView} />
      </View>
    </SafeBaseView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listItemConatiner: { marginHorizontal: 18, marginTop: 10, borderBottomWidth: 1, borderBottomColor: 'lightgray' },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  headerView: { flexDirection: 'row', alignItems: 'center' },
  blackText: { color: 'black' },
  startImg: { width: 20, height: 20 },
  nameText: { fontSize: 16, fontWeight: 'bold', marginBottom: 5, color: 'black' },
  addressText: { color: 'gray', marginBottom: 10 },
  parkingView: { flexDirection: 'row', marginBottom: 15 },
  parkingText: { backgroundColor: 'lightgray', padding: 3, color: 'black' },
  chargersView: {
    flexDirection: 'row',
    backgroundColor: 'aliceblue',
    flex: 1,
    padding: 10,
    marginBottom: 25,
    borderRadius: 5,
    alignItems: 'center',
  },
  dodgerblueText: { color: 'dodgerblue', fontWeight: 'bold' },
  grayText: { color: 'gray', fontWeight: 'bold' },
  noDataView: { alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: 100 },
  noDataText: { color: 'black', fontSize: 16 },
})

export default FavoriteView
