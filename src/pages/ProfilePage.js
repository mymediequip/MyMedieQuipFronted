import React, { useEffect, useRef, useState } from 'react';
import styles from '../assets/css/profile.module.css';
import { NavLink, json } from 'react-router-dom';
import { Logout } from '../components/Navigation';
import { testimage2 } from '../assets/images';
import { useFormik } from 'formik';
import * as yup from "yup"
import { emailSchema, fnameSchema, gstinSchema, lnameSchema, nationalitySchema, pancardSchema, pnumberSchema } from '../utils/validation';
import {postData } from '../services';
import { toast } from 'react-toastify';
import { Toaster } from '../utils/Toaster';
import { useDispatch } from 'react-redux';
import { getProfileImage } from '../app/Slices/UserData';
const imagePreviewUrl = process.env.REACT_APP_IMAGE_PREVIEW

export const MyProfile=()=>{
  const dispatch  =  useDispatch()
     
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [blob, setblob] = useState(null);


  const formik = useFormik({
    initialValues:{
      fname :  "",
      pnumber :  "",
      nationality : "",
      gstin : "",
      lname :   "",
      email :  "",
      pancard : "",
      describe : "",
    },
    validationSchema : yup.object({
      fname  : fnameSchema,
      lname : lnameSchema,
      pnumber : pnumberSchema,
      email : emailSchema,
      gstin : gstinSchema,
      pancard : pancardSchema,
      nationality : nationalitySchema

    }),
    onSubmit : function (values){
      handleSubmitForm(values)
    }
  })


   const handleUserDetails = async() => {
   const res = await postData("users/get_user_detail/" ,"", true)
   if(res?.status){
    setPreviewImage(res?.data?.profile?.image)
    dispatch(getProfileImage(res?.data?.profile?.image));
    
    formik.setValues({
      fname : res?.data?.profile?.first_name,
      pnumber : res?.data?.mobile,
      nationality : res?.data?.profile?.location,
      gstin : res?.data?.profile?.gstin ,
      lname : res?.data?.profile?.last_name,
      email : res?.data?.email,
      pancard :res?.data?.profile?.pan_no ,
      // describe :res?.data?.profile?.describe

    })
   }
  }

  useEffect(()=>{
    handleUserDetails()
  },[])


  const handleSubmitForm = async(val) =>{ 
      const formData = new FormData();
      formData.append('first_name', val?.fname);
      formData.append('last_name', val?.lname);
      formData.append('email', val?.email);
      formData.append('mobile', val?.pnumber);
      if(!val?.gstin){
        formData.append('gstin', "");
      }else{
        formData.append('gstin', val?.gstin);
      }
      formData.append('location', val?.nationality);
      formData.append('pan_no', val?.pancard);
      // formData.append('describe', val?.describe);
      if(selectedFile){
        formData.append('image', selectedFile);
       }

        const res = await postData("users/add_profile/" , formData , true)
        if(res.status){
          setSelectedFile(null)
          toast.success("Profile Updated SuccessFully !")
          handleUserDetails()
        }else{
          toast.error(res.msg)
        }
  }

  const handleFileChange = (event) =>{
    const file = event.target.files[0];
    setSelectedFile(file); 
    const imageUrl = URL.createObjectURL(file)
    setblob(imageUrl)
  }


  const handleLinkClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
    return (
    <>
    <Toaster/>
      <div className={styles.row}>
        <h2>Personal Information</h2>
        <form 
           action="upload_endpoint" method="POST" encType="multipart/form-data"
            onSubmit={formik.handleSubmit}>
          <div className={styles.column1}>
            <div 
            className={styles.image} 
            style={{backgroundImage:`url(${blob ?   blob   :  previewImage ? `${imagePreviewUrl}${previewImage}` : testimage2})`}}
            >
            </div>
              <a style={{cursor  : "pointer"}} onClick={handleLinkClick}>Edit Profile Image </a>
              <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
      />
              {/* <h4 className={styles.discribe}>WHATS BEST DECRIBES YOU</h4>
            <div className={styles.radios}>
              <div>
                <input
                  className={styles.rd}
                  type="radio"
                  value="buyer"
                  checked={formik.values.describe === "buyer"}
                  name="describe"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className={styles.rdt}>BUYER</label>
              </div>
              <div>
                <input
                  className={styles.rd}
                  type="radio"
                  value="seller"
                  checked={formik.values.describe === "seller"}
                  name="describe"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <label className={styles.rdt}>SELLER</label>
              </div>
            </div> */}
          </div>
          <div className={styles.column2}>
            <div className={styles.col21}>
              <label className={styles.name}>First Name <span style={{color : "red"}}>*</span></label>
              <input className={styles.nameField} type="text" name="fname" onChange={formik.handleChange}  onBlur={formik.handleBlur} value={formik.values.fname}/>
              {formik.errors.fname && formik.touched.fname && (<div style={{color : 'red'}}>{formik.errors.fname}</div>)}
              <label className={styles.name}>Phone Number <span style={{color : "red"}}>*</span></label>
              <input
                className={styles.nameField}
                type="number"
                name="pnumber"
                onChange={formik.handleChange}  onBlur={formik.handleBlur} value={formik.values.pnumber}
              />
               {formik.errors.pnumber && formik.touched.pnumber && (<div style={{color : 'red'}}>{formik.errors.pnumber}</div>)}
              <label className={styles.name}>City <span style={{color : "red"}}>*</span></label>
              <input
                className={styles.nameField}
                type="text"
                name="nationality"
                onChange={formik.handleChange}  onBlur={formik.handleBlur} value={formik.values.nationality}

              />
              {formik.errors.nationality && formik.touched.nationality && (<div style={{color : 'red'}}>{formik.errors.nationality}</div>)}
              <label className={styles.name}>GSTIN Number</label>
              <input className={styles.nameField} type="text" name="gstin" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.gstin}  />
              {/* {formik.errors.gstin && formik.touched.gstin && (<div style={{color : 'red'}}>{formik.errors.gstin}</div>)} */}
              <div className={styles.btnContainer}>
                <button   type="submit" className={styles.btn}>
                  SAVE CHANGE
                </button>
                <button type="button" className={styles.btn2}>
                  DISCARD CHANGE
                </button>
              </div>
              
            </div>
            <div className={styles.col22}>
              <label className={styles.nameC}>Last Name <span style={{color : "red"}}>*</span></label>
              <input className={styles.nameField} type="text" name="lname"  onChange={formik.handleChange}  onBlur={formik.handleBlur} value={formik.values.lname} />
              {formik.errors.lname && formik.touched.lname && (<div style={{color : 'red'}}>{formik.errors.lname}</div>)}
              <label className={styles.nameC}>Email <span style={{color : "red"}}>*</span></label>
              <input className={styles.nameField} type="email" name="email" onChange={formik.handleChange}  onBlur={formik.handleBlur} value={formik.values.email} />
              {formik.errors.email && formik.touched.email && (<div style={{color : 'red'}}>{formik.errors.email}</div>)}
              <label className={styles.nameC}>Pan Card Number <span style={{color : "red"}}>*</span></label>
              <input className={styles.nameField} type="text" name="pancard" onChange={formik.handleChange}  onBlur={formik.handleBlur} value={formik.values.pancard} />
              {formik.errors.pancard && formik.touched.pancard && (<div style={{color : 'red'}}>{formik.errors.pancard}</div>)}
            </div>
          </div>
        </form>
      </div>
    </>
    );
};
export const DashboardMenu=()=>{
    const profileLinks=[
        {title:"MY Profile",path:"/dashboard/"},
        {title:"MY ADS",path:"/dashboard/ads/"},
        {title:"MY MESSAGES",path:"/"},
        {title:"ADS AWAITING PAYMENT",path:"/"},
        {title:"PAYMENT HISTORY",path:"/"},
        {title:"MY SERVICES",path:"/"},
        {title:"MY ORDERS",path:"/"},
        {title:"SUBCRIPTIONS",path:"/"},
        {title:"STATISTICS",path:"/"},
    ];
    return(
        <div className={styles.DashboardMenu}>
            {
                profileLinks.map((values,index)=>{
                    return <NavLink key={index}  style={activateLink} to={values.path}>{values.title}</NavLink>
                })
            }
            <Logout/>
        </div>
    );
};

// non components functions
const activateLink=({isActive})=>{
  return {
      backgroundColor:isActive?"#019C89":"#FFFFFF",
      color:isActive?"#FFFFFF":"#019C89"
  };
}