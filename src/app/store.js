import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Slices/AuthSlice';
import prodAddSlice from './Slices/ProdAddSlice';
export default configureStore({
  reducer: {
     auth:authSlice,
     addProd:prodAddSlice,
  },
});