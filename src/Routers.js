import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { HomeLayout } from './layouts/HomeLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ContentConatiner } from './components/ContentContainer';
import { MyProfile } from './features/User/buyer_seller/ProfilePage';
import { ProductDescription,ProductImgVideo,ProductMetaData,ProductReview,ProductMeta} from './features/Buy/ProductDesc';
import { SelectAdvtType,PostAdvt ,AdvtMedia,AdvtLocation,AdvtPrice,AdvtProdData} from './features/Sell/PostAdvt';
import { Manufacturer } from './features/Distributor_manufacture/manufacturer';
import { Checkout } from './features/Buy/Checkout';
import { BuySearch } from './features/Buy/Search';
import { DistributorFrom , MANUFACTURERForm} from './features/Distributor_manufacture/forms';
import { 
  LoginRegister,
  OtpVervicatonForm,
  Signup,
  Login
} from './features/Auth/LoginRegister';
import PrivateRoutes from './components/PrivateRoute';
import MyAds from './features/User/buyer_seller/MyAds';
import AllFilterProduct from './components/AllFilterProduct';

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
             <Route path='ads' element={<MyAds/>} />
            </Route>
       </Route>

        <Route path='/' element={<HomeLayout/>}>
          <Route index element={<ContentConatiner specs={false}/>}/>
          <Route path='specialization' element={<ContentConatiner specs={true}/>}/>
           
           {/* search  */}
           <Route path='search' element={<BuySearch/>}/>

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

          {/* search product items  */}
          <Route path='search/search-items/:searchitems' element={<AllFilterProduct/>}/>

          {/* checkout */}
          <Route path='products/:proddetails/checkout' element={<Checkout/>}/>

          {/* post advertisement */}

          <Route path='post' element={<PostAdvt/>}>
              <Route index element={<SelectAdvtType/>}/>
              <Route path='media' element={<AdvtMedia/>}/>
              <Route path='location' element={<AdvtLocation/>}/>
              <Route path='pricing' element={<AdvtPrice/>}/>
              <Route path='specifications' element={<AdvtProdData/>}/>
          </Route>

          {/* Distributor & Manufacturer */}

          <Route path='manufacturers' element={<Manufacturer/>}/>
          <Route path="distributor-form" element={<DistributorFrom/>}/>
          <Route path="manufacturer-form" element={<MANUFACTURERForm/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
    );
}
