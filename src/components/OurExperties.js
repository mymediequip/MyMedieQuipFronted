import React from 'react';
import styles from '../assets/css/content.module.css';
import { ExpertCard } from './Cards';
export const OurExperties=()=>{
    const expertData=[
        "Sale Leads",
        "Sale Leads",
        "Sale Leads",
        "Sale Leads",
        "Sale Leads",
    ]
    return(
        <div className={styles.experties_container}>
            <h2>Our Expertise</h2>
            <div className={styles.expertbox}>
                {
                    expertData.map((values,index)=>{
                        return <ExpertCard key={index}/>;
                    })
                }
            </div>
        </div>
    );
}