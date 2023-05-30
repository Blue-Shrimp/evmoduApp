import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, View, Text, TextInput, Keyboard, Alert, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { SafeBaseView } from '@components'
import { Session } from '@network'

import { states as authStates, actions as authActions } from '@screens/mypage/state'

const ProfileView = ({ navigation }) => {
  const dispatch = useDispatch()
  const { auth, profile, error, loading } = useSelector(authStates)
  const nameRef = useRef(null)
  const [nameText, setNameText] = useState(profile.username)
  const [nameDisable, setNameDisable] = useState(true)
  const [nameChangeBtnActive, setNameChangeBtnActive] = useState(false)
  const passwordRef = useRef(null)
  const [passwordText, setPasswordText] = useState('12341234')
  const [passwordDisable, setPasswordDisable] = useState(true)
  const [passwordChangeBtnActive, setPasswordChangeBtnActive] = useState(false)

  useEffect(() => {
    if (error?.code === '500') {
      _altert('변경 실패했습니다.')
    }
  }, [error])

  useEffect(() => {
    if (nameChangeBtnActive) {
      setNameChangeBtnActive(false)
      setNameDisable(true)
      setNameText(profile.username)
      _altert('닉네임 변경이 완료되었습니다.')
    } else if (passwordChangeBtnActive) {
      setPasswordChangeBtnActive(false)
      setPasswordDisable(true)
      setPasswordText('12341234')
      _altert('비빌번호 변경이 완료되었습니다.')
    }
  }, [profile])

  const _sessionClear = async () => {
    if (await Session.clear()) {
      await dispatch(authActions.setAuthLogin(null))
      await dispatch(authActions.setProfile({}))
      _altert('로그아웃 되었습니다.', true)
    }
  }

  const _onChangePasswordText = text => {
    setPasswordText(text)
  }

  const _onChangeNameText = text => {
    setNameText(text)
  }

  const _onChangeName = () => {
    if (nameText.length < 2 || nameText.length > 16) {
      _altert('닉네임을 한글, 영문, 숫자 2 ~ 16자 이내로 입력해주세요.')
      setNameChangeBtnActive(false)
      setNameDisable(true)
      setNameText(profile.username)
      return
    }
    console.log(auth)
    dispatch(authActions.patchUser({ email: auth.email, username: nameText, isNameChange: true }))
    Keyboard.dismiss()
  }

  const _onChangePassword = () => {
    if (passwordText === '' || passwordText.length < 8) {
      _altert('비밀번호는 8자 이상 입력해주세요.')
      setPasswordChangeBtnActive(false)
      setPasswordDisable(true)
      setPasswordText('12341234')
      return
    }
    dispatch(authActions.patchUser({ email: auth.email, password: passwordText, isNameChange: false }))
    Keyboard.dismiss()
  }

  const _altert = (msg, isLogout = false) => {
    const title = msg
    const message = ''
    const buttons = [
      {
        text: '확인',
        onPress: () => {
          isLogout ? navigation.pop() : null
          return
        },
      },
    ]
    Alert.alert(title, message, buttons)
  }

  return (
    <SafeBaseView style={{ flex: 1 }} hasTitleBar={true} title={'프로필'} navigationBarOptions={{ skipLeft: false }} navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.sectionView}>
          <Text style={styles.sectionText}>닉네임</Text>
          <View style={styles.rowCotainer}>
            <TextInput
              ref={nameRef}
              style={nameDisable ? [styles.textInput, styles.disabled] : styles.textInput}
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
              value={nameText}
              editable={!nameDisable}
            />
            <TouchableOpacity
              style={nameChangeBtnActive ? [styles.changeBtn, styles.btnActive] : styles.changeBtn}
              onPress={() => {
                if (!nameChangeBtnActive) {
                  setNameChangeBtnActive(true)
                  setNameDisable(false)
                  setNameText('')
                } else {
                  _onChangeName()
                }
              }}>
              <Text style={nameChangeBtnActive ? [styles.changeText, styles.textActive] : styles.changeText}>변경</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionView}>
          <Text style={styles.sectionText}>비밀번호</Text>
          <View style={styles.rowCotainer}>
            <TextInput
              testID={'1'}
              ref={passwordRef}
              secureTextEntry={true}
              textContentType="oneTimeCode"
              style={passwordDisable ? [styles.textInput, styles.disabled] : styles.textInput}
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
              editable={!passwordDisable}
            />
            <TouchableOpacity
              style={passwordChangeBtnActive ? [styles.changeBtn, styles.btnActive] : styles.changeBtn}
              onPress={() => {
                if (!passwordChangeBtnActive) {
                  setPasswordChangeBtnActive(true)
                  setPasswordDisable(false)
                  setPasswordText('')
                } else {
                  _onChangePassword()
                }
              }}>
              <Text style={passwordChangeBtnActive ? [styles.changeText, styles.textActive] : styles.changeText}>변경</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={() => _sessionClear()}>
          <Text style={styles.logoutText}>로그아웃</Text>
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
    borderColor: 'gray',
    flex: 0.8,
  },
  disabled: {
    color: 'gray',
    backgroundColor: 'lightgray',
  },
  rowCotainer: { flexDirection: 'row' },
  changeBtn: {
    flex: 0.2,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'dodgerblue',
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnActive: { backgroundColor: 'dodgerblue', color: 'white' },
  changeText: { color: 'dodgerblue', fontWeight: 'bold' },
  textActive: { color: 'white', fontWeight: 'bold' },
  logoutBtn: { alignSelf: 'center' },
  logoutText: { color: 'gray' },
})

export default ProfileView
