import React from 'react';
import { DashboardAdvt } from '../components/Advt';
import { NavLink, Outlet } from 'react-router-dom';
import styles from '../assets/css/prod_desc.module.css';
import { RelatedProdCard } from '../components/Cards';
import { GetStarted,BackgroundBlur } from '../utils/Popups';
import { useState } from 'react';
import {
    unfilStar,
    rightMove,
    homeIcon,
    pngwing,
    nextArow,
    swipetestleft,
    pdShare,
    star,
    location,
    video_Advt,
    testimage2,
} from '../assets/images/index';

export const ProductDescription=()=>{
    return(
        <div className={styles.pd_container}>
            <DashboardAdvt/>
            <ProductData/>
            <ProductInfo/>
            <RelatedProd/>
        </div>
    );
}; 

const ProductData=()=>{
    const [getStart,setGetStart]=useState(false);
    const [isBlur,setBlur]=useState(false);

    const sellarClick=(event)=>{
        event.preventDefault();
        setBlur(true); 
        window.scrollTo(0,0);
        setGetStart(!getStart);
    };

    const prodImgStyle={
        backgroundImage:`url(${pngwing})`,
    };
    return(
        <React.Fragment>
            <div className={styles.prod_path}>
                <img src={homeIcon} alt='...'/>
                <img src={rightMove} alt='...'/>
                <NavLink to="/">Ultrasound Machine</NavLink>
                <img src={rightMove} alt='...'/>
                <NavLink to="/">XYZ Machine</NavLink>
            </div>
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
                    <NavLink className={styles.contactSellar} onClick={sellarClick}>Contact Seller</NavLink>
                </div>
            </div>
            {
                getStart?<GetStarted setGetStart={setGetStart} setBlur={setBlur}/>:""
            }
            {
                isBlur?<BackgroundBlur/>:""
            }
        </React.Fragment>
    );
};

const ProductInfo=()=>{
    return(
        <div className={styles.pd_info}>
            <div className={styles.pd_info_links}>
                <NavLink style={ActivateLinks} to="/products/xray-machine/info/" >DETAILS</NavLink>
                <NavLink style={ActivateLinks} to="/products/xray-machine/" >PHOTOS</NavLink>
                <NavLink style={ActivateLinks} to="/products/xray-machine/review/" >REVIEWS</NavLink>
            </div>
            <Outlet/>
        </div>
    );
};

export const ProductImgVideo=()=>{
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

export const ProductMetaData=()=>{
    const productdedtails=[ 
        {pname:'Brand' ,pvalue:'ABC'},
        {pname:'Model',pvalue:'PQR'},
        {pname:'Condition',pvalue:'EXCELLENT '},
        {pname:'Warrenty',pvalue:'Not Specifies '},
        {pname:'Shipping From',pvalue:' India'},
        {pname:'Advert#',pvalue:'20212922'},
        {pname:'Catagory',pvalue:'Ultrasound Machine'},
        {pname:'Posted',pvalue:'12-07-2022'},
        {pname:'Visits',pvalue:'12'}
    ]
    return(
        <table className={styles.prodMetaContainer}>
        <h3 className={styles.ptitle}>Product Details</h3>
            {productdedtails.map((values,index) => (
                <tr key={index}>
                    <td className={styles.data}>{values.pname} </td>
                    <td className={styles.data}>{values.pvalue} </td>
                </tr>
            ))}
        </table>
    )
};

export const ProductReview=()=>{
    const reviewData=new Array(4).fill(7);
    return(
        <React.Fragment>
            <div className={styles.prod_reive_continer}>
                <h4>4 RIVIEWS FOR VARIABLE PRODUCT</h4>
                <div className={styles.allReeviewCards}>
                    {
                        reviewData.map((values,index)=>{
                            return <ProductReviewCard key={index}/>
                        })
                    }
                </div>
            </div>
            <ReviewForm/>
        </React.Fragment>
    );
}

export const ProductReviewCard=()=>{
    return(
        <div className={styles.reviewParentCont}>

            <div className={styles.allReviewCont}>
                <div className={styles.userRevImg}>
                <img  className={styles.userPic} src={testimage2} alt="" />
                </div>

                <div className={styles.userRevDetails}>
                    <div className={styles.nameRating}>
                        <div className={styles.dateName}>
                            <p className={styles.reviewUserName}>ISHA SHARMA</p>
                            <p className={styles.reviewUserDate}>17 JUNE 2023</p>
                        </div>
                        <div className={styles.userRating}>
                            <img  className={styles.ratingStar} src={star} alt="" />
                            <img  className={styles.ratingStar} src={star} alt="" />
                            <img  className={styles.ratingStar} src={star} alt="" />
                            <img  className={styles.ratingStar} src={star} alt="" />
                            <img  className={styles.ratingStar} src={star} alt="" /> 
                            <p className={styles.finalRating}>4.5</p>
                        </div>
                    </div>
                    <div className={styles.reviewDesc}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut libero odio. Nam elementum orci ut enim rutrum fringilla. Integer pellentesque semper erat id vestibulum. Vestibulum ultrices sapien orci, ut auctor ipsum maximus in.
                    </div>
                </div>
            </div>

        </div>
    );
};

const RelatedProd=()=>{
    return (
      <React.Fragment>
        <div className={styles.hzline}>
          <hr className={styles.line1} />
          <h3 className={styles.relprod}>RELATED PRODUCTS</h3>
          <hr className={styles.line2} />
        </div>
        <div style={{position:"relative"}}>
            <img src={swipetestleft} alt='...' className={styles.rlatedProdPrev}/>
            <div className={styles.rowws}>
                <RelatedProdCard/>
                <RelatedProdCard/>
                <RelatedProdCard/>
                <RelatedProdCard/>
            </div>
            <img src={nextArow} className={styles.rlatedProdNext} alt='...'/>
        </div>
      </React.Fragment>
    );
};

const ReviewForm=()=>{
    return (
      <div>
        <div className={styles.reviewFormCont}>
          <h2 className={styles.ratingHeading}>ADD YOUR REVIEW HERE</h2>

          <div className={styles.giveRatingCont}>
            <p className={styles.onlyStarCol}>STAR RATING</p>
            <div className={styles.giveRatingImg}>
              <img
                className={styles.ratingStar}
                src={unfilStar}
                alt=""
              />
              <img
                className={styles.ratingStar}
                src={unfilStar}
                alt=""
              />
              <img
                className={styles.ratingStar}
                src={unfilStar}
                alt=""
              />
              <img
                className={styles.ratingStar}
                src={unfilStar}
                alt=""
              />
              <img
                className={styles.ratingStar}
                src={unfilStar}
                alt=""
              />
            </div>
          </div>

          <form action="#" method="post" />
          <div
            className={
              styles.form_group +
              " " +
              styles.forOneLine +
              " " +
              styles.rateFormCol
            }
          >
            <div className={styles.rateFormName}>
              <label for="name">NAME</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className={styles.form_group + " " + styles.rateFormName}>
              <label for="email">EMAIL ID</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email id"
                required
              />
            </div>
          </div>

          <div className={styles.form_group + " " + styles.rateFormCol}>
            <label for="review">REVIEW</label>
            <textarea
              className={styles.DescPlaceholder}
              id={styles.review}
              name="review"
              rows="4"
              placeholder="Enter your review in this box"
              required
            ></textarea>
          </div>
          <input
            className={styles.reviewSubmit}
            type="submit"
            value="Submit Response"
          />
          <form />
        </div>
      </div>
    );
}
// non component function

const ActivateLinks=({isActive})=>{
    return(
        {
            borderBottom: isActive?"2px solid #019C89":"none",
            color:isActive?"#019C89":"#4F4F4F"
        }
    );
}