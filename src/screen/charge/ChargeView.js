import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'

const PayView = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}></View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default PayView
