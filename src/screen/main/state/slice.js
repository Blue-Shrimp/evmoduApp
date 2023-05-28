import { createSlice } from '@reduxjs/toolkit'

export const sliceName = 'main'

const initialState = {
  myLocation: {
    latitude: 37.498095,
    longitude: 127.02751,
  },
  markerDatas: [],
  loading: false,
  error: {
    code: '200',
    message: '',
  },
}

const reducers = {
  setMyLocation: (state, { payload }) => {
    state.myLocation = payload
  },

  setMarkerDatas: (state, { payload }) => {
    state.markerDatas = payload
  },

  fetchLocationList: (state, { payload }) => {
    state.loading = true
  },

  setLoading: (state, { payload }) => {
    state.loading = payload
  },

  setError: (state, { payload }) => {
    state.error = payload
  },

  onSuccessData: (state, { payload }) => {
    let { type, data } = payload
    switch (type) {
      case 'fetchLocationList':
        state.markerDatas = [...state.markerDatas, ...data]
        break
    }
    state.loading = false
  },

  onError: (state, { payload }) => {
    state.loading = false
    console.error(payload?.result?.message)
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
