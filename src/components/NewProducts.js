import React from 'react';
import styles from '../assets/css/card.module.css';
import { NewProductsCard } from './Cards';
import {
    prev_arrow,
    next_arrow,
    rightMove
} from '../assets/images/index';
import { NavLink } from 'react-router-dom';
export const NewProducts=(props)=>{
    const cardData=[
        {title:"Product Title",desc:"space for a small product description.. space for a small product description..space for a small product description",dis_price:"50000.00",t_price:65000.00},
        {title:"Product Title",desc:"space for a small product description.. space for a small product description..space for a small product description",dis_price:"50000.00",t_price:65000.00},
        {title:"Product Title",desc:"space for a small product description.. space for a small product description..space for a small product description",dis_price:"50000.00",t_price:65000.00},
        {title:"Product Title",desc:"space for a small product description.. space for a small product description..space for a small product description",dis_price:"50000.00",t_price:65000.00},
    ];
    return(
        <div className={styles.new_prod_container}>
            <h2 style={{color:"#2B2B2B"}}>{props.title}</h2>
            <div className={styles.product_container}>
                <img src={prev_arrow} alt='prev' className={styles.arrowImgPrev}/>
                {
                    cardData.map((values,index)=>{
                        return <NewProductsCard isNew={props.isnew} key={index} data={values}/>
                    })
                }
                <img src={next_arrow} alt='next' className={styles.arrowImgNext}/>
            </div>
        <NextProductTab/>
        </div>
    );
};

const NextProductTab=()=>{
    return(
        <div className={styles.nextProdCont}>
            <NavLink to="/">1</NavLink>
            <NavLink to="/">2</NavLink>
            <NavLink to="/">3</NavLink>
            <NavLink to="/">4</NavLink>
            <NavLink to="/">5</NavLink>
            <NavLink to="/">6</NavLink>
            <img alt='Next' src={rightMove}/>
        </div>
    );
};
