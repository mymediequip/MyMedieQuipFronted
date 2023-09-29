import React, { useRef, useState } from "react";
import styles from '../../assets/css/manufacture/manufacture.module.css';
import { setSelectedMF,removeSelectedMF,setSelectedCat,removeSelectCat } from "../../app/Slices/ManufacturerSlice";
import { NavLink, useNavigate } from "react-router-dom";
import {
    manuSearch,
    searchDrop,
    brand1,
    philips,
    relatedImg,
    filterMF,
    sortMf
} from '../../assets/images/index';
import { useDispatch, useSelector } from "react-redux";

export const Manufacturer=()=>{
    const selectedMF=useSelector((state)=>state.mfSlice.selectedMF);
    const selectedCat=useSelector((state)=>state.mfSlice.selectedCat);
    console.log(selectedMF,selectedCat);
    const isOptionSelectd=selectedMF.length>0 || selectedCat.length>0?true:false;

    let manufacture={title:"MANUFACTURE",sub:["PHILIPS","Siemens","Mindray","Hitachi","Pentex","Lecia","Zimmer"]};
    let Category={title:"Equipment CATEGORY",sub:["Anesthesia Equipment/ICU","Cardiology Equipment","Cosmetic Equipment","Dental Equipment","Dental Lab Equipment","ENT Equipment","Emt training"]};
    let adds={title:"AD NAME", sub:[]}

    const [ismobile,setMobile]=useState(false);
    const handleMobileSearch=()=>{
        setMobile(!ismobile);
    }
    return(
        <section className={styles.manuFactureCont}>
            <div className={styles.manuSubCont}>
                <div className={ ismobile?styles.mobileSearch:styles.manureSearch}>
                     {/* mobile back */}
                   {
                    ismobile && ( <div className={styles.mobileBack} onClick={handleMobileSearch}> 
                        <i class="bi bi-arrow-left-short"></i>
                        <spna>FILTER</spna>
                    </div>)
                   }

                    <div className={styles.manuPath}>
                        <NavLink><i className="bi bi-house-door" style={{fontSize:"18px",color:"black"}}></i></NavLink>
                        <i style={{fontSize:"12px",color:"black"}} className="bi bi-chevron-right"></i>
                        <NavLink>Manufacture & Distribution</NavLink>
                    </div>
                    <ManuSearch data={manufacture} searchFor={1} />
                    <ManuSearch data={Category} searchFor={2} />
                    <ManuSearch data={adds} ads={true} searchFor={3}/>
                </div>
                <div className={styles.manuContent}>
                    {/* mobile view */}
                    <div className={styles.mobileContTop}>
                        <div className={styles.manuPath}>
                            <NavLink><i className="bi bi-house-door" style={{fontSize:"18px",color:"black"}}></i></NavLink>
                            <i style={{fontSize:"12px",color:"black"}} className="bi bi-chevron-right"></i>
                            <NavLink>Manufacture & Distribution</NavLink>
                        </div>
                        <div className={styles.filters}>
                            <img src={filterMF} onClick={handleMobileSearch} width="120px" alt="filter"/>
                            <img src={sortMf} width="120px" alt="sortby"/>
                        </div>

                    </div>

                    <h1>Medical Equipment Manufacturers</h1>
                    <p style={{fontSize:"15px",marginTop:"8px"}}>Found 1175 manufacturers</p>
                    {
                        isOptionSelectd?(
                        <div className={styles.mfContent}>
                            <MFProdCard/>
                            <MFProdCard/>
                            <MFProdCard/>
                            <MFProdCard/>
                        </div>
                        ):(
                        <div className={styles.manuBrand}>
                            {
                                (new Array(10).fill(0)).map((data,index)=>{
                                    return <img alt="..." src={brand1} key={index}/>
                                })
                            }
                        </div>
                        )
                    }
                      
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
                        return <SearchDropDown searchFor={props.searchFor} data={data} key={index}/>

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
    const update=useUpdateselection();
    const handleDrop=(e)=>{
        let iconStyle=e.currentTarget.style;
        isDropOpen?iconStyle.rotate="0deg":iconStyle.rotate="90deg";
        setIsDropOpen(!isDropOpen);
    }
    const handleChange=(e)=>{
        let isChecked=e.currentTarget.checked;
        update(isChecked,props.searchFor,props.data);
    }

    return(
        <div className={styles.searchDropCont}>
            <div className={styles.searchTitle}>
                <div className={styles.subSearchT}>
                    <img src={searchDrop} alt="search drop" onClick={handleDrop}/>
                    <input type="checkbox" onChange={handleChange}/>
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

export const MFProdCard=()=>{
    const navigate=useNavigate();
    return(
        <div className={styles.mfProdCard}>
            <img src={relatedImg} className={styles.prodImg}  alt="..."/>
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
                <div className={styles.priceCont}>
                    <div className={styles.pricing}>
                        <h2>₹ 50000</h2>
                        <p style={{fontSize:"12px",marginBottom:"0px"}}>(Plus Shipping and GST tax included)</p>
                    </div>
                    <div className={styles.cardBtns}>
                        <span className={styles.demo}>ARRANGE DEMO</span>
                        <span onClick={()=>navigate("/products/demo/")} className={styles.gotoEquip}>GO TO EQUIPMENT</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


/* Custom Hooks */

function useUpdateselection(){
    const dispatch=useDispatch();
    const updateSelection=(isChecked,searchFor,data)=>{
        if(isChecked){
            if(searchFor===1){
                dispatch(setSelectedMF(data));
            }
            else if(searchFor===2){
                dispatch(setSelectedCat(data));
            }
        }
        else{
            if(searchFor===1){
                dispatch(removeSelectedMF(data));
            }
            else if(searchFor===2){
                dispatch(removeSelectCat(data));
            }
        }
    }
    return updateSelection;
}