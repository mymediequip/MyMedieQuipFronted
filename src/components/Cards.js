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
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../app/Slices/UserData';
import { ToastContainer, toast} from 'react-toastify';

const imagePreviewUrl = process.env.REACT_APP_IMAGE_PREVIEW
console.log(imagePreviewUrl , "img")

export const ClientCard=({clientList})=>{
  return(
    <div className={styles.testContainer} key={clientList?.id}>
          <img className={styles.suffixMark}  src={  suffix}/>
          <p className={styles.testCardDesc}>{clientList?.description}</p>
          <img src={line2} alt='...'/>
          <img className={styles.clientImage} src={clientList?.image ? `${imagePreviewUrl}${clientList?.image}` : testimage2} alt='...'/>
          <p className={styles.clientName}>{clientList?.name}</p>
    </div>
  );
};

export const ExpertCard=({expertise})=>{
  return(
    <div className={styles.expertComp} key={expertise?.id}>
            <img  className={styles.expImage} src={expertise?.image ?  `${imagePreviewUrl}${expertise?.image}` : expert} alt="expert" />
            <p className={styles.expTitle}>{expertise?.name}</p>
            <p className={styles.expDesc}> {expertise?.description} </p>
      </div>
  );
};

export const NewProductsCard = (props) => {
  const [getStart,setGetStart]=useState(false);
  const [isBlur,setBlur]=useState(false);
  const navigate=useNavigate();
  const dispatch =useDispatch();
  const carts=useSelector((state)=>state.profileData.cart);
  const productClick = (item) => {
    console.log(item,"item")
      navigate(`/products/${item?.equip_name}/` , {state : {prodDetails : item}})
      window.scrollTo(0,0);
  };

  const sellarClick=(event)=>{
    event.stopPropagation();
    setBlur(true); 
    window.scrollTo(0,0);
    setGetStart(!getStart);
  };

  const handleATC=(e)=>{
    e.preventDefault();
    e.stopPropagation();
    
    if(carts.indexOf(props?.data?.id)===-1){
      dispatch(addToCart(props?.data?.id));
      toast.success(`${props?.data?.equip_name} is added in cart`,{autoClose:1800});
    }
    else{
      toast.info(`${props?.data?.equip_name} is already added in cart`,{autoClose:1800});
    }
   
  }

  return (
    <React.Fragment>
      <ToastContainer/>
      <div className={styles.cardContainer} onClick={()=>productClick(props?.data)}>
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
              <img src={props?.data?.product_images?.length > 0 ? `${props?.data?.product_images[0]?.product_images}` :pngwing} className={styles.productimg} />
              <div
                className={styles.favCart}
                style={{ top: props.isNew ? "-188px" : "-165px" }}
              >
                <a href="#">
                  <img src={favouriate} alt=".." />
                </a>
                <a href="#" onClick={handleATC}>
                  <img src={cart} alt=".." />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.title_desk}>
            <h5>{props?.data?.equip_name}</h5>
            <p>{props?.data?.description}</p>
          </div>
          <div className={styles.price}>
            <div className={styles.priceTag}>
              <h5>₹ {props?.data?.asking_price}</h5>
              <p>₹{props?.data?.asking_price}</p>
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
          src={props?.data?.product_images[0]?.product_images ? props?.data?.product_images[0]?.product_images :  relatedImg}
          alt="Jane"
          style={{ width: "100%", height: "100%" }}
        />
        <div className={styles.contain}>
          <h5 className={styles.prodtitle}>{props?.data?.equip_name}</h5>
          <p className={styles.containDis}>
            {" "}
            {props?.data?.description}
          </p>
          <h4 className={styles.pprice}>₹ {props?.data?.asking_price}</h4>
        </div>
      </div>
    </div>
  );
}