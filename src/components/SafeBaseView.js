import React from 'react'
import { StyleSheet, View, KeyboardAvoidingView, Platform, Dimensions, StatusBar } from 'react-native'
import PropTypes from 'prop-types'
import NavigationTitleBar from './NavigationTitleBar'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const _backgroundColor = props => {
  return props.style?.backgroundColor || 'white'
}

const _titleBar = (props, navigation) => {
  if (props.hasTitleBar) {
    return (
      <NavigationTitleBar
        style={[styles.titleBar]}
        title={props.title}
        isModal={props.isModal}
        {...props.navigationBarOptions}
        navigation={navigation}
      />
    )
  } else {
    return null
  }
}

const useSafeAreaInsetsValue = useSafeAreaInsets()
const statusHeight = StatusBar.currentHeight
const __mainContainerBt = {
  marginTop: Platform.OS === 'ios' ? useSafeAreaInsetsValue.top : 0,
  marginBottom: Platform.OS === 'ios' ? useSafeAreaInsetsValue.bottom : 0,
}

export const SafeBaseView = props => {
  const _mainView = () => {
    return (
      <View style={[styles.mainContainer, __mainContainerBt, props.modalContentStyle]}>
        {_titleBar(props, props.navigation)}
        {props.children}
      </View>
    )
  }

  return props.isKeyboardBase ? (
    <KeyboardAvoidingView
      style={[styles.keyboardViewStyle, _backgroundColor(props), props.style]}
      keyboardVerticalOffset={props.keyboardVerticalOffset}
      behavior="padding"
      enabled>
      {_mainView()}
      {props.modalView}
    </KeyboardAvoidingView>
  ) : (
    <View style={[props.isModal ? styles.modal : styles.container, _backgroundColor(props), props.style]}>
      {_mainView()}
      {props.modalView}
    </View>
  )
}

SafeBaseView.options = () => {
  return {
    topBar: {
      visible: false,
      _height: 0,
      drawBehind: true,
    },
  }
}

SafeBaseView.propTypes = {
  modalView: PropTypes.node,
}

SafeBaseView.defaultProps = {
  children: [],
  isModal: false,
  alertView: null,
  modalView: null,
  isKeyboardBase: false,
  useKeyboardAware: false,
  useTitleShadow: false,
  hasTitleBar: true,
  titleBarStyle: {},
  navigationBarOptions: {
    skipRight: true,
  },
  loading: false,
  keyboardVerticalOffset: 0,
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  titleBar: {
    marginTop: 5,
    paddingBottom: 5,
    marginHorizontal: 0,
    width: Dimensions.get('window').width,
    minHeight: 50,
    zIndex: 1,
  },
  keyboardViewStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  touchableStyle: {
    flex: 1,
    margin: 0,
    backgroundColor: 'white',
  },
  mainContainer: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? useSafeAreaInsetsValue.top : 0,
    marginBottom: Platform.OS === 'ios' ? useSafeAreaInsetsValue.bottom : 0,
    backgroundColor: 'white',
  },
  modal: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Platform.OS === 'ios' ? Dimensions.get('window').height : '100%',

    marginLeft: 0,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    zIndex: 1,
    backgroundColor: 'white',
  },
})

export default SafeBaseView

export const BaseView = props => {
  return <View {...props}>{children}</View>
}
