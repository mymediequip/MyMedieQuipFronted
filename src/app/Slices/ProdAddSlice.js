import { createSlice } from '@reduxjs/toolkit'
import {  postData } from '../../services';

export const prodAddSlice = createSlice({
  name: 'prodAdd',
  initialState: {
    prodAddData:{
        selectedPostType:null,
        prodImgs:[],
        prodVideos:[],
        Equip_name:null,
        Equip_categories:[],
        Parent_Name:[],
        specialtiey_name:[],
        categories:[],
        specility:[],
        Equip_spacality:null,
        Equip_location:null,
        Compatible_Models:null,
        Prod_price:null,
        specialtiey:null,
        location:{
            lang:null,
            lat:null,
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
    setCategories: (state,action)=>{
      const categoryId = action.payload;
      const index = state.prodAddData.categories?.indexOf(categoryId);

    if (index === -1) {
      // Category was not selected, add it
      state.prodAddData.categories?.push(categoryId);
    } else {
      // Category was selected, remove it
      state.prodAddData.categories?.splice(index, 1);
    }
    },
    setSpecality: (state,action)=>{
      const specialityName = action.payload;
      const index = state.prodAddData.specility?.indexOf(specialityName);

    if (index === -1) {
      // Category was not selected, add it
      state.prodAddData.specility?.push(specialityName);
    } else {
      // Category was selected, remove it
      state.prodAddData.specility?.splice(index, 1);
    }
    },
    setLatLong : (state,action)=>{
      const { name, value } = action.payload;
      state.prodAddData.location[name] = value;
    },
    setEquip_Location : (state,action)=>{
      state.prodAddData.Equip_location=action.payload
    },
    fetchEuipCategories : (state,action)=>{
      state.prodAddData.Equip_categories=action.payload
    },
    fetchParentName : (state,action)=>{
      state.prodAddData.Parent_Name=action.payload
    },
    fetchSpecialName : (state,action)=>{
      state.prodAddData.specialtiey_name=action.payload
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
        Parent_Name:[],
        specialtiey_name:[],
        categories:[],
        specility:[],
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
export const { setType , addImg , removeImg ,addVideos ,removeVideo , setEquipmentName ,setManufacturingYear ,setEquipSpecification , setCompatibleModels ,setProdPrice ,clearProdAddData ,setEquipCondition ,setEquip_Location , fetchEuipCategories , fetchParentName , setCategories ,fetchSpecialName , setSpecality , setLatLong} = prodAddSlice.actions

// Asynchronous thunk action
export const fetchCategories = (Equip_name)=>async(dispatch)=>{
  const formData =  new FormData()
  formData.append("q" ,Equip_name)
  try {
    const res = await postData("product/category/menulist/" , formData  )
    dispatch(fetchEuipCategories(res?.data))
  } catch (error) {
    console.log(error,"error")
  }
}
export const fetchCategoriesName = (id)=>async(dispatch)=>{
  const formData =  new FormData()
  formData.append("id" ,id)
   try {
     const res = await postData("product/category/menulist/" , formData )
     dispatch(fetchParentName(res?.data))
   } catch (error) {
     console.log(error,"error")
   }
 }
 export const fetchSpecialityName = ()=>async(dispatch)=>{
   try {
     const res = await postData("product/speciality/lists/" , "" , true)
     dispatch(fetchSpecialName(res?.data))
   } catch (error) {
     console.log(error,"error")
   }
 }

export default prodAddSlice.reducer