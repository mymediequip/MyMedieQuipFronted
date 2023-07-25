import React from 'react';
import {
    line,
    swipetestleft,
    nextArow,
    spotify,
    office,
    adobe,
    blender,
} from '../assets/images/index';
import { ClientCard } from './Cards';
import styles from '../assets/css/card.module.css';

export const OurClients=()=>{
    return(
        <div className={styles.testMaincCont}>
        <div className={styles.testHeading}>
          <p>What Our Clients says!</p>
          <img className={styles.headingLine1} src={line} alt='...'/>
        </div>
        <div className={styles.reviewCont}>
        <div className={styles.swipeArrow}>
        <img className={styles.headingLine}  src={swipetestleft}/>
        </div>
        
        <ClientCard/>
        <ClientCard/>
        <ClientCard/>
        
        <div className={styles.swipeArrow}>
        <img className={styles.headingLine}  src={nextArow}/>
        </div>
        </div>
      </div>
    );
};

export const ClientBanner=()=>{
  const clietns=[spotify,
    office,
    adobe,
    blender,
    office
  ];
  return(
    <div className={styles.clientContainer}>
      {
        clietns.map((values,index)=>{
          return <img src={values} key={index} alt='...'/>
        })
      }
    </div>
  );
}