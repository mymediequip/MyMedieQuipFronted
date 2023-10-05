import React, { useEffect, useRef, useState } from "react";
import styles from '../../assets/css/manufacture/manufacture.module.css';
import { setSelectedMF,removeSelectedMF,setSelectedCat,removeSelectCat } from "../../app/Slices/ManufacturerSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchCategories } from "../../app/Slices/ProdAddSlice";
import { useSelector,useDispatch } from "react-redux";
import {
    manuSearch,
    searchDrop,
    brand1,
    philips,
    relatedImg,
    filterMF,
    sortMf
} from '../../assets/images/index';


export const Manufacturer=(props)=>{
    const selectedMF=useSelector((state)=>state.mfSlice.selectedMF);
    const selectedCat=useSelector((state)=>state.mfSlice.selectedCat);
    let isOptionSelectd=selectedMF.length>0 || selectedCat.length>0?true:false;
    
    if(!props?.mf){
        isOptionSelectd=true;
    }

    let manufacture=[
        {name:"PHILIPS",children:[]},
        {name:"Siemens",children:[]},
        {name:"Mindray",children:[]},
        {name:"Hitachi",children:[]},
        {name:"Pentex",children:[]},
        {name:"Lecia",children:[]},
        {name:"Zimmer",children:[]},
    ];
    
    const [ismobile,setMobile]=useState(false);
    const handleMobileSearch=()=>{
        setMobile(!ismobile);
    }

    let title="Medical Equipment Manufacturers";
    if(props?.new){
        title="New Equipment"
    }
    else if(props?.used){
        title="Pre-Owned Equipment"
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
                        <NavLink>{props?.mf?"Manufactures & Distribution":title}</NavLink>
                    </div>
                    {props?.mf && <ManuSearch data={manufacture} searchFor={1} title="MANUFACTURE"/>}
                    <ManuSearch data={[]} searchFor={2} title="EQUIPMENT CATEGORY"/>
                    {props?.mf && <ManuSearch data={[]} title="AD NAME" ads={true} searchFor={3}/>}
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

                    <h1>{title}</h1>
                    <p style={{fontSize:"15px",marginTop:"8px"}}>Found 1175 {title}</p>
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
    const Equip_categories=useSelector((state)=>state.addProd.prodAddData.Equip_categories);
    const dispatch=useDispatch();
    const [datalist,setDataList]=useState(props.data);
    
    
    const [filter,setFilter]=useState("");

    const handleFilter=(e)=>{
        setFilter(e.currentTarget.value);
        console.log(e.target.value)

    }
    useEffect(()=>{
        if(props.searchFor===2){
            dispatch(fetchCategories(filter));
            setDataList(Equip_categories?.slice()?.sort((a,b)=>a.name.localeCompare(b.name)));
        }
        
    },[filter]);

    // console.log(datalist)

    
    return(
        <React.Fragment>
            <div className={styles.msearchCont}>
                <h4>{props.title}</h4>
                <div className={styles.msearch}>
                    <input type="text" onChange={handleFilter} value={filter} placeholder="Search"/>
                    <img src={manuSearch} alt="menufacture search"/>
                </div>
                {
                    datalist.map((data,index)=>{
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
                    <span>{props.data?.name}</span>
                </div>
                <span>({props.data?.children?.length})</span>
            </div>
            {
                isDropOpen && (
                    <div style={{marginLeft:"20px"}}>
                        {
                            props.data?.children?.slice()?.sort((a,b)=>a.name.localeCompare(b.name)).map((data,index)=>{
                                return <DropCard childData={data} key={index}/>
                            })
                        }
                    </div>
                )
            }

        </div>
    );
};

const DropCard = (props) => {
    
  return (
      <div className={styles.searchTitle}>
        <div className={styles.subSearchT}>
          <input type="checkbox" />
          <span>{props?.childData?.name}</span>
        </div>
        <span>({props?.childData?.children?.length})</span>
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