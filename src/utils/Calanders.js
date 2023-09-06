import React from 'react';
import styles from '../assets/css/utils.module.css';
import {
    scheduleBtn,
} from '../assets/images/index';

export const Calander=(props)=>{
    return(
        <div className={styles.calanderCont}>
            <img alt="..." style={{cursor:"pointer"}} src={scheduleBtn} height="55px" onClick={props.handleMeetSuccess}/>
        </div>
    );
};