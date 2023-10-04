import { createSlice } from '@reduxjs/toolkit'
import { postData } from '../../services';

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    UserData : {},
    UserLists : [],
    profile_image : null,
    currBuyStatus:0,
    eqip_price_update:0,
    eqip_discount:0,
    inspection_status : false,
    meeting_details : {},
    cart:[],
  },
  reducers: {
    getUserData : (state,action)=>{
      state.UserData=action.payload
    },
    getUserLists : (state,action)=>{
      state.UserLists=action.payload
    },
    getProfileImage : (state,action)=>{
        state.profile_image=action.payload
    },
    setCurrBuyStatus:(state,action)=>{
      state.currBuyStatus=action.payload.curr;
    },
    setSheduleMeetingStatus:(state,action)=>{
      state.meeting_details=action.payload;
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
    },
    clearMeetingData : (state)=>{
      state.meeting_details = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { getUserData ,getProfileImage,setCurrBuyStatus , setEquipPriceStatus , setInspectionStatus , setDiscountPriceStatus ,addToCart ,getUserLists ,setSheduleMeetingStatus , clearMeetingData} = UserSlice.actions
// export const { addToCart,getUserData ,getProfileImage,setCurrBuyStatus} = UserSlice.actions

export const fetchUserDetails = (uid)=>async(dispatch) => {
  const formData =  new FormData()
  uid.forEach((id)=>{
    formData.append("uid" , id)
  })
  const res = await postData("users/get_user_detail/" , formData ,true)
  if(res?.status){
    dispatch(getUserLists(res?.data?.profile))
  }
}

export default UserSlice.reducer
