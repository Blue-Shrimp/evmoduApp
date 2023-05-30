import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Platform } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Animated from 'react-native-reanimated'
import BottomSheet from '@gorhom/bottom-sheet'
import { Utility, Favorites } from '@common'
import { Session } from '@network'

import { states as mainStates, actions as mainActions } from '@screens/main/state'

const BottomSheetView = ({ navigation }) => {
  const dispatch = useDispatch()
  const { selectedChargeInfo, selectedMarkerState, favorites, loading } = useSelector(mainStates)
  const sheetRef = useRef(null)
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    console.log(selectedChargeInfo)
    const isFavorite = favorites?.data?.findIndex(v => v.id === selectedChargeInfo.id) < 0 ? false : true
    if (selectedChargeInfo.is_bookmarked || isFavorite) {
      setIsSelected(true)
    } else {
      setIsSelected(false)
    }
  }, [selectedChargeInfo])

  useEffect(() => {
    switch (selectedMarkerState) {
      case 'none':
        _slide(false)
        break
      case 'select':
        _slide(true)
        break
    }
  }, [selectedMarkerState])

  const _slide = isUp => {
    if (isUp) {
      sheetRef.current.snapToIndex(0)
    } else {
      sheetRef.current.close()
    }
  }

  const _sheetContent = () => {
    if ((selectedChargeInfo?.id || '') === '') {
      return
    }
    return (
      <ScrollView style={styles.contentView}>
        {_section1(selectedChargeInfo)}
        {_section2(selectedChargeInfo)}
        {_section3(selectedChargeInfo)}
      </ScrollView>
    )
  }

  const _section1 = selectedChargeInfo => {
    let combo = 0
    let chademo = 0
    let ac = 0
    let dc = 0
    const distance =
      selectedChargeInfo.distance > 1000 ? (selectedChargeInfo.distance / 1000).toFixed(1) + 'km' : selectedChargeInfo.distance.toFixed(0) + 'm'
    selectedChargeInfo.chargers.map(item => {
      if (item.type === 'Combo CCS') {
        combo++
      } else if (item.type === 'CHADEMO') {
        chademo++
      } else if (item.type === 'AC') {
        ac++
      } else if (item.type === 'DC') {
        dc++
      }
    })
    return (
      <View style={styles.section1}>
        <View style={styles.section1_1}>
          <View>
            <Text style={styles.operatorText}>{selectedChargeInfo.operator.name}</Text>
          </View>
          <View style={styles.optionView}>
            <Text style={styles.spaceText}>{selectedChargeInfo.is_open_space ? '완전개방' : '비개방'}</Text>
            <Text style={styles.parkingText}>{selectedChargeInfo.parking_fee === 0 ? '무료주차' : '유료주차'}</Text>
          </View>
        </View>
        <Text style={styles.nameText}>{selectedChargeInfo.name}</Text>
        <Text style={styles.addressText}>{selectedChargeInfo.address}</Text>
        <View style={styles.section1_2}>
          <View style={styles.availableCntView}>
            <View>
              <Text style={styles.statusText}>{selectedChargeInfo.count_available_chargers > 0 ? '현재 충전 가능' : '상태확인 불가'}</Text>
            </View>
            <View style={styles.fastOrSlowView}>
              <Text style={styles.blackText}>급속 </Text>
              <Text style={selectedChargeInfo.count_fast_chargers > 0 ? styles.dodgerblue : styles.lightgrayText}>
                {selectedChargeInfo.count_fast_chargers}
              </Text>
              <Text style={styles.lightgrayText}> | </Text>
              <Text style={styles.blackText}>완속 </Text>
              <Text style={selectedChargeInfo.count_slow_chargers > 0 ? styles.dodgerblue : styles.lightgrayText}>
                {selectedChargeInfo.count_slow_chargers}
              </Text>
            </View>
          </View>
          <View style={styles.chargerTypeView}>
            <Text style={combo > 0 ? styles.chargetTypeActiveText : styles.chargetTypeText}>DC콤보</Text>
            <Text style={chademo > 0 ? styles.chargetTypeActiveText : styles.chargetTypeText}>DC차데모</Text>
            <Text style={ac > 0 ? styles.chargetTypeActiveText : styles.chargetTypeText}>AC3상</Text>
            <Text style={dc > 0 ? styles.chargetTypeActiveText : styles.chargetTypeText}>완속</Text>
          </View>
        </View>
        <View style={styles.section1_3}>
          <TouchableOpacity
            style={styles.boomarkBtn}
            onPress={async () => {
              if (isSelected) {
                if (await Session.isLogIned()) {
                  await Favorites.deleteWithInfo(selectedChargeInfo.id)
                }
                await Favorites.delete({ id: selectedChargeInfo.id })
                setIsSelected(false)
              } else {
                if (await Session.isLogIned()) {
                  await Favorites.addWithInfo(selectedChargeInfo.id)
                }
                await Favorites.add(selectedChargeInfo)
                setIsSelected(true)
              }
              dispatch(mainActions.setFavorites(await Favorites.favorites()))
            }}>
            <Image style={styles.starImg} source={isSelected ? require('@images/star.png') : require('@images/ligthtgrayStar.png')} />
            <Text style={styles.boomarkText}>즐겨찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.naviBtn}>
            <Text style={styles.naviText}>길 안내 시작 ({distance})</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const _section2 = selectedChargeInfo => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionText}>충전기 정보</Text>
        <View style={styles.chargerInfoTitle}>
          <Text style={styles.chargerInfoText}>상태</Text>
          <Text style={styles.chargerInfoText}>종류</Text>
        </View>
        {selectedChargeInfo.chargers.map((item, index) => {
          return (
            <View key={index} style={styles.chargerInfoView}>
              <Text style={item.status === 'READY' ? styles.chargerActiveText : styles.chargerText}>
                {item.status === 'READY'
                  ? '충전가능' + '(' + item.power + 'kW)'
                  : item.status === 'BUSY'
                  ? '충전중'
                  : item.status === 'UNKNOWN'
                  ? '상태확인불가'
                  : item.status === 'OUT_OF_SERVICE'
                  ? '운영중지'
                  : '통신이상'}
              </Text>
              <View style={styles.chargerInfoTypeView}>
                <Text style={item.type === 'Combo CCS' ? styles.chargetTypeActiveText : styles.chargetTypeText}>DC콤보</Text>
                <Text style={item.type === 'CHADEMO' ? styles.chargetTypeActiveText : styles.chargetTypeText}>DC차데모</Text>
                <Text style={item.type === 'AC' ? styles.chargetTypeActiveText : styles.chargetTypeText}>AC3상</Text>
                <Text style={item.type === 'DC' ? styles.chargetTypeActiveText : styles.chargetTypeText}>완속</Text>
              </View>
            </View>
          )
        })}
      </View>
    )
  }

  const _section3 = selectedChargeInfo => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionText}>충전소 정보</Text>
        <View style={styles.chargeInfoText}>
          <Text style={styles.grayText}>운영기관</Text>
          <Text style={styles.blackText}>{selectedChargeInfo.operator.name}</Text>
        </View>
        <View style={styles.chargeInfoText}>
          <Text style={styles.grayText}>전화번호</Text>
          <TouchableOpacity onPress={() => Utility.call(selectedChargeInfo.operator.tel)}>
            <Text style={styles.dodgerblue}>{selectedChargeInfo.operator.tel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={[Platform.OS === 'ios' ? '35%' : '40%', '80%']}
      enablePanDownToClose={true}
      handleStyle={styles.header}
      handleIndicatorStyle={styles.panelHandle}
      onClose={() => {
        if (selectedMarkerState === 'select') {
          dispatch(mainActions.setSelectedMarkerState('none'))
        }
      }}>
      {_sheetContent()}
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  panelHandle: {
    width: 57,
    borderRadius: 4,
    backgroundColor: 'lightgray',
    marginTop: 5,
  },
  contentView: { marginTop: 10 },
  section1: { paddingHorizontal: 20, paddingBottom: 30, borderBottomWidth: 10, borderBottomColor: 'lightgray' },
  section1_1: { flexDirection: 'row', justifyContent: 'space-between' },
  operatorText: { fontSize: 13, color: 'black' },
  optionView: { flexDirection: 'row' },
  spaceText: { fontSize: 12, color: 'black' },
  parkingText: { fontSize: 12, marginLeft: 10, color: 'black' },
  nameText: { fontSize: 20, fontWeight: 'bold', marginTop: 10, color: 'black' },
  addressText: { fontSize: 13, marginTop: 10, color: 'gray' },
  section1_2: { marginTop: 30, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' },
  availableCntView: { width: 100, alignItems: 'center' },
  statusText: { fontSize: 16, fontWeight: 'bold', color: 'black' },
  fastOrSlowView: { flexDirection: 'row', alignItems: 'center' },
  blackText: { color: 'black' },
  dodgerblue: { color: 'dodgerblue' },
  lightgrayText: { color: 'lightgray' },
  grayText: { color: 'gray' },
  chargerTypeView: { flexDirection: 'row', marginLeft: 20, alignItems: 'center' },
  chargetTypeText: { marginRight: 10, color: 'gray' },
  chargetTypeActiveText: { marginRight: 10, color: 'black' },
  section1_3: { flexDirection: 'row', alignItems: 'center', marginTop: 30 },
  boomarkBtn: {
    width: 70,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    marginRight: 10,
  },
  starImg: { width: 20, height: 20, marginBottom: 5 },
  boomarkText: { fontSize: 12, textAlign: 'center', color: 'gray' },
  naviBtn: { borderRadius: 10, flex: 1, backgroundColor: 'dodgerblue', height: 50, justifyContent: 'center', alignItems: 'center' },
  naviText: { color: 'white', fontSize: 17, fontWeight: 'bold' },
  section: { paddingHorizontal: 20, paddingVertical: 30, borderBottomWidth: 10, borderBottomColor: 'lightgray' },
  sectionText: { fontSize: 17, color: 'black', marginBottom: 10 },
  chargerInfoTitle: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'lightgray', flexDirection: 'row', height: 30, alignItems: 'center' },
  chargerInfoText: { color: 'black', flex: 0.4, textAlign: 'center', fontSize: 12 },
  chargerInfoView: { flexDirection: 'row', alignItems: 'center', height: 50, borderBottomWidth: 1, borderBottomColor: 'lightgray' },
  chargerActiveText: { color: 'dodgerblue', flex: 0.4, textAlign: 'center' },
  chargerText: { color: 'gray', flex: 0.4, textAlign: 'center' },
  chargerInfoTypeView: { flexDirection: 'row', flex: 0.6, alignItems: 'center' },
  chargeInfoText: { justifyContent: 'space-between', flexDirection: 'row', marginBottom: 5 },
})

export default BottomSheetView
