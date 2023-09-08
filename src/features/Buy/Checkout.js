import React, { useState } from "react";
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

export const Checkout=()=>{
    return(
        <div className={styles.checkoutCont}>
            <div className={styles.checkoutData}>
                <CheckoutDataHead seq="1" name="LOGIN"/>
                <DelieveryAddress />
                <OrderSummary/>
                <PaymentOptions/>
            </div>
            <div className={styles.checkoutPriceData}>

            </div>
        </div>
    );
};

const CheckoutDataHead=(props)=>{
    const defaultStyle={backgroundColor:"#FFFFFF"};
    const selectedStyle={backgroundColor:"#019C89"};
    const handleClick=(e)=>{
        props.setShowBottom(!props.showBottom);
    }
    return(
        <div className={styles.checkoutDataHead} style={props.showBottom?selectedStyle:defaultStyle} onClick={handleClick}>
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

const DelieveryAddress=()=>{
    const [showAddress,setAddress]=useState(true);
    
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
            <form className={styles.addressForm}>
              <div className={styles.currLocat}>
                <img src={currLocat} alt="..." />
                <span>Use my current location</span>
              </div>
              <div>
                <input type="text" placeholder="Enter Name" />
                <input type="number" placeholder="10-digit mobile number" />
              </div>
              <div>
                <input type="number" placeholder="Pincode" />
                <input type="text" placeholder="Locality" />
              </div>
              <div>
              <textarea placeholder="Address (Area & Street)"></textarea>
              </div>
              <div>
                <input type="text" placeholder="City/District/Town" />
                <input type="text" placeholder="State" />
              </div>
              <div>
                <input type="text" placeholder="Landmark (Optional)" />
                <input type="number" placeholder="Alternate Phone (Optional)" />
              </div>
              <div className={styles.addresTy}>
                <p>Address Type</p>
                <div className={styles.addRadio}>
                  <div>
                    <input type="radio" name="add" />
                    <span>Home (All day delivery)</span>
                  </div>
                  <div>
                    <input type="radio" name="add" />
                    <span>Work (Delivery between 10AM-PM)</span>
                  </div>
                </div>
              </div>

              <div className={styles.saveData}>
                <input type="submit" value="SAVE AND DELIVER HERE" />
                <span>CANCEL</span>
              </div>
            </form>
          </div>
        )}
      </div>
    );

};

const OrderSummary=()=>{
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
            <OrderSummaryCard/>

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

const OrderSummaryCard=()=>{
    const [quant,setQuant]=useState(1);
    const handleQuant=(e)=>{
        let name=e.currentTarget.name;
        name==="dec"?setQuant(quant-1<1?1:quant-1):setQuant(quant+1);
    }
    return(
        <div className={styles.orderCardCont}>
            <div className={styles.prodDataCont}>
                <div className={styles.prodData}>
                    <img src={video2img} width="190px" height="165px" alt="..."/>
                    <div>
                        <h4>XYZ MACHINE</h4>
                        <p>Seller : Dr. Borako</p>
                        <div className={styles.sumLoc}>
                            <img src={location} width="17px" alt="..."/>
                            <span>New Delhi</span>
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

const PaymentOptions=()=>{
    const [payOption,setPayOption]=useState(false);
    return (
        <div style={{boxShadow:"none",padding:"0px"}}>
        <CheckoutDataHead
          seq="4"
          name="PAYMENT OPTIONS"
          setShowBottom={setPayOption}
          showBottom={payOption}
        />
        {payOption && (
          <div  className={styles.payOptions} >
            <PaymentOptCard data={{name:"Paytm UPI",img:paytam}}/>
            <PaymentOptCard data={{name:"Wallet",img:paytam}}/>
            <PaymentOptCard data={{name:"UPI",img:upib}}/>
            <PaymentOptCard data={{name:"Credit/ Debit / ATM Card",tag:"Add and secure your card as per RBI guidelines"}}/>
            <PaymentOptCard data={{name:"Net Banking",tag:"This instrument has low success, use UPI or cards for better experience"}}/>
            <PaymentOptCard data={{name:"EMI (Easily Installment)"}}/>
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
}