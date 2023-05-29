import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import { watchSaga as watchMain } from '@screens/main/state'
import { watchSaga as watchAuth } from '@screens/mypage/state'

function* rootSaga() {
  yield all([watchMain(), watchAuth()])
}

export const sagaMiddleware = createSagaMiddleware()
export default rootSaga
