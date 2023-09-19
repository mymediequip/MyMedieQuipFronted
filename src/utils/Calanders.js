import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../assets/css/utils.module.css';


import {
    scheduleBtn,
} from '../assets/images/index';

export const Calander=(props)=>{
    const [date,setDate]=useState(new Date());
    const [time,setTime]=useState({start:"04:00",end:"05:00"});

    const handleTime=(e)=>{
        let inputObj=e.currentTarget;
        setTime({...time,[inputObj.name]:inputObj.value});
    }
    const minDate=new Date();
    const maxDate=new Date();
    maxDate.setDate(maxDate.getDate()+6);
    minDate.setDate(minDate.getDate()-1);

    const isDateSelectable=(date)=>{
        return date>=minDate && date<=maxDate;
    }
    const handleChange=(ldate)=>{
        if(isDateSelectable(ldate)){
            setDate(ldate);
        }
    }

    return(
        <div className={styles.calanderCont}>
            <Calendar 
                onChange={handleChange} 
                selectRange={false}
                className={styles.calanderCusttom}
                value={date} 
                tileDisabled={({ date }) => !isDateSelectable(date)} 
            />
            <div className={styles.calSummary}>
                <div className={styles.calSumTop}>
                    <h1>{date.getDate()}</h1>
                    <span>{getWeakName(date.getDay())}</span>
                </div>
                <div className={styles.pickSlot}>
                    <p>Pick a Time slot</p>
                    <div>
                        <span>Start Time</span>
                        <input type='time' name='start' onChange={handleTime} value={time.start}/>
                    </div>
                    <div>
                        <span>End Time</span>
                        <input type='time' name='end' onChange={handleTime} value={time.end}/>
                    </div>
                    <div>
                        <span>Time</span>
                        <input type='text' readOnly value={getTimeDiff(time.start,time.end).formed}/>
                    </div>
                    
                </div>
                <div className={styles.remindMe}>
                    <span>Remind Me</span>
                    <input type='text' readOnly value='15 Minutes Before'/>
                </div>
                <div className={styles.calSubmit}>
                    <img alt="..." style={{cursor:"pointer",marginTop:"30px"}} src={scheduleBtn} height="55px" onClick={props.handleMeetSuccess}/>
                </div>
            </div>
            
        </div>
    );
};

const getWeakName=(weakno)=>{
    let weaks=["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    return weaks[weakno];
}

const getTimeDiff=(startT,endT)=>{
    console.log(startT,endT)

    let startDate=new Date(`2000-01-01T${startT}:00`);
    let endDate=new Date(`2000-01-01T${endT}:00`);
    let timeDiffMilliseconds=endDate-startDate;

    // converting miiliseconds in hours & minutes
    const hours = Math.floor(timeDiffMilliseconds / 3600000);
    const minutes = Math.floor((timeDiffMilliseconds % 3600000) / 60000);
    
    let formed=`${hours} h  ${minutes} m`
    return {hours:hours,minutes:minutes,formed:formed};
}