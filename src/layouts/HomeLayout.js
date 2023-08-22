import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer2,MobileBottomNavbar} from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { MobileHero } from '../components/Hero';
export const HomeLayout=()=>{
    return(
        <React.Fragment>
            <Navigation />
            <MobileHero/>   
            <Outlet/>
            <Footer2/>   
            <MobileBottomNavbar/>
        </React.Fragment>
    );
};