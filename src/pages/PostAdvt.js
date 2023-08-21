import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../assets/css/postAdvt.module.css";
import {setType} from '../app/Slices/ProdAddSlice';

import {
    ImageUpload,
    arrLeft,
    location,
    postDropdown,
    videoIcon 
} from "../assets/images/index";

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
  const dispatch=useDispatch()
  const changeColor = (event) => {
    if (prevSelected) {
      prevSelected.style.backgroundColor = "#FFFFFF";
      prevSelected.style.color = "#0B7D6F";
    }
    event.currentTarget.style.backgroundColor = "#019C89";
    event.currentTarget.style.color = "#FFFFFF";
    setPrevSelected(event.currentTarget);
    dispatch(setType({selected:event.currentTarget.innerText}));
  };
  return (
    <div className={styles.selectAdvtCont}>
      <h3>Post Your AD</h3>
      <div className={styles.slectTypes}>
        {selectTypes.map((value, index) => {
          return (
            <span onClick={changeColor} key={index}>
              {value}
            </span>
          );
        })}
      </div>
      <NavLink to="/post/media/" className={styles.advtContinue}>
        Continue
      </NavLink>
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
    if(current.name==="video"){
      setAllVideo([...allVideo, URL.createObjectURL(current.files[0])]);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/post/location/");
    window.scrollTo(0,0);
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
                return <video key={index}><source src={value} type="video/mp4"/></video>;
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
    const navigate=useNavigate();
    const selectedPostType=useSelector((state)=>state.addProd.prodAddData.selectedPostType);
    console.log(selectedPostType)
    const dropDownData={
      title:"Speciality",
      placeholder:"Select the equipment Categories",
      dataList:["Lorem ipsum dolor sit amet","Lorem ipsum dolor sit amet"]
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/post/pricing/");
        window.scrollTo(0,0);
    };
  return (
    <React.Fragment>
      <NavLink to="/post/media/" className={styles.postBack}>
        <img src={arrLeft} alt="..." />
        <span>Back</span>
      </NavLink>

      <div className={styles.infoForm}>
        <form action="/action_page.php" onSubmit={handleSubmit}>
          <div className={styles.labelCol}>
            <label for="ename">Equipment name</label>
            <input
              className={styles.forBotMarg}
              type="text"
              id="fname"
              name="ename"
            />

            {
              (
                ()=>{
                  return getAddProdScreen2(selectedPostType)
                }
              )()
            }
        
            <input className={styles.contButt} type="submit" value="Continue" />
          </div>
          <AdvtSpecialityDorpDown data={dropDownData} />
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
        <img
          className={styles.dropDownImage}
          src={postDropdown}
          alt="..."
        />
      </div>

      {show && (
        <div className={styles.checkBox}>
            {
                props.data.dataList.map((value,index)=>{
                    return (
                      <div className={styles.checkboxCont} key={index}>
                        <input type="checkbox" id="checkbox1" />
                        <label for="checkbox1">
                          {value}
                        </label>
                      </div>
                    );
                })
            }
        </div>
      )}
    </div>
  );
};

export const AdvtPrice=()=>{
    const navigate=useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/post/specifications/");
        window.scrollTo(0,0);
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
                <input
                    className={styles.rd}
                    type="radio"
                    value="seller"
                    name="s"
                />
                <label className={styles.rdt}>Excellent</label>
              </div>
              <div>
                <input
                    className={styles.rd}
                    type="radio"
                    value="seller"
                    name="s"
                />
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
                <span className={styles.disSpan}>(500 words only)</span>
              </label>

              <textarea
                className={styles.tetAr}
                typeof="textarea"
                name="text"
              />

              <input type="submit" className={styles.bttn} value="Continue"/>
            </div>
        </form>
      </React.Fragment>
    );
};

export const AdvtProdData=()=>{
    return (
      <React.Fragment>
        <NavLink to="/post/pricing/" className={styles.postBack}>
          <img src={arrLeft} alt="..." />
          <span>Back</span>
        </NavLink>

        <form className={styles.advtDataCont}>
          <div className={styles.specificYear}>
            <p>Manufacturing/ Purchase Year</p>
            <input type="month" placeholder="Select the year"/>
          </div>
          <p>Product Specifications</p>
          <div className={styles.advtDetails}>
            <div>
              <span>Brand/Company : </span>
              <input type="text" placeholder="Enter the name of Brand"/>
            </div>
            <div>
              <span>Model Number :  </span>
              <input type="number" placeholder="Enter the model number"/>
            </div>
            <div className={styles.advtRadio}>
              <span>Under Warranty :</span>
              <div>
                <input type="radio" name="waranty"/>
                <span>YES</span>
              </div>
              <div>
                <input type="radio" name="waranty"/>
                <span>NO</span>
              </div>
            </div>

            <div className={styles.advtRadio}>
              <span>Existing AMC/CME :</span>
              <div>
                <input type="radio" name="amc"/>
                <span>YES</span>
              </div>
              <div>
                <input type="radio" name="amc"/>
                <span>NO</span>
              </div>
            </div>

            <div className={styles.advtOther}>
              <span>Other Details :</span>
              <textarea placeholder="Enter  the details" rows={10} cols={10}/>
            </div>

          </div>
          <input type="submit" className={styles.advtContinue} value="Submit"/>
        </form>
      </React.Fragment>
    );
}

/*++++++++++++++++++++++++ Non Components ++++++++++++++++++++++++++++++++++*/

const getAddProdScreen2=(selectedType)=>{
  if (selectedType === "NEW") {
    return (
      <div className={styles.prodDiscr}>
        <label className={styles.pdis}>
          Product Discription
          <span className={styles.disSpan}>(500 words only)</span>
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
        <label for="lname">Compatible Models</label>
        <input type="text" id="lname" name="lname" />
      </React.Fragment>
    );
  }
};

const getAddProdScreen3=()=>{
  
}