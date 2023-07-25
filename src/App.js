import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeLayout } from './layouts/HomeLayout';
export const App=()=>{
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeLayout/>}/>
      </Routes>
    </BrowserRouter>
  );
}
