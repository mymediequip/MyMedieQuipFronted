import React from 'react'
import styles from "../assets/css/productdetails.module.css"
import {pngwing ,currency ,rightMove} from "../assets/images/index"
import { useLocation } from 'react-router-dom'
import { MFProdCard } from '../features/Distributor_manufacture/manufacturer';
import { useState,useEffect } from 'react';
import { postData } from '../services';

const AllFilterProduct = () => {
  const location =  useLocation()
  const item =  location.state.cat
  const [plists ,setPlist] =  useState([])

  const handleSearchItem = async() =>{
    const formData =  new FormData()
    formData.append("q" , item)
    const res =  await postData("product/plists/" , formData)
    setPlist(res?.data)
  }

  console.log(plists,"list")
  useEffect(()=>{
    handleSearchItem()
  },[])

    
  return (
    <div className={styles.main_container}>
       <div className={styles.sub_container}>
       </div>
       <div className={styles.prodlisting}>
        <MFProdCard searchItem={item}/>
       </div>
    </div>
  )
}

export default AllFilterProduct