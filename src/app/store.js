import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Slices/AuthSlice';
import prodAddSlice from './Slices/ProdAddSlice';
import UserData from './Slices/UserData';
import thunk from 'redux-thunk';
export default configureStore({
  reducer: {
     auth:authSlice,
     addProd:prodAddSlice,
     profileData:UserData
  },
  middleware : [thunk]
});