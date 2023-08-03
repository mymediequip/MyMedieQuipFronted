import { configureStore } from '@reduxjs/toolkit'
import authSlice from './Slices/AuthSlice';
export default configureStore({
  reducer: {
     auth:authSlice,
  },
});