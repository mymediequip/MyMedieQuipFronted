import React from 'react'
import styles from "../assets/css/productdetails.module.css"
import {pngwing ,currency ,rightMove} from "../assets/images/index";
import { MFProdCard } from '../features/Distributor_manufacture/manufacturer';


const AllFilterProduct = () => {
  return (
    <div className={styles.main_container}>
       <div className={styles.prodFilterse}>

       </div>
       <div className={styles.prodlisting}>
        <MFProdCard/>
        <MFProdCard/>
        <MFProdCard/>
        <MFProdCard/>
        <MFProdCard/>
       </div>
    </div>
  )
}

export default AllFilterProduct