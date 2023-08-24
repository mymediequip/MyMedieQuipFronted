import { createSlice } from '@reduxjs/toolkit'

export const prodAddSlice = createSlice({
  name: 'prodAdd',
  initialState: {
    prodAddData:{
        selectedPostType:null,
        prodImgs:[],
        prodVideos:[],
        Equip_name:null,
        Compatible_Models:null,
        Prod_price:null,
        specialtiey:null,
        location:{
            lang:null,
            lat:null
        },
        condition:null,
        price:null,
        negotiable:null,
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
    addImg : (state,action) =>{
      state.prodAddData.prodImgs.push(action.payload)
    },
    removeImg : (state,action)=>{
      console.log(action.payload,"action")
      state.prodAddData.prodImgs = state.prodAddData.prodImgs.filter(
        image => image.id !== action.payload
      );
    },
    addVideos : (state,action) =>{
      state.prodAddData.prodVideos.push(action.payload)
    },
    removeVideo : (state,action)=>{
      state.prodAddData.prodVideos = state.prodAddData.prodVideos.filter(
        video => video.id !== action.payload
      );
    },
    setEquipmentName : (state,action)=>{
      state.prodAddData.Equip_name=action.payload
    },
    setEuipCondition : (state,action)=>{
      state.prodAddData.condition=action.payload
    },
    setEuipPrice : (state,action)=>{
      state.prodAddData.price=action.payload
    },
    setEuipNegot : (state,action)=>{
      state.prodAddData.negotiable=action.payload
    },
    setEuipDisc : (state,action)=>{
      state.prodAddData.prod_desc=action.payload
    },
    setManufacturingYear : (state,action)=>{
      state.prodAddData.purchase_year=action.payload
    },
    setEquipSpecification : (state,action)=>{
      const {name,value} = action?.payload
      state.prodAddData.specifications[name] = value;
    },
    setProdPrice : (state,action)=>{
      state.prodAddData.Prod_price=action.payload
    },
    setCompatibleModels : (state,action)=>{
      state.prodAddData.Compatible_Models=action.payload
    },
    clearProdAddData : (state,action)=>{
      state.prodAddData = {
        selectedPostType:null,
        prodImgs:[],
        prodVideos:[],
        Equip_name:null,
        Compatible_Models:null,
        Prod_price:null,
        specialtiey:null,
        location:{
            lang:null,
            lat:null
        },
        condition:null,
        price:null,
        negotiable:null,
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
    }

  },
})

// Action creators are generated for each case reducer function
export const { setType , addImg , removeImg ,addVideos ,removeVideo , setEquipmentName ,setEuipCondition ,setEuipPrice ,setEuipNegot ,setEuipDisc ,setManufacturingYear ,setEquipSpecification , setCompatibleModels ,setProdPrice ,clearProdAddData} = prodAddSlice.actions

export default prodAddSlice.reducer