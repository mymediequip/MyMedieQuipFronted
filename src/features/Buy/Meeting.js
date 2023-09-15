import React, { useEffect, useRef, useState } from "react";
import styles from '../../assets/css/buy/meeting.module.css';
import { BackgroundBlur } from "../../utils/Popups";
import { Calander } from "../../utils/Calanders";
import { setCurrBuyStatus } from "../../app/Slices/UserData";
import {
    meetingImg,
    scheduleBtn,
    buyBtn,
    inspectionBtn,
    meetSuccess,
    inspectImg,
    meetIssued
} from '../../assets/images/index';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export const ScheduleMeeting=(props)=>{
    const [isBlur,setBlur]=useState(false);
    const [isSuccess,setSuccess]=useState(false);
    const [isMetScheduled,setMetScheduled]=useState(false);
    const [isInspected,setInpection]=useState(false);
    const [isMeetIssue,setMeetIssue]=useState(false);
    const [isBuyIssue,setBuyIssue]=useState(false);
    const [isBuyOption,setBuyOption]=useState(false);
    const [isBuyClick,setBuyClick]=useState(props.isBuyClick);
    const item =  props?.data
    const profileDetails = props?.profile
    const dispatch=useDispatch();
    const meetRef=useRef();
    const handleSechedule=(e)=>{
        setBlur(!isBlur);
    }
    const handleMeetSuccess=(e)=>{
        setSuccess(!isSuccess);
        setMetScheduled(true);
        console.log("meeting scheduled successfuly");
        dispatch(setCurrBuyStatus({curr:1}));
    };
    const handleInspection=(e)=>{
        if(isMetScheduled){
            setInpection(!isInspected);
        }
        else if(isInspected){
            setInpection(false);
        }
        else{
            setMeetIssue(!isMeetIssue);
        }

        if(isInspected || isMeetIssue){
            meetRef.current.style.backgroundColor="";
        }
        else{
            meetRef.current.style.backgroundColor="#E7E7E7";
        }
        
    };
    const handleBuyIssue=()=>{
        let popup=false;
        if(isMetScheduled){
            setBuyOption(!isBuyOption);
            popup=isBuyOption;
        }
        else if(isBuyOption){
            setBuyOption(false);
            popup=true;
        }
        else{
            setBuyIssue(!isBuyIssue);
            popup=isBuyIssue;
        }
        popup?meetRef.current.style.backgroundColor="":meetRef.current.style.backgroundColor="#E7E7E7";
    };

    useEffect(()=>{
        props.isBuyClick?meetRef.current.style.backgroundColor="#E7E7E7":meetRef.current.style.backgroundColor="";
        setBuyClick(props.isBuyClick);
    },[props.isBuyClick]);
    return(
        <React.Fragment>
            <div className={styles.meetingCont} ref={meetRef}>
                <p style={{textAlign:"right",cursor:"pointer"}}><i class="bi bi-x" onClick={()=>props.setMeeting(false)} ></i></p>
                <div className={styles.meetSchedule}>
                    <img src={meetingImg} alt="..."/>
                    <b>Meeting Scheduling</b>
                    <p>Schedule a online meeting with the seller to get equipment Information.</p>
                    <img alt="..." src={scheduleBtn} height="55px" onClick={handleSechedule}/>
                </div>
                <div className={styles.meetButons}>
                    <img alt="..." src={inspectionBtn} onClick={handleInspection} height="55px"/>
                    <img alt="..." src={buyBtn} onClick={handleBuyIssue} height="55px"/>
                </div>
                {isInspected && <InspectionReport handleInspection={handleInspection} item={item} profileDetails={profileDetails}/>}
                {isMeetIssue && <MeetingIssue handleInspection={handleInspection} setInpection={setInpection} setMeetIssue={setMeetIssue}/>}
                {isBuyIssue && <BuyIssue setBuyIssue={setBuyIssue} handleBuyIssue={handleBuyIssue} setBuyOption={setBuyOption}/>}
                {isBuyOption && <SelectServices handleBuyIssue={handleBuyIssue} item={item} profileDetails={profileDetails}/>}
                {isBuyClick && <AskInspection setBuyOption={setBuyOption}setInpection={setInpection} setBuyClick={setBuyClick}/>}
            </div>
            { 
                isBlur && 
                <React.Fragment>
                    <BackgroundBlur/>
                    { isSuccess?<MeetingSuccess handleSechedule={handleSechedule}/>:<Calander handleMeetSuccess={handleMeetSuccess}/> }
                </React.Fragment>  
            }
        </React.Fragment>
    );
};

const MeetingSuccess=(props)=>{
    return(
        <div className={styles.meetSuccessCont}>
            <div className={styles.successCross}><i class="bi bi-x" onClick={props.handleSechedule}></i></div>
            <img alt="..." src={meetSuccess} style={{marginBottom:"10px"}} />
            <b style={{marginBottom:"10px"}}>Meeting Scheduled</b>
            <p className={styles.meetNotify}>The Meeting link is scheduled via zoom, You will receive link on ur register Email and WhatsApp number.</p>
            <div className={styles.termCond}>
                <input type="checkbox"/>
                <p>I agree to all the Terms and condition given from MediqueQuip.  <NavLink>Terms & Condition</NavLink></p>
            </div>
            <span className={styles.submitBtn} onClick={props.handleSechedule}>CONTINUE</span>
        </div>
    );
};

const InspectionReport=(props)=>{
    const navigate=useNavigate();
    const handlePayment=(e)=>{
        navigate(`/products/${props?.item?.equip_name}/checkout/` , {state : {details : props?.item , profileDetails : props?.profileDetails}});
        window.scrollTo(0,0);
    }
    return(
        <div className={styles.inspectCont}>
            <div className={styles.inspectTop}>
                <img src={inspectImg} alt="..."/>
                <b>Inspection Report</b>
                <i class="bi bi-x"  style={{cursor:"pointer"}} onClick={props.handleInspection}></i>
            </div>
            <p>If You want to get a inspection report from us, You need to pay 10% Token amount</p>
            <span className={styles.submitBtn} onClick={handlePayment}>Make Payment</span>
        </div>
    );
};

const MeetingIssue=(props)=>{
    const handleContinue=()=>{
        props.setMeetIssue(false);
        props.setInpection(true);
    }
    return(
        <div className={styles.meetSuccessCont} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}}>
            <div className={styles.successCross}><i class="bi bi-x" onClick={props.handleInspection}></i></div>
            <img alt="..." src={meetIssued} style={{marginBottom:"10px"}} />
            <b style={{marginBottom:"10px"}}>Meeting Issue</b>
            <p className={styles.meetNotify}>Do you want to continue without scheduling a meeting with the seller.</p>
            <span className={styles.submitBtn} onClick={handleContinue} >CONTINUE</span>
        </div>
    );
};

const BuyIssue=(props)=>{
    const handleContinue=()=>{
        props.setBuyIssue(false);
        props.setBuyOption(true);
    };
    return(
        <div className={styles.meetSuccessCont} style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}}>
            <div className={styles.successCross}><i class="bi bi-x" onClick={props.handleBuyIssue}></i></div>
            <img alt="..." src={meetIssued} style={{marginBottom:"10px"}} />
            <b style={{marginBottom:"10px"}}>Issue</b>
            <p className={styles.meetNotify}>Do you want to buy without scheduling a meeting with the seller & without getting insepection report !</p>
            <span className={styles.submitBtn} onClick={handleContinue} >CONTINUE</span>
        </div>
    );

};

const SelectServices=(props)=>{
    const navigate=useNavigate();
    const handlePayment=(e)=>{
        navigate(`/products/${props?.item?.equip_name}/checkout/` , {state : {details : props?.item , profileDetails : props?.profileDetails}});
        window.scrollTo(0,0);
    }
    return(
        <div className={styles.buyServiceCont}>
            <div className={styles.buyServiceTop}>
                <span>Select The Services</span>
                <i class="bi bi-x" style={{cursor:"pointer"}} onClick={props.handleBuyIssue}></i>
            </div>
            <div className={styles.buyServiceOpt}>
                <input type="checkbox"/>
                <span>Shipping Equipment</span>
            </div>
            <div className={styles.buyServiceOpt}>
                <input type="checkbox"/>
                <span>Handling & Installation</span>
            </div>
            <div className={styles.buyServiceOpt}>
                <input type="checkbox"/>
                <span>AMC/CME Service</span>
            </div>
            <span className={styles.submitBtn} onClick={handlePayment} id={styles.servCont}>CONTINUE</span>
        </div>
    );
};

const AskInspection=(props)=>{
    const handleConfirm=(e)=>{
        props.setBuyClick(false);
        props.setInpection(true);
    }
    const handleSkip=(e)=>{
        props.setBuyClick(false);
        props.setBuyOption(true);
    }
    const handleClose=(e)=>{
        props.setBuyClick(false);
    }
    return(
        <div className={styles.inspectCont} style={{paddingBottom:"15px"}}>
            <div className={styles.inspectTop}>
                <img src={inspectImg} alt="..."/>
                <b>Inspection Report</b>
                <i class="bi bi-x"  style={{cursor:"pointer"}} onClick={handleClose}></i>
            </div>
            <span className={styles.inspectWrn}>Do you want to inspect/verify product</span>
            <p>
                Terms and Condition For getting a equipment insepected <NavLink>Terms & Condition</NavLink>
            </p>
            <div className={styles.insBtnD}>
                <span className={styles.skiptBtn} onClick={handleSkip} >Skip</span>
                <span className={styles.confrmBtn} onClick={handleConfirm}>Confirm</span>
            </div>
        </div>
    );
}

