
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../assets/css/postAdvt.module.css";
import { addImg, addVideos, removeImg, setType ,removeVideo, setEquipmentName, setEquipSpecification, setManufacturingYear ,setProdPrice ,setCompatibleModels, clearProdAddData, setEquipCondition, setEquip_Location, fetchCategories, fetchCategoriesName, setCategories, fetchSpecialityName, setSpecality, setLatLong } from "../../app/Slices/ProdAddSlice";

import {
  ImageUpload,
  arrLeft,
  location,
  postDropdown,
  videoIcon,
  mFlowChart
} from "../../assets/images/index";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from "react";
import axios from "axios";
import { postData } from "../../services";

export const PostAdvt = () => {
  return (
    <div className={styles.postContainer}>
      <Outlet />
    </div>
  );
};

export const SelectAdvtType = () => {
  const selectTypes = ["PRE-OWNED", "NEW", "SPARE & ACCESSORIES", "SERVICES"];
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

  

  

  const handleContinue=(event)=>{
    event.preventDefault();
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
          {selectTypes?.map((value, index) => {
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
  const selectedPostType = useSelector(
    (state) => state.addProd.prodAddData.selectedPostType
  );
  const selectedImages = useSelector(
    (state) => state.addProd.prodAddData.prodImgs
  );
  const selectedVideos = useSelector(
    (state) => state.addProd.prodAddData.prodVideos
    );
  

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
    const imageId = generateUniqueId()
    const imageUrl = URL.createObjectURL(current.files[0])
    if (current.name === "image") {
      dispatch(addImg({id : imageId , imageUrl}))
    }
    if (current.name === "video") {
      dispatch(addVideos({id : imageId , imageUrl}))

    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // if(selectedImages.length > 0 && selectedVideos?.length > 0) {
      navigate("/post/location/");
      window.scrollTo(0, 0);
    // }else{
    //   toast.error("image and video not empty !")
    // }
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
  useEffect(()=>{
    if(!selectedPostType){
      navigate("/post/")
    }
    },[selectedPostType])

  
  return (
    <>
      <ToastContainer />
      <React.Fragment>
        <NavLink
          to="/post/"
          onClick={handleClearData}
          className={styles.postBack}
        >
          <img src={arrLeft} alt="..." />
          <span>Back</span>
        </NavLink>
        <form className={styles.advtMediaCont} onSubmit={handleSubmit}>
          <div className={styles.advtAllMedie}>
            <div>
              <h4>Upload Product Image</h4>
              <div className={styles.advtImgs}>
                <div style={{display:"flex",alignItems:"center",flexWrap:"wrap"}}>
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
                  {selectedImages?.map((value, index) => {
                    return (
                      <div style={{ margin: "10px", display: "flex" }}>
                        <img src={value?.imageUrl} key={value?.id} />
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() => handleImageRemove(value?.id)}
                        >
                          X
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <h4>Upload Product Video</h4>
              <div
                className={styles.advtImgs}
              >
                <div style={{display:"flex",alignItems:"center",flexWrap:"wrap"}}>
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
                {selectedVideos?.map((value, index) => {
                  return (
                    <div style={{ margin: "10px" }}>
                      <video key={value?.id}>
                        <source src={value?.imageUrl} type="video/mp4" />
                      </video>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleVideoRemove(value?.id)}
                      >
                        X
                      </span>
                    </div>
                  );
                })}
                
                </div>
              </div>
            </div>
          </div>
          <input
            type="submit"
            className={styles.advtContinue}
            value="continue"
          />
        </form>
      </React.Fragment>
    </>
  );
};

export const AdvtLocation = () => {
const [searchName,setSearchName] = useState("")
const dispatch =  useDispatch()
const navigate = useNavigate();
  const selectedPostType = useSelector(
    (state) => state.addProd.prodAddData.selectedPostType
  );
const allData  =  useSelector((state)=>state.addProd.prodAddData)
const equipName  =  useSelector((state)=>state.addProd.prodAddData.Equip_name)
const categories =  useSelector((state)=>state.addProd.prodAddData.Equip_categories)
const parentName =  useSelector((state)=>state.addProd.prodAddData.Parent_Name)
const specialityName =  useSelector((state)=>state.addProd.prodAddData.specialtiey_name)
const getLatLang =  useSelector((state)=>state.addProd.prodAddData.location)
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
},[searchName ,equipName])


useEffect(()=>{
  dispatch(fetchSpecialityName())
},[dispatch])
  
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
        const {latitude ,longitude} =  position.coords
        dispatch(setLatLong({name : "lat" , value : latitude}))
        dispatch(setLatLong({name : "lang" , value : longitude}))
      },   error =>{
        console.log(error , "error getting location")
      }
    )
  }else{
    console.log("Gelocation is not available");
  }
}


useEffect(() => {
  // const API_KEY = 'pk.9432c2fb2d8b14ffa18cbb6050de3944';
  const API_URL = `https://nominatim.openstreetmap.org/reverse?lat=${getLatLang?.lat}&lon=${getLatLang?.lang}&format=json`;

  axios
    .get(API_URL)
    .then(response => {
       dispatch(setEquip_Location(response?.data?.display_name))
    })
    .catch(error => {
      console.error('Error fetching address:', error);
    });
}, [getLatLang]);


  const dropSpec = {
    title: "Speciality",
    placeholder: "Select the medical specialty",
    dataList: specialityName,
  };
  const dropCat = {
    title: "Category",
    placeholder: "Select the equipment Categories",
    dataList: parentName,
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if(selectedPostType==="PRE-OWNED"){
      if(equipName && allData?.categories?.length > 0  && allData?.specility?.length > 0 && prodLocation){
        navigate("/post/pricing/");
      }else{
        toast.error("All Fields are mandatory !")
      }
    }else if(selectedPostType==="NEW"){
      if(equipName && allData?.categories?.length > 0  && allData?.specility?.length > 0 && allData?.prodCondition?.prod_desc){
        navigate("/post/specifications/");
      }else{
        toast.error("All Fields are mandatory !")
      }
    }else if(selectedPostType=== "SPARE & ACCESSORIES"){
      if(equipName && allData?.Compatible_Models  && allData?.specility?.length > 0 && allData?.prodCondition?.prod_desc){
        navigate("/post/specifications/");
      }else{
        toast.error("All Fields are mandatory !")
      }
    }else{
      if(equipName && allData?.categories?.length > 0  && allData?.specility?.length > 0 ){
        navigate("/post/specifications/");
      }else{
        toast.error("All Fields are mandatory !")
      }
    }
    window.scrollTo(0, 0);
  };

  useEffect(()=>{
  if(!selectedPostType){
    navigate("/post/")
  }
  },[selectedPostType])

  return (
    <React.Fragment>
      <NavLink to="/post/media/"  className={styles.postBack}>
        <img src={arrLeft} alt="..." />
        <span>Back</span>
      </NavLink>

      <div className={styles.infoForm}>
        <form action="/action_page.php" onSubmit={handleSubmit}>
          <div className={styles.formFiledCont}>
            <div className={styles.labelCol}>
              <label htmlFor="Equip_name">Equipment name</label>
              <input
                className={searchName ?  styles.forBotMarg : styles.forBotMarg1}
                type="text"
                id="Equip_name"
                name="Equip_name"
                onChange={handleChange}
                value={equipName}
                autoComplete="off"
              />
              {searchName && 
               <div className={categories.length > 5 ?  styles.equipNameDrop : styles.equipNameDrop1}>
               {categories?.map((el)=>{
                 return(
                     <>
                     <p onClick={()=>{dispatch(setEquipmentName(el?.name)); setSearchName("")}} className={styles.equipnameDropDown}>{el?.name}</p>
                     </>
                     )
                   })}
               </div>
              }
            
              {/* {formik.errors.equipment_name && formik.touched.equipment_name && (<div style={{color : 'red'}}>{formik.errors.equipment_name}</div>)} */}

              {(() => {
                return getAddProdScreen2(selectedPostType ,handleLocation   , dispatch , CompatibleModel , setCompatibleModels , prodCondition , handleProdCondition , prodLocation);
              })()}
            </div>
            <div className={styles.specialtCont}>
              {selectedPostType === "SPARE & ACCESSORIES" ? (
                ""
                ) : (
                  <AdvtCategoriesDorpDown  data={dropCat} />
                  )}
              <AdvtSpecialityDorpDown data={dropSpec} />
              {selectedPostType === "SPARE & ACCESSORIES" ? (
                <div className={styles.prodComptaible}>
                  <label for="lname">Product Details</label>
                  <input type="text" id="prod_desc" name="prod_desc" value={prodCondition?.prod_desc} onChange={handleProdCondition} style={{padding:"11px",borderRadius:"5px"}}/>
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

const AdvtCategoriesDorpDown = (props) => {
  const dispatch  = useDispatch()
  const navigate = useNavigate()
  const selectedPostType = useSelector(
    (state) => state.addProd.prodAddData.selectedPostType
  );
  const categoriesId = useSelector((state)=>state.addProd.prodAddData.categories)
  const [show, setShow] = useState(false);
  const [selectedCat,setSelectedCat]=useState({});

  useEffect(()=>{
    if(!selectedPostType){  
      navigate("/post/")
    }
  },[selectedPostType])
  const handleCategoriesName = (event,catgorie) =>{
    dispatch(setCategories(Number(event.target.value)));
    selectedCat[catgorie]=event.target.checked;
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
        <p>
          {(()=>{
            let keys=Object.keys(selectedCat);
            if(keys?.length===0){
              return props.data.placeholder;
            }
            else{
              let temp="";
              for(let i=0;i<keys?.length;i++){
                if(selectedCat[keys[i]]){
                  temp+=keys[i]+";";
                }
              }
              return temp.slice(0,40)+"....";
            }
            
          })()
          }
        </p>
        <img className={styles.dropDownImage} src={postDropdown} alt="..." />
      </div>

      {show && (
        <div className={props?.data?.dataList?.length > 4 ?  styles.checkBox : styles.checkBox1}>
          {props?.data?.dataList?.map((value, index) => {
            return (
              <div className={styles.checkboxCont} key={value.id}>
                <input type="checkbox" id="categories" value={value?.id} checked={categoriesId?.includes(value.id)} name="categories" onChange={(e)=>handleCategoriesName(e,value?.name)}  />
                <label for="checkbox1">{value?.name}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};


const AdvtSpecialityDorpDown = (props) => {
  const dispatch  = useDispatch()
  const navigate = useNavigate()
  const selectedPostType = useSelector(
    (state) => state.addProd.prodAddData.selectedPostType
  );
  const Speciality = useSelector((state)=>state.addProd.prodAddData.specility)
  const [show, setShow] = useState(false);
  const [selectedCat,setSelectedCat]=useState({});

  useEffect(()=>{
    if(!selectedPostType){
      navigate("/post/")
    }
  },[selectedPostType])
  const handleCategoriesName = (event ,catgorie) =>{
    dispatch(setSpecality(event.target.value))
    selectedCat[catgorie]=event.target.checked;
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
        <p>
        {(()=>{
            let keys=Object.keys(selectedCat);
            if(keys?.length===0){
              return props.data.placeholder;
            }
            else{
              let temp="";
              for(let i=0;i<keys?.length;i++){
                if(selectedCat[keys[i]]){
                  temp+=keys[i]+";";
                }
              }
              return temp.slice(0,40)+"....";
            }
            
          })()
          }
        </p>
        <img className={styles.dropDownImage} src={postDropdown} alt="..." />
      </div>

      {show && (
        <div className={props?.data?.dataList?.length > 4 ?  styles.checkBox : styles.checkBox1}>
          {props?.data?.dataList?.map((value, index) => {
            return (
              <div className={styles.checkboxCont} key={value.id}>
                <input type="checkbox" id="specility" value={value?.name} checked={Speciality?.includes(value?.name)} name="specility" onChange={(e)=>handleCategoriesName(e,value?.name)}  />
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
  const navigate = useNavigate();
  const prodCondition =  useSelector((state)=>state.addProd.prodAddData.prodCondition)
  const selectedPostType = useSelector(
    (state) => state.addProd.prodAddData.selectedPostType
  );

  useEffect(()=>{
    if(!selectedPostType){
      navigate("/post/")
    }
  },[selectedPostType])
  
 const handleProdCondition = (event) =>{
  const {name,value} = event.target
  dispatch(setEquipCondition({...prodCondition  ,name,value}))
}


  const handleSubmit = (event) => {
    event.preventDefault();
    if(prodCondition?.condition && prodCondition?.negotiable && prodCondition?.price && prodCondition?.prod_desc){
      navigate("/post/specifications/");
      window.scrollTo(0, 0);
    }else{
      toast.error("All fields are mandatory")
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
  const navigate =  useNavigate()
  const [isValid, setIsValid] = useState(true);
  const selectedPostType = useSelector(
    (state) => state.addProd.prodAddData.selectedPostType
  );
  const ManufacturingYear = useSelector((state) => state.addProd.prodAddData.purchase_year);
  const specifications = useSelector((state) => state.addProd.prodAddData.specifications);
  const prodCondition =  useSelector((state)=>state.addProd.prodAddData.prodCondition)
  const userId = localStorage.getItem("uid")
  const prodPrice =  useSelector((state)=>state.addProd.prodAddData.Prod_price)
  const allData =  useSelector((state)=>state.addProd.prodAddData)


  useEffect(()=>{
    if(!selectedPostType){
      navigate("/post/")
    }
  },[selectedPostType])

  const handleChange = (event) =>{
    const {name,value} = event.target
    dispatch(setEquipSpecification({...specifications , name , value}))
  }

 

  const handleSubmit=async(event)=>{  
    event.preventDefault();
  const formData = new FormData()
  formData.append("post_type" , selectedPostType == "PRE-OWNED" ? 1 : selectedPostType == "NEW"  ? 2 : selectedPostType == "SPARE & ACCESSORIES" ? 3 : selectedPostType == "SERVICES" ? 4 : ""  )
  formData.append("images" , allData?.prodImgs)
  formData.append("videos" , allData?.prodVideos)
  formData.append("equip_name" , allData?.Equip_name)
  formData.append("address" , allData?.Equip_location)
  formData.append("category" , allData?.categories)
  formData.append("speciality_name" , allData?.specility)
  formData.append("equip_condition" , allData?.prodCondition?.condition ? allData?.prodCondition?.condition : "")
  formData.append("negotiable_type" ,allData?.prodCondition?.negotiable ? allData?.prodCondition?.negotiable : "")
  formData.append("asking_price" ,allData?.prodCondition?.price ? allData?.prodCondition?.price : "")
  formData.append("description" , allData?.prodCondition?.prod_desc)
  formData.append("year" , allData?.purchase_year ? allData?.purchase_year : "")
  formData.append("brand" , allData?.specifications?.brand)
  formData.append("model" , allData?.specifications?.model)
  formData.append("warranty" , allData?.specifications?.waranty ? allData?.specifications?.waranty : "")
  formData.append("existing_amc" , allData?.specifications?.amc_cme ? allData?.specifications?.amc_cme : "")
  formData.append("other_details" , allData?.specifications?.other_details)
  formData.append("latitude" , allData?.location?.lat)
  formData.append("longitude" , allData?.location?.lang)
  formData.append("user" ,userId)
  formData.append("Compatible_Models" ,allData?.Compatible_Models)
  formData.append("Prod_price" ,allData?.Prod_price)
    const res =  await postData("product/add/" , formData , true)
    console.log(res,"res")
    if(res.status){
      toast.success("Product Added SuccessFully !")
      dispatch(clearProdAddData());
      setTimeout(()=>{
        navigate("/dashboard/")
      },2000)
    }else{
      toast.error(res?.msg)
    }
  }
  const handleNavigate = () =>{
    if(selectedPostType=="NEW" || selectedPostType =="SPARE & ACCESSORIES" || selectedPostType=="SERVICES"){
      navigate("/post/location/")
    }else{
      navigate("/post/pricing/")
    }
  }
  return (
    <React.Fragment>
      <div onClick={handleNavigate} className={styles.postBack}>
        <img src={arrLeft} alt="..." />
        <span>Back</span>
      </div>

      <form className={styles.advtDataCont} onSubmit={handleSubmit}>
        {(() => {
          return getAddProdScreen3(selectedPostType , ManufacturingYear , dispatch ,setManufacturingYear  , prodPrice ,setProdPrice ,isValid ,setIsValid ,prodCondition );
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
                  <input type="radio" name="waranty"  value="1" checked={specifications?.waranty == "1"} onChange={handleChange} />
                  <span>YES</span>
                </div>
                <div>
                  <input type="radio" name="waranty" value="0" checked={specifications?.waranty ==  "0"}  onChange={handleChange}  />
                  <span>NO</span>
                </div>
              </div>

              <div className={styles.advtRadio}>
                <span>Existing AMC/CME :</span>
                <div>
                  <input type="radio" name="amc_cme" value="1" checked={specifications?.amc_cme == "1"} onChange={handleChange} />
                  <span>YES</span>
                </div>
                <div>
                  <input type="radio" name="amc_cme" value="0" checked={specifications?.amc_cme == "0"} onChange={handleChange}/>
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


const getAddProdScreen2 = (selectedType , handleLocation  ,dispatch ,CompatibleModel , setCompatibleModels ,prodCondition , handleProdCondition  , prodLocation) => {
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
  } else if (selectedType === "PRE-OWNED") {
    return (
      <React.Fragment>
        <label for="lname">Where is the Equipment</label>
        <input type="text" id="Equip_location"  name="Equip_location" value={prodLocation} onChange={(e)=>dispatch(setEquip_Location(e.target.value))} />
        <div  className={styles.locSelect}>
          <img onClick={handleLocation}  className={styles.locationPng} src={location} alt="..." />
          <p onClick={handleLocation}  className={styles.forAlign}>Find the current location</p>
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
            <input type="radio" value="1" name="negotiable" checked={prodCondition?.negotiable === "1"} onChange={handleProdCondition}  />
            <label className={styles.rdt}>Negotiable</label>
          </div>
          <div>
            <input
              className={styles.rd1}
              type="radio"
              value="2"
              name="negotiable" checked={prodCondition?.negotiable === "2"} onChange={handleProdCondition}
            />
            <label className={styles.rdt}>Slightly Negotiable</label>
          </div>
          <div>
            <input
              className={styles.rd1}
              type="radio"
              value="3"
              name="negotiable" checked={prodCondition?.negotiable === "3"} onChange={handleProdCondition}
            />
            <label className={styles.rdt}>Non-Negotiable</label>
          </div>
        </div>
      </React.Fragment>
    );
  } else if (selectedType === "PRE-OWNED") {
    return (
      <div className={styles.specificYear}>
        <p>Manufacturing/ Purchase Year</p>
       <input type="text" name="purchase_year" placeholder="Select the year" value={ManufacturingYear}
            onChange={(e)=>handleYear(e.target.value)} />
         {!isValid && <p style={{ color: 'red' }}>Please enter a valid year (e.g., 2023)</p>}
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
