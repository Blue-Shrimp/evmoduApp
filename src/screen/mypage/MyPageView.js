import React, { useEffect, useState } from 'react'
import { StyleSheet, View, SafeAreaView, Text, TouchableOpacity, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Session } from '@network'
import { Utility } from '@common'

import { states as authStates, actions as authActions } from '@screens/mypage/state'

const MyPageView = ({ navigation }) => {
  const dispatch = useDispatch()
  const { auth, profile, loading } = useSelector(authStates)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    _checkLogin()
  }, [])

  useEffect(() => {
    if (auth?.access_token && auth?.refresh_token) {
      Session.update({ ...auth })
      dispatch(authActions.getUser())
      setIsLogin(true)
    } else {
      _checkLogin()
    }
  }, [auth])

  const _checkLogin = async () => {
    if ((await Session.isLogIned()) && !Utility.isNil(profile)) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleText}>마이페이지</Text>
        <TouchableOpacity style={styles.loginBtn} onPress={() => (isLogin ? navigation.navigate('ProfileView') : navigation.navigate('LoginView'))}>
          <Text style={styles.titleText}>{isLogin ? profile.username : '로그인이 필요합니다'}</Text>
          <Image source={require('@images/next.png')} />
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
  titleText: { color: 'black', fontSize: 20, fontWeight: 'bold' },
  loginBtn: { marginTop: 40, flexDirection: 'row', alignItems: 'center' },
})

export default MyPageView
