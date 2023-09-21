import React, { useRef, useState } from "react";
import styles from '../../assets/css/manufacture/manufacture.module.css';
import { NavLink } from "react-router-dom";
import {
    manuSearch,
    searchDrop,
    brand1,
    philips,
    relatedImg
} from '../../assets/images/index';

export const Manufacturer=()=>{
    let manufacture={title:"MANUFACTURE",sub:["PHILIPS","Siemens","Mindray","Hitachi","Pentex","Lecia","Zimmer"]};
    let Category={title:"Equipment CATEGORY",sub:["Anesthesia Equipment/ICU","Cardiology Equipment","Cosmetic Equipment","Dental Equipment","Dental Lab Equipment","ENT Equipment","Emt training"]};
    let adds={title:"AD NAME", sub:[]}
    return(
        <section className={styles.manuFactureCont}>
            <div className={styles.manuSubCont}>
                <div className={styles.manureSearch}>
                    <div className={styles.manuPath}>
                        <NavLink><i className="bi bi-house-door" style={{fontSize:"18px",color:"black"}}></i></NavLink>
                        <i style={{fontSize:"12px",color:"black"}} className="bi bi-chevron-right"></i>
                        <NavLink>Manufacture & Distribution</NavLink>
                    </div>
                    <ManuSearch data={manufacture} ads={false}/>
                    <ManuSearch data={Category} ads={false}/>
                    <ManuSearch data={adds} ads={true}/>
                </div>
                <div className={styles.manuContent}>
                    <h1>Medical Equipment Manufacturers</h1>
                    <p style={{fontSize:"15px",marginTop:"8px"}}>Found 1175 manufacturers</p>
                    {/* <div className={styles.manuBrand}>
                        {
                            (new Array(10).fill(0)).map((data,index)=>{
                                return <img alt="..." src={brand1} key={index}/>
                            })
                        }
                    </div> */}
                    <div className={styles.mfContent}>
                        <MFProdCard/>
                    </div>
                </div>
                
            </div>
            
        </section>
    );
};

const ManuSearch=(props)=>{
    return(
        <React.Fragment>
            <div className={styles.msearchCont}>
                <h4>{props.data.title}</h4>
                <div className={styles.msearch}>
                    <input type="text" placeholder="Search"/>
                    <img src={manuSearch} alt="menufacture search"/>
                </div>
                {
                    props.data.sub.map((data,index)=>{
                        return <SearchDropDown data={data} key={index}/>

                    })
                }
                
            </div>
            {
                props.ads?"":<div className={styles.maniLine} ></div>
            }
            
        </React.Fragment>
    );
};

const SearchDropDown=(props)=>{
    const [isDropOpen,setIsDropOpen]=useState(false);
    const handleDrop=(e)=>{
        let iconStyle=e.currentTarget.style;
        isDropOpen?iconStyle.rotate="0deg":iconStyle.rotate="90deg";
        setIsDropOpen(!isDropOpen);
    }


    return(
        <div className={styles.searchDropCont}>
            <div className={styles.searchTitle}>
                <div className={styles.subSearchT}>
                    <img src={searchDrop} alt="search drop" onClick={handleDrop}/>
                    <input type="checkbox"/>
                    <span>{props.data}</span>
                </div>
                <span>(4)</span>
            </div>
            {/* {
                isDropOpen && (
                    <div style={{marginLeft:"20px"}}>
                        <DropCard/>
                        <DropCard/>
                        <DropCard/>
                        <DropCard/>
                        <DropCard/>
                    </div>
                )
            } */}

        </div>
    );
};

const DropCard = () => {
  return (
      <div className={styles.searchTitle}>
        <div className={styles.subSearchT}>
          <input type="checkbox" />
          <span>PHILIPS</span>
        </div>
        <span>(4)</span>
      </div>
    
  );
};

const MFProdCard=()=>{
    return(
        <div className={styles.mfProdCard}>
            <img src={relatedImg} style={{width:"200px",height:"180px"}} alt="..."/>
            <div className={styles.mfProdData}>
                <div className={styles.mfTitile}>
                    <h4>XYR Machine</h4>
                    <span>NEW</span>
                    <img src={philips} alt="..."/>
                </div>
                <div className={styles.mfType}>
                    <span>Video laryngoscopes</span>
                    <span>Lithotripters</span>
                    <span>Video ureteroscopes</span>
                </div>
                <h3>Seller : XYZ</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ut libero odio.ante quis aliquet adipiscing elit. Phasell lobortis,  Read more</p>
                <div>
                    <div>
                        <h2>₹50000</h2>
                        <p>(Plus Shipping and GST tax included)</p>
                    </div>
                    <span>ARRANGE DEMO</span>
                    <span>GO TO EQUIPMENT</span>
                </div>
            </div>
        </div>
    );
};
