import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import styles from '../assets/css/postAdvt.module.css';

import {ImageUpload,Jaipur} from '../assets/images/index'

export const PostAdvt=()=>{
    return(
        <div className={styles.postContainer}>
            <Outlet/>
        </div>
        
    );
};

export const SelectAdvtType=()=>{
    const selectTypes=["USED","NEW","CONSUMABLES","AMC/CMC SERVICES"];
    const [prevSelected,setPrevSelected]=useState(false);
    const changeColor=(event)=>{
        if(prevSelected){
            prevSelected.style.backgroundColor="#FFFFFF";
            prevSelected.style.color="#0B7D6F";
        }
        event.currentTarget.style.backgroundColor="#019C89";
        event.currentTarget.style.color="#FFFFFF";
        setPrevSelected(event.currentTarget);
    }
    return(
        <div className={styles.selectAdvtCont}>
            <h3>Post Your Advert</h3>
            <div className={styles.slectTypes}>
                {
                    selectTypes.map((value,index)=>{
                        return <span onClick={changeColor} key={index}>{value}</span>
                    })
                }
            </div>
            <NavLink to="/post/media/" className={styles.advtContinue}>Continue</NavLink>
        </div>
    );
};

export const AdvtMedia=()=>{
    const [allImg,setAllImg]=useState([]);
    const handlImages=(event)=>{
        const current=event.target;
        console.log(current.files[0]);
        if(current.name==="image"){
            setAllImg([...allImg,URL.createObjectURL(current.files[0])]);
        }
    }
    return(
        <form className={styles.advtMediaCont}>
            <div className={styles.advtImgs}>
                {
                    allImg.map((value,index)=>{
                        return <img src={value} key={index} />
                    })
                }
                <label for="inputimg" >
                    <input type='file' id="inputimg" accept="image/*" onChange={handlImages} name='image'/>
                    <img src={ImageUpload} alt='Upload'/>
                </label>
                
            </div>
            <div>
                <p>Add the Video Link here</p>
                <input type="url"/>
            </div>
            <input type="submit" className={styles.advtContinue} value="continue"/>
        </form>
    );
}