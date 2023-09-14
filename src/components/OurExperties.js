import React, { useEffect, useState } from 'react';
import styles from '../assets/css/content.module.css';
import { ExpertCard } from './Cards';
import {  postData} from '../services';
export const OurExperties=()=>{
    const [expertData ,setExpertData] =  useState([])

    const handleExpertise = async() =>{
        const res = await postData("master/list_expertise/")
        if(res?.status){
            setExpertData(res?.data)
        }
    }

useEffect(()=>{
    handleExpertise()
},[])

   
    return(
        <div className={styles.experties_container}>
            <h2>Our Expertise</h2>
            <div className={styles.expertbox}>
                {
                    expertData.map((expertise)=>{
                        return <ExpertCard expertise={expertise} />;
                    })
                }
            </div>
        </div>
    );
}