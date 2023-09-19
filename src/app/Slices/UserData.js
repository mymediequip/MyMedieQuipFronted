import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    UserData : {},
    profile_image : null,
    currBuyStatus:0,
    eqip_price_update:0,
    eqip_discount:0,
    inspection_status : false,
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
    setEquipPriceStatus:(state,action)=>{
      state.eqip_price_update=action.payload
    },
    setDiscountPriceStatus:(state,action)=>{
      state.eqip_discount=action.payload
    },
    setInspectionStatus:(state)=>{
      state.inspection_status= !state.inspection_status
    },
    addToCart:(state,action)=>{
      state.cart.push(action.payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { getUserData ,getProfileImage,setCurrBuyStatus , setEquipPriceStatus , setInspectionStatus , setDiscountPriceStatus ,addToCart} = UserSlice.actions
// export const { addToCart,getUserData ,getProfileImage,setCurrBuyStatus} = UserSlice.actions


export default UserSlice.reducer