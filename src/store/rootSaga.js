import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'

import { watchSaga as watchMain } from '@screens/main/state'

function* rootSaga() {
  yield all([watchMain()])
}

export const sagaMiddleware = createSagaMiddleware()
export default rootSaga
