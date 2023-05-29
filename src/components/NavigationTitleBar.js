import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import PropTypes from 'prop-types'
import { Utility } from '@common'

const NavigationTitleBar = props => {
  const _onBack = () => {
    if (Utility.isNotNull(props.onBack)) {
      props.onBack()
      return
    }

    props.navigation.pop()
  }
  const _defaultLeftView = () => (
    <TouchableOpacity style={styles.leftTitleButton} onPress={() => _onBack()}>
      <Image source={require('@images/back.png')} />
    </TouchableOpacity>
  )

  const _leftViews = () => {
    if (props.skipLeft || Utility.isNil(props.leftButtons)) {
      return null
    }

    if (props.leftButtons.length <= 0) {
      return _defaultLeftView()
    }

    var views = []
    for (var i = 0; i < props.leftButtons.length; i++) {
      views.push(props.leftButtons[i])
    }
    return (
      <View style={styles.leftContainer}>
        {views.map(function (view, index) {
          return view
        })}
      </View>
    )
  }

  const _titleView = () => (
    <View style={[styles.titleContainer]}>
      <Text style={textStyles.title} numberOfLines={1} lineBreakMode={'tail'}>
        {props.title}
      </Text>
    </View>
  )

  const _defaultRightView = () => {
    return <View style={styles.defaultRightView} />
  }

  const _rightViews = () => {
    if (props.skipRight || Utility.isNil(props.rightButtons)) {
      return _defaultRightView()
    }

    if (props.rightButtons.length <= 0) {
      return _defaultRightView()
    }

    var views = []
    for (var i = 0; i < props.rightButtons.length; i++) {
      views.push(props.rightButtons[i])
    }

    return (
      <View style={styles.rightContainer}>
        {views.map(function (view, index) {
          return view
        })}
      </View>
    )
  }

  return (
    <View style={[styles.container, props.style]}>
      {_leftViews()}
      {_titleView()}
      {_rightViews()}
    </View>
  )
}

NavigationTitleBar.propTypes = {
  onBack: PropTypes.func,
}

NavigationTitleBar.defaultProps = {
  title: '',
  isModal: false,
  leftButtons: [],
  rightButtons: [],
  hasBack: true,
  onBack: null,
  navigator: null,
  skipLeft: false,
  skipRight: true,
  useShadow: false,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 0,
    minHeight: 50,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    marginVertical: 0,
  },
  leftTitleButton: {
    marginHorizontal: 18,
    marginVertical: 14,
  },
  titleContainer: {
    flex: 1,
    minHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginVertical: 0,
    marginRight: 15,
    backgroundColor: 'transparent',
  },
  defaultRightView: {
    width: 58,
  },
})

const textStyles = StyleSheet.create({
  title: {
    fontSize: 17,
    textAlign: 'center',
    color: 'black',
  },
})

export default React.memo(NavigationTitleBar)
