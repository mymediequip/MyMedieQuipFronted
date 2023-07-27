import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeLayout } from './layouts/HomeLayout';
import { ContentConatiner } from './components/ContentContainer';
import { LoginRegister } from './pages/LoginRegister';
import { Signup,Login} from './pages/LoginRegister';
export const Routers=()=>{
    return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeLayout/>}>
          <Route index element={<ContentConatiner specs={false}/>}/>
          <Route path='specialization' element={<ContentConatiner specs={true}/>}/>
          <Route path="/user" element={<LoginRegister/>}>
            <Route path="login" element={<Login/>}/>
            <Route path="registeration" element={<Signup/>}/>
          </Route>
        </Route>
        
      </Routes>
    </BrowserRouter>
    );
}