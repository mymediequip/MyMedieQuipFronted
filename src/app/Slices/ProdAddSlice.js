import { createSlice } from '@reduxjs/toolkit'
import { postData } from '../../services';

export const prodAddSlice = createSlice({
  name: 'prodAdd',
  initialState: {
    prodAddData:{
        selectedPostType:null,
        prodImgs:[],
        prodVideos:[],
        Equip_name:null,
        Equip_categories:[],
        Equip_spacality:null,
        Equip_location:null,
        Compatible_Models:null,
        Prod_price:null,
        specialtiey:null,
        location:{
            lang:null,
            lat:null
        },
        prodCondition : {
          condition:null,
          price:null,
          negotiable:null,
          prod_desc:null,
        },
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
    setEquip_Location : (state,action)=>{
      state.prodAddData.Equip_location=action.payload
    },
    fetchEuipCategories : (state,action)=>{
      state.prodAddData.Equip_categories=action.payload
    },

    setManufacturingYear : (state,action)=>{
      state.prodAddData.purchase_year=action.payload
    },
    setEquipCondition : (state,action)=>{
      const { name, value } = action.payload;
      state.prodAddData.prodCondition[name] = value;
    },
    setEquipSpecification : (state,action)=>{
      const { name, value } = action.payload;
      state.prodAddData.specifications[name] = value;
    },
    setProdPrice : (state,action)=>{
      state.prodAddData.Prod_price=action.payload
    },
    setCompatibleModels : (state,action)=>{
      state.prodAddData.Compatible_Models=action.payload
    },
    clearProdAddData : (state)=>{
      state.prodAddData = {
        selectedPostType:null,
        prodImgs:[],
        prodVideos:[],
        Equip_name:null,
        Equip_categories:[],
        Equip_spacality:null,
        Equip_location:null,
        Compatible_Models:null,
        Prod_price:null,
        specialtiey:null,
        location:{
            lang:null,
            lat:null
        },
        prodCondition : {
          condition:null,
          price:null,
          negotiable:null,
          prod_desc:null,
        },
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
export const { setType , addImg , removeImg ,addVideos ,removeVideo , setEquipmentName ,setManufacturingYear ,setEquipSpecification , setCompatibleModels ,setProdPrice ,clearProdAddData ,setEquipCondition ,setEquip_Location , fetchEuipCategories} = prodAddSlice.actions

// Asynchronous thunk action
export const fetchCategories = (Equip_name ,id)=>async(dispatch)=>{
 const data  = {
   q : Equip_name 
  //  parent : id
 }
 console.log(id,"id")
  try {
    const res = await postData("product/category/menulist/" , data)
    console.log(res.data,"res redux")
    dispatch(fetchEuipCategories(res?.data))
  } catch (error) {
    console.log(error,"error")
  }
}

export default prodAddSlice.reducer