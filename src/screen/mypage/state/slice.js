import { createSlice } from '@reduxjs/toolkit'

export const sliceName = 'auth'
const initialState = {
  auth: null,
  profile: {},
  join: null,
  error: null,
  loading: false,
}

const reducers = {
  setAuthLogin: (state, { payload }) => {
    state.loading = false
    state.auth = payload
  },
  setProfile: (state, { payload }) => {
    state.loading = false
    state.profile = payload
  },
  setPostJoin: (state, { payload }) => {
    state.loading = false
    state.join = payload
  },
  setError: (state, { payload }) => {
    state.error = payload
  },
  authLogin: (state, { payload }) => {
    state.loading = true
  },
  getUser: (state, { payload }) => {
    state.loading = true
  },
  patchUser: (state, { payload }) => {
    state.loading = true
  },
  postJoin: (state, { payload }) => {
    state.loading = true
  },
  onDone: (state, { payload }) => {
    state.loading = false
    state.done = payload
  },
  onError: (state, { payload }) => {
    if (payload) {
      state.error = payload
    } else {
      state.error = null
    }
  },
}

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers,
})

export const states = state => state[sliceName]
export const actions = slice.actions
export const reducer = slice.reducer
