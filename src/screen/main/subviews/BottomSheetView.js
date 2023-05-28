import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Animated from 'react-native-reanimated'
import BottomSheet from '@gorhom/bottom-sheet'

import { states as mainStates, actions as mainActions } from '@screens/main/state'

const BottomSheetView = ({ navigation }) => {
  const dispatch = useDispatch()
  const { selectedChargeInfo, selectedMarkerState, loading } = useSelector(mainStates)
  const sheetRef = useRef(null)

  useEffect(() => {
    console.log(selectedChargeInfo)
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
        <View style={styles.operatorView}>
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
      </ScrollView>
    )
  }

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={['30%', '80%']}
      enablePanDownToClose={true}
      handleStyle={styles.header}
      handleIndicatorStyle={styles.panelHandle}>
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
  contentView: { paddingHorizontal: 20, marginTop: 10 },
  operatorView: { flexDirection: 'row', justifyContent: 'space-between' },
  operatorText: { fontSize: 13 },
  optionView: { flexDirection: 'row' },
  spaceText: { fontSize: 12 },
  parkingText: { fontSize: 12, marginLeft: 10 },
  nameText: { fontSize: 20, fontWeight: 'bold', marginTop: 10 },
  addressText: { fontSize: 13, marginTop: 10 },
})

export default BottomSheetView
