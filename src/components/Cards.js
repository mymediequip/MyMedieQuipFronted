import React from 'react';
import styles from '../assets/css/card.module.css';
import { GetStarted ,BackgroundBlur } from '../utils/Popups';
import {
    relatedImg,
    pngwing,
    favouriate,
    cart,
    newBanner,
    expert,
    suffix,
    line2,
    testimage2
} from '../assets/images/index';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';


export const ClientCard=({clientList})=>{
  return(
    <div className={styles.testContainer} key={clientList?.id}>
          <img className={styles.suffixMark}  src={  suffix}/>
          <p className={styles.testCardDesc}>{clientList?.description}</p>
          <img src={line2} alt='...'/>
          <img className={styles.clientImage} src={clientList?.image ? `http://13.53.198.145:8000${clientList?.image}` : testimage2} alt='...'/>
          <p className={styles.clientName}>{clientList?.name}</p>
    </div>
  );
};

export const ExpertCard=({expertise})=>{
  return(
    <div className={styles.expertComp} key={expertise?.id}>
            <img  className={styles.expImage} src={expertise?.image ?  `http://13.53.198.145:8000${expertise?.image}` : expert} alt="expert" />
            <p className={styles.expTitle}>{expertise?.name}</p>
            <p className={styles.expDesc}> {expertise?.description} </p>
      </div>
  );
};

export const NewProductsCard = (props) => {
  const [getStart,setGetStart]=useState(false);
  const [isBlur,setBlur]=useState(false);
  const navigate=useNavigate();
  const productClick = () => {
      navigate("/products/xray-machine/")
      window.scrollTo(0,0);
  };

  const sellarClick=(event)=>{
    event.stopPropagation();
    setBlur(true); 
    window.scrollTo(0,0);
    setGetStart(!getStart);
  };

  return (
    <React.Fragment>
      <div className={styles.cardContainer} onClick={productClick}>
        <div className={styles.cardContent}>
          <div className={styles.equipImage}>
            <div className={styles.productImage}>
              {props.isNew && (
                <img
                  src={newBanner}
                  alt="banner"
                  className={styles.newBanner}
                />
              )}
              <img src={pngwing} className={styles.productimg} />
              <div
                className={styles.favCart}
                style={{ top: props.isNew ? "-188px" : "-165px" }}
              >
                <a href="#">
                  {" "}
                  <img src={favouriate} alt=".." />
                </a>
                <a href="#">
                  {" "}
                  <img src={cart} alt=".." />
                </a>
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
              <NavLink className={styles.PriceBtn} onClick={sellarClick}>
                Contact Seller
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      {getStart ? <GetStarted setGetStart={setGetStart} setBlur={setBlur}/> : ""}
      {isBlur?<BackgroundBlur/>:""}
    </React.Fragment>
  );
}; 

export const RelatedProdCard=(props)=>{
  return (
    <div className={styles.column}>
      <div className={styles.imagess}>
        <img
          className={styles.images}
          src={relatedImg}
          alt="Jane"
          style={{ width: "100%", height: "100%" }}
        />
        <div className={styles.contain}>
          <h5 className={styles.prodtitle}>{props.data.title}</h5>
          <p className={styles.containDis}>
            {" "}
            {props.data.des}
          </p>
          <h4 className={styles.pprice}>₹ {props.data.price}</h4>
        </div>
      </div>
    </div>
  );
}