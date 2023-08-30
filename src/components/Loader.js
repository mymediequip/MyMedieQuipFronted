import React from 'react';
import loaderGIF from '../assets/videos/loader.gif';

export const Loader=()=>{
    const loaderDivStyle={
        position:"fixed",
        width:"100vw",
        top:"0px",
        left:"0px",
        height:"100vh",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"rgb(255 255 255 / 68%)",
        zIndex:"6"
    }
    return(
        <div style={loaderDivStyle}>
            <img src={loaderGIF} alt='loader'/>
        </div>
    );
};