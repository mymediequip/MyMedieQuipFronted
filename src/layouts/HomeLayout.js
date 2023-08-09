import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer,Footer2 } from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { MobileHero } from '../components/Hero';
export const HomeLayout=()=>{
    return(
        <React.Fragment>
            <Navigation />
            <MobileHero/>
            <Outlet/>
            <Footer2/>   
        </React.Fragment>
    );
};