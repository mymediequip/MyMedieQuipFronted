import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../assets/css/utils.module.css';


import {
    scheduleBtn,
} from '../assets/images/index';

export const Calander=(props)=>{
    const [date,setDate]=useState(new Date());
    return(
        <div className={styles.calanderCont}>
            <Calendar onChange={setDate} className={styles.calanderCusttom} value={date} />
            <div className={styles.calSummary}>
                <div className={styles.calSumTop}>
                    <h1>14</h1>
                    <span style={{}}>MONDAY</span>
                </div>
                <div className={styles.pickSlot}>
                    <p>Pick a Time slot</p>
                    <div>
                        <span>Start Time</span>
                        <input type='text' placeholder='sun 17-09-2023'/>
                    </div>
                    <div>
                        <span>End Time</span>
                        <input type='text' placeholder='sun 17-09-2023'/>
                    </div>
                    <div>
                        <span>Time</span>
                        <input type='text' placeholder='30 Min'/>
                    </div>
                    
                </div>
                <div className={styles.remindMe}>
                    <span>Remind Me</span>
                    <input type='text' placeholder='15 Minutes Before'/>
                </div>
                <div className={styles.calSubmit}>
                    <img alt="..." style={{cursor:"pointer",marginTop:"30px"}} src={scheduleBtn} height="55px" onClick={props.handleMeetSuccess}/>
                </div>
            </div>
            
        </div>
    );
};