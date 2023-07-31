import React from 'react';
import styles from '../assets/css/card.module.css';
import {
    pngwing,
    favouriate,
    cart,
    newBanner,
    expert,
    suffix,
    line2,
    testimage2
} from '../assets/images/index';


export const ClientCard=()=>{
  return(
    <div className={styles.testContainer}>
          <img className={styles.suffixMark}  src={suffix}/>
          <p className={styles.testCardDesc}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vulputate, Quisque laoreet ultricies sodales. ante quis aliquet lobortis, est est commodo felis,</p>
          <img src={line2} alt='...'/>
          <img className={styles.clientImage} src={testimage2} alt='...'/>
          <p className={styles.clientName}> Tiya Sharma</p>
    </div>
  );
};

export const ExpertCard=()=>{
  return(
    <div className={styles.expertComp}>
            <img  className={styles.expImage} src={expert} alt="expert" />
            <p className={styles.expTitle}>Sale Leads</p>
            <p className={styles.expDesc}> Receive leads from buyers directly on My Medie Quip and cll  based business enquiries </p>
      </div>
  );
};

export const NewProductsCard=(props)=>{
    return (
      <div className={styles.cardContainer}>    
         <div className={styles.cardContent}>
         <div className={styles.equipImage}>
            <div className={styles.productImage}>
              {props.isNew && <img src={newBanner} alt='banner' className={styles.newBanner}/>}
              <img src={pngwing} className={styles.productimg}/>
                <div className={styles.favCart} style={{top:props.isNew?"-188px":"-165px"}}>
                    <a href="#"> <img src={favouriate} alt=".." /></a>
                    <a href="#"> <img src={cart} alt=".." /></a>
                </div>
                
            </div>
          </div>
          <div className={styles.title_desk}>
            <h5>{props.data.title}</h5>
            <p>{props.data.desc}</p>
          </div>
          <div className={styles.price}>
            <div className={styles.priceTag}>
              <h5>₹ {props.data.dis_price}</h5>
              <p>₹{props.data.t_price}</p>
            </div>
            <div>
              <a href='#' className={styles.PriceBtn}>
                Contact Seller
                </a>
            </div>
          </div>
         </div> 
      </div>
    );
}; 