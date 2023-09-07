import React, { useState } from "react";
import styles from '../../assets/css/buy/checkout.module.css';

export const Checkout=()=>{
    return(
        <div className={styles.checkoutCont}>
            <div className={styles.checkoutData}>
                <CheckoutDataHead seq="1" name="LOGIN"/>
                <DelieveryAddress />
                <CheckoutDataHead seq="3" name="ORDER SUMMARY"/>
                <CheckoutDataHead seq="4" name="PAYMENT OPTIONS"/>
            </div>
            <div className={styles.checkoutPriceData}>

            </div>
        </div>
    );
};

const CheckoutDataHead=(props)=>{
    const handleChange=()=>{
        props.showBottom(true);
    }
    return(
        <div className={styles.checkoutDataHead}>
            <div>
                <span className={styles.checkout1}>{props.seq}</span>
                <span className={styles.checkout2}>{props.name}</span>
            </div>
            <span className={styles.checkout3} onClick={handleChange}>CHANGE</span>
        </div>
    );
};

const DelieveryAddress=()=>{
    const [showAddress,setAddress]=useState(false);
    return(
        <div>
            <CheckoutDataHead seq="2" name="DELIVERY ADDRESS" showBottom={setAddress}/>
            {
                showAddress && 
                <div className={styles.deliveryAdd}>
                    address is here

                </div>
            }

        </div>
    );

}
