import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    UserData : {},
    profile_image : null,
    currBuyStatus:0,
    cart:[],
  },
  reducers: {
    getUserData : (state,action)=>{
      state.UserData=action.payload
    },
    getProfileImage : (state,action)=>{
        state.profile_image=action.payload
    },
    setCurrBuyStatus:(state,action)=>{
      state.currBuyStatus=action.payload.curr;
    },
    addToCart:(state,action)=>{
      state.cart.push(action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { addToCart,getUserData ,getProfileImage,setCurrBuyStatus} = UserSlice.actions


export default UserSlice.reducer