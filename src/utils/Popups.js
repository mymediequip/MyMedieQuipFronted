import React from 'react';
import { Login,OtpVervicatonForm} from '../features/Auth/LoginRegister';
import styles from '../assets/css/utils.module.css';
import { useState } from 'react';
import { FacebookShareButton, TwitterShareButton ,LinkedinShareButton,EmailShareButton,WhatsappShareButton} from 'react-share';
import {
    linkdinLogin,
    fbllogin,
    whatsApp2,
    twitter2,
    email2
} from '../assets/images/index';
import { useLocation } from 'react-router-dom';

export const SocialShare=(props)=>{
    const {pathname}=useLocation();
    let shareUrl=process.env.REACT_APP_URL+pathname;
    console.log(shareUrl)
    let title="Checkout this ";
    return(
        <React.Fragment>
            <WhatsappShareButton url={shareUrl} title={title} ><img alt='...' src={whatsApp2}/></WhatsappShareButton>
            <EmailShareButton url={shareUrl} title={title} ><img alt='...' src={email2}/></EmailShareButton>
            <TwitterShareButton url={shareUrl} title={title} ><img alt='...' src={twitter2}/></TwitterShareButton>
            <FacebookShareButton url={shareUrl} quote={title} ><img alt='...' src={fbllogin}/></FacebookShareButton>
            <LinkedinShareButton url={shareUrl} title={title} ><img alt='...' src={linkdinLogin}/></LinkedinShareButton>
        </React.Fragment>
    );
};

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

export const TextModel=(props)=>{
    let cancelBtn  = props.setPopUp
    let meetingBtn = props.setMeeting
    return(
        <div className={styles.textContainer}>
            <div onClick={()=>{cancelBtn(false);meetingBtn(false)}} className={styles.cancelBtn}>
                <b><i  class="bi bi-x-lg"></i></b>
            </div>
            <div className={styles.textDec}>
            <p className={styles.pText}>Your Meeting is already Sheduled !</p>
              <div className={styles.buttonDec}>
                <button onClick={()=>cancelBtn(false)} className={styles.btnDec}>Reshedule</button>
                <button onClick={()=>{cancelBtn(false);meetingBtn(false)}} className={styles.btnDec1}>Cancel</button>
              </div>
            </div>
        </div>
    );
};

export const BackgroundBlur=()=>{
    return(
        <div className={styles.bgBlur}></div>
    );
};