import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
  name: 'counter',
  initialState: {
    isLogin: false,
  },
  reducers: {
    changeLoginStatus: (state) => {
      state.isLogin=!state.isLogin;
    },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { changeLoginStatus} = loginSlice.actions

export default loginSlice.reducer