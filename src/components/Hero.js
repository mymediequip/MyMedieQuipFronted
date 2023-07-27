import React, { useState } from 'react';
import { hero } from "../assets/images/index";
import { Search } from './Navigation'
import styles from '../assets/css/hero.module.css';
import {
    plus_symbol,
    minus
} from '../assets/images/index';
import catog_data from '../assets/data/specialization.json';

export const Hero=(props)=>{
    const heroStyle={
        backgroundImage:`url(${hero})`,
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center"
    }
    return(
        <React.Fragment>
            <div style={heroStyle} className={styles.heroContainer}>
                {props.specs && <Catogories/>}
            </div>
            <MobileHero/>
        </React.Fragment>
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

const MobileHero=()=>{
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
        </form>
    );
}

// non components Funtion
