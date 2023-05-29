import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, TextInput, Keyboard, TouchableOpacity, Text, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { SafeBaseView } from '@components'
import { Session } from '@network'

import { states as authStates, actions as authActions } from '@screens/mypage/state'

const LoginView = ({ navigation }) => {
  const dispatch = useDispatch()
  const { auth, error, loading } = useSelector(authStates)
  const emailRef = useRef(null)
  const [emailText, setEmailText] = useState('')
  const [emailFocus, setEmailFocus] = useState(false)
  const passwordRef = useRef(null)
  const [passwordText, setPasswordText] = useState('')
  const [passwordFocus, setPasswordFocus] = useState(false)

  useEffect(() => {
    return () => {
      dispatch(authActions.onError(null))
    }
  }, [])

  useEffect(() => {
    if (auth?.access_token && auth?.refresh_token) {
      Session.update({ ...auth })
    }
  }, [auth])

  useEffect(() => {
    if (error?.code === '400' || error?.code === '401') {
      _altert('존재하지 않는 계정이거나, 비밀번호가 다릅니다.')
    }
  }, [error])

  console.log(auth)
  console.log(error)

  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')

  const _altert = msg => {
    const title = msg
    const message = ''
    const buttons = [
      {
        text: '확인',
        onPress: () => {
          return
        },
      },
    ]
    Alert.alert(title, message, buttons)
  }

  const _onChangeEmailText = text => {
    setEmailText(text)
  }

  const _onChangePasswordText = text => {
    setPasswordText(text)
  }

  const _onLogin = () => {
    if (emailText === '' || !regex.test(emailText)) {
      _altert('정확한 이메일을 입력해주세요.')
      return
    }
    if (passwordText === '' || passwordText.length < 8) {
      _altert('비밀번호는 8자 이상 입력해주세요.')
      return
    }
    dispatch(authActions.authLogin({ email: emailText, password: passwordText }))
    Keyboard.dismiss()
  }

  return (
    <SafeBaseView style={{ flex: 1 }} hasTitleBar={true} title={'로그인'} navigationBarOptions={{ skipLeft: false }} navigation={navigation}>
      <View style={styles.container}>
        <TextInput
          ref={emailRef}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          style={{ ...styles.textInput, borderColor: emailFocus ? 'black' : 'gray' }}
          placeholder={'이메일 입력'}
          placeholderTextColor={'lightgray'}
          onChangeText={_onChangeEmailText}
          autoCapitalize={'none'}
          autoCorrect={false}
          defaultValue={emailText}
          autoFocus
          textAlignVertical={'center'}
          underlineColorAndroid={'transparent'}
          returnKeyType={'go'}
          keyboardType={'email-address'}
          keyboardAppearance={'default'}
          onSubmitEditing={_onLogin}
          value={emailText}
        />
        <TextInput
          ref={passwordRef}
          secureTextEntry={true}
          onFocus={() => setPasswordFocus(true)}
          onBlur={() => setPasswordFocus(false)}
          style={{ ...styles.textInput, borderColor: passwordFocus ? 'black' : 'gray' }}
          placeholder={'비밀번호 입력'}
          placeholderTextColor={'lightgray'}
          onChangeText={_onChangePasswordText}
          autoCapitalize={'none'}
          autoCorrect={false}
          defaultValue={passwordText}
          textAlignVertical={'center'}
          underlineColorAndroid={'transparent'}
          returnKeyType={'go'}
          keyboardType={'default'}
          keyboardAppearance={'default'}
          onSubmitEditing={_onLogin}
          value={passwordText}
        />
        <TouchableOpacity
          style={{ ...styles.loginBtn, backgroundColor: regex.test(emailText) && passwordText.length >= 8 ? 'dodgerblue' : 'lightgray' }}
          onPress={() => _onLogin()}>
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.joinBtn}>
          <Text style={styles.joinText}>회원가입</Text>
        </TouchableOpacity>
      </View>
    </SafeBaseView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 18,
  },
  textInput: {
    height: 50,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
  },
  loginBtn: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  joinBtn: { alignSelf: 'center', marginTop: 20 },
  joinText: { color: 'gray' },
})

export default LoginView
