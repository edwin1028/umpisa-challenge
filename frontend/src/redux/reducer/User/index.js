import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: null,
}

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload
    },
  },
})

export const { setUserData } = slice.actions

export default slice.reducer