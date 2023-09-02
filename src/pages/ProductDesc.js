import React from 'react';

import { DashboardAdvt } from '../components/Advt';
import { NavLink, Outlet, useNavigate} from 'react-router-dom';
import styles from '../assets/css/prod_desc.module.css';
import { RelatedProdCard } from '../components/Cards';
import { GetStarted,BackgroundBlur } from '../utils/Popups';
import * as yup from "yup";
import { SocialShare } from '../utils/Popups';
import {emailSchema, fnameSchema} from '../utils/validation';
import { useRef, useState ,useEffect} from 'react';
import {
    dummyMap,
    contBtn,
    atcBtn,
    whatsBtn,
    unfilStar,
    rightMove,
    homeIcon,
    pngwing,
    nextArow,
    swipetestleft,
    pdShare,
    star,
    video_Advt,
    filledStar,
    testimage2,
} from '../assets/images/index';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

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
    // const lg  =  useSelector((state)=>state.auth)
    // console.log(lg,"lg")
    const navigate  =  useNavigate()
    let isLogin = localStorage.getItem("token")
    const [getStart,setGetStart]=useState(false);
    const [isBlur,setBlur]=useState(false);


    const phoneNumber = '+919716924981'; // Replace with the actual phone number
    const encodedPhoneNumber = encodeURIComponent(phoneNumber);

    

    const [openSocial,setOpenSocial]=useState(false);
    const sellarClick=(event)=>{
        event.preventDefault();
            setBlur(true); 
            window.scrollTo(0,0);
            setGetStart(!getStart);
            navigate("" ,{state:{navigateTo: "products/xray-machine/"}});
    };

    const handleSocial=(e)=>{
        setOpenSocial(!openSocial);
    }
    const prodImgStyle={
        backgroundImage:`url(${pngwing})`,
    };
    const ref=useRef();
    useEffect(()=>{
        document.addEventListener("click",(e)=>{
        if(ref.current && !ref.current.contains(e.target)){
            setOpenSocial(false);
        }
      });
    },[])
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
                        {/* <SocialShare/> */}
                        <div style={{display:"flex",gap:"20px"}}>
                            <img src={pdShare} ref={ref} alt='...' onClick={handleSocial} style={{width:"80px" , cursor : 'pointer'}}/>
                            {
                                openSocial && (<div className={styles.socialShare}>
                                    <SocialShare />
                                </div>)
                            }
                        </div>
                    </div>
                    
                    <div>
                        <div className={styles.pd_links}>
                            <div className={styles.sellerName}>
                                <img src={testimage2} alt='...'/>
                                <p>Mr Daniel</p>
                            </div>
                            <span>17/08/2023</span>
                        </div>
                    </div>

                    <div>
                        <p style={{color:"#019C89"}}>Product Details</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut libero odio. Nam elementum orci ut enim rutrum fringilla. Integer pellentesque semper erat id vestibulum. Vestibulum ultrices sapien orci, ut auctor ipsum maximus in. Aenean eu est tempor, blandit ipsum non, eleifend odio. Aenean erat purus, pulvinar quis rhoncus a, ultricies quis nulla. Aliquam erat volutpat. Pellentesque luctus lectus lorem, eleifend rutrum tellus auctor at. In purus massa, feugiat semper malesuada sed, vehicula id ex.Phasellus vitae ex vitae justo efficitur aliquet. Suspendisse metus augue, tincidunt a dui aliquam, congue rhoncus leo. Nunc eleifend elementum odio viverra volutpat. Morbi pulvinar nisl nec diam scelerisque, et volutpat libero aliquam. Donec dapibus lorem nec faucibus bibendum. Mauris quis diam eget nibh convallis consectetur ac vel velit.dapibus. Mauris convallis, orci in condimentum lobortis, dolor est lobortis tortor, nec hendrerit augue ipsum at ligula. Maecenas sollicitudin, ante quis euismod pellentesque, sapien turpis elementum dolor, tempus dignissim turpis ex auctor nibh. Pellentesque euismod vitae ante viverra pulvinar. Phasellus porttitor arcu a justo dictum condimentum. Nam sollicitudin nunc urna, sit amet consectetur nisl accumsan sed.</p>
                    </div>

                    <div>
                        <h3>₹ 50000</h3>
                        <p>(Plus Shipping and VAT tax included)</p>
                    </div>
                    
                    <div className={styles.prodActLinks}>
                        <NavLink className={styles.contactSellar} onClick={sellarClick}>
                            <img src={contBtn} height="15px" alt='...'/>
                            <span>CONTACT SELLER</span>
                        </NavLink>
                        {
                            isLogin ? 
                            <NavLink to={`https://wa.me/${encodedPhoneNumber}`} target='_blank' style={{backgroundColor:"#2EB943"}} className={styles.contactSellar} >
                            <img src={whatsBtn} height="15px" alt='...'/>
                            <span>CHAT ON WHATSAPP</span>
                        </NavLink> : 
                        <NavLink  style={{backgroundColor:"#2EB943"}} onClick={sellarClick} className={styles.contactSellar} >
                        <img src={whatsBtn} height="15px" alt='...'/>
                        <span>CHAT ON WHATSAPP</span>
                        </NavLink>

                        }
                        
                        <NavLink style={{backgroundColor:"#FFDD75",color:"black"}} className={styles.contactSellar} onClick={sellarClick}>
                            <img src={atcBtn} height="15px" alt='...'/>
                            <span>CLICK TO BUY NOW</span>
                        </NavLink>

                    </div>
                    
                    <div className={styles.prodLocation}>
                        <b style={{color:"#019C89"}}>Posted in</b>
                        <span>Rt Nagar , Bengaluru, Karnataka</span>
                        <img src={dummyMap} alt='...'/>
                    </div>

                    <div className={styles.prodDesclaimer}>
                        <b style={{fontSize:"15px"}}>Disclaimer : </b>
                        <span style={{fontSize:"14px"}}>Product details are submitted by the seller. MyMedieQuip will carry out inspection and give you inspection report before you purchase.</span>
                    </div>

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
    const relatedProd=[
        {title:"Prod 1",des:"space for a small product description.space for a small product",price:"2000"},
        {title:"Prod 2",des:"space for a small product description.space for a small product",price:"3000"},
        {title:"Prod 3",des:"space for a small product description.space for a small product",price:"4000"},
        {title:"Prod 4",des:"space for a small product description.space for a small product",price:"5000"},
        {title:"Prod 5",des:"space for a small product description.space for a small product",price:"6000"},
        {title:"Prod 6",des:"space for a small product description.space for a small product",price:"2000"},
        {title:"Prod 7",des:"space for a small product description.space for a small product",price:"3000"},
        {title:"Prod 8",des:"space for a small product description.space for a small product",price:"4000"},
        {title:"Prod 9",des:"space for a small product description.space for a small product",price:"5000"},
        {title:"Prod 10",des:"space for a small product description.space for a small product",price:"6000"}
    ];
    const [prodData,setProdData]=useState(relatedProd.slice(0,4));
    const [p_pointer,setPointer]=useState({left:0,right:4});
    // using two pointer
    const shiftProducts=(e)=>{
        let name=e.currentTarget.name;
        if(name==="prev" && p_pointer.left>0){
            setProdData(relatedProd.slice(p_pointer.left-=1,p_pointer.right-=1));
        }
        if(name==="next" && p_pointer.right<relatedProd.length){
            setProdData(relatedProd.slice(p_pointer.left+=1,p_pointer.right+=1));
        }  
        console.log(p_pointer.left,p_pointer.right);

    }

    return (
      <React.Fragment>
        <div className={styles.hzline}>
          <hr className={styles.line1} />
          <h3 className={styles.relprod}>RELATED PRODUCTS</h3>
          <hr className={styles.line2} />
        </div>
        <div style={{position:"relative",marginBottom:"40px"}}>
            <img src={swipetestleft} alt='...' onClick={shiftProducts} name="prev" className={styles.rlatedProdPrev}/>
            <div className={styles.rowws}>
                {
                    prodData.map((value,id)=>{
                        return <RelatedProdCard data={value} key={id}/>   
                    })
                }
                
            </div>
            <img src={nextArow} onClick={shiftProducts} className={styles.rlatedProdNext} name="next" alt='...'/>
        </div>
      </React.Fragment>
    );
};

const ReviewForm=()=>{
    const [ratinsStars,setRatingStar]=useState(new Array(5).fill(false));
    const [ratingErr,setRatingErr]=useState(false);
    const formik=useFormik({
        initialValues:{
            name:"",
            email:"",
            review:""
        },
        validationSchema : yup.object({
            name  : fnameSchema,
            email : emailSchema,
            review:fnameSchema
        }),
        onSubmit : function (values){
            handleSubmit(values);
        }
    });

    const handleSubmit=(values)=>{
        
        // calculating user provided rating
        let rating=(()=>{
            let count=0;
            for(let i=0;i<5;i++){
                if(ratinsStars[i]){
                    count+=1;
                }
            }
            return count;
        })()

        // rating validation
        if(rating===0){
            setRatingErr(true);
            return;
        }
        setRatingErr(false);

        toast.success("Rating Added successfully",{autoClose:2000});
    }

    const handleStars = (e) => {
      let curr = parseInt(e.currentTarget.name);
      if (ratinsStars[curr]) {
        for (let i = curr; i <= 4; i++) {
          ratinsStars[i] = false;
        }
      } else {
        for (let i = 0; i <= curr; i++) {
          ratinsStars[i] = true;
        }
      }
      setRatingStar([...ratinsStars]);
    };
    return (
      <div>
        <div className={styles.reviewFormCont}>
          <h2 className={styles.ratingHeading}>ADD YOUR REVIEW HERE</h2>
          {ratingErr && <p style={{color:"red",marginBottom:"10px"}}>Rating not provided</p>}
          <div className={styles.giveRatingCont}>
            <p className={styles.onlyStarCol}>STAR RATING</p>
            <div className={styles.giveRatingImg}>
              {ratinsStars.map((value, index) => {
                return (
                  <img
                    onClick={handleStars}
                    key={index}
                    name={index}
                    className={styles.ratingStar}
                    src={value ? filledStar : unfilStar}
                    alt="..."
                  />
                );
              })}
            </div>
          </div>
          
          <form onSubmit={formik.handleSubmit} noValidate>
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
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  placeholder="Enter your name"
                  required
                />
              </div>
              {formik.errors.name && formik.touched.name && (<div style={{color : 'red'}}>{formik.errors.name}</div>)}
              <div className={styles.form_group + " " + styles.rateFormName}>
                <label for="email">EMAIL ID</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Enter your email id"
                  required
                />
              </div>
              {formik.errors.email && formik.touched.email && (<div style={{color : 'red'}}>{formik.errors.email}</div>)}
            </div>

            <div className={styles.form_group + " " + styles.rateFormCol}>
              <label for="review">REVIEW</label>
              <textarea
                className={styles.DescPlaceholder}
                id={styles.review}
                name="review"
                rows="4"
                placeholder="Enter your review in this box"
                onChange={formik.handleChange}
                value={formik.values.review}
                required
              ></textarea>
            </div>
            {formik.errors.review && formik.touched.review && (<div style={{color : 'red'}}>{formik.errors.review}</div>)}
            <input
              className={styles.reviewSubmit}
              type="submit"
              value="Submit Response"
            />
          </form>
        </div>
        <ToastContainer/>
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