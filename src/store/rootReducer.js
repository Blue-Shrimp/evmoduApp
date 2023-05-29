import { combineReducers } from '@reduxjs/toolkit'
import { reducer as reducerMain } from '@screens/main/state'
import { reducer as reducerAuth } from '@screens/mypage/state'

const rootReducer = combineReducers({
  main: reducerMain,
  auth: reducerAuth,
})

export default rootReducer
