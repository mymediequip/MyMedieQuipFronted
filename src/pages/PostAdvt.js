import React, { useState } from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import styles from "../assets/css/postAdvt.module.css";

import {
    ImageUpload,
    arrLeft,
    location,
    postDropdown
} from "../assets/images/index";

export const PostAdvt = () => {
  return (
    <div className={styles.postContainer}>
      <Outlet />
    </div>
  );
};

export const SelectAdvtType = () => {
  const selectTypes = ["USED", "NEW", "CONSUMABLES", "AMC/CMC SERVICES"];
  const [prevSelected, setPrevSelected] = useState(false);
  const changeColor = (event) => {
    if (prevSelected) {
      prevSelected.style.backgroundColor = "#FFFFFF";
      prevSelected.style.color = "#0B7D6F";
    }
    event.currentTarget.style.backgroundColor = "#019C89";
    event.currentTarget.style.color = "#FFFFFF";
    setPrevSelected(event.currentTarget);
  };
  return (
    <div className={styles.selectAdvtCont}>
      <h3>Post Your Advert</h3>
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
  const navigate = useNavigate();
  const handlImages = (event) => {
    const current = event.target;
    console.log(current.files[0]);
    if (current.name === "image") {
      setAllImg([...allImg, URL.createObjectURL(current.files[0])]);
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
        <div className={styles.videoLink}>
          <p>Add the Video Link here</p>
          <input type="url" />
        </div>
        <input type="submit" className={styles.advtContinue} value="continue" />
      </form>
    </React.Fragment>
  );
};

export const AdvtLocation = () => {
    const navigate=useNavigate();
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
            <label for="lname">Where is the Equipment</label>
            <input type="text" id="lname" name="lname" />
            <div className={styles.locSelect}>
              <img
                className={styles.locationPng}
                src={location}
                alt="..."
              />
              <p className={styles.forAlign}>Find the current location</p>
            </div>
            <input className={styles.contButt} type="submit" value="Continue" />

          </div>
          <AdvtSpecialityDorpDown />
        </form>
      </div>
    </React.Fragment>
  );
};

const AdvtSpecialityDorpDown = () => {
  const [show, setShow] = useState(false);
  const specialityData=new Array(5).fill(0);
  return (
    <div className={styles.speciality}>
      <div className={styles.specTag}>
        <p>Speciality</p>
      </div>
      <div className={styles.selectEquipDiv} onClick={() => setShow(!show)}>
        <p>Select the equipment Categories</p>
        <img
          className={styles.dropDownImage}
          src={postDropdown}
          alt="..."
        />
      </div>

      {show && (
        <div className={styles.checkBox}>
            {
                specialityData.map((value,index)=>{
                    return (
                      <div className={styles.checkboxCont} key={index}>
                        <input type="checkbox" id="checkbox1" />
                        <label for="checkbox1">
                          Lorem ipsum dolor sit amet
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

       
      </React.Fragment>
    );
}