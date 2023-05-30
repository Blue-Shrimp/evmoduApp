import { call, put, takeLatest } from 'redux-saga/effects'
import { actions } from './slice'
import { login, getUserInfo, patchUserInfo, join } from '@network'

export function* authLogin({ payload }) {
  try {
    const res = yield call(login, { email: payload.email, password: payload.password })
    yield put(actions.setAuthLogin({ ...res, email: payload.email }))
  } catch (error) {
    yield put(actions.onError(error))
  }
}

export function* getUser({ payload }) {
  try {
    const res = yield call(getUserInfo)
    yield put(actions.setProfile(res))
  } catch (error) {
    yield put(actions.onError(error))
  }
}

export function* patchUser({ payload }) {
  try {
    let param = {}
    if (payload.isNameChange) {
      param = { email: payload.email, username: payload.username }
    } else {
      param = { email: payload.email, password: payload.password }
    }
    const res = yield call(patchUserInfo, param)
    yield put(actions.setProfile(res))
  } catch (error) {
    yield put(actions.onError(error))
  }
}

export function* postJoin({ payload }) {
  try {
    const res = yield call(join, { email: payload.email, password: payload.password, username: payload.username })
    yield put(actions.setPostJoin(res))
  } catch (error) {
    yield put(actions.onError(error))
  }
}

export function* watchSaga() {
  yield takeLatest(actions.authLogin, authLogin)
  yield takeLatest(actions.getUser, getUser)
  yield takeLatest(actions.patchUser, patchUser)
  yield takeLatest(actions.postJoin, postJoin)
}
