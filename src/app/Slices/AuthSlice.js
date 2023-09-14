import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'counter',
  initialState: {
    isLogin: false,
    onReload : "",
  },
  reducers: {
    changeLoginStatus: (state) => {
      state.isLogin=!state.isLogin;
    },
    changeLocation: (state) => {
      state.onReload=!state.onReload;
    },
    clearLocation: (state) => {
      state.onReload = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeLoginStatus , changeLocation , clearLocation} = loginSlice.actions

export default loginSlice.reducer