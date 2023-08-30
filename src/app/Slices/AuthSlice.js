import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'counter',
  initialState: {
    isLogin: false,
    onReload : false,
  },
  reducers: {
    changeLoginStatus: (state) => {
      state.isLogin=!state.isLogin;
    },
    changeLocation: (state) => {
      state.onReload=!state.isLogin;
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeLoginStatus , changeLocation} = loginSlice.actions

export default loginSlice.reducer