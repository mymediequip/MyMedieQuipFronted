import React from 'react';
import { DashboardAdvt } from '../components/Advt';
import styles from '../assets/css/prod_desc.module.css';
import {
    pngwing,
    nextArow,
    swipetestleft,
    pdShare,
    star,
    location,
    video_Advt
} from '../assets/images/index';
import { NavLink } from 'react-router-dom';

export const ProductDescription=()=>{
    return(
        <div className={styles.pd_container}>
            <DashboardAdvt/>
            <ProductData/>
            <ProductInfo/>
        </div>
    );
}; 

const ProductData=()=>{
    const prodImgStyle={
        backgroundImage:`url(${pngwing})`,
    };
    return(
        <div className={styles.prod_data}>
            <div className={styles.prod_imgs}>
                <div style={prodImgStyle} className={styles.prodBigImg}>
                </div>
                <div className={styles.imgSlider}>
                    <img src={swipetestleft} alt='...' style={{width:"25px",height:"25px"}}/>
                    <img src={pngwing} alt='...'/>
                    <img src={pngwing} alt='...'/>
                    <img src={pngwing} alt='...'/>
                    <img src={pngwing} alt='...'/>
                    <img src={nextArow} style={{width:"25px",height:"25px"}} alt='...'/>
                </div>
            </div>
            <div className={styles.p_data}>
                <div className={styles.p_head}>
                    <div>
                        <h3>XYZ MACHINE</h3>
                        <div>
                            <img src={star} alt='...'/>
                            <img src={star} alt='...'/>
                            <img src={star} alt='...'/>
                            <img src={star} alt='...'/>
                            <img src={star} alt='...'/> 
                        </div>
                    </div>
                    <NavLink>
                            <img src={pdShare} alt='...' style={{width:"80px"}}/>
                    </NavLink>
                </div>
                
                <div>
                    <div className={styles.pd_links}>
                        <h4>Seller</h4>
                        <NavLink>
                                <img src={location} alt='...' style={{width:"20px"}}/>
                                <span>New Delhi</span>
                        </NavLink>
                    </div>
                    <p>Lorem ipsone dummy text</p>
                </div>

                <div>
                    <p style={{color:"#019C89"}}>Product Details</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut libero odio. Nam elementum orci ut enim rutrum fringilla. Integer pellentesque semper erat id vestibulum. Vestibulum ultrices sapien orci, ut auctor ipsum maximus in. Aenean eu est tempor, blandit ipsum non, eleifend odio. Aenean erat purus, pulvinar quis rhoncus a, ultricies quis nulla. Aliquam erat volutpat. Pellentesque luctus lectus lorem, eleifend rutrum tellus auctor at. In purus massa, feugiat semper malesuada sed, vehicula id ex.Phasellus vitae ex vitae justo efficitur aliquet. Suspendisse metus augue, tincidunt a dui aliquam, congue rhoncus leo. Nunc eleifend elementum odio viverra volutpat. Morbi pulvinar nisl nec diam scelerisque, et volutpat libero aliquam. Donec dapibus lorem nec faucibus bibendum. Mauris quis diam eget nibh convallis consectetur ac vel velit.dapibus. Mauris convallis, orci in condimentum lobortis, dolor est lobortis tortor, nec hendrerit augue ipsum at ligula. Maecenas sollicitudin, ante quis euismod pellentesque, sapien turpis elementum dolor, tempus dignissim turpis ex auctor nibh. Pellentesque euismod vitae ante viverra pulvinar. Phasellus porttitor arcu a justo dictum condimentum. Nam sollicitudin nunc urna, sit amet consectetur nisl accumsan sed.</p>
                </div>

                <div>
                    <h3>₹ 50000</h3>
                    <p>(Plus Shipping and VAT tax included)</p>
                </div>
                <NavLink className={styles.contactSellar}>Contact Seller</NavLink>
            </div>
        </div>
    );
};

const ProductInfo=()=>{
    return(
        <div className={styles.pd_info}>
            <div className={styles.pd_info_links}>
                <span>PRODUCT INFORMATION</span>
                <span>PRODUCT IMAGES/VIDEOS</span>
                <span>REVIEWS</span>
            </div>
            <ProductAsset/>
        </div>
    );
};

const ProductAsset=()=>{
    return(
        <div className={styles.prodAsset}>
            <img src={video_Advt} alt='...' style={{width:"100%",height:"400px"}}/>
            <div className={styles.prodsImg}>
                <img src={pngwing} alt='...' style={{width:"190px",height:"250px"}}/>
                <img src={pngwing} alt='...' style={{width:"190px",height:"250px"}}/>
                <img src={pngwing} alt='...' style={{width:"190px",height:"250px"}}/>
            </div>
        </div>
    );
};