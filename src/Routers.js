import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeLayout } from './layouts/HomeLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ContentConatiner } from './components/ContentContainer';
import { MyProfile } from './pages/ProfilePage';
import { ProductDescription,ProductImgVideo,ProductMetaData,ProductReview} from './pages/ProductDesc';
import { 
  LoginRegister,
  OtpVervicatonForm,
  Signup,
  Login
} from './pages/LoginRegister';

export const Routers=()=>{
    return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeLayout/>}>
          <Route index element={<ContentConatiner specs={false}/>}/>
          <Route path='specialization' element={<ContentConatiner specs={true}/>}/>
          
          {/* dashbaord */}
          <Route path="dashboard" element={<DashboardLayout/>}>
            <Route index element={<MyProfile/>}/>
          </Route>

          {/* Authentication */}
          <Route path="/user" element={<LoginRegister/>}>
            <Route path="login" element={<Login/>}/>
            <Route path="registeration" element={<Signup/>}/>
            <Route path='verifyotp' element={<OtpVervicatonForm/>}/>
          </Route>

          {/* ProductDescription */}
          <Route path='products/:proddetails' element={<ProductDescription/>}>
            <Route index element={<ProductImgVideo/>}/>
            <Route path='info' element={<ProductMetaData/>}/>
            <Route path='review' element={<ProductReview/>}/>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
    );
}