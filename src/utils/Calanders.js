import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '../assets/css/utils.module.css';


import {
    scheduleBtn,
} from '../assets/images/index';
import { useDispatch } from 'react-redux';
import { setCurrBuyStatus, setSheduleMeetingStatus } from '../app/Slices/UserData';
let formatted
let formatedDate
export const Calander=(props)=>{
    const dispatch =  useDispatch()
    const [date,setDate]=useState(new Date());
    const startTime  = date.toLocaleTimeString()
    const selectedDateTime = new Date(`2000-01-01 ${startTime}`);

    // Add or subtract 1 hour (3600 seconds)
    selectedDateTime.setHours(selectedDateTime.getHours() + 1);
    const resultTime = selectedDateTime.toLocaleTimeString();
    
    const [time,setTime]=useState({start:startTime,end:resultTime});
    const remindDateTime = new Date(`2000-01-01 ${time.start}`);
    const startDateTime = new Date(`2000-01-01 ${time.start}`);

    
    remindDateTime.setMinutes(remindDateTime.getMinutes() - 10);
    const timeDiffSec = (startDateTime -remindDateTime)
    const remider_time =  Math.floor(timeDiffSec % 3600000 / 60000)

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

    const formattedDate = () => {
        const lDate =  date.toLocaleDateString()
        const parts = lDate.split("/")
        if(parts.length === 3){
            const [day ,month ,year] = parts
            const date = new Date(`${year}-${month}-${day}`)
             formatedDate = date.toISOString().split("T")[0]
            return formatedDate
        }
    }

    useEffect(()=>{
        formattedDate()
    },[date])

   
    const handleMeetSuccess = () =>{
        let data = {
            date: formatedDate,
            start_time: time.start,
            end_time: time.end,
            duration: formatted,
            remind_me: remindDateTime.toLocaleTimeString(),
        }
        dispatch(setSheduleMeetingStatus(data))
        props.setSuccess(!props.success)
        props.setMetScheduled(true)
        dispatch(setCurrBuyStatus({curr:1}));
    }

    const getTimeDiff=(startT,endT)=>{
    const [startHours, startMinutes, startSeconds] = startT.split(":").map(Number);
    const [endHours, endMinutes, endSeconds] = endT.split(":").map(Number);
    const timeDiffInSeconds =
    (endHours - startHours) * 3600 +
    (endMinutes - startMinutes) * 60 +
    (endSeconds - startSeconds);
    const hours = Math.floor(timeDiffInSeconds / 3600);
    const minutes = Math.floor((timeDiffInSeconds % 3600) / 60);
    const seconds = timeDiffInSeconds % 60;
    formatted = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    
      return { hours, minutes, seconds, formatted };
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
                        <input 
                        type='time' 
                        name='end' 
                        onChange={handleTime} 
                        value={time.end}
                        />
                    </div>
                    <div>
                        <span>Duration</span>
                        <input type='text' readOnly value={getTimeDiff(time.start,time.end).formatted}/>
                    </div>
                    
                </div>
                <div className={styles.remindMe}>
                    <span>Remind Me</span>
                    <input type='text' readOnly value={`${remider_time} Minutes Before`}/>
                </div>
                <div className={styles.calSubmit}>
                    <img alt="..." style={{cursor:"pointer",marginTop:"30px"}} src={scheduleBtn} height="55px" onClick={handleMeetSuccess}/>
                </div>
            </div>
            
        </div>
    );
};

const getWeakName=(weakno)=>{
    let weaks=["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    return weaks[weakno];
}

