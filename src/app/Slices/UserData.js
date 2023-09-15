import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    UserData : {},
    profile_image : null,
    currBuyStatus:0,
    eqip_price_update:0
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
    setEquipPriceStatus:(state,action)=>{
      state.eqip_price_update=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { getUserData ,getProfileImage,setCurrBuyStatus , setEquipPriceStatus} = UserSlice.actions


export default UserSlice.reducer