import React, { useEffect } from 'react';
import { NavLink,useNavigate,Outlet, useLocation} from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLocation, changeLoginStatus } from '../app/Slices/AuthSlice';
import styles from '../assets/css/loginregister.module.css';
import PhoneInput from 'react-phone-input-2';
import OtpInput from 'react-otp-input';
import { Loader } from '../components/Loader';
import 'react-phone-input-2/lib/style.css';
import { Toaster ,toast } from '../utils/Toaster';
import {
    loginBg,
    howWeWorks,
    linkdinLogin,
    fbllogin,
    googleLogin,
} from '../assets/images/index';
import { postData } from '../services';
import { getUserData } from '../app/Slices/UserData';


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

export const FormContainer=()=>{
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
  
    const navigate=useNavigate();
    const handleSignupSubmition=(event)=>{
        event.preventDefault();
        navigate("/user/verifyotp/")
    };

    return(
        <form className={styles.signupForm} onSubmit={handleSignupSubmition}>
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

export const Login=(props)=>{
    const location=useLocation()
    const dispatch =  useDispatch()
    const navigateTo=location?.state?.navigateTo;

    const [isPhone,setIsphone]=useState(true);
    const [phoneError, setPhoneError] = useState('');
    const [mobile,setMobile]=useState("");
    const navigate=useNavigate();
    const activeStyle={
        backgroundColor:"#019C89",
        color:"#FFFFFF"
    }

    const validatePhone = () => {
        if (!mobile) {
          setPhoneError('Phone number is required');
          return false;
        }else if(mobile.length < 10){
            setPhoneError('Phone number must be 10 digits');
          return false;
        }
        // Add more validation logic if needed
        setPhoneError('');
        return true;
      };


    const handleLoginSubmition= async(event)=>{
        event.preventDefault();
        if (validatePhone()){
            const data = {
                mobile :  mobile
                // mobile : "9716924981"
            }
            const res =  await postData("users/generateotp/" , data)
            if(res?.status){
                toast.success("Mobile Number verified !")
                dispatch(changeLocation(true))
                setTimeout(()=>{
                    if(props.setOtpForm){
                        props.setOtpForm(true);
                        props.setotp(res?.data?.otp)
                        props.setNumber(mobile)
                        return;
                      }else{
                      navigate("/user/verifyotp/" , {state : {otp : res?.data?.otp , number :  mobile , navigateTo : navigateTo}})
                      }

                },2000)
            }
        }
       
    }    
    return(
       <>
       <Toaster/>
        <form className={styles.signupForm} onSubmit={handleLoginSubmition}>
            <div className={styles.loginOptions}>
                <label onClick={()=>{setIsphone(true)}} style={isPhone?activeStyle:{}}>Mobile Number</label>
                <label onClick={()=>{setIsphone(false)}} style={isPhone?{}:activeStyle}>Email Id</label>
            </div>
            {
                isPhone?<div>
                <p style={{marginBottom:"8px"}}>MOBILE NO.</p>
                <PhoneInput 
                country={'in'} 
                value={mobile}
                inputStyle={{width:"100%",backgroundColor:"#FAFFFE" }}
                onChange={(phone)=>setMobile(phone)}
                onBlur={validatePhone}
                
                />
                {phoneError && <div style={{color : 'red'}}>{phoneError}</div>}
                </div>:
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
       </>
    );
};

export const OtpVervicatonForm=({getOtp,number})=>{
    const reLoadPage = useSelector((state)=>state.auth.onReload)
   const location  =  useLocation()
   const preOtp = location?.state?.otp;
   const preNumber = location?.state?.number;
   const navigateTo= location?.state?.navigateTo ?   location?.state?.navigateTo : "/dashboard/";
    const [otp, setOtp] = useState("");
    const [otpError,setOtpError]=useState(false);
    const [otpTime,setOtpTime]=useState({minute:4,sec:59});

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const styleInpute={
        width:"30px",
        height:"30px",
        margin:"auto",
        backgroundColor:"#FAFFFE",
        border:"1px solid #DDE6E4",
        borderRadius:"2px",
        outline:"1px solid #019C89",
    };

    useEffect(()=>{
      if(!reLoadPage){
        navigate("/user/login/")
      }
    },[reLoadPage])
   
    useEffect(()=>{
        const interval = setInterval(() => {
            if (otpTime.minute === 0 && otpTime.sec === 0) {
                // Timer expired
                clearInterval(interval);
                // Handle timer expiration if needed
            } else {
                if (otpTime.sec === 0) {
                    setOtpTime(prevTime => ({ minute: prevTime.minute - 1, sec: 59 }));
                } else {
                    setOtpTime(prevTime => ({ ...prevTime, sec: prevTime.sec - 1 }));
                }
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    },[otpTime]);
         

    useEffect(()=>{
      handleOtp()
    },[otp])

    const handleOtp = async() => {
        if(otp.length===6 && /^\d+$/.test(otp)){
            let data = {
                mobile : preNumber || number,
                otp : otp || getOtp
            }
           const res = await postData("users/verifyotp/",data);
           if(res?.status){
            setOtpError(false)
            dispatch(changeLocation(false))
            toast.success("Verified OTP SuccessFully !")
            localStorage.setItem("token" , res?.data?.token)
            setTimeout(()=>{
                dispatch(getUserData(res?.data))
                dispatch(changeLoginStatus(true))
                navigate(navigateTo);
            },2000)
           }
           else{
            setOtpError(true);
           } 
        }
    }


    return(

        <>
        <Toaster/>
        <div className={styles.otpVerifyCont}>
            <div>
                <h4 style={{color:"black"}}>Verification Code {preOtp || getOtp}</h4>
                <p>Enter the 6 digit OTP Send to you phone number</p>
            </div>
            { otpError && <p style={{color:"red"}}>Invalid OTP</p> }
            <div className={styles.otp_digits}>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    inputStyle={styleInpute}
                    renderSeparator={<span></span>}
                    renderInput={(props) => <input {...props} />}
                />
            </div>
            <p>Code Expire in 0{otpTime.minute}:{otpTime.sec%10===otpTime.sec?"0"+otpTime.sec:otpTime.sec} </p>
            {
                otpTime.minute===0 && otpTime.sec===0?<NavLink>Resend</NavLink>:""
            }
        </div>
        </>
    );
}
// non components function

const ActivateLink=({isActive})=>{
    return {
        borderBottom: isActive?"2px solid black":"none",
        color:isActive?"black":"#A3A3A3"
    };
}