import { createSlice } from '@reduxjs/toolkit'

export const sliceName = 'main'

const initialState = {
  myLocation: {
    toInitialRegion: false,
    latitude: 37.566352778,
    longitude: 126.977952778,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  },
  markerDatas: [],
  selectedChargeInfo: {},
  selectedMarkerState: 'none',
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

  setSelectedChargeInfo: (state, { payload }) => {
    state.selectedChargeInfo = payload
  },

  setSelectedMarkerState: (state, { payload }) => {
    state.selectedMarkerState = payload
  },

  fetchSearchLocation: (state, { payload }) => {
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
      case 'fetchSearchLocation':
        state.markerDatas = data
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
