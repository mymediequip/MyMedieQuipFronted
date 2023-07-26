import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeLayout } from './layouts/HomeLayout';
import { ContentConatiner } from './components/ContentContainer';
import { LoginRegister } from './pages/LoginRegister';
export const Routers=()=>{
    return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeLayout/>}>
          <Route index element={<ContentConatiner specs={false}/>}/>
          <Route path='specialization' element={<ContentConatiner specs={true}/>}/>
          <Route path="/login" element={<LoginRegister/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
    );
}