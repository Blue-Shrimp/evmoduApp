import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { SafeBaseView } from '@components'

const JoinView = ({ navigation }) => {
  return (
    <SafeBaseView style={{ flex: 1 }} hasTitleBar={true} title={'회원가입'} navigationBarOptions={{ skipLeft: false }} navigation={navigation}>
      <View style={styles.container}></View>
    </SafeBaseView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
})

export default JoinView
