import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    UserData : {},
    profile_image : null,
  },
  reducers: {
    getUserData : (state,action)=>{
      state.UserData=action.payload
    },
    getProfileImage : (state,action)=>{
        state.profile_image=action.payload
      }
  },
})

// Action creators are generated for each case reducer function
export const { getUserData ,getProfileImage} = UserSlice.actions


export default UserSlice.reducer