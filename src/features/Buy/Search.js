import React, { useEffect, useRef, useState } from 'react';
import styles from '../../assets/css/buy/buy_search.module.css';
import { MobileSearch,MobileCatogories } from '../../components/Hero';
import { 
    arrLeft,
  } from "../../assets/images/index";
import { NavLink } from 'react-router-dom';

export const BuySearch=()=>{
    const [toggle ,setToggle] =  useState(false)
    
    return(
        <div className={styles.buySearcCont}>
            <NavLink to="/" className={styles.buyBack}>
                <img src={arrLeft} height="24px"/>
                <span>Back</span>
            </NavLink>
            <div className={toggle ? styles.bSeach1   : styles.bSeach}>
                <span className={styles.textMid}>WHAT ARE YOU LOOKING FOR?</span>
                <MobileSearch toggle={toggle} setToggle={setToggle}/>
            </div>
            <MobileCatogories/>
        </div>
    );
}