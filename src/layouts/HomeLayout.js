import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Outlet } from 'react-router-dom';
export const HomeLayout=()=>{
    return(
        <React.Fragment>
            <Navigation/>
            <Outlet/>
            <Footer/>   
        </React.Fragment>
    );
};