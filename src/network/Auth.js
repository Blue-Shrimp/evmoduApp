import { URI } from './Common.js'

export async function login(params = {}) {
  return await URI.Auth.login.doPost(params)
}

export async function join(params = {}) {
  return await URI.Auth.join.doPost(params)
}

export async function refresh(params = {}) {
  return await URI.Auth.refresh.doPost(params)
}

export async function getUserInfo(params = {}) {
  return await URI.Auth.userInfo.Get(params)
}

export async function patchUserInfo(params = {}) {
  return await URI.Auth.userInfo.doPatch(params)
}
