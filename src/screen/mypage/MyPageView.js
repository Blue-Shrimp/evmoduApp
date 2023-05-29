import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity } from 'react-native'

const MyPageView = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleText}>마이페이지</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate('LoginView')}>
          <Text style={styles.titleText}>로그인이 필요합니다</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 18,
  },
  titleText: { color: 'black ', fontSize: 20, fontWeight: 'bold' },
  loginBtn: { marginTop: 40 },
})

export default MyPageView
