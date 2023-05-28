import { combineReducers } from '@reduxjs/toolkit'
import { reducer as reducerMain } from '@screens/main/state'

const rootReducer = combineReducers({
  main: reducerMain,
})

export default rootReducer
