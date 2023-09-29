import React, { useEffect, useState } from 'react'
import styles from "../assets/css/productdetails.module.css"
import {pngwing ,currency ,rightMove} from "../assets/images/index"
import { useLocation } from 'react-router-dom'
import { postData } from '../services'
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
       <div className={styles.sub_container1}>
      
      {
        plists?.length > 0 ? 
        plists?.map((item)=>{
          return(
            <div className={styles.sub_content}>
            <img src={pngwing} className={styles.img_preview} alt='no img' />
           <div className={styles.text_containter}>
              <h3 className={styles.text_view}>Medical Equipment</h3>
              <p className={styles.text_view}>Seller :  XYX</p>
              <p className={styles.des_view}>
               Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s{""} <span className={styles.read_more}>
                Read more<img src={rightMove} alt=''  style={{width : "16px" ,height : "16px"}}/>
                </span>
              </p>
              <h3 className={styles.price_view}><img style={{width : "22px" , height : "22px"}} src={currency} /> 50000</h3>
              <p>(Plus Shipping and GST tax includes )</p>
           </div>
        </div>
          )
        }) : 
        <div>NO Data Found</div>
      }
       
       </div>
    </div>
  )
}

export default AllFilterProduct