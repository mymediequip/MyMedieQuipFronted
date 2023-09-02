import React from 'react';
import { Login,OtpVervicatonForm} from '../pages/LoginRegister';
import styles from '../assets/css/utils.module.css';
import { useState } from 'react';


export const GetStarted=(props)=>{
    const [otpForm,setOtpForm]=useState(false);
    const [otp ,setotp] =  useState("")
    const [number ,setNumber] =  useState("")

    const handleClose=()=>{
        props.setGetStart(false);
        props.setBlur(false);
    };
    return(
        <div className={styles.getStartContainer}>
            <div className={styles.getStartTop}>
                <h2>Get Started</h2>
                <b><i onClick={handleClose} class="bi bi-x-lg"></i></b>
            </div>
            <p className={styles.getStartInd}>Verify Your OTP  To access your account</p>
            {
                otpForm?<OtpVervicatonForm getOtp={otp} setotp={setotp} number={number} setGetStart={props.setGetStart} setBlur={props.setBlur} />:<Login setOtpForm={setOtpForm}  setotp={setotp} setNumber={setNumber}/>
            }
        </div>
    );
};

export const BackgroundBlur=()=>{
    return(
        <div className={styles.bgBlur}></div>
    );
};