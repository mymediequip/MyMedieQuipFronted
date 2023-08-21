import { createSlice } from '@reduxjs/toolkit'

export const prodAddSlice = createSlice({
  name: 'prodAdd',
  initialState: {
    prodAddData:{
        selectedPostType:null,
        prodImgs:[],
        prodVideos:[],
        Equip_name:null,
        specialtiey:null,
        location:{
            lang:null,
            lat:null
        },
        condition:null,
        price:null,
        nogitate:null,
        prod_desc:null,
        purchase_year:null,
        specifications:{
            brand:null,
            model:null,
            waranty:null,
            amc_cme:null,
            other_details:null
        }
    }
  },
  reducers: {
    setType: (state,action) => {
      state.prodAddData.selectedPostType=action.payload.selected;
    },
  },
})

// Action creators are generated for each case reducer function
export const { setType} = prodAddSlice.actions

export default prodAddSlice.reducer