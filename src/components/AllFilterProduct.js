import React from 'react'
import styles from "../assets/css/productdetails.module.css"
import { useLocation } from 'react-router-dom'
import { MFProdCard } from '../features/Distributor_manufacture/manufacturer';
const AllFilterProduct = () => {
  const location =  useLocation()
  const item =  location?.state?.cat
  console.log(item,"cate")
 return (
    <div className={styles.main_container}>
       <div className={styles.prodFilterse}>

       </div>
       <div className={styles.prodlisting}>
        <MFProdCard searchItem={item}/>
       </div>
    </div>
  )
}

export default AllFilterProduct