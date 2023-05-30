import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, Text, TextInput, Keyboard, Alert, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { SafeBaseView } from '@components'

import { states as authStates, actions as authActions } from '@screens/mypage/state'

const JoinView = ({ navigation }) => {
  const dispatch = useDispatch()
  const { join, error, loading } = useSelector(authStates)
  const emailRef = useRef(null)
  const [emailText, setEmailText] = useState('')
  const [emailFocus, setEmailFocus] = useState(false)
  const passwordRef = useRef(null)
  const [passwordText, setPasswordText] = useState('')
  const [passwordFocus, setPasswordFocus] = useState(false)
  const passwordCorrectRef = useRef(null)
  const [passwordCorrectText, setPasswordCorrectText] = useState('')
  const [passwordCorrectFocus, setPasswordCorrectFocus] = useState(false)
  const nameRef = useRef(null)
  const [nameText, setNameText] = useState('')
  const [nameFocus, setNameFocus] = useState(false)

  const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}')

  useEffect(() => {
    if (join?.is_success) {
      _altert('회원가입에 성공했습니다.', true)
    }
    return () => {
      dispatch(authActions.setPostJoin(null))
      dispatch(authActions.onError(null))
    }
  }, [join])

  useEffect(() => {
    if (error?.code === '400') {
      _altert('회원가입에 실패했습니다.')
    }
  }, [error])

  const _onChangeEmailText = text => {
    setEmailText(text)
  }

  const _onChangePasswordText = text => {
    setPasswordText(text)
  }

  const _onChangePasswordCorrectText = text => {
    setPasswordCorrectText(text)
  }

  const _onChangeNameText = text => {
    setNameText(text)
  }

  const _altert = (msg, isSucces = false) => {
    const getUserInfo = () => {
      dispatch(authActions.authLogin({ email: emailText, password: passwordText }))
      navigation.popToTop()
    }
    const title = msg
    const message = ''
    const buttons = [
      {
        text: '확인',
        onPress: () => {
          isSucces ? getUserInfo() : null
          return
        },
      },
    ]
    Alert.alert(title, message, buttons)
  }

  const _onJoin = () => {
    if (emailText === '' || !regex.test(emailText)) {
      _altert('정확한 이메일을 입력해주세요.')
      return
    }
    if (passwordText === '' || passwordText.length < 8 || passwordCorrectText === '' || passwordCorrectText.length < 8) {
      _altert('비밀번호는 8자 이상 입력해주세요.')
      return
    }
    if (passwordText !== passwordCorrectText) {
      _altert('비밀번호가 일치하지 않습니다.')
      return
    }
    if (nameText.length < 2 || nameText.length > 16) {
      _altert('닉네임을 한글, 영문, 숫자 2 ~ 16자 이내로 입력해주세요.')
      return
    }
    Keyboard.dismiss()
    dispatch(authActions.postJoin({ email: emailText, password: passwordText, username: nameText }))
  }

  return (
    <SafeBaseView style={{ flex: 1 }} hasTitleBar={true} navigationBarOptions={{ skipLeft: false }} navigation={navigation}>
      <View style={styles.container}>
        <Text style={styles.titleText}>회원가입</Text>
        <View style={styles.sectionView}>
          <Text style={styles.sectionText}>이메일</Text>
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
            returnKeyType={'next'}
            keyboardType={'email-address'}
            keyboardAppearance={'default'}
            onSubmitEditing={() => passwordRef?.current?.focus()}
            value={emailText}
          />
        </View>
        <View style={styles.sectionView}>
          <Text style={styles.sectionText}>비밀번호</Text>
          <TextInput
            testID={'1'}
            ref={passwordRef}
            secureTextEntry={true}
            onFocus={() => setPasswordFocus(true)}
            onBlur={() => setPasswordFocus(false)}
            textContentType="oneTimeCode"
            style={{ ...styles.textInput, borderColor: passwordFocus ? 'black' : 'gray' }}
            placeholder={'비밀번호 입력'}
            placeholderTextColor={'lightgray'}
            onChangeText={_onChangePasswordText}
            autoCapitalize={'none'}
            autoCorrect={false}
            defaultValue={passwordText}
            textAlignVertical={'center'}
            underlineColorAndroid={'transparent'}
            returnKeyType={'next'}
            keyboardType={'default'}
            keyboardAppearance={'default'}
            onSubmitEditing={() => passwordCorrectRef?.current?.focus()}
            value={passwordText}
          />
          <TextInput style={{ display: 'none' }} />
          <TextInput
            testID={'2'}
            ref={passwordCorrectRef}
            secureTextEntry={true}
            onFocus={() => setPasswordCorrectFocus(true)}
            onBlur={() => setPasswordCorrectFocus(false)}
            textContentType="oneTimeCode"
            style={{ ...styles.textInput, borderColor: passwordCorrectFocus ? 'black' : 'gray' }}
            placeholder={'비밀번호 확인'}
            placeholderTextColor={'lightgray'}
            onChangeText={_onChangePasswordCorrectText}
            autoCapitalize={'none'}
            autoCorrect={false}
            defaultValue={passwordCorrectText}
            textAlignVertical={'center'}
            underlineColorAndroid={'transparent'}
            returnKeyType={'next'}
            keyboardType={'default'}
            keyboardAppearance={'default'}
            onSubmitEditing={() => nameRef?.current?.focus()}
            value={passwordCorrectText}
          />
        </View>
        <View style={styles.sectionView}>
          <Text style={styles.sectionText}>닉네임</Text>
          <TextInput
            ref={nameRef}
            onFocus={() => setNameFocus(true)}
            onBlur={() => setNameFocus(false)}
            style={{ ...styles.textInput, borderColor: nameFocus ? 'black' : 'gray' }}
            placeholder={'2자이상 닉네임 입력'}
            placeholderTextColor={'lightgray'}
            onChangeText={_onChangeNameText}
            autoCapitalize={'none'}
            autoCorrect={false}
            defaultValue={nameText}
            textAlignVertical={'center'}
            underlineColorAndroid={'transparent'}
            returnKeyType={'go'}
            keyboardType={'default'}
            keyboardAppearance={'default'}
            onSubmitEditing={_onJoin}
            value={nameText}
          />
        </View>
        <TouchableOpacity
          style={{
            ...styles.joinBtn,
            backgroundColor:
              regex.test(emailText) &&
              passwordText.length >= 8 &&
              passwordCorrectText.length >= 8 &&
              passwordText === passwordCorrectText &&
              nameText.length >= 2 &&
              nameText.length <= 16
                ? 'dodgerblue'
                : 'lightgray',
          }}
          onPress={() => _onJoin()}>
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
  titleText: { color: 'black', fontSize: 22, fontWeight: 'bold', marginBottom: 30 },
  sectionView: { marginBottom: 30 },
  sectionText: { color: 'black', marginBottom: 10 },
  textInput: {
    height: 50,
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
    color: 'black',
  },
  joinBtn: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  joinText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
})

export default JoinView
