import React from 'react';
import styles from '../assets/css/loginregister.module.css';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Outlet } from 'react-router-dom';
import {
    loginBg,
    howWeWorks,
    linkdinLogin,
    fbllogin,
    googleLogin,
} from '../assets/images/index';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

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
                <NavLink to="/user/login/" style={ActivateLink}>SIGN IN</NavLink>
                <NavLink to='/user/registeration/' style={ActivateLink}>SIGN UP</NavLink>
            </div>
            <Outlet/>
        </div>
    );
};

export const Signup=()=>{
    return(
        <form className={styles.signupForm}>
            <div>
                <p style={{marginBottom:"8px"}}>MOBILE NO.</p>
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

export const Login=()=>{
    const [isPhone,setIsphone]=useState(true);
    const activeStyle={
        backgroundColor:"#019C89",
        color:"#FFFFFF"
    }
   
    return(
        <form className={styles.signupForm}>
            <div className={styles.loginOptions}>
                <label onClick={()=>{setIsphone(true)}} style={isPhone?activeStyle:{}}>Phone Number</label>
                <label onClick={()=>{setIsphone(false)}} style={isPhone?{}:activeStyle}>Email Id</label>
            </div>
            {
                isPhone?<div>
                <p style={{marginBottom:"8px"}}>MOBILE NO.</p>
                <PhoneInput 
                country={'in'} 
                value="91"
                inputStyle={{width:"100%",backgroundColor:"#FAFFFE"}}
                /></div>:
                <div className={styles.emailLogin}>
                    <p style={{marginBottom:"8px"}}>EMAIL ID</p>
                    <input type='email'/>
                    <p style={{marginBottom:"8px"}}>PASSWORD</p>
                    <input type='password'/>
                    <NavLink to="/" className={styles.forgot}>Forgot Password</NavLink>
                    <div className={styles.socialLogin}>
                        <span>Or, Sign Up with</span>
                        <img src={fbllogin} alt='fb'/>
                        <img src={linkdinLogin} alt='fb'/>
                        <img src={googleLogin} alt='fb'/>
                    </div>
                </div>
            }
            <input type='submit' value={isPhone?"GET OTP":"Sign In"}/>
            <label style={{textAlign:"center"}} >Don’t have an account ? <NavLink to="#">Sign Up</NavLink></label>
        </form>
    );
};

// non components function

const ActivateLink=({isActive})=>{
    return {
        borderBottom: isActive?"2px solid black":"none",
        color:isActive?"black":"#A3A3A3"
    };
}