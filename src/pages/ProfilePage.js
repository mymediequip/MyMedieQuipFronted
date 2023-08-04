import React from 'react';
import styles from '../assets/css/profile.module.css';
import { NavLink } from 'react-router-dom';
import { Logout } from '../components/Navigation';
import { testimage2 } from '../assets/images';

export const MyProfile=()=>{
    return (
      <div className={styles.row}>
        <h2>Personal Information</h2>
        <form action="" method="post">
          <div className={styles.column1}>
            <div className={styles.image} style={{backgroundImage:`url(${testimage2})`}}></div>
              <a href="/">Edit Profile Image </a>
              <h4 className={styles.discribe}>WHATS BEST DECRIBES YOU</h4>
            <div className={styles.radios}>
              <div>
                <input
                  className={styles.rd}
                  type="radio"
                  value="buyer"
                  name="s"
                />
                <label className={styles.rdt}>BUYER</label>
              </div>
              <div>
                <input
                  className={styles.rd}
                  type="radio"
                  value="seller"
                  name="s"
                />
                <label className={styles.rdt}>SELLER</label>
              </div>
            </div>
          </div>
          <div className={styles.column2}>
            <div className={styles.col21}>
              <label className={styles.name}>First Name</label>
              <input className={styles.nameField} type="text" name="fname" />
              <label className={styles.name}>Phone Number</label>
              <input
                className={styles.nameField}
                type="number"
                name="pnumber"
              />
              <label className={styles.name}>Nationality</label>
              <input
                className={styles.nameField}
                type="text"
                name="nationality"
              />
              <label className={styles.name}>GSTIN Number</label>
              <input className={styles.nameField} type="number" name="gstin" />
              
              <div className={styles.btnContainer}>
                <button type="button" className={styles.btn}>
                  SAVE CHANGE
                </button>
                <button type="button" className={styles.btn2}>
                  DISCARD CHANGE
                </button>
              </div>
              
            </div>
            <div className={styles.col22}>
              <label className={styles.nameC}>Last Name</label>
              <input className={styles.nameField} type="text" name="lname" />
              <label className={styles.nameC}>Email</label>
              <input className={styles.nameField} type="email" name="email" />
              <label className={styles.nameC}>Pan Card Number</label>
              <input className={styles.nameField} type="text" name="pancard" />
            </div>
          </div>
        </form>
      </div>
    );
};
export const DashboardMenu=()=>{
    const profileLinks=[
        {title:"MY Profile",path:"/dashboard/"},
        {title:"MY ADS",path:"/"},
        {title:"MY MESSAGES",path:"/"},
        {title:"ADS AWAITING PAYMENT",path:"/"},
        {title:"PAYMENT HISTORY",path:"/"},
        {title:"MY SERVICES",path:"/"},
        {title:"MY ORDERS",path:"/"},
        {title:"SUBCRIPTIONS",path:"/"},
        {title:"STATISTICS",path:"/"},
    ];
    return(
        <div className={styles.DashboardMenu}>
            {
                profileLinks.map((values,index)=>{
                    return <NavLink key={index}  style={activateLink} to={values.path}>{values.title}</NavLink>
                })
            }
            <Logout/>
        </div>
    );
};

// non components functions
const activateLink=({isActive})=>{
  return {
      backgroundColor:isActive?"#019C89":"#FFFFFF",
      color:isActive?"#FFFFFF":"#019C89"
  };
}
