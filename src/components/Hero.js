import React, { useState } from 'react';
import { hero } from "../assets/images/index";
import { Search } from './Navigation'
import styles from '../assets/css/hero.module.css';
import catog_data from '../assets/data/specialization.json';
import { NavLink } from 'react-router-dom';
import {
    plus_symbol,
    minus,
    m_search,
    downIcon
} from '../assets/images/index';

export const Hero=(props)=>{
    const heroStyle={
        backgroundImage:`url(${hero})`,
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center"
    }
    return(
        <div id="heroBlur">
            <div style={heroStyle} className={styles.heroContainer}>
                {props.specs && <Catogories/>}
                <div className={styles.heroContent}>
                    <p className={styles.heroHead}>Empower Your Health Journey Monitor Blood Pressure Like a Pro!</p>
                    <p className={styles.heroDesc}>Precision measurements, advanced technology. Take control of your health with accurate blood pressure monitoring for informed decisions and optimal well-being</p>
                    <NavLink to="/" className={styles.buyBtn}>Buy Product</NavLink>
                    <NavLink to="/" className={styles.postAdvt}>Post Your Advertisement</NavLink>
                </div>
            </div>
        </div>
    );
};

const Catogories=()=>{
    const catogories=Object.keys(catog_data);
    return(
        <div className={styles.catogories_container}>
            <div className={styles.upper_part}>
                <span>FILTER</span>
                <Search/>
                <p>EQUIPMENTS</p>
            </div> 
            <div className={styles.lower_part}>
                {
                    catogories.map((value,index)=>{
                        return <CatItem key={index} pic={plus_symbol} data={value}/> 
                    })
                }
            </div>
        </div>
    );
};

const CatItem=(props)=>{
    const [specItems,setSpecItems]=useState([]);
    const [isOpen,setIsOpen]=useState(false);
    const handleClick=()=>{
        if(catog_data[props.data]===undefined){
            return;
        }
        setSpecItems(catog_data[props.data]);   
        setIsOpen(!isOpen);
    }
    return(
        <div className={styles.cat_item} >
            <div >
            <div className={styles.cat_inner}>
                <img src={props.pic} alt='...' onClick={handleClick} className={styles.in_img}/>
                <span>{props.data}</span>
            </div>
            {
                isOpen && specItems.map((value,index)=>{
                    return <CatItem key={index} pic={minus} data={value}/> 
                })
            }
            </div>
        </div>
    );
};

export const MobileHero=()=>{
    return(
        <div className={styles.MobileHero}>
            <p style={{textAlign:"center"}}>WHAT ARE YOU LOOKING FOR?</p>
            <MobileSearch/>
        </div>
    );
};
const MobileSearch=()=>{
    return(
        <form className={styles.mobileSearch}>
            <input type='text' placeholder='Find medical instrument..'/>
            <img src={m_search} alt='...'/>
        </form>
    );
};

export const MobileCatogories=()=>{
    const catKeys=Object.keys(catog_data);
    return(
        <div className={styles.mobileCatContainer}>
            {
                catKeys.map((values,index)=>{
                    return <CatgoriesDropDown key={index} data={values}/>
                })
            }
        </div>
    );
};
const CatgoriesDropDown=(props)=>{
    const [isOpen,setIsOpen]=useState(false);
    const subcat=catog_data[props.data];
    const handleIsopen=()=>{
        setIsOpen(!isOpen);
    }
    return(
        <div className={styles.catDrop}>
            <div className={styles.catTitle} onClick={handleIsopen}>
                <span>{props.data}</span>
                <img src={downIcon} alt='...'/>
            </div>
            {
                isOpen?<div className={styles.subCatogories}>
                    {
                        subcat.map((value,index)=>{
                            return <NavLink to="/" key={index}>{value}</NavLink>
                        })
                    }
                </div>:""
            }
            
        </div> 
    );
}

// non components Funtion
