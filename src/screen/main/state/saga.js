import { call, put, takeLatest } from 'redux-saga/effects'
import { actions } from './slice'
import { fetchNearestList } from '@network'

export function* fetchSearchLocation({ payload }) {
  try {
    const res = yield call(fetchNearestList, payload.params)
    const data = yield customizing('fetchSearchLocation', res)
    yield put(actions.onSuccessData({ type: 'fetchSearchLocation', data: data }))
  } catch (error) {
    yield put(actions.onError(error))
  }
}

export function* customizing(type, response) {
  switch (type) {
    case 'fetchSearchLocation':
      return customizeSearchLocaiontion(response)
  }
}

export const customizeSearchLocaiontion = response => {
  return response.reduce((result = [], item, index) => {
    result.push({
      ...item,
      isSelect: false,
    })
    return result
  }, [])
}

export function* watchSaga() {
  // 액션이 오면 사가함수를 호출합니다.
  yield takeLatest(actions.fetchSearchLocation, fetchSearchLocation)
}
