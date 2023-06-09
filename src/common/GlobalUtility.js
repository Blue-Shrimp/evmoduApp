import { Platform, Linking } from 'react-native'
import { _ } from 'lodash'

const Utility = {
  isEqual: (obj1, obj2) => {
    return _.isEqual(obj1, obj2)
  },
  isNil: obj => {
    return _.isNil(obj) || obj === 'undefined' || _.isNaN(obj)
  },
  isNaN: obj => {
    return _.isNaN(obj)
  },
  isNotNull: obj => {
    return !(_.isNil(obj) || obj === 'undefined' || _.isNaN(obj))
  },
  isEmpty: string => {
    if (_.isNil(string)) return true
    if (typeof string === 'string' && !!string.trim()) return false
    if (_.isEmpty(string)) return true

    return false
  },
  call: phone => {
    if (phone === undefined || phone === null || phone === '') {
      return false
    }

    let phoneNumber
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`
    } else {
      phoneNumber = `tel:${phone}`
    }

    return Linking.openURL(phoneNumber)
      .then(r => {
        return true
      })
      .catch(error => {
        return false
      })
  },
}

export { Utility }
