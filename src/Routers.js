import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomeLayout } from './layouts/HomeLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ContentConatiner } from './components/ContentContainer';
import { MyProfile } from './pages/ProfilePage';
import { ProductDescription,ProductImgVideo,ProductMetaData,ProductReview} from './pages/ProductDesc';
import { SelectAdvtType,PostAdvt ,AdvtMedia,AdvtLocation,AdvtPrice,AdvtProdData} from './pages/PostAdvt';
import { 
  LoginRegister,
  OtpVervicatonForm,
  Signup,
  Login
} from './pages/LoginRegister';
import PrivateRoutes from './components/PrivateRoute';

export const Routers=()=>{
    return(
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes/>}>
        <Route
            exact
            path="/"
            element={
              localStorage.getItem("token") ? (
                <Navigate replace to="/dashboard/" />
              ) : (
                <Navigate replace to="/" />
              )
            }
          />
           {/* dashbaord */}
             <Route path="dashboard" element={<DashboardLayout/>}>
            <Route index element={<MyProfile/>}/>
          </Route>
        </Route>
        <Route path='/' element={<HomeLayout/>}>
          <Route index element={<ContentConatiner specs={false}/>}/>
          <Route path='specialization' element={<ContentConatiner specs={true}/>}/>
        
          {/* Authentication */}
          <Route path="/user" element={<LoginRegister/>}>
            <Route path="login" element={<Login/>}/>
            <Route path="registeration" element={<Signup/>}/>
            <Route path='verifyotp' element={<OtpVervicatonForm/>}/>
          </Route>

          {/* ProductDescription */}
          <Route path='products/:proddetails' element={<ProductDescription/>}>
            <Route index element={<ProductImgVideo/>}/>
            {/* <Route path='info' element={<ProductMetaData/>}/> */}
            <Route path='review' element={<ProductReview/>}/>
          </Route>

          {/* post advertisement */}

          <Route path='post' element={<PostAdvt/>}>
              <Route index element={<SelectAdvtType/>}/>
              <Route path='media' element={<AdvtMedia/>}/>
              <Route path='location' element={<AdvtLocation/>}/>
              <Route path='pricing' element={<AdvtPrice/>}/>
              <Route path='specifications' element={<AdvtProdData/>}/>
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
    );
}