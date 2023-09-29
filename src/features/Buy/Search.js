import React, {useState } from 'react';
import styles from '../../assets/css/buy/buy_search.module.css';
import { MobileSearch,MobileCatogories } from '../../components/Hero';
import { 
    arrLeft,
  } from "../../assets/images/index";
import { NavLink, useLocation } from 'react-router-dom';

export const BuySearch=()=>{
    const {pathname}=useLocation();
    console.log(pathname);
    let currSearch="WHAT ARE YOU LOOKING FOR?";
    if(pathname==="/speciality-search/"){
        currSearch="WHAT SPECIALITY ARE YOUR LOOKING FOR?";
    }

    
    return(
        <div className={styles.buySearcCont}>
            <NavLink to="/" className={styles.buyBack}>
                <img src={arrLeft} height="24px"/>
                <span>Back</span>
            </NavLink>
            <div className={styles.bSeach}>
                <span className={styles.textMid}>{currSearch}</span>
                <MobileSearch/>
            </div>
            <MobileCatogories/>
        </div>
    );
}