
import React, { useEffect, useState } from 'react';
import {Hero,MobileCatogories,MobileHero} from './Hero';
import {NewProducts} from "./NewProducts";
import { Advt } from './Advt';
import { OurExperties } from './OurExperties';
import { OurClients } from './OurClients';
import { Advt2 } from './Advt';
import { ClientBanner } from './OurClients';
import { postData } from '../services';

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
        const res  =  await postData("product/lists/" , "" , true)
        let fill = res.data?.filter((el)=>{
            if(el?.post_type == 1){
                return el
            }
        })
        let fill1 = res.data?.filter((el)=>{
            if(el?.post_type == 2){
                return el
            }
        })
        let fill3 = res.data?.filter((el)=>{
            if(el?.post_type == 3){
                return el
            }
        })
        setProduct({
            new : fill1,
            feature : fill3,
            bestseller : fill
        })
        
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
        </React.Fragment>
    );
}