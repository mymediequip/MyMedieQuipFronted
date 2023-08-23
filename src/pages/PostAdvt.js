
import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../assets/css/postAdvt.module.css";
import { setType } from "../app/Slices/ProdAddSlice";

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
  );
};

export const AdvtMedia = () => {
  const [allImg, setAllImg] = useState([]);
  const [allVideo, setAllVideo] = useState([]);
  const navigate = useNavigate();
  const handlImages = (event) => {
    const current = event.target;
    console.log(current.files[0]);
    if (current.name === "image") {
      setAllImg([...allImg, URL.createObjectURL(current.files[0])]);
    }
    if (current.name === "video") {
      setAllVideo([...allVideo, URL.createObjectURL(current.files[0])]);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/post/location/");
    window.scrollTo(0, 0);
  };
  return (
    <React.Fragment>
      <NavLink to="/post/" className={styles.postBack}>
        <img src={arrLeft} alt="..." />
        <span>Back</span>
      </NavLink>
      <form className={styles.advtMediaCont} onSubmit={handleSubmit}>
        <div className={styles.advtAllMedie}>
          <div>
            <h4>Upload Product Image</h4>
            <div className={styles.advtImgs}>
              {allImg.map((value, index) => {
                return <img src={value} key={index} />;
              })}
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
            </div>
          </div>

          <div>
            <h4>Upload Product Video</h4>
            <div className={styles.advtImgs}>
              {allVideo.map((value, index) => {
                return (
                  <video key={index}>
                    <source src={value} type="video/mp4" />
                  </video>
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
          <div className={styles.formFiledCont}>
            <div className={styles.labelCol}>
              <label for="ename">Equipment name</label>
              <input
                className={styles.forBotMarg}
                type="text"
                id="fname"
                name="ename"
              />

              {(() => {
                return getAddProdScreen2(selectedPostType);
              })()}
            </div>
            <div className={styles.specialtCont}>
              {selectedPostType === "SPARE & ACCESSORIES" ? (
                ""
              ) : (
                <AdvtSpecialityDorpDown data={dropCat} />
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
            <input type="radio" value="buyer" name="s" />
            <label className={styles.rdt}>Good</label>
          </div>
          <div>
            <input className={styles.rd} type="radio" value="seller" name="s" />
            <label className={styles.rdt}>Excellent</label>
          </div>
          <div>
            <input className={styles.rd} type="radio" value="seller" name="s" />
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
            />
          </div>
          <div className={styles.radios}>
            <div>
              <input type="radio" value="buyer" name="s" />
              <label className={styles.rdt}>Negotiable</label>
            </div>
            <div>
              <input
                className={styles.rd1}
                type="radio"
                value="seller"
                name="s"
              />
              <label className={styles.rdt}>Slightly Negotiable</label>
            </div>
            <div>
              <input
                className={styles.rd1}
                type="radio"
                value="seller"
                name="s"
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

          <textarea className={styles.tetAr} typeof="textarea" name="text" />

          <input type="submit" className={styles.bttn} value="Continue" />
        </div>
      </form>
    </React.Fragment>
  );
};

export const AdvtProdData = () => {
  const selectedPostType = useSelector(
    (state) => state.addProd.prodAddData.selectedPostType
  );
  const handleSubmit=(event)=>{
    event.preventDefault();
    toast.success("Your AD listed Successfully",{autoClose:2000});
  }
  return (
    <React.Fragment>
      <NavLink to="/post/pricing/" className={styles.postBack}>
        <img src={arrLeft} alt="..." />
        <span>Back</span>
      </NavLink>

      <form className={styles.advtDataCont} onClick={handleSubmit}>
        {(() => {
          return getAddProdScreen3(selectedPostType);
        })()}
        <p>Product Specifications</p>
        <div className={styles.advtDetails}>
          <div>
            <span>Brand/Company : </span>
            <input type="text" placeholder="Enter the name of Brand" />
          </div>
          <div>
            <span>Model Number : </span>
            <input type="number" placeholder="Enter the model number" />
          </div>

          {selectedPostType === "SPARE & ACCESSORIES" ? (
            ""
          ) : (
            <React.Fragment>
              <div className={styles.advtRadio}>
                <span>Under Warranty :</span>
                <div>
                  <div>
                    <input type="radio" name="waranty" />
                    <span>YES</span>
                  </div>
                  <div>
                    <input type="radio" name="waranty" />
                    <span>NO</span>
                  </div>
                </div>
              </div>

              <div className={styles.advtRadio}>
                <span>Existing AMC/CME :</span>
                <div>
                  <div>
                    <input type="radio" name="amc" />
                    <span>YES</span>
                  </div>
                  <div>
                    <input type="radio" name="amc" />
                    <span>NO</span>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )}
          <div className={styles.advtOther}>
            <span>Other Details :</span>
            <textarea placeholder="Enter the details" rows={10} cols={10} />
          </div>
        </div>
        <div style={{textAlign:"center"}}>
          <input type="submit" className={styles.advtContinue}  value="Submit" />
        </div>
      </form>
      <ToastContainer/>
    </React.Fragment>
  );
};

/*++++++++++++++++++++++++ Non Components ++++++++++++++++++++++++++++++++++*/

const getAddProdScreen2 = (selectedType) => {
  if (selectedType === "NEW") {
    return (
      <div className={styles.prodDiscr}>
        <label className={styles.pdis}>
          Product Discription
          {/* <span className={styles.disSpan}>(500 words only)</span> */}
        </label>

        <textarea className={styles.tetAr} typeof="textarea" name="text" />
      </div>
    );
  } else if (selectedType === "USED") {
    return (
      <React.Fragment>
        <label for="lname">Where is the Equipment</label>
        <input type="text" id="lname" name="lname" />
        <div className={styles.locSelect}>
          <img className={styles.locationPng} src={location} alt="..." />
          <p className={styles.forAlign}>Find the current location</p>
        </div>
      </React.Fragment>
    );
  } else if (selectedType === "SPARE & ACCESSORIES") {
    return (
      <React.Fragment>
        <label for="lname">Product Details</label>
        <input type="text" id="lname" name="lname" />
      </React.Fragment>
    );
  }
};

const getAddProdScreen3 = (selectedType) => {
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
            
          />
        </div>
        <div className={styles.radiosSpec}>
          <div>
            <input type="radio" value="buyer" name="s" />
            <label className={styles.rdt}>Negotiable</label>
          </div>
          <div>
            <input
              className={styles.rd1}
              type="radio"
              value="seller"
              name="s"
            />
            <label className={styles.rdt}>Slightly Negotiable</label>
          </div>
          <div>
            <input
              className={styles.rd1}
              type="radio"
              value="seller"
              name="s"
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
        <input type="month" placeholder="Select the year" />
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
            
          />
        </div>
      </React.Fragment>
    );
  }
};
