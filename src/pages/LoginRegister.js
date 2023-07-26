import React from 'react';
import styles from '../assets/css/loginregister.module.css';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import {
    loginBg,
    howWeWorks
} from '../assets/images/index';
import { NavLink } from 'react-router-dom';

export const LoginRegister=()=>{
    const Style1={backgroundImage:`url(${loginBg})`};
    return(
        <div style={Style1} className={styles.userContainer} >
            <div className={styles.lrContent}>
                <h3>How MedieQuip Works?</h3>
                <img src={howWeWorks} alt='...'/>
                <p>If Inspection Engineer Does Not Find Equipment in Acceptable Condition.<br/> Amount paid for blocking will be refunded</p>
            </div>
            <FormContainer/>
        </div>
    );
};

const FormContainer=()=>{
    return(
        <div className={styles.FormContainer}>
            <div className={styles.formHead}>
                <span>SIGN IN</span>
                <span>SIGN UP</span>
            </div>
            <Signup/>
        </div>
    );
};

const Signup=()=>{
    return(
        <form className={styles.signupForm}>
            <div>
                <p>MOBILE NO.</p>
                <PhoneInput 
                country={'in'} 
                value="91"
                inputStyle={{width:"100%",backgroundColor:"#FAFFFE"}}
                />
            </div>
            <div className={styles.registerType}>
                <p for="buyerSeller">WHATS BEST DECRIBES YOU </p >
                <label className={styles.registerRadio} >
                    <span><input id="buyerSeller" name="buyerSeller" type='radio'/>BUYER </span>
                    <span><input id="buyerSeller" name="buyerSeller" type='radio'/>SELLER </span>
                </label>
            </div>
            <input type='text' placeholder='GSTIN Number'/>
            <input type='submit' value='GET OTP'/>
            <label style={{textAlign:"center"}} >Already have an account ? <NavLink to="#">Sign In</NavLink></label>
        </form>
    );
};