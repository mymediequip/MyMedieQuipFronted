import React, { useState } from "react";
import styles from '../../assets/css/buy/meeting.module.css';
import { BackgroundBlur } from "../../utils/Popups";
import { Calander } from "../../utils/Calanders";
import {
    meetingImg,
    scheduleBtn,
    buyBtn,
    inspectionBtn,
    meetSuccess
} from '../../assets/images/index';
import { NavLink } from "react-router-dom";

export const ScheduleMeeting=(props)=>{
    const [isBlur,setBlur]=useState(false);
    const [isSuccess,setSuccess]=useState(false);
    const handleSechedule=(e)=>{
        setBlur(!isBlur);
    }
    const handleMeetSuccess=(e)=>{
        setSuccess(!isSuccess);
    }
    return(
        <React.Fragment>
            <div className={styles.meetingCont}>
                <p style={{textAlign:"right",cursor:"pointer"}}><i class="bi bi-x" onClick={props.sellarClick} ></i></p>
                <div className={styles.meetSchedule}>
                    <img src={meetingImg} alt="..."/>
                    <b>Meeting Scheduling</b>
                    <p>Schedule a online meeting with the seller to get equipment Information.</p>
                    <img alt="..." src={scheduleBtn} height="55px" onClick={handleSechedule}/>
                </div>
                <div className={styles.meetButons}>
                    <img alt="..." src={inspectionBtn} height="55px"/>
                    <img alt="..." src={buyBtn} height="55px"/>
                </div>
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
            <span onClick={props.handleSechedule}>CONTINUE</span>
        </div>
    );
}

