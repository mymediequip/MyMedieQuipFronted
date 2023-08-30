
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../assets/css/postAdvt.module.css";
import { addImg, addVideos, removeImg, setType ,removeVideo, setEquipmentName, setEquipSpecification, setManufacturingYear ,setProdPrice ,setCompatibleModels, clearProdAddData, setEquipCondition, setEquip_Location, fetchCategories, fetchCategoriesName, setCategories } from "../app/Slices/ProdAddSlice";

import {
  ImageUpload,
  arrLeft,
  location,
  postDropdown,
  videoIcon,
  mFlowChart
} from "../assets/images/index";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";
// toast.configure();
import { equipmentName } from "../utils/validation";

export const PostAdvt = () => {
  return (
    <div className={styles.postContainer}>
      <Outlet />
    </div>
  );
};

export const SelectAdvtType = () => {
  const selectTypes = ["USED", "NEW", "SPARE & ACCESSORIES", "SERVICES"];
  const [prevSelected, setPrevSelected] = useState(false);
  const navigate=useNavigate();
  const dispatch = useDispatch();

  const changeColor = (event) => {
    if (prevSelected) {
      prevSelected.style.backgroundColor = "#FFFFFF";
      prevSelected.style.color = "#0B7D6F";
    }
    event.currentTarget.style.backgroundColor = "#019C89";
    event.currentTarget.style.color = "#FFFFFF";
    setPrevSelected(event.currentTarget);
    dispatch(setType({ selected: event.currentTarget.innerText }));
   
  };

  

  const selectStyle={
    backgroundColor:"#019C89",
    color:"#FFFFFF"
  };

  const selectedPostType = useSelector(
    (state) => state.addProd.prodAddData.selectedPostType
  );

  console.log(selectedPostType,"selectedPostType")
  

  

  const handleContinue=(event)=>{
    event.preventDefault();
    console.log(selectedPostType);
    // if not choosed any post advt type
    if(!selectedPostType){
      toast.info("Please Select AD Type",{autoClose:2000});
    }
    else{
      navigate('/post/media/');
    }
  };
  return (
    <div className={styles.advtPostSeCont}>
      <img src={mFlowChart} alt="..." className={styles.postFlowChart}/>
      <div className={styles.selectAdvtCont}>
        <h3>Post Your Adv</h3>
        <div className={styles.slectTypes}>
          {selectTypes.map((value, index) => {
            return (
              <span 
                onClick={changeColor}
                key={index}
                style={selectedPostType===value?selectStyle:{}}
              >
                {value}
              </span>
            );
          })}
        </div>
        <NavLink to='/post/media/' onClick={handleContinue} className={styles.advtContinue}>
          Continue
        </NavLink>
        <ToastContainer/>
      </div>
    </div>
  );
};

export const AdvtMedia = () => {
  const selectedImages = useSelector(
    (state) => state.addProd.prodAddData.prodImgs
  );
  const selectedVideos = useSelector(
    (state) => state.addProd.prodAddData.prodVideos
    );
    console.log(selectedVideos,"selectedVideos")
  

  const dispatch =  useDispatch()
  const navigate = useNavigate();

  function generateUniqueId() {
    const timestamp = new Date().getTime();
    const randomNum = Math.random() * 10000; // You can adjust the multiplier as needed
    const uniqueId = `${timestamp}-${randomNum}`;
    return uniqueId;
  }
  const handlImages = (event) => {
    const current = event.target;
    console.log(current.files[0]);
    const imageId = generateUniqueId()
    const imageUrl = URL.createObjectURL(current.files[0])
    console.log(imageId)
    if (current.name === "image") {
      dispatch(addImg({id : imageId , imageUrl}))
    }
    if (current.name === "video") {
      dispatch(addVideos({id : imageId , imageUrl}))

    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if(selectedImages.length > 0 && selectedVideos?.length > 0) {
      navigate("/post/location/");
      window.scrollTo(0, 0);
    }else{
      toast.error("image and video not empty !")
    }
  };

  const handleImageRemove = (imageId) => {
    dispatch(removeImg(imageId));
  };
  const handleVideoRemove = (videoId) => {
    dispatch(removeVideo(videoId));
  };

  const handleClearData = () => {
      dispatch(clearProdAddData());
    
  };

  
  return (
   <>
   <ToastContainer/>
    <React.Fragment>
      <NavLink to="/post/" onClick={handleClearData} className={styles.postBack}>
        <img src={arrLeft} alt="..." />
        <span>Back</span>
      </NavLink>
      <form className={styles.advtMediaCont} onSubmit={handleSubmit}>
        <div className={styles.advtAllMedie}>
          <div>
            <h4>Upload Product Image</h4>
            <div className={styles.advtImgs} style={{display  : "flex"}}>
            <label for="inputimg">
                <input
                  type="file"
                  id="inputimg"
                  accept="image/*"
                  onChange={handlImages}
                  name="image"
                />
                <img src={ImageUpload} alt="Upload" />
              </label>
              {selectedImages.map((value, index) => {
                return (
                  <div style={{margin : "10px" ,display : 'flex' }}>
                    <img src={value?.imageUrl} key={value?.id} />
                    <p style={{cursor : 'pointer'}} onClick={()=>handleImageRemove(value?.id)}>X</p>
                    </div>
                );
              })}
            
            </div>
          </div>

          <div>
            <h4>Upload Product Video</h4>
            <div className={styles.advtImgs} style={{display : "flex" , flexDirection : 'row'}} >
              {selectedVideos?.map((value, index) => {
                return (
                 <div style={{margin : "10px"}}>
                  <p style={{cursor : 'pointer'}} onClick={()=>handleVideoRemove(value?.id)}>X</p>
                   <video key={value?.id}>
                    <source src={value?.imageUrl} type="video/mp4" />
                  </video>
                 </div>
                );
              })}
              <label for="inputVideo">
                <input
                  type="file"
                  id="inputVideo"
                  accept="video/*"
                  onChange={handlImages}
                  name="video"
                />
                <img src={videoIcon} alt="Upload" />
              </label>
            </div>
          </div>
        </div>
        <input type="submit" className={styles.advtContinue} value="continue" />
      </form>
    </React.Fragment>
   </>
  );
};

export const AdvtLocation = () => {
const [lat,setlat] = useState(null)
const [long,setlong] = useState(null)
const [searchName,setSearchName] = useState("")
const [parent,setParent] = useState([])
const dispatch =  useDispatch()
const equipName  =  useSelector((state)=>state.addProd.prodAddData.Equip_name)
const categories =  useSelector((state)=>state.addProd.prodAddData.Equip_categories)
const parentName =  useSelector((state)=>state.addProd.prodAddData.Parent_Name)

const CompatibleModel =  useSelector((state)=>state.addProd.prodAddData.Compatible_Models)
const prodCondition =  useSelector((state)=>state.addProd.prodAddData.prodCondition)
const prodLocation =  useSelector((state)=>state.addProd.prodAddData.Equip_location)

let data = []
 categories?.forEach((el)=>{
    data.push(el?.parent)
})


useEffect(()=>{
dispatch(fetchCategories(searchName))
dispatch(fetchCategoriesName(data))
},[searchName])
  
 const handleProdCondition = (event) =>{
  const {name,value} = event.target
  dispatch(setEquipCondition({...prodCondition  ,name,value}))
}


const handleChange = (event) =>{
  const newName = event.target.value;
  setSearchName(newName)
  dispatch(setEquipmentName(newName));
}
const handleLocation = () =>{
  if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(
      position=>{
        setlat(position.coords.latitude)
        setlong(position.coords.longitude)
      },
      error =>{
        console.log(error , "error getting location")
      }
    )
  }else{
    console.log("Gelocation is not available");
  }
}



  const navigate = useNavigate();
  const selectedPostType = useSelector(
    (state) => state.addProd.prodAddData.selectedPostType
  );

  const dropSpec = {
    title: "Speciality",
    placeholder: "Select the medical specialty",
    dataList: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet"],
  };
  const dropCat = {
    title: "Category",
    placeholder: "Select the equipment Categories",
    dataList: parentName,
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if(selectedPostType==="USED"){
      navigate("/post/pricing/");
    }
    else{
      navigate("/post/specifications/");
    }
    window.scrollTo(0, 0);
  };
  return (
    <React.Fragment>
      <NavLink to="/post/media/" className={styles.postBack}>
        <img src={arrLeft} alt="..." />
        <span>Back</span>
      </NavLink>

      <div className={styles.infoForm}>
        <form action="/action_page.php" onSubmit={handleSubmit}>
          <div className={styles.formFiledCont}>
            <div className={styles.labelCol}>
              <label for="Equip_name">Equipment name</label>
              <input
                className={styles.forBotMarg}
                type="text"
                id="Equip_name"
                name="Equip_name"
                onChange={handleChange}
                value={equipName}
              />
              {/* {formik.errors.equipment_name && formik.touched.equipment_name && (<div style={{color : 'red'}}>{formik.errors.equipment_name}</div>)} */}

              {(() => {
                return getAddProdScreen2(selectedPostType ,handleLocation  , dispatch , CompatibleModel , setCompatibleModels , prodCondition , handleProdCondition , prodLocation);
              })()}
            </div>
            <div className={styles.specialtCont}>
              {selectedPostType === "SPARE & ACCESSORIES" ? (
                ""
              ) : (
                <AdvtSpecialityDorpDown  data={dropCat} />
              )}
              <AdvtSpecialityDorpDown data={dropSpec} />
              {selectedPostType === "SPARE & ACCESSORIES" ? (
                <div className={styles.prodComptaible}>
                  <label for="lname">Compatible Models</label>
                  <input type="text" id="lname" name="lname" style={{padding:"11px",borderRadius:"5px"}}/>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <input className={styles.contButt} type="submit" value="Continue" />
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

const AdvtSpecialityDorpDown = (props) => {
  const dispatch  = useDispatch()
  const categoriesId = useSelector((state)=>state.addProd.prodAddData.categories)
  console.log(categoriesId,"cate")
  const [show, setShow] = useState(false);


  const handleCategoriesName = (event) =>{
    dispatch(setCategories(Number(event.target.value)))
  }
  const ref=useRef();
  useEffect(()=>{
      document.addEventListener("click",(e)=>{
      if(ref.current && !ref.current.contains(e.target)){
        setShow(false)
      }
    });
  },[])
  return (
    <div className={styles.speciality} ref={ref}>
      <div className={styles.specTag}>
        <p>{props.data.title}</p>
      </div>
      <div className={styles.selectEquipDiv} onClick={() => setShow(!show)}>
        <p>{props.data.placeholder}</p>
        <img className={styles.dropDownImage} src={postDropdown} alt="..." />
      </div>

      {show && (
        <div className={styles.checkBox}>
          {props.data.dataList.map((value, index) => {
            return (
              <div className={styles.checkboxCont} key={value.id}>
                <input type="checkbox" id="categories" value={value?.id} checked={categoriesId?.includes(value.id)} name="categories" onChange={handleCategoriesName}  />
                <label for="checkbox1">{value?.name}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const AdvtPrice = () => {
  const dispatch =  useDispatch()
  const prodCondition =  useSelector((state)=>state.addProd.prodAddData.prodCondition)


  
 const handleProdCondition = (event) =>{
  const {name,value} = event.target
  dispatch(setEquipCondition({...prodCondition  ,name,value}))
}


  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if(prodCondition){
      navigate("/post/specifications/");
      window.scrollTo(0, 0);
    }else{
      toast.error("all fields are mandatories")
    }
  };
  return (
   <>
   <ToastContainer/>
    <React.Fragment>
      <NavLink to="/post/location/" className={styles.postBack}>
        <img src={arrLeft} alt="..." />
        <span>Back</span>
      </NavLink>

      <form className={styles.advtPriceCont} onSubmit={handleSubmit}>
        <h3 className={styles.title}>Equipment Condition</h3>
        <div className={styles.radios}>
          <div>
            <input type="radio" value="1" name="condition" checked={prodCondition?.condition == "1"} onChange={handleProdCondition}  />
            <label className={styles.rdt}>Good</label>
          </div>
          <div>
            <input className={styles.rd} type="radio" value="2" name="condition" checked={prodCondition?.condition == "2"} onChange={handleProdCondition} o />
            <label className={styles.rdt}>Excellent</label>
          </div>
          <div>
            <input className={styles.rd} type="radio" value="3" name="condition" checked={prodCondition?.condition == "3"} onChange={handleProdCondition}  />
            <label className={styles.rdt}>As Good as New</label>
          </div>
        </div>
        <div className={styles.prodDiscr1}>
          <h3 className={styles.askprice}>
            Asking Price<span className={styles.priceSpan}> (in INR*)</span>
          </h3>
          <div className={styles.currSymbol}>
            <i className="bi bi-currency-rupee"></i>
            <input
              className={styles.priceinput}
              type="number"
              id={styles.rupee}
              value={prodCondition?.price}
              onChange={handleProdCondition}
              name="price"
            />
          </div>
          <div className={styles.radios}>
            <div>
              <input type="radio" value="1" name="negotiable" onChange={handleProdCondition}  checked={prodCondition?.negotiable == "1"} />
              <label className={styles.rdt}>Negotiable</label>
            </div>
            <div>
              <input
                className={styles.rd1}
                type="radio"
                value="2"
                name="negotiable" onChange={handleProdCondition}  checked={prodCondition?.negotiable == "2"}
              />
              <label className={styles.rdt}>Slightly Negotiable</label>
            </div>
            <div>
              <input
                className={styles.rd1}
                type="radio"
                value="3"
                name="negotiable"
                onChange={handleProdCondition}  checked={prodCondition?.negotiable == "3"}
              />
              <label className={styles.rdt}>Non-Negotiable</label>
            </div>
          </div>
        </div>
        <div className={styles.prodDiscr}>
          <label className={styles.pdis}>
            Product Discription
            {/* <span className={styles.disSpan}>(500 words only)</span> */}
          </label>

          <textarea value={prodCondition?.prod_desc} className={styles.tetAr} typeof="textarea" name="prod_desc" onChange={handleProdCondition}  />

          <input type="submit" className={styles.bttn} value="Continue" />
        </div>
      </form>
    </React.Fragment>
   </>
  );
};

export const AdvtProdData = () => {
  const dispatch = useDispatch()
  const [isValid, setIsValid] = useState(true);
  const selectedPostType = useSelector(
    (state) => state.addProd.prodAddData.selectedPostType
  );
  const ManufacturingYear = useSelector((state) => state.addProd.prodAddData.purchase_year);
  const specifications = useSelector((state) => state.addProd.prodAddData.specifications);
  const prodCondition =  useSelector((state)=>state.addProd.prodAddData.prodCondition)
  const equipPrice =  useSelector((state)=>state.addProd.prodAddData.price)
  const equipNegot =  useSelector((state)=>state.addProd.prodAddData.negotiable)
  const prodPrice =  useSelector((state)=>state.addProd.prodAddData.Prod_price)
  const allData =  useSelector((state)=>state.addProd.prodAddData)
  console.log(prodPrice)




  const handleChange = (event) =>{
    const {name,value} = event.target
    dispatch(setEquipSpecification({...specifications , name , value}))
  }

  const handleProdCondition = (event) =>{
    const {name,value} = event.target
    dispatch(setEquipCondition({...prodCondition ,name,value}))
  }
  

  const handleSubmit=(event)=>{  
    event.preventDefault();
    const data = {
      post_type : selectedPostType == "USED" ? 1 : selectedPostType == "NEW"  ? 2 : selectedPostType == "SPARE & ACCESSORIES" ? 3 : selectedPostType == "SERVICES" ? 4 : ""  ,
      image : allData?.prodImgs,
      video : allData?.prodVideos,
      equip_name : allData?.Equip_name,
      equip_Location : allData?.Equip_location,
      category : allData?.categories,
      location : "location",
      speciality_name : "speciality_name",
      equip_condition : allData?.prodCondition?.condition,
      asking_price : allData?.prodCondition?.price,
      negotiable_type : allData?.prodCondition?.negotiable,
      description : allData?.prodCondition?.prod_desc,
      year : allData?.purchase_year,
      brand:allData?.specifications?.brand,
      model:allData?.specifications?.model,
      warranty: allData?.specifications?.waranty,
      existing_amc: allData?.specifications?.amc_cme,
      other_details: allData?.specifications?.other_details,
      user : "ee0654b0-96d5-4aaa-a39a-caa9b901cf80",
    }
    console.log(data,"data")
    // toast.success("Your AD listed Successfully",{autoClose:2000});
  }
  return (
    <React.Fragment>
      <NavLink to="/post/pricing/" className={styles.postBack}>
        <img src={arrLeft} alt="..." />
        <span>Back</span>
      </NavLink>

      <form className={styles.advtDataCont} onSubmit={handleSubmit}>
        {(() => {
          return getAddProdScreen3(selectedPostType , ManufacturingYear , dispatch ,setManufacturingYear , equipPrice  , equipNegot  , prodPrice ,setProdPrice ,isValid ,setIsValid ,prodCondition );
        })()}
        <p>Product Specifications</p>
        <div className={styles.advtDetails}>
          <div>
            <span>Brand/Company : </span>
            <input type="text" placeholder="Enter the name of Brand"  name="brand" value={specifications.brand}  onChange={handleChange} />
          </div>
          <div>
            <span>Model Number : </span>
            <input type="number" placeholder="Enter the model number" name="model" value={specifications.model} onChange={handleChange}  />
          </div>

          {selectedPostType === "SPARE & ACCESSORIES" ? (
            ""
          ) : (
            <React.Fragment>
              <div className={styles.advtRadio}>
                <span>Under Warranty :</span>
                <div>
                  <input type="radio" name="waranty"  value="YES" checked={specifications?.waranty == "YES"} onChange={handleChange} />
                  <span>YES</span>
                </div>
                <div>
                  <input type="radio" name="waranty" value="NO" checked={specifications?.waranty ==  "NO"}  onChange={handleChange}  />
                  <span>NO</span>
                </div>
              </div>

              <div className={styles.advtRadio}>
                <span>Existing AMC/CME :</span>
                <div>
                  <input type="radio" name="amc_cme" value="YES" checked={specifications?.amc_cme == "YES"} onChange={handleChange} />
                  <span>YES</span>
                </div>
                <div>
                  <input type="radio" name="amc_cme" value="NO" checked={specifications?.amc_cme == "NO"} onChange={handleChange}/>
                  <span>NO</span>
                </div>
              </div>
            </React.Fragment>
          )}
          <div className={styles.advtOther}>
            <span>Other Details :</span>
            <textarea placeholder="Enter  the details" rows={10} cols={10} name="other_details"  value={specifications?.other_details} onChange={handleChange} />
          </div>
        </div>
        <div style={{textAlign:"center"}}>
          {/* <input type="submit" className={styles.advtContinue}  value="Submit" /> */}
          <button type="submit" className={styles.advtContinue}>Submit</button>
        </div>
      </form>
      <ToastContainer/>
    </React.Fragment>
  );
};

/*++++++++++++++++++++++++ Non Components ++++++++++++++++++++++++++++++++++*/


const getAddProdScreen2 = (selectedType , handleLocation ,dispatch ,CompatibleModel , setCompatibleModels ,prodCondition , handleProdCondition  , prodLocation) => {
  if (selectedType === "NEW") {
    return (
      <div className={styles.prodDiscr}>
        <label className={styles.pdis}>
          Product Discription
          {/* <span className={styles.disSpan}>(500 words only)</span> */}
        </label>

        <textarea value={prodCondition?.prod_desc} className={styles.tetAr} typeof="textarea" name="prod_desc" onChange={handleProdCondition} />
      </div>
    );
  } else if (selectedType === "USED") {
    return (
      <React.Fragment>
        <label for="lname">Where is the Equipment</label>
        <input type="text" id="Equip_location" name="Equip_location" value={prodLocation} onChange={(e)=>dispatch(setEquip_Location(e.target.value))} />
        <div onClick={handleLocation}  className={styles.locSelect}>
          <img className={styles.locationPng} src={location} alt="..." />
          <p  className={styles.forAlign}>Find the current location</p>
        </div>
      </React.Fragment>
    );
  } else if (selectedType === "SPARE & ACCESSORIES") {
    return (
      <React.Fragment>
        <label for="lname">Compatible Models</label>
        <input type="text" id="Compatible_Models" name="Compatible_Models"  value={CompatibleModel}  onChange={(e)=>dispatch(setCompatibleModels(e.target.value))}/>
      </React.Fragment>
    );
  }
};

const getAddProdScreen3 = (selectedType, ManufacturingYear , dispatch ,setManufacturingYear , prodPrice ,setProdPrice,isValid ,setIsValid ,prodCondition ) => {
 
  const handleProdCondition = (event) =>{
    const {name,value} = event.target
    dispatch(setEquipCondition({...prodCondition ,name,value}))
  }

  const handleProdPrice = (event) =>{
    dispatch(setProdPrice(Number(event.target.value)))
  }
 

  const handleYear = (val) =>{
    const isValidYear = /^\d{4}$/.test(val);
    dispatch(setManufacturingYear(val))
    setIsValid(isValidYear);
  }

  if (selectedType === "NEW") {
    return (
      <React.Fragment>
        <h3 className={styles.askprice}>
          Asking Price<span className={styles.priceSpan}> (in INR*)</span>
        </h3>
        <div className={styles.currSymbolSpec}>
          <i className="bi bi-currency-rupee"></i>
          <input
            style={{marginLeft:"-22px",paddingLeft:"25px",}}
            type="number"
            id={styles.rupee}
            name="price"
            value={prodCondition?.price}
            onChange={handleProdCondition}
          />
        </div>
        <div className={styles.radiosSpec}>
          <div>
            <input type="radio" value="1" name="negotiable" checked={prodCondition?.negotiable == "1"} onChange={handleProdCondition}  />
            <label className={styles.rdt}>Negotiable</label>
          </div>
          <div>
            <input
              className={styles.rd1}
              type="radio"
              value="2"
              name="negotiable" checked={prodCondition?.negotiable == "2"} onChange={handleProdCondition}
            />
            <label className={styles.rdt}>Slightly Negotiable</label>
          </div>
          <div>
            <input
              className={styles.rd1}
              type="radio"
              value="3"
              name="negotiable" checked={prodCondition?.negotiable == "3"} onChange={handleProdCondition}
            />
            <label className={styles.rdt}>Non-Negotiable</label>
          </div>
        </div>
      </React.Fragment>
    );
  } else if (selectedType === "USED") {
    return (
      <div className={styles.specificYear}>
        <p>Manufacturing/ Purchase Year</p>
       <input type="text" name="purchase_year" placeholder="Select the year" value={ManufacturingYear}
            onChange={(e)=>handleYear(e.target.value)} />
         {/* {!isValid && <p style={{ color: 'red' }}>Please enter a valid year (e.g., 2023)</p>} */}
      </div>
    );
  } else if (selectedType === "SPARE & ACCESSORIES") {
    return (
      <React.Fragment>
        <h3 className={styles.askprice}>
          Product Price<span className={styles.priceSpan}> (in INR*)</span>
        </h3>
        <div className={styles.currSymbolSpec}>
          <i className="bi bi-currency-rupee"></i>
          <input
            style={{width:"245px",marginLeft:"-22px"}}
            type="number"
            id={styles.rupee}
            value={prodPrice}
            name="Prod_price"
            onChange={handleProdPrice}
          />
        </div>
      </React.Fragment>
    );
  }
};
