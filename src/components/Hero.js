import React, { useEffect, useRef, useState } from 'react';
import { hero } from "../assets/images/index";
import { Search } from './Navigation'
import styles from '../assets/css/hero.module.css';
import catog_data from '../assets/data/specialization.json';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    plus_symbol,
    minus,
    m_search,
    downIcon
} from '../assets/images/index';
import { fetchCategories } from '../app/Slices/ProdAddSlice';
import { useDispatch, useSelector } from 'react-redux';
import { postData } from '../services';

export const Hero=(props)=>{
   
    const heroStyle={
        backgroundImage:`url(${hero})`,
        backgroundSize:"cover",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center"
    }
    return(
        <div id="heroBlur">
            <div style={heroStyle} className={styles.heroContainer}>
                {props.specs && <Catogories/>}
                <div className={styles.heroContent}>
                    <p className={styles.heroHead}>Empower Your Health Journey Monitor Blood Pressure Like a Pro!</p>
                    <p className={styles.heroDesc}>Precision measurements, advanced technology. Take control of your health with accurate blood pressure monitoring for informed decisions and optimal well-being</p>
                    <NavLink to="/" className={styles.buyBtn}>Buy Product</NavLink>
                    <NavLink to="/" className={styles.postAdvt}>Post Your Advertisement</NavLink>
                </div>
            </div>
        </div>
    );
};

const Catogories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.addProd.prodAddData.Equip_categories
  );

  const [filterEquip, setFilterEquip] = useState("");
  const handleChange = (event) => {
    setFilterEquip(event.target.value);
  };

  useEffect(() => {
    dispatch(fetchCategories(filterEquip));
  }, [filterEquip]);

  const handleItemClick = (equipment) => {
    // Handle the item click here, e.g., update state, show details, etc.
    console.log("Clicked on:", equipment.name);
  };

  return (
    <div className={styles.catogories_container}>
      <div className={styles.upper_part}>
        <span>FILTER</span>
        <Search handleChange={handleChange} />
        <p>EQUIPMENT</p>
      </div>
      <div className={styles.lower_part}>
        {categories
          ?.slice()
          ?.sort((a, b) => a.name.localeCompare(b.name))
          ?.map((topLevelEquipment) => {
            return (
              <CatItem
                key={topLevelEquipment.id}
                pic={plus_symbol}
                equipment={topLevelEquipment}
                onItemClick={handleItemClick}
              />
            );
          })}
      </div>
    </div>
  );
};

const CatItem=({equipment , onItemClick , pic})=>{
 const [isExpanded, setIsExpanded] = useState(false);
  const handleNodeClick = () => {
    if (equipment?.children?.length > 0) {
      setIsExpanded(!isExpanded);
    }
    onItemClick(equipment);
  };
  
    return(
        <div className={styles.cat_item} >
            <div >
            <div className={styles.cat_inner}>
                <img src={equipment?.children.length > 0 ? pic : minus} alt='...' onClick={handleNodeClick} className={styles.in_img}/>
                <span>{equipment.name}</span>
            </div>
            {
                isExpanded && equipment?.children?.map((child,index)=>{
                    return <CatItem key={child.id} pic={child?.children?.length > 0 ? pic : minus} equipment={child} onItemClick={onItemClick}/> 
                })
            }
            </div>
        </div>
    );
};

export const MobileHero=()=>{
    return(
        <div className={styles.MobileHero}>
            <p style={{textAlign:"center"}}>WHAT ARE YOU LOOKING FOR?</p>
            <MobileSearch/>
        </div>
    );
};
export const MobileSearch=({toggle ,setToggle})=>{
const navigate =  useNavigate()
const [searchEqip ,setSearchEquip] =  useState("")
const data = ["Ultrasound Machines","CT Scanners", "IPL Machines","MRI machines","X-ray machines","Alexandrite Lasers","Optical coherence tomography" , "Shock wave therapy machines", "Dialysis Machine"]
const handleEquipSearch = async() =>{
    const formData = new FormData()
    formData.append("q" , searchEqip)
    const res = await postData("product/lists/" , formData )
    console.log(res)
}
const fill =  data?.filter((el)=>{
    if(el.toLowerCase().includes(searchEqip.toLowerCase())){
        return el
    }
})
const ref =  useRef(null)
useEffect(()=>{
    document.addEventListener("click",(e)=>{
    if(ref.current && !ref.current.contains(e.target)){
        setToggle(false)
    }
  });
},[toggle])
useEffect(()=>{
handleEquipSearch()
},[searchEqip])

const handleSearchItems = (item) =>{
    navigate(`/search/search-items/${item}/`)
}

    return(
        <>
         <form ref={ref}  className={toggle ? styles.mobileSearch1 : styles.mobileSearch}>
            <input type='text' onClick={()=>setToggle(true)}  onChange={(e)=>{setSearchEquip(e.target.value); setToggle(true)}} placeholder='Find medical instrument..'/>
           { toggle ? <button className={styles.searchBtn}>Search</button> : <img src={m_search} alt='...'/>}
               {toggle ?  <hr/> : ""}
               <div className={toggle ?  styles.searchCont1 :  ""}>
               {
                searchEqip ? fill?.map((el)=>{
                    return(<>
                     <div className={fill.length > 1 ? styles.searchItem1 :  ""}>
                        <p onClick={()=>handleSearchItems(el)} className={styles.searchText}>{searchEqip} in {el}</p>
                    </div> 
                    </>)
                    })
                   :
                <div className={styles.grid_container}>
                {
                  toggle? data.map((item, index) => (
                 <div key={index} className={styles.grid_item}>
                    {item}
                 </div>
                  )) :  ""
               }
                </div>
               }
               </div>
           
        </form>

        </>
        
    );
};

export const MobileCatogories=()=>{
    const dispatch=useDispatch();
    const categories = useSelector(
        (state) => state.addProd.prodAddData.Equip_categories
    ).slice()?.sort((a, b) => a.id>b.id);
    
    useEffect(() => {
        dispatch(fetchCategories(""));
    }, []);
    const data = ["Ultrasound Machines","CT Scanners", "IPL Machines","MRI machines","X-ray machines","Alexandrite Lasers","Optical coherence tomography" , "Shock wave therapy machines", "Dialysis Machine"]

    console.log(categories.reverse());
    return(
        <div className={styles.mobileCatContainer}>
            {
                data.map((values,index)=>{
                    return <CatgoriesDropDown key={index} data={values}/>
                })
            }
        </div>
    );
};
const CatgoriesDropDown=(props)=>{
    const [isOpen,setIsOpen]=useState(false);
    const subcat=props.data?.children;
    return(
        <div className={styles.catDrop} onMouseOver={()=>setIsOpen(true)} onMouseLeave={()=>setIsOpen(false)}>
            <div className={styles.catTitle} >
                <span>{props.data}</span>
                <img src={downIcon} alt='...'/>
            </div>
            {
                isOpen?<div className={styles.subCatogories}>
                    {
                        subcat?.map((value,index)=>{
                            return <NavLink to={`/search/search-items/${value?.name}/`} key={index}>{value?.name}</NavLink>
                        })
                    }
                </div>:""
            }
            
        </div> 
    );
}

// non components Funtion
