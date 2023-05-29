import { call, put, takeLatest } from 'redux-saga/effects'
import { actions } from './slice'
import { login } from '@network'

export function* authLogin({ payload }) {
  try {
    console.log(payload)
    const res = yield call(login, { email: payload.email, password: payload.password })
    yield put(actions.setAuthLogin(res))
  } catch (error) {
    yield put(actions.onError(error))
  }
}

export function* watchSaga() {
  yield takeLatest(actions.authLogin, authLogin)
}
