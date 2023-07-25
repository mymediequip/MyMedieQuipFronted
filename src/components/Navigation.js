import React, { useState } from 'react';
import {companyName} from '../assets/data/data';
import { NavLink } from 'react-router-dom';
import styles from '../assets/css/navigation.module.css';
import {
    downIcon,
    searchIcon,
    profileIcon
} from '../assets/images/index';
export const Navigation=()=>{
    return(
        <React.Fragment>
            <header className={styles.headContainer}>
                <NavLink to="/">
                <img className={styles.logo} src={process.env.PUBLIC_URL+"/logo.png"} alt={companyName}/>
                </NavLink>
                <Location/>
                <Search/>
                <BuyBtn/>
                <SellBtn/>
                <Speciality/>
                <LoginBtn/>
                <Humberger/>
            </header>
            <Nav2/>
        </React.Fragment>
    );
};

const Nav2=()=>{
    const links=[
        "Equipment Category",
        "Used Equipment",
        "New Equipment",
        "Service",
        "Spare and accessories",
        "For Distribution",
        "Contact Us"
    ];
    return(
        <div className={styles.Nav2Container}>
           <div className={styles.navlinks}>
           {
                links.map((values,index)=>{
                    return <NavLink to="/">{values}</NavLink>;
                })
            }
           </div>
           <CreatBtn/>
        </div>
    );
};


const Location=(props)=>{

    return(
        <div className={styles.location} id="loc1">
            <span>India</span>
            <img src={downIcon} alt='>'/>
        </div>
    );
};

export const Search=()=>{
    return(
        <form className={styles.search}>
            <input type='text' placeholder='Find medical instrument..'/>
            <input type='submit' value="Search"/>
        </form>
    );
};

const BuyBtn=()=>{
    return(
        <NavLink className={styles.BuyBtn} to="/">Buy</NavLink>
    )
};

const SellBtn=()=>{
    return(
        <NavLink className={styles.SellBtn} to="/">Sell</NavLink>
    )
};

const Speciality=()=>{
    return(
        <NavLink className={styles.Speciality} to="/">
            <img src={searchIcon} alt='search'/>
            <input placeholder='Speciality' type='text'/>
        </NavLink>
    )
};

const LoginBtn=()=>{
    return(
        <NavLink className={styles.LoginBtn} to="/">
            <img src={profileIcon} alt='profile'/>
            <span>Login</span>
        </NavLink>
    )
};

const CreatBtn=()=>{
    return(
        <NavLink className={styles.CreatBtn} style={{color:"#FFFFFF"}}to="/">Create a Requirement</NavLink>
    )
};

const Humberger=()=>{
    const [isMobile,setIsMobile]=useState(true);
    const handleHumberg=()=>{
        setIsMobile(!isMobile);
    }

    return(
        <div className={styles.humberg} id="humberg">
            <span id="humIcon" onClick={handleHumberg}>
                {
                    isMobile ? <i class="bi bi-list"></i> : <i class="bi bi-x"></i>
                }
            </span>
            {
                isMobile?"":<div className={styles.mobileMenu}>
                <div className={styles.menu1}>
                    <Location isnone={true}/>
                    <BuyBtn/>
                    <SellBtn/>
                    <LoginBtn/>
                </div>
                </div>
            }
        </div>
    );
}
