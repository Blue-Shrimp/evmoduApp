import AsyncStorage from '@react-native-async-storage/async-storage'

const Storage = {
  clearAll: async () => {
    await AsyncStorage.clear()
    return true
  },
}

global.Storage = Storage
global.String.prototype.setValue = async function (value) {
  switch (typeof value) {
    case 'boolean':
    case 'number':
      await AsyncStorage.setItem(this.valueOf(), '{0}'.format(value))
      break
    case 'string':
      await AsyncStorage.setItem(this.valueOf(), '{0}'.format(value))
      break
    case 'object':
      await AsyncStorage.setItem(this.valueOf(), JSON.stringify(value))
      break
  }
  return true
}

global.String.prototype.getString = async function () {
  let value = await AsyncStorage.getItem(this.valueOf())
  return value === null || value === undefined ? '' : value
}

global.String.prototype.getBool = async function () {
  let value = await AsyncStorage.getItem(this.valueOf())
  return value === null || value === undefined ? false : value.boolValue()
}

global.String.prototype.getObject = async function () {
  let value = await AsyncStorage.getItem(this.valueOf())
  return value === null || value === undefined ? null : JSON.parse(value)
}

global.String.prototype.clear = async function () {
  await AsyncStorage.clear(this.valueOf())
  return true
}
