import { createSlice } from '@reduxjs/toolkit'
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';

export const mfSlice = createSlice({
  name: 'manufacturer',
  initialState: {
    selectedMF:[],
    selectedCat:[]
  },
  reducers: {
    setSelectedMF: (state,action) => {
      state.selectedMF.push(action.payload);
    },
    removeSelectedMF:(state,action)=>{
        state.selectedMF.splice(state.selectedMF.indexOf(action.payload),1);
    },
    setSelectedCat:(state,action)=>{
        state.selectedCat.push(action.payload);
    },
    removeSelectCat:(state,action)=>{
        state.selectedCat.splice(state.selectedCat.indexOf(action.payload),1);
    }
    
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedMF , removeSelectedMF , setSelectedCat,removeSelectCat} = mfSlice.actions

export default mfSlice.reducer