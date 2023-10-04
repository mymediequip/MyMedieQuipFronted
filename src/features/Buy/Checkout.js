import React, { useRef, useState ,useEffect} from "react";
import styles from '../../assets/css/buy/checkout.module.css';
import {
    currLocat,
    video2img,
    location,
    decrease,
    incrase,
    paytam,
    upib
} from '../../assets/images/index';
import {useFormik } from "formik";
import * as yup  from "yup"
import axios from "axios";
import { addressSchema, addressTypeSchema, citySchema, fnameSchema, nationalitySchema, pincodeSchema, pnumberSchema, stateSchema } from "../../utils/validation";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setEquipPriceStatus } from "../../app/Slices/UserData";
const API_KEY =  process.env.REACT_APP_ADDRESS_KEY

export const Checkout=()=>{
  const price =  useSelector((state)=>state.profileData.eqip_price_update)
  const discount =  useSelector((state)=>state.profileData.eqip_discount)
  const inspectionStatus =  useSelector((state)=>state.profileData.inspection_status)
  const location  =  useLocation()
  let details  =  location?.state?.details
  let profileDetails = location?.state?.profileDetails
    return(
        <div className={styles.checkoutCont}>
            <div className={styles.checkoutData}>
                <PayLogin/>
                <DelieveryAddress lat={details?.latitude} lng={details?.longitude} inspection={inspectionStatus} />
                <OrderSummary details={details} profileDetails={profileDetails}/>
                <PaymentOptions inspection={inspectionStatus} discount={discount}/>
            </div>
            <div className={styles.checkoutPriceData}>
              <p>TOTAL PRICING</p>
              <div>
                <span>Equipment Cost :</span>
                <span>₹{price ? price : "10000"}</span>
              </div>
              <div>
                <span>Negotiable Deal Price :</span>
                <span>₹10000</span>
              </div>
              <div>
                <span>Platform Fee :</span>
                <span>₹10000</span>
              </div>
              <div>
                <span>Inspection & Verification Cost:</span>
                <span style={{color:"#019C89"}}>-₹10000</span>
              </div>
              <div>
                <span>Shipping Price :</span>
                <span>₹10000</span>
              </div>
              <div>
                <span>Installation Price :</span>
                <span>₹10000</span>
              </div>
              <div>
                <span>GST:</span>
                <span>₹10000</span>
              </div>
              <div>
                <b>Total Payment :</b>
                <b>₹10000</b>
              </div>
            </div>
        </div>
    );
};

const CheckoutDataHead=(props)=>{
    const defaultStyle={backgroundColor:"#FFFFFF"};
    const selectedStyle={backgroundColor:"#019C89"};
    const ref=useRef();
    
    const handleClick=(e)=>{
      props.setShowBottom(!props.showBottom);
    };

  //   useEffect(()=>{
  //     document.addEventListener("click",(e)=>{
  //       if(ref.current && !ref.current.contains(e.target)){
  //       props.setShowBottom(false);
  //     }
  //   });
  // },[])
    return(
        <div className={styles.checkoutDataHead} ref={ref} style={props.showBottom?selectedStyle:defaultStyle} onClick={handleClick}>
            <div>
                <span className={styles.checkout1}>{props.seq}</span>
                <span className={styles.checkout2} style={{color:props.showBottom?"#FFFFFF":"#878793"}}>{props.name}</span>
            </div>
            {
                !props.showBottom && <span className={styles.checkout3} >CHANGE</span>
            }
        </div>
    );
};

const DelieveryAddress=({lat,lng , inspection})=>{
    const [showAddress,setAddress]=useState(true);
    const [usecurrentLocation,setCurrentLocation]=useState(false);
  
   useEffect(()=>{
       if(inspection){
        setAddress(false)
       }
   },[inspection])
    

  useEffect(()=>{
    if(usecurrentLocation){
      const API_URL = `http://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${API_KEY}`;
      axios
      .get(API_URL)
      .then(response=>{
        formik.setValues({
          user_pincode : response?.data?.address?.postcode,
          user_country : response?.data?.address?.country,
          user_address : response?.data?.display_name,
          user_city : response?.data?.address?.state_district,
          user_state : response?.data?.address?.state,
        })
      })
      .catch(error=>{
        console.error('Error fetching address:', error);
      })
    }
  },[usecurrentLocation])

    
    const formik =  useFormik({
      initialValues : {
        user_name : "",
        user_mobile : "",
        user_pincode : "",
        user_country : "",
        user_address : "",
        user_city : "",
        user_state : "",
        user_landmark : "",
        user_alternate_number : "",
        delivery_add : ""
      },
      validationSchema : yup.object().shape({
          user_name : fnameSchema,
          user_mobile: pnumberSchema,
          user_pincode:pincodeSchema,
          user_country : nationalitySchema,
          user_address: addressSchema,
          user_city : citySchema,
          user_state : stateSchema,
          delivery_add : addressTypeSchema
      }),
      onSubmit: function (values){
        handleSubmit(values)
      }
    })


    const handleSubmit = (val) =>{
         console.log(val)
    }

    const handleReset = () =>{
      setCurrentLocation(false);
      formik.handleReset();
    }
    return (
      <div>
        <CheckoutDataHead
          seq="2"
          name="DELIVERY ADDRESS"
          setShowBottom={setAddress}
          showBottom={showAddress}
        />
        {showAddress && (
          <div  className={styles.deliveryAdd}>
            <form className={styles.addressForm} onSubmit={formik.handleSubmit}>
              <div onClick={()=>setCurrentLocation(true)} className={styles.currLocat}>
                <img src={currLocat} alt="..." />
                <span>Use my current location</span>
              </div>
              <div>
                <input type="text" placeholder="Enter Name" onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.user_name} name="user_name" />
                <input type="number" placeholder="10-digit mobile number" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.user_mobile} name="user_mobile"  />
              </div>
           <div>
         <div style={{display : 'flex' ,justifyContent : "flex-start"}}>
         {formik.touched.user_name && formik.errors.user_name ? 
                <span style={{color : 'red' ,width : "50%"  }}>{formik.errors.user_name}</span>  : null
                }

                {formik.touched.user_mobile && formik.errors.user_mobile ? 
                <span style={{color : 'red'}}>{formik.errors.user_mobile}</span> : null
                     }
         </div>
           </div>
              <div>
                <input type="number" placeholder="Pincode" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.user_pincode} name="user_pincode" />
                <input type="text" placeholder="Locality" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.user_country} name="user_country"/>
              </div>
              <div style={{display : 'flex' ,justifyContent : "flex-start"}}>
             {formik.touched.user_pincode && formik.errors.user_pincode ? 
                <div style={{color : 'red' ,width : "50%"}}>{formik.errors.user_pincode}</div> : null
                }

                {formik.touched.user_country && formik.errors.user_country ? 
                <div style={{color : 'red' ,width : '50%' , float : "right"}}>{formik.errors.user_country}</div> : null
                     }
             </div>
              <div>
              <textarea placeholder="Address (Area & Street)" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.user_address} name="user_address"></textarea>
              </div>
              {
                formik.touched.user_address && formik.errors.user_address ?
                <div style={{color : "red"}}>{formik.errors.user_address}</div> : null
              }
              <div>
                <input type="text" placeholder="City/District/Town" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.user_city} name="user_city" />
                <input type="text" placeholder="State" onBlur={formik.handleBlur}  onChange={formik.handleChange} value={formik.values.user_state} name="user_state"/>
              </div>
               <div style={{display : 'flex' ,justifyContent : "flex-start"}}>
             {formik.touched.user_city && formik.errors.user_city ? 
                <div style={{color : 'red' ,width : "50%"}}>{formik.errors.user_city}</div> : null
                }

                {formik.touched.user_state && formik.errors.user_state ? 
                <div style={{color : 'red'}}>{formik.errors.user_state}</div> : null
                     }
             </div>
              <div> 
                <input type="text" placeholder="Landmark (Optional)" onChange={formik.handleChange} value={formik.values.user_landmark} name="user_landmark"/>
                <input type="number" placeholder="Alternate Phone (Optional)" onChange={formik.handleChange} value={formik.values.user_alternate_number} name="user_alternate_number" />
              </div>
              <div className={styles.addresTy}>
                <p>Address Type</p>
                <div className={styles.addRadio}>
                  <div>
                    <input type="radio" name="delivery_add" value="home" onChange={formik.handleChange} checked={formik.values.delivery_add == "home"} />
                    <span>Home (All day delivery)</span>
                  </div>
                  <div>
                    <input type="radio" name="delivery_add" value="work" onChange={formik.handleChange} checked={formik.values.delivery_add == "work"}/>
                    <span>Work (Delivery between 10AM-PM)</span>
                  </div>
                </div>
              </div>
              {
                formik.touched.delivery_add && formik.errors.delivery_add ? 
                <div style={{color :'red'}}>{formik.errors.delivery_add}</div> : null
              }
              <div className={styles.saveData}>
                <input type="submit" value="SAVE AND DELIVER HERE" />
                <span onClick={handleReset}>CANCEL</span>
              </div>
            </form>
          </div>
        )}
      </div>
    );

};

const OrderSummary=({details , profileDetails})=>{
    const [showOrder,setOrder]=useState(false);
    return (
      <React.Fragment>
        <div>
        <CheckoutDataHead
          seq="3"
          name="ORDER SUMMARY"
          setShowBottom={setOrder}
          showBottom={showOrder}
        />
        {showOrder && (
          <div  className={styles.deliveryAdd}>
            <OrderSummaryCard details={details} profileDetails={profileDetails}/>

          </div>
        )}
      </div>
      {
        showOrder && (
        <div className={styles.orderContinue}>
            <p>Order confirmation email will be sent to abcde@gmail.com</p>
            <span>CONTINUE</span>
        </div>)
      }
      </React.Fragment>
    );
};

const OrderSummaryCard=({details ,profileDetails})=>{
    const dispatch =  useDispatch()
    const [quant,setQuant]=useState(1);
    const handleQuant=(e)=>{
        let name=e.currentTarget.name;
        name==="dec"?setQuant(quant-1<1?1:quant-1):setQuant(quant+1);
    }
    
    useEffect(()=>{
      handlePrice()
    },[quant])
    
    
    const handlePrice = () =>{
      let price = details?.asking_price
        for(let i = quant ; i <= quant ; i++){
              price = price*i
        }
        dispatch(setEquipPriceStatus(price))
    }
    return(
        <div className={styles.orderCardCont}>
            <div className={styles.prodDataCont}>
                <div className={styles.prodData}>
                    <img src={video2img} width="190px" height="165px" alt="..."/>
                    <div>
                        <h4>{details?.equip_name}</h4>
                        <p>Seller : {profileDetails ? `${profileDetails?.first_name}${" "}${profileDetails.last_name}` : "Dr .Avdesh"}</p>
                        <div className={styles.sumLoc}>
                            <img src={location} width="17px" alt="..."/>
                            <span>{profileDetails?.location}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.prodCounter}>
                    <img src={decrease} onClick={handleQuant} name="dec" alt="-"/>
                    <b>{quant}</b>
                    <img src={incrase} name="inc" onClick={handleQuant} alt="+"/>
                    <p>REMOVE</p>
                </div>

            </div>
            <div className={styles.prodService}>
                <b>Services Added</b>
                <div>
                    <input type="checkbox"/>
                    <span>Shipping Equipment</span>
                </div>
                <div>
                    <input type="checkbox"/>
                    <span>Handling & Installation</span>
                </div>
                <div>
                    <input type="checkbox"/>
                    <span>AMC & CME Service</span>
                </div>
            </div>
        </div>
    );
};

const PaymentOptions=({inspection , discount})=>{
    const [payOption,setPayOption]=useState(false);
  const navigate =  useNavigate()
    const [book, setBook] = useState({
      name: "MYMedieQuip",
      author: "Avdesh",
      img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
      price: discount ? discount : 5000,
    });
  
    const initPayment = (data) => {
      const options = {
        key: "rzp_test_T0NoaQ1qdAoZ1s",
        amount: data.amount,
        currency: data.currency,
        name: book.name,
        description: "Test Transaction",
        image: book.img,
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyUrl = "http://localhost:8080/api/payment/verify";
            const { data } = await axios.post(verifyUrl, response);
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    };
  
    const handlePayment = async () => {
      try {
        const orderUrl = "http://localhost:8080/api/payment/orders";
        const { data } = await axios.post(orderUrl, { amount: book.price });
        console.log(data);
        initPayment(data.data);
        // window.open(orderUrl, '_blank');
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(()=>{
  if(inspection){
      setPayOption(true)
       handlePayment()
    }
  },[inspection])
  
    return (
        <div style={{boxShadow:"none",padding:"0px"}}>
        <CheckoutDataHead
          seq="4"
          name="PAYMENT OPTIONS"
          setShowBottom={setPayOption}
          showBottom={payOption}
          setseq="4"
        />
        {payOption && (
          <div  className={styles.payOptions} >
            <button onClick={handlePayment}>BUY</button>
            {/* <PaymentOptCard data={{name:"Paytm UPI",img:paytam}}/>
            <PaymentOptCard data={{name:"Wallet",img:paytam}}/>
            <PaymentOptCard data={{name:"UPI",img:upib}}/>
            <PaymentOptCard data={{name:"Credit/ Debit / ATM Card",tag:"Add and secure your card as per RBI guidelines"}}/>
            <PaymentOptCard data={{name:"Net Banking",tag:"This instrument has low success, use UPI or cards for better experience"}}/>
            <PaymentOptCard data={{name:"EMI (Easily Installment)"}}/> */}
          </div>
        )}
      </div>
      
    );
};



const PaymentOptCard=(props)=>{
    return(
        <div className={styles.payCard}>
            <div>
                <input type="radio" name="pay"/>
                {
                    props.data?.img && <img src={props.data?.img} height="11px" alt="paytme"/>
                }
                <span>{props.data.name}</span>
            </div>
            {
                props.data?.tag && <p>{props.data?.tag}</p>
            }
            
        </div>
    );
};

const PayLogin=()=>{
  const [loginData,setLoginData]=useState(false);

  const formik =  useFormik({
    initialValues:{
      luser : "",
      lmobile : ""
    },
    validationSchema : yup.object().shape({
       luser : fnameSchema,
       lmobile : pnumberSchema
    }),
    onSubmit : function(values){
      // console.log(values,"values")
      handleSubmit(values)
    }
  })

  
  const handleSubmit = (val) =>{
    console.log(val,"formik")

  }
  
  return (
    <div>
      <CheckoutDataHead
        seq="1"
        name="LOGIN"
        setShowBottom={setLoginData}
        showBottom={loginData}
      />
      {loginData && (
        <div className={styles.deliveryAdd}>
          <form className={styles.addressForm} onSubmit={formik.handleSubmit}>
            <div>
              <input type="text" placeholder="Login Name" value={formik.values.luser} onChange={formik.handleChange} onBlur={formik.handleChange} name="luser" />
              <input type="number" placeholder="Login mobile number" value={formik.values.lmobile} onChange={formik.handleChange} onBlur={formik.handleChange} name="lmobile" />
            </div>
             <div style={{display : "flex" , justifyContent : "space-between"}}>
             {
                formik.touched.luser && formik.errors.luser ? 
                <div style={{color : "red"}}>{formik.errors.luser}</div> : null
              }
               {
                formik.touched.lmobile && formik.errors.lmobile ? 
                <div style={{color : "red"}}>{formik.errors.lmobile}</div> : null
               }
             </div>

            <div className={styles.saveData}>
              <input type="submit" value="CHANGED" />
              {/* <span>CANCEL</span> */}
            </div>
          </form>
        </div>
      )}
    </div>
  )

};

