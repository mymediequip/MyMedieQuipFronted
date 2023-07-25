import React from 'react';
import { Navigation } from '../components/Navigation';
import { ContentConatiner } from '../components/ContentContainer';
import { Footer } from '../components/Footer';
export const HomeLayout=()=>{
    return(
        <React.Fragment>
            <Navigation/>
            <ContentConatiner/>
            <Footer/>
        </React.Fragment>
    );
}