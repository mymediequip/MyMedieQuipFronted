import React from 'react';

import { DashboardAdvt } from '../../components/Advt';
import { NavLink, Outlet, useLocation, useNavigate} from 'react-router-dom';
import styles from '../../assets/css/buy/prod_desc.module.css';
import { RelatedProdCard } from '../../components/Cards';
import { GetStarted,BackgroundBlur } from '../../utils/Popups';
import * as yup from "yup";
import { SocialShare } from '../../utils/Popups';
import {emailSchema, fnameSchema} from '../../utils/validation';
import { useRef, useState ,useEffect} from 'react';
import {
    findE,
    inspection,
    closeDeal,
    handling,
    amc,
    shipped,
    location,
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
    schedule,
} from '../../assets/images/index';
import { useFormik } from 'formik';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { ScheduleMeeting } from './Meeting';
import axios from 'axios';
import { postData } from '../../services';
import MapView from '../../components/GoogleMap';

const profileImg =  process.env.REACT_APP_IMAGE_PREVIEW

export const ProductDescription=()=>{
    return(
        <div className={styles.pd_container}>
            <DashboardAdvt/>
            <MMQprocess/>
            <ProductData/>
            {/* <ProductInfo/> */}
            <RelatedProd/>
        </div>
    );
}; 

const ProductData=()=>{
    const  location  =  useLocation()
    const item =  location?.state?.prodDetails
    // console.log(item,"item")
    const navigate  =  useNavigate()
    let isLogin = localStorage.getItem("token")
    const [getStart,setGetStart]=useState(false);
    const [isBlur,setBlur]=useState(false);
    const [address,setaddress]=useState("");
    const [click,setClick]=useState("photo");
    const [currentIndex,setCurrentIndex]=useState(0);
    const [displayedData, setDisplayedData] = useState({});
    const [profile, setProfle] = useState({});
    const [category, setcategory] = useState([]);
    const [openSocial,setOpenSocial]=useState(false);
 


    useEffect(() => {
        const API_KEY = 'pk.9432c2fb2d8b14ffa18cbb6050de3944';
        const API_URL = `https://nominatim.openstreetmap.org/reverse?lat=${item?.latitude}&lon=${item?.longitude}&format=json&apiKey=${API_KEY}`;
        axios
        .get(API_URL)
        .then(response => {
                // console.log(response)
                setaddress(response?.data?.display_name)
            })
            .catch(error => {
                console.error('Error fetching address:', error);
              });
          }, [location.lat ,location.long]);

    const phoneNumber = '+919716924981'; // Replace with the actual phone number
    const encodedPhoneNumber = encodeURIComponent(phoneNumber);

    const [openMeeting,setMeeting]=useState(false);
    const [buyClick,setbuyClick]=useState(false);
    const contRef=useRef(null);

    const sellarClick=(event,isBuyClick)=>{
        event.preventDefault();
        if(isLogin){
            setMeeting(true);  
            contRef.current.scrollIntoView();
            if(isBuyClick){
              setbuyClick(true);
            }
            else{
              setbuyClick(false);
            }
        }
        else{
            setBlur(true); 
            setGetStart(!getStart);
            navigate("" ,{state:{navigateTo: "products/xray-machine/"}});
            window.scrollTo(0,0);  
        }
    };

    
    const handleSocial=(e)=>{
        setOpenSocial(!openSocial);
    }
    const prodImgStyle={
        backgroundImage:`url(${displayedData?.product_images ? displayedData?.product_images : pngwing})`,
    };
    const ref=useRef();
    useEffect(()=>{
        document.addEventListener("click",(e)=>{
            if(ref.current && !ref.current.contains(e.target)){
                setOpenSocial(false);
            }
        });
    },[])
    
    const handleLeft = () =>{
        setCurrentIndex((prev)=>(prev -1 + item?.product_images.length) % item?.product_images.length)

    }
    const handleRight = () =>{
        setCurrentIndex((prev)=>prev+1 % item?.product_images.length)
    }
    useEffect(()=>{
        const updateDisplayedData = () =>{
            const displayed=item?.product_images[(currentIndex) % item?.product_images?.length]
            setDisplayedData(displayed)
        }
        updateDisplayedData();
    },[currentIndex])

    useEffect(()=>{
        handleUserProfile()
        handleCategory()
    },[item])

    const handleUserProfile  = async() => {
        const formData =  new FormData()
        formData.append("uid" , item?.uid)
        const res = await postData("users/get_user_detail/" , formData ,true)
        if(res?.status){
            setProfle(res?.data?.profile)
        }
    }
    const handleCategory  = async() => {
        const formData =  new FormData()
        formData.append("id" , item?.category)
        const res = await postData("product/category/menulist/" , formData)
        if(res?.status){
            setcategory(res?.data)
        }
    }

   
    
    
    return(
        <React.Fragment>
            <div className={styles.prod_path}>
                <img src={homeIcon} alt='...'/>
                <img src={rightMove} alt='...'/>
                <NavLink to="/">{item?.equip_name}</NavLink>
                <img src={rightMove} alt='...'/>
                <NavLink to="/">{item?.equip_name}</NavLink>
            </div>
            <div ref={contRef} className={styles.prod_data}>
                <div className={styles.prod_imgs}>
                    <div style={prodImgStyle} className={styles.prodBigImg}>
                    </div>
                    <div className={styles.imgSlider}>
                    <img src={swipetestleft} onClick={handleLeft} alt='...' style={{width:"25px",height:"25px"}}/>
                    {
                      item?.product_images.length > 0 ?  item?.product_images?.slice(0,4)?.map((image)=>{
                        return(
                            <img src={image?.product_images} alt='...' />
                        )
                    }) :  
                    (<>
                    <img src={pngwing} alt='...'/>
                    <img src={pngwing} alt='...'/>
                    <img src={pngwing} alt='...'/>
                    <img src={pngwing} alt='...'/>
                    </>)

                }
                        <img src={nextArow} onClick={handleRight} style={{width:"25px",height:"25px"}} alt='...'/>
                    </div>
                </div>
                <div className={styles.p_data}>
                    <div className={styles.p_head}>
                        <div>
                            <div className={styles.newProd}>
                              <h3 style={{marginBottom:"0px"}}>{item?.equip_name}</h3>
                              <span >NEW</span>
                            </div>
                            <div>
                              <span className={styles.prodId}>XM-101011QR</span>
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
                    
                    {openMeeting?<ScheduleMeeting isBuyClick={buyClick} setMeeting={setMeeting} sellarClick={sellarClick} data={item} profile={profile} />:<ProductMeta info={item} data={profile}/>}
                    
                    <div className={styles.prodActLinks}>
                        <NavLink className={styles.contactSellar} onClick={(e)=>{sellarClick(e,false)}}>
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
                        
                        <NavLink style={{backgroundColor:"#FFDD75",color:"black"}} onClick={(e)=>{sellarClick(e,true)}} className={styles.contactSellar} >
                            <img src={atcBtn} height="15px" alt='...'/>
                            <span>CLICK TO BUY NOW</span>
                        </NavLink>

                    </div>
                    
                    <div className={styles.prodLocation}>
                        <b style={{color:"#019C89"}}>Posted in</b>
                        <span>{address}</span>
                        {/* <img src={dummyMap} alt='...'/> */}
                        <MapView lat={item?.latitude} long={item?.longitude}/>
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

        <div className={styles.pd_info}>
            <div className={styles.pd_info_links}>
                <div style={{marginRight : '20px'}} onClick={()=>setClick("details")} className={`${click == "details" ? styles.isActive : styles.isDeactive}`}>DETAILS</div>
                <div onClick={()=>setClick("photo")} className={`${click == "photo" ? styles.isActive : styles.isDeactive}`}  >PHOTOS</div>
                <div style={{marginLeft : '20px'}} onClick={()=>setClick("review")} className={`${click == "review" ? styles.isActive : styles.isDeactive}`}  >REVIEWS</div>
            </div>
        </div>
        <div>
                {
                    click == "details" ? 
                    <ProductMetaData info={item} cat={category} /> 
                    : click == "photo" ?
                    <ProductImgVideo info={item}/>
                    : click == "review" ?
                    <ProductReview/> : ""
                }
            </div>
        </React.Fragment>
    );
};

export const ProductMeta = ({info , data}) => {
  return (
    <React.Fragment>
      <div>
        <div className={styles.pd_links}>
          <div className={styles.sellerName}>
            <img src={data?.image ? `${profileImg}${data?.image}` :  testimage2} alt="..." />
            <p>{`${data?.first_name} ${data?.last_name}`}</p>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:"5px"}}>
            <img src={location}  alt="..." />
            <span>New Delhi</span>
          </div>
        </div>
      </div>

      <div>
        <p style={{ color: "#019C89" }}>Product Details</p>
        <p>
          {info?.description}
        </p>
      </div>

      <div>
        <h3>₹ {info?.asking_price}</h3>
        <p>(Plus Shipping and VAT tax included)</p>
      </div>
    </React.Fragment>
  );
};

const ProductInfo=()=>{
    return(
        <div className={styles.pd_info}>
            <div className={styles.pd_info_links}>
                <NavLink style={ActivateLinks} to={`/products/xray-machine/info/`} >DETAILS</NavLink>
                <NavLink style={ActivateLinks} to="/products/xray-machine/" >PHOTOS</NavLink>
                <NavLink style={ActivateLinks} to="/products/xray-machine/review/" >REVIEWS</NavLink>
            </div>
            <Outlet/>
        </div>
    );
};

export const ProductImgVideo=({info})=>{

    return(
        <div className={styles.prodAsset}>
            {/* <img src={video_Advt} alt='...' style={{width:"100%",height:"400px"}}/> */}
            <video src={"http://13.53.198.145:8000/mmq_apps/static/upload/product/video/Screenshot_from_2023-08-25_01-53-00_03092023062327719030.png"} controls width={"100%"} height={"400px"}>
                {/* <source src={src} type='video/webm'/> */}
            </video>
            <div className={styles.prodsImg}>
                {
                    info?.product_images?.slice(0,5)?.map((image)=>{
                        return(
                            <img src={image?.product_images} alt='...' style={{width:"190px",height:"250px"}}/>
                        )
                    })

                }
               
            </div>
        </div>
    );
};

export const ProductMetaData=({info ,cat})=>{

    const productdedtails=[ 
        {pname:'Brand' ,pvalue: info?.brand},
        {pname:'Model',pvalue:info?.model},
        {pname:'Condition',pvalue:info?.equip_condition == 1 ? "Good" :info?.equip_condition == 2 ? "Excellent" : "As Good as New" },
        {pname:'Warrenty',pvalue: info?.warranty == 1  ? "YES" : "NO"},
        {pname:'Shipping From',pvalue: info?.address},
        {pname:'Advert#',pvalue:'20212922'},
        {pname:'Catagory',pvalue: cat ? cat?.map((el)=>el?.name) : 'Ultrasound Machine'},
        {pname:'Posted',pvalue: info?.date},
        {pname:'Visits',pvalue: info?.visit ? info?.visit :  '0'}
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
    const [relatedProducts, setRelatedProducts] = useState([]);
    // const [prodData,setProdData]=useState(relatedProducts.slice(0,4));
    // const [p_pointer,setPointer]=useState({left:0,right:4});
    const [currentIndex ,setCurrentIndex] = useState(0)
    const [displayedData, setDisplayedData] = useState([]);


    useEffect(() => {
          fetchRelatedProducts();
      }, []);

     const  fetchRelatedProducts =  async() =>{
        const res = await postData("product/filter_list/", "", true);
        setRelatedProducts(res?.data?.featured_products);
     }

     const handleScrollLeft = () =>{
     setCurrentIndex((prev)=>(prev-1 + relatedProducts?.length) % relatedProducts?.length)
    } 
  
    const handleScrollRight = () =>{
        setCurrentIndex((prev)=> (prev + 1) % relatedProducts?.length)
       }
   
  
    useEffect(()=>{
      const updateDisplayedData = () =>{
        const displayed=[
            relatedProducts[currentIndex %  relatedProducts?.length],
            relatedProducts[(currentIndex + 1) % relatedProducts?.length],
            relatedProducts[(currentIndex + 2) % relatedProducts?.length],
            relatedProducts[(currentIndex + 3) % relatedProducts?.length],
        ]
        setDisplayedData(displayed)
      }
  
      updateDisplayedData();
    },[currentIndex , relatedProducts])

    


    // const relatedProd=[
    //     {title:"Prod 1",des:"space for a small product description.space for a small product",price:"2000"},
    //     {title:"Prod 2",des:"space for a small product description.space for a small product",price:"3000"},
    //     {title:"Prod 3",des:"space for a small product description.space for a small product",price:"4000"},
    //     {title:"Prod 4",des:"space for a small product description.space for a small product",price:"5000"},
    //     {title:"Prod 5",des:"space for a small product description.space for a small product",price:"6000"},
    //     {title:"Prod 6",des:"space for a small product description.space for a small product",price:"2000"},
    //     {title:"Prod 7",des:"space for a small product description.space for a small product",price:"3000"},
    //     {title:"Prod 8",des:"space for a small product description.space for a small product",price:"4000"},
    //     {title:"Prod 9",des:"space for a small product description.space for a small product",price:"5000"},
    //     {title:"Prod 10",des:"space for a small product description.space for a small product",price:"6000"}
    // ];
    // console.log(p_pointer,"data")
    // using two pointer
    // const shiftProducts=(e)=>{
    //     let name=e.currentTarget.name;
    //     if(name==="prev" && p_pointer.left>0){
    //         setProdData(relatedProducts.slice(p_pointer.left-=1,p_pointer.right-=1));
    //     }
    //     if(name==="next" && p_pointer.right<relatedProducts.length){
    //         setProdData(relatedProducts.slice(p_pointer.left+=1,p_pointer.right+=1));
    //     }  
    //     console.log(p_pointer.left,p_pointer.right);
    // }

    return (
      <React.Fragment>
        <div className={styles.hzline}>
          <hr className={styles.line1} />
          <h3 className={styles.relprod}>RELATED PRODUCTS</h3>
          <hr className={styles.line2} />
        </div>
        <div style={{position:"relative",marginBottom:"40px"}}>
            <img src={swipetestleft} alt='...' onClick={handleScrollLeft} name="prev" className={styles.rlatedProdPrev}/>
            <div className={styles.rowws}>
                {
                    displayedData.map((value,id)=>{
                        return <RelatedProdCard data={value} key={id}/>   
                    })
                }
                
            </div>
            <img src={nextArow} onClick={handleScrollRight} className={styles.rlatedProdNext} name="next" alt='...'/>
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

/* process */
const MMQprocess=()=>{
  const processData=[
    {name:"Find Equipment",img:findE},
    {name:"Schedule meeting with seller",img:schedule},
    {name:"Get Inspection Report",img:inspection},
    {name:"Close The Deal",img:closeDeal},
    {name:"Get it Shipped",img:shipped},
    {name:"Handling & Installation",img:handling},
    {name:"AMC/ CME, Services",img:amc}
  ];
  return(
    <div className={styles.processCont}>
      {
        processData.map((value,index)=>{
          return <ProcessCard key={index} curr={index} data={value}/>
        })
      }
    </div>
  );
}
const ProcessCard=(props)=>{
  const currBuyStatus=useSelector((state)=>state.profileData.currBuyStatus);
  const cardActiveStyle={};
  if(currBuyStatus===props.curr){
    cardActiveStyle['border']="1px solid #019C89";
  }
  else{
    cardActiveStyle['boxShadow']="rgba(0, 0, 0, 0.16) 0px 1px 4px";
  }
  return(
    <div className={styles.processCard}>
      <div className={styles.procImg} style={cardActiveStyle}>
        <img src={props.data.img} alt='...'/>
      </div>
      <span>{props.data.name}</span>
    </div>
  );
};
// non component function

const ActivateLinks=({isActive})=>{
    return(
        {
            borderBottom: isActive?"2px solid #019C89":"none",
            color:isActive?"#019C89":"#4F4F4F"
        }
    );
}