
import React, { useEffect, useState } from 'react';
import {Hero,MobileCatogories,MobileHero} from './Hero';
import {NewProducts} from "./NewProducts";
import { Advt } from './Advt';
import { OurExperties } from './OurExperties';
import { OurClients } from './OurClients';
import { Advt2 } from './Advt';
// import { ClientBanner } from './OurClients';
import { postData } from '../services';
import styles from '../assets/css/hero.module.css';
import {
    
    bussWithUs
} from '../assets/images/index';
import { AskType } from '../features/Distributor_manufacture/forms';


export const ContentConatiner=(props)=>{
const [product , setProduct] =  useState({
    new : [],
    feature : [],
    bestseller : []
})
    useEffect(()=>{
        handleFilterProduct()
    },[])

    const handleFilterProduct = async()=>{
        const res  =  await postData("product/filter_list/", "" ,true)
        setProduct({
            new : res?.data?.new_products,
            feature : res?.data?.featured_products,
            bestseller : res?.data?.best_seller_products,
        })
        
    }
    const  [isAsk,setIsAsk]=useState(false);
    const handleClick=()=>{
        setIsAsk(!isAsk);
        window.scrollTo(0,0);
    }
    return(
        <React.Fragment>
            {/* <MobileCatogories/> */}
            <Hero specs={props.specs}/>
            <NewProducts isnew={true} data={product?.new} title="New Products"/>
            <Advt/>
            <NewProducts isnew={false} data={product?.feature} title="Featured Products"/>
            <NewProducts isnew={false} data={product?.bestseller} title="Best Seller Products"/>
            <OurExperties/>
            <OurClients/>
            <Advt2/>
            {/* <ClientBanner/> */}
            <img onClick={handleClick} className={styles.bussWithUs} src={bussWithUs} alt='business wih us'/>
            {
               isAsk &&  <AskType handleClick={handleClick}/>
            }
        </React.Fragment>
    );
}