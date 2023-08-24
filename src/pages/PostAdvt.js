
import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../assets/css/postAdvt.module.css";
import { addImg, addVideos, removeImg, setType ,removeVideo, setEquipmentName, setEuipCondition, setEuipPrice, setEuipNegot, setEuipDisc, setEquipSpecification, setManufacturingYear ,setProdPrice ,setCompatibleModels, clearProdAddData } from "../app/Slices/ProdAddSlice";

import {
  ImageUpload,
  arrLeft,
  location,
  postDropdown,
  videoIcon,
} from "../assets/images/index";
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    <div className={styles.selectAdvtCont}>
      <h3>Post Your AD</h3>
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
    navigate("/post/location/");
    window.scrollTo(0, 0);
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
  );
};

export const AdvtLocation = () => {
const [lat,setlat] = useState(null)
const [long,setlong] = useState(null)
const dispatch =  useDispatch()
const equipName  =  useSelector((state)=>state.addProd.prodAddData.Equip_name)
const equipDescript =  useSelector((state)=>state.addProd.prodAddData.prod_desc)
const CompatibleModel =  useSelector((state)=>state.addProd.prodAddData.Compatible_Models)




const handleChange = (event) =>{
  const newName = event.target.value;
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
    dataList: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet"],
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
          <div style={{ display: "flex",justifyContent:"space-between"}}>
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
                return getAddProdScreen2(selectedPostType ,handleLocation , equipDescript ,setEuipDisc , dispatch , CompatibleModel , setCompatibleModels);
              })()}
            </div>
            <div className={styles.specialtCont}>
              <AdvtSpecialityDorpDown data={dropCat} />
              <AdvtSpecialityDorpDown data={dropSpec} />
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
  const [show, setShow] = useState(false);
  return (
    <div className={styles.speciality}>
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
              <div className={styles.checkboxCont} key={index}>
                <input type="checkbox" id="checkbox1" />
                <label for="checkbox1">{value}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const AdvtPrice = () => {
  const equipCondition =  useSelector((state)=>state.addProd.prodAddData.condition)
  const equipPrice =  useSelector((state)=>state.addProd.prodAddData.price)
  const equipNegot =  useSelector((state)=>state.addProd.prodAddData.negotiable)
  const equipDescript =  useSelector((state)=>state.addProd.prodAddData.prod_desc)

  

  const dispatch =  useDispatch()

  const handleEuipCondition = (event) =>{
    dispatch(setEuipCondition(event.target.value))
  }
  const handleEuipPrice = (event) =>{
    dispatch(setEuipPrice(event.target.value))
  }
  const handleEuipNegotation = (event) =>{
    dispatch(setEuipNegot(event.target.value))
  }
  const handleEuipDescription = (event) =>{
    dispatch(setEuipDisc(event.target.value))
  }


  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/post/specifications/");
    window.scrollTo(0, 0);
  };
  return (
    <React.Fragment>
      <NavLink to="/post/location/" className={styles.postBack}>
        <img src={arrLeft} alt="..." />
        <span>Back</span>
      </NavLink>

      <form className={styles.advtPriceCont} onSubmit={handleSubmit}>
        <h3 className={styles.title}>Equipment Condition</h3>
        <div className={styles.radios}>
          <div>
            <input type="radio" value="Good" name="condition" checked={equipCondition == "Good"} onChange={handleEuipCondition}  />
            <label className={styles.rdt}>Good</label>
          </div>
          <div>
            <input className={styles.rd} type="radio" value="Excellent" name="condition" checked={equipCondition == "Excellent"} onChange={handleEuipCondition} o />
            <label className={styles.rdt}>Excellent</label>
          </div>
          <div>
            <input className={styles.rd} type="radio" value="As Good as New" name="condition" checked={equipCondition == "As Good as New"} onChange={handleEuipCondition}  />
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
              value={equipPrice}
              onChange={handleEuipPrice}
              name="price"
            />
          </div>
          <div className={styles.radios}>
            <div>
              <input type="radio" value="Negotiable" name="negotiable" onChange={handleEuipNegotation}  checked={equipNegot == "Negotiable"} />
              <label className={styles.rdt}>Negotiable</label>
            </div>
            <div>
              <input
                className={styles.rd1}
                type="radio"
                value="Slightly Negotiable"
                name="negotiable" onChange={handleEuipNegotation}  checked={equipNegot == "Slightly Negotiable"}
              />
              <label className={styles.rdt}>Slightly Negotiable</label>
            </div>
            <div>
              <input
                className={styles.rd1}
                type="radio"
                value="Non-Negotiable"
                name="negotiable"
                onChange={handleEuipNegotation}  checked={equipNegot == "Non-Negotiable"}
              />
              <label className={styles.rdt}>Non-Negotiable</label>
            </div>
          </div>
        </div>
        <div className={styles.prodDiscr}>
          <label className={styles.pdis}>
            Product Discription
            <span className={styles.disSpan}>(500 words only)</span>
          </label>

          <textarea value={equipDescript} className={styles.tetAr} typeof="textarea" name="prod_desc" onChange={handleEuipDescription}  />

          <input type="submit" className={styles.bttn} value="Continue" />
        </div>
      </form>
    </React.Fragment>
  );
};

export const AdvtProdData = () => {
  const dispatch = useDispatch()
  const ManufacturingYear = useSelector((state) => state.addProd.prodAddData.purchase_year);
  const specifications = useSelector((state) => state.addProd.prodAddData.specifications);
  const spe = useSelector((state) => state.addProd.prodAddData);
  const equipPrice =  useSelector((state)=>state.addProd.prodAddData.price)
  const equipNegot =  useSelector((state)=>state.addProd.prodAddData.negotiable)
  const prodPrice =  useSelector((state)=>state.addProd.prodAddData.Prod_price)


  console.log(spe,"specifications")

  const handleChange = (event) =>{
    const {name,value} = event.target
  
    dispatch(setEquipSpecification({ name , value}))
  }


  const selectedPostType = useSelector(
    (state) => state.addProd.prodAddData.selectedPostType
  );
  const handleSubmit=(val)=>{
    // event.preventDefault();
    // toast.success("Your AD listed Successfully",{autoClose:2000});
  }
  return (
    <React.Fragment>
      <NavLink to="/post/pricing/" className={styles.postBack}>
        <img src={arrLeft} alt="..." />
        <span>Back</span>
      </NavLink>

      <form className={styles.advtDataCont} onClick={handleSubmit}>
        {(() => {
          return getAddProdScreen3(selectedPostType , ManufacturingYear , dispatch ,setManufacturingYear , equipPrice ,setEuipPrice , equipNegot , setEuipNegot , prodPrice ,setProdPrice);
        })()}
        <p>Product Specifications</p>
        <div className={styles.advtDetails}>
          <div>
            <span>Brand/Company : </span>
            <input type="text" placeholder="Enter the name of Brand"  name="brand" value={specifications.brand} onChange={handleChange} />
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
                  <input type="radio" name="waranty"  value="yes" checked={specifications?.waranty === "yes"} onChange={handleChange} />
                  <span>YES</span>
                </div>
                <div>
                  <input type="radio" name="waranty" value="no" checked={specifications?.waranty === "no"} onChange={handleChange}  />
                  <span>NO</span>
                </div>
              </div>

              <div className={styles.advtRadio}>
                <span>Existing AMC/CME :</span>
                <div>
                  <input type="radio" name="amc_cme" value="yes" checked={specifications?.amc_cme=== "yes"} onChange={handleChange} />
                  <span>YES</span>
                </div>
                <div>
                  <input type="radio" name="amc_cme" value="no" checked={specifications?.amc_cme === "no"} onChange={handleChange}/>
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
          <button className={styles.advtContinue}>Submit</button>
        </div>
      </form>
      <ToastContainer/>
    </React.Fragment>
  );
};

/*++++++++++++++++++++++++ Non Components ++++++++++++++++++++++++++++++++++*/


const getAddProdScreen2 = (selectedType , handleLocation , equipDescript , setEuipDisc ,dispatch ,CompatibleModel , setCompatibleModels) => {
  if (selectedType === "NEW") {
    return (
      <div className={styles.prodDiscr}>
        <label className={styles.pdis}>
          Product Discription
          <span className={styles.disSpan}>(500 words only)</span>
        </label>

        <textarea value={equipDescript} className={styles.tetAr} typeof="textarea" name="prod_desc" onChange={(e)=>dispatch(setEuipDisc(e.target.value))} />
      </div>
    );
  } else if (selectedType === "USED") {
    return (
      <React.Fragment>
        <label for="lname">Where is the Equipment</label>
        <input type="text" id="lname" name="lname" />
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

const getAddProdScreen3 = (selectedType, ManufacturingYear , dispatch ,setManufacturingYear , equipPrice ,setEuipPrice ,  equipNegot , setEuipNegot , prodPrice ,setProdPrice) => {
  if (selectedType === "NEW") {
    return (
      <React.Fragment>
        <h3 className={styles.askprice}>
          Asking Price<span className={styles.priceSpan}> (in INR*)</span>
        </h3>
        <div className={styles.currSymbolSpec}>
          <i className="bi bi-currency-rupee"></i>
          <input
            style={{width:"350px",marginLeft:"-22px",paddingLeft:"25px",}}
            type="number"
            id={styles.rupee}
            name="price"
            value={equipPrice}
            onChange={(e)=>dispatch(setEuipPrice(e.target.value))}
          />
        </div>
        <div className={styles.radiosSpec}>
          <div>
            <input type="radio" value="Negotiable" name="negotiable" checked={equipNegot == "Negotiable"} onChange={(e)=>dispatch(setEuipNegot(e.target.value))}  />
            <label className={styles.rdt}>Negotiable</label>
          </div>
          <div>
            <input
              className={styles.rd1}
              type="radio"
              value="Slightly Negotiable"
              name="negotiable" checked={equipNegot == "Slightly Negotiable"} onChange={(e)=>dispatch(setEuipNegot(e.target.value))}
            />
            <label className={styles.rdt}>Slightly Negotiable</label>
          </div>
          <div>
            <input
              className={styles.rd1}
              type="radio"
              value="Non-Negotiable"
              name="negotiable" checked={equipNegot == "Non-Negotiable"} onChange={(e)=>dispatch(setEuipNegot(e.target.value))}
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
        <input type="month" name="purchase_year" placeholder="Select the year" value={ManufacturingYear}
            onChange={(e)=>dispatch(setManufacturingYear(e.target.value))} />
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
            style={{width:"350px",marginLeft:"-22px",paddingLeft:"25px",}}
            type="number"
            id={styles.rupee}
            value={prodPrice}
            name="Prod_price"
            onChange={(e)=>dispatch(setProdPrice(e.target.value))}
          />
        </div>
      </React.Fragment>
    );
  }
};
