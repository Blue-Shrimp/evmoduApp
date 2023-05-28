import { call, put, takeLatest } from 'redux-saga/effects'
import { actions } from './slice'
import { fetchNearestList } from '@network'

export function* fetchSearchLocation({ payload }) {
  try {
    const res = yield call(fetchNearestList, payload.params)
    yield put(actions.onSuccessData({ type: 'fetchSearchLocation', data: res }))
  } catch (error) {
    yield put(actions.onError(error))
  }
}

export function* watchSaga() {
  // 액션이 오면 사가함수를 호출합니다.
  yield takeLatest(actions.fetchSearchLocation, fetchSearchLocation)
}
