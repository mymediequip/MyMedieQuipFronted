import React from 'react';
import styles from '../../assets/css/buy/buy_search.module.css';
import { MobileSearch,MobileCatogories } from '../../components/Hero';
import { 
    arrLeft,
  } from "../../assets/images/index";
import { NavLink } from 'react-router-dom';

export const BuySearch=()=>{
    return(
        <div className={styles.buySearcCont}>
            <NavLink to="/" className={styles.buyBack}>
                <img src={arrLeft} height="24px"/>
                <span>Back</span>
            </NavLink>
            <div className={styles.bSeach}>
                <span>WHAT ARE YOU LOOKING FOR?</span>
                <MobileSearch/>
            </div>
            <MobileCatogories/>
        </div>
    );
}