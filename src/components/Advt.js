import React from 'react';
import styles from '../assets/css/content.module.css';
import {advt1,advt2,video_Advt,video2img} from '../assets/images/index';

export const Advt=()=>{
    const advtStyle1={backgroundImage:`url(${advt1})`};
    const advtStyle2={backgroundImage:`url(${advt2})`};
    return(
        <div className={styles.advt}>
            <div style={advtStyle1} className={styles.advt_1}></div>
            <div style={advtStyle2} className={styles.advt_1}></div>
        </div>
    );
};

export const Advt2=()=>{
    const advtStyle1={backgroundImage:`url(${video_Advt})`};
    const advtStyle2={backgroundImage:`url(${video2img})`};
    return(
        <div className={styles.advt}>
            <div style={advtStyle1} className={styles.advt_1}></div>
            <div style={advtStyle2} className={styles.advt_1}></div>
        </div>
    );
}