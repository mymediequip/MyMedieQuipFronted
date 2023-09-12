import React, { useEffect, useState } from 'react'
import {pngwing} from "../assets/images/index"
import styles from "../assets/css/ads.module.css"
import {postData} from "../services/index"
const MyAds = () => {
  const userId  = localStorage.getItem("uid")
  const [ads ,setads] =  useState([])

  useEffect(()=>{
    handleAdsDetails()
  },[])

const handleAdsDetails = async() =>{
  const formData =  new FormData()
  formData.append("user",userId)
  const res  =  await postData("product/lists/" , formData, true)
  // console.log(res?.data,"res")
  if(res?.status){
    setads(res?.data)
  }
}
  return (
    <div className={styles.main_content}>
      {
      ads?.length > 0 ?  ads?.map((item)=>{
          return(
            <div className={styles.sub_content}>
            <img src={pngwing} alt='' className={styles.content_img} />
            <div className={styles.sub_content_text}>
              <span className={styles.content_text}>
              <h3>{item?.equip_name}</h3>
              <span className={styles.new_text}>
                {item?.post_type == 1 ?  "PRE-OWNED"  : item?.post_type == 2 ? "NEW" : item?.post_type == 3 ? "SPARE & ACCESSORIES" : "SERVICES" }
              </span>
              </span>
              <p style={{marginBottom : '20px'}}>{item?.user ? item?.user : "XM-101012QR"}</p>
              {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> */}
              <p>{item?.description}</p>
            </div>
          <div className={styles.sub_content_status} >
              <p>RS {Number(item?.asking_price)?.toFixed(2)}</p>
              <button className={styles.sub_status}>Status</button>
           </div>
              <span className={styles.select_type}>...</span>
          </div>
          )
        }) : <div style={{padding : "20px"}}>...Loading</div>
      }
    </div>
  )
}

export default MyAds