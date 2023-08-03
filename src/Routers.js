import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeLayout } from './layouts/HomeLayout';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ContentConatiner } from './components/ContentContainer';
import { MyProfile } from './pages/ProfilePage';
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
          <Route path="dashboard" element={<DashboardLayout/>}>
            <Route index element={<MyProfile/>}/>
          </Route>
          <Route path="/user" element={<LoginRegister/>}>
            <Route path="login" element={<Login/>}/>
            <Route path="registeration" element={<Signup/>}/>
            <Route path='verifyotp' element={<OtpVervicatonForm/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    );
}