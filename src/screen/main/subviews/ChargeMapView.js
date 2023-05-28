import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Alert, TouchableOpacity, Image, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import Permissions from '@common/PermissionUtil'
import { Utility } from '@common'

import { states as mainStates, actions as mainActions } from '@screens/main/state'

const ChargeMapView = props => {
  const dispatch = useDispatch()
  const { myLocation, loading } = useSelector(mainStates)
  const [location, setLocation] = useState(myLocation)
  const [localMarkerDatas, setLocalMarkerDatas] = useState(props.markerDatas)

  useEffect(() => {
    _requestPermission()
  }, [])

  useEffect(() => {
    if (Utility.isNil(props.markerDatas)) {
      return
    }
    setLocalMarkerDatas(props.markerDatas)
  }, [props.markerDatas])

  const _requestPermission = async () => {
    Permissions.checkPermission()
      .then(response => {
        _getCurrentLocation()
      })
      .catch(error => {
        return Permissions.requestLocation()
          .then(response => {
            _getCurrentLocation()
          })
          .catch(denyError => {
            if (denyError.result === 'blocked' || denyError.result === 'denied') {
              _getDefaultLocation()
            } else {
              _getCurrentLocation()
            }
          })
      })
  }

  const _checkPermission = async () => {
    return Permissions.checkPermission()
      .then(response => {
        return Promise.resolve(true)
      })
      .catch(error => {
        const title = '내 주변 충전소를 확인하기 위해 위치권한을 허용해주세요.'
        const message = ''
        const buttons = [
          {
            text: '취소',
            onPress: () => {
              return Promise.reject(true)
            },
            style: 'cancel',
          },
          {
            text: '위치 권한 설정',
            onPress: () => {
              Permissions.openSetting()
              return Promise.reject(false)
            },
          },
        ]
        Alert.alert(title, message, buttons)
      })
  }

  const _getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        const current = {
          toInitialRegion: !location.toInitialRegion,
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: location.latitudeDelta,
          longitudeDelta: location.longitudeDelta,
        }
        setLocation(current)
        dispatch(mainActions.setMyLocation(current))
      },
      error => {
        _checkPermission()
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 10000,
      },
    )
    return
  }

  const _onPressCurrentLocation = () => {
    _getCurrentLocation()
  }

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        region={location}
        onRegionChangeComplete={region => {
          console.log('Region change complete : ', region)
          const current = {
            toInitialRegion: !location.toInitialRegion,
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          }
          setLocation(current)
          dispatch(mainActions.setMyLocation(current))
        }}
        showsUserLocation={true}>
        {/* {_markerDatas()} */}
        {localMarkerDatas?.map(item => {
          console.log('item : ', item)
          return (
            <Marker
              key={item.id}
              coordinate={{ latitude: item.location.latitude, longitude: item.location.longitude }}
              image={require('@images/marker.png')}
              identifier={String(item.id)}
              onPress={e => console.log('press', e.nativeEvent)}
              onSelect={e => console.log('se', e.nativeEvent)}
              onDeselect={e => console.log('de', e.nativeEvent)}
              onCalloutPress={e => console.log('call', e.nativeEvent)}
            />
          )
        })}
      </MapView>
      <TouchableOpacity
        style={styles.currentLocationContainer}
        activeOpacity={0.5}
        onPress={() => {
          _onPressCurrentLocation()
        }}>
        <Image style={styles.currentLoactionIcon} source={require('@images/gps.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.starContainer} activeOpacity={0.5} onPress={() => {}}>
        <Image style={styles.starIcon} source={require('@images/star.png')} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  currentLocationContainer: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 5,
    bottom: 60,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentLoactionIcon: {
    width: 25,
    height: 25,
  },
  starContainer: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 5,
    bottom: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starIcon: {
    width: 20,
    height: 20,
  },
})

export default ChargeMapView
