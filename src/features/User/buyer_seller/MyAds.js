import React, { useEffect, useRef, useState } from 'react';
import {pngwing ,currency,ImageUpload, postDropdown} from "../../../assets/images/index";
import styles from "../../../assets/css/user/buyer_seller/ads.module.css";
import {postData} from "../../../services/index";
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from "yup" 
import { prodYearSchema } from '../../../utils/validation';


const MyAds = () => {
  const userId = localStorage.getItem("uid");
  const [ads, setads] = useState([]);
  const [editForm,setEditForm]=useState(false);
  const [uid,setuid]=useState("");


  const handleEditForm=(id)=>{
    setEditForm(!editForm);
    setuid(id)
  };

  useEffect(() => {
    handleAdsDetails();
  }, [editForm]);

  const handleAdsDetails = async () => {
    const formData = new FormData();
    if(editForm){
     formData.append("uid", uid);
    }else{
      formData.append("user", userId);
    }
    const res = await postData("product/lists/", formData, true);
    if (res?.status) {
      setads(res?.data);
    }
  };
  return (
    <div className={styles.main_content}>
      {
        editForm?<EditAds setEditForm={setEditForm} item={ads[0]}  />:
        (ads?.length > 0 ? (
          ads?.map((item) => {
            return <MyAdsCard item={item} handleEditForm={handleEditForm}/>;
          })
        ) : (
          <div style={{ padding: "20px" }}>...Loading</div>
        ))
      }
    </div>
  );
};
export default MyAds;

const MyAdsCard=({item,handleEditForm})=>{
  const [is3dot,set3dot]=useState(false);
  const handle3dot=()=>{
    set3dot(!is3dot);
  }
  return (
    <div className={styles.sub_content} onMouseLeave={() => set3dot(false)}>
      <div className={styles.sub_content1}>
        <img src={pngwing} alt="" className={styles.content_img} />
        <div className={styles.sub_content_text}>
          <span className={styles.content_text}>
            <h3>{item?.equip_name}</h3>
            <span className={styles.new_text}>
              {item?.post_type == 1
                ? "PRE-OWNED"
                : item?.post_type == 2
                ? "NEW"
                : item?.post_type == 3
                ? "SPARE & ACCESSORIES"
                : "SERVICES"}
            </span>
          </span>
          <p style={{ marginBottom: "20px" }}>
            {item?.user ? item?.user : "XM-101012QR"}
          </p>
          {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> */}
          <p>{item?.description}</p>
        </div>
        <div className={styles.sub_content_status}>
          <p style={{ display: "flex", alignItems: "center" }}>
            <img src={currency} style={{ width: "24px", height: "24px" }} />{" "}
            {Number(item?.asking_price)?.toFixed(2)}
          </p>
          <button className={styles.sub_status}>Status</button>
        </div>
      </div>
      <div className={styles.select_type}>
        {is3dot && (
          <span>
            <p onClick={() => handleEditForm(item?.uid)}>Edit</p>
            <p>Delete</p>
            <p>Deactivate</p>
          </span>
        )}
        <i className="bi bi-three-dots-vertical" onClick={handle3dot}></i>
      </div>
    </div>
  );
};

const EditAds=(props)=>{
  const [images,setImages]=useState([]);
  const [videos,setVideos]=useState([]);
  const [equipDetails ,setequipDetails] =  useState(props?.item)
  const [address ,setAddress] =  useState("")
  let prodYear = new Date(equipDetails?.created_date).getFullYear()
 
  const formik =  useFormik({
    initialValues : {
      equip_name : equipDetails?.equip_name  ? equipDetails?.equip_name :   "",
      equip_location : address ? address :  "",
      equip_category : "",
      equip_specality : "",
      prod_des : equipDetails?.description ?  equipDetails?.description : "",
      prod_brand : equipDetails?.brand ?  equipDetails?.brand : "",
      prod_model : equipDetails?.model ?  equipDetails?.model : "",
      prod_negotation : equipDetails?.negotiable_type ?  equipDetails?.negotiable_type : "",
      prod_condition : equipDetails?.equip_condition ?  equipDetails?.equip_condition : "",
      prod_price : equipDetails?.asking_price ?  equipDetails?.asking_price : "",
      prod_other_details : equipDetails?.other_details ?  equipDetails?.other_details : "",
      purchase_year : equipDetails?.year ? equipDetails?.year :  "",
      prod_warranty : equipDetails?.warranty ? equipDetails?.warranty :  "",
      prod_amc : equipDetails?.existing_amc ?  String(equipDetails?.existing_amc) :  ""
    },
    validationSchema : yup.object().shape({
     purchase_year : prodYearSchema,
    }),
    onSubmit : function (values){
      console.log(values)
    }
  })
useEffect(()=>{
  const API_KEY = 'pk.9432c2fb2d8b14ffa18cbb6050de3944';
  const API_URL = `https://nominatim.openstreetmap.org/reverse?lat=${equipDetails?.latitude}&lon=${equipDetails?.longitude}&format=json&apiKey=${API_KEY}`;
  axios
  .get(API_URL)
  .then(response => {
          setAddress(response?.data?.display_name)
      })
      .catch(error => {
          console.error('Error fetching address:', error);
        });
},[equipDetails])

  console.log(formik.values)



  const handleImges=(event)=>{
    const current = event.target;
    const imageUrl = URL.createObjectURL(current.files[0]);
    setImages([...images,imageUrl]);
  };

  const handlesetVideos=(event)=>{
    const current = event.target;
    const vidUrl = URL.createObjectURL(current.files[0]);
    setVideos([...videos,vidUrl]);
  };

  const removeImges=(e,index)=>{
    console.log(index);
    images.splice(index,1);
    setImages([...images]);

  };

  const removeVideo=(e,index)=>{
    videos.splice(index,1);
    setVideos([...videos]);
  };
  const dropsp = {
    title : "Speciality",
    description : "Select the equipment Specialities",
    dataList: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet"],
  }

  const dropCat = {
    title : "Category",
    description : "Select the equipment Categories",
    dataList: ["Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet"],
  }

  return(
    <div className={styles.editAddCont}>
      <div onClick={()=>props.setEditForm(false)} className={styles.backTab}><i class="bi bi-arrow-left-short"></i><span>Back</span></div>
      <form>
        <h4 className={styles.formTitle}>Product Update</h4>
        <div className={styles.medContainer}>
          <MediaComp media={images} dtype="image" setMedia={handleImges} removeMedia={removeImges}/>
          <MediaComp media={videos} dtype="video" setMedia={handlesetVideos} removeMedia={removeVideo}/>
        </div>
         <div className={styles.eqip_container}>
          <div className={styles.equip_innerContainer}>
           <label htmlFor="equip_name">Equipment Name</label>
            <input className={styles.text_input} value={formik?.values?.equip_name} onChange={formik.handleChange}  type='text' placeholder='Equip Name' name="equip_name"/>
          </div>
            <AdvCategories data={dropCat}/>
         </div>
         <div className={styles.eqip_container}>
          <div className={styles.equip_innerContainer}>
            <label htmlFor="equip_location">Location/City</label>
            <input value={formik?.values?.equip_location} onChange={formik.handleChange} className={styles.text_input} type='text' placeholder='Current Location/City' name="equip_location"/>  
          </div>
             <AdvCategories data={dropsp}/>
         </div>
         <div className={styles.eqip_container}>
          <div className={styles.equip_innerContainer}>
            <h3 className={styles.title}>Equipment Condition</h3>
          <div>
            <div className={styles.radios}>
            <div>
            <input type="radio" value={1} name="prod_condition" checked={formik.values.prod_condition === 1} onChange={formik.handleChange}  />
            <label className={styles.rdt}>Good</label>
          </div>
          <div>
            <input className={styles.rd} type="radio" value={2} name="prod_condition" checked={formik.values.prod_condition === 2} onChange={formik.handleChange}   />
            <label className={styles.rdt}>Excellent</label>
          </div>
          <div>
            <input className={styles.rd} type="radio" value={3} name="prod_condition" checked={formik.values.prod_condition === 3} onChange={formik.handleChange}  />
            <label className={styles.rdt}>As Good as New</label>
          </div>
           </div>
            </div>
          </div>
         <div className={styles.equip_innerContainer}>
            <label htmlFor="prod_price">Product Price</label>
            <input className={styles.text_input} value={formik.values.prod_price} type='text' onChange={formik.handleChange} placeholder='Product price' name="prod_price"/>  
          </div>
         </div>
         <div className={styles.eqip_container}>
          <div className={styles.equip_innerContainer}>
            <h3 className={styles.title}>Negotiable</h3>
          <div>
            <div className={styles.radio}>
            <div>
            <input type="radio" value={1} name="prod_negotation" checked={formik.values.prod_negotation === 1} onChange={formik.handleChange}  />
            <label className={styles.rdt}>Negotiable</label>
            </div>
          <div>
            <input className={styles.rd} type="radio" value={2} name="prod_negotation"  checked={formik.values.prod_negotation === 2} onChange={formik.handleChange} />
            <label className={styles.rdt}>Slightly Negotiable</label>
          </div>
          <div>
            <input className={styles.rd} type="radio" value={3} name="prod_negotation"  checked={formik.values.prod_negotation === 3} onChange={formik.handleChange} />
            <label className={styles.rdt}>Non-Negotiable</label>
          </div>
           </div>
            </div>
          </div>
          <div className={styles.equip_innerContainer}>
            <label htmlFor="prod_des">Product Description</label>
            <textarea value={formik.values.prod_des} onChange={formik.handleChange} className={styles.textarea_sty} type='text' placeholder='Enter Product desc' name="prod_des"/>  
          </div>
         </div>
         <div>
         <div className={styles.eqip_container}>
           <div className={styles.equip_innerContainer}>
            <label htmlFor="purchase_year">Manufacturing/ Purchase Year</label>
             <input className={styles.text_input} type="text" name="purchase_year" placeholder="Select the year" value={formik?.values?.purchase_year}
                  onChange={formik.handleChange}  onBlur={formik.handleBlur}/>
                {
            formik.touched.purchase_year && formik.errors.purchase_year ? 
            <div style={{color : 'red'}}>{formik.errors.purchase_year}</div> : null
          }
          </div>
        
         </div>
          <h3 className={styles.title1}>Product Specifications :</h3>
         </div>
         <div className={styles.eqip_container}>
           <div className={styles.equip_innerContainer}>
            <label htmlFor="equip_brand">Brand/Company : </label>
             <input value={formik.values.prod_brand} onChange={formik.handleChange} className={styles.text_input} type='text' placeholder='Brand/company name' name="prod_brand"/>
          </div>
          <div className={styles.equip_innerContainer}>
            <label htmlFor="equip_Model">Model number :</label>
             <input value={formik.values.prod_model} onChange={formik.handleChange} className={styles.text_input} type='number' placeholder='equip_Model' name="equip_Model"/>
          </div>
         </div>
         <div className={styles.eqip_container}>
          <div className={styles.equip_innerContainer}>
            <h3 className={styles.title}>Under Warranty : </h3>
          <div>
            <div className={styles.radio_type}>
             <div>
             <input type="radio" value={1} name="prod_warranty" checked={formik.values.prod_warranty === 1} onChange={formik.handleChange}  />
              <label className={styles.rdt}>YES</label>
          </div>
          <div>
            <input className={styles.rd} type="radio" value={0} name="prod_warranty" checked={formik.values.prod_warranty === 0} onChange={formik.handleChange}   />
            <label className={styles.rdt}>NO</label>
          </div>
           </div>
            </div>
          </div>
          <div className={styles.equip_innerContainer}>
            <h3 className={styles.title}>Existing AMC/CME :</h3>
          <div>
            <div className={styles.radio_type}>
             <div>
              <input type="radio" value={1} name="prod_amc" checked={formik.values.prod_amc === 1} onChange={formik.handleChange}  />
              <label className={styles.rdt}>YES</label>
            </div>
          <div>
            <input className={styles.rd} type="radio" value={0} name="prod_amc" checked={formik.values.prod_amc === 0} onChange={formik.handleChange}   />
            <label className={styles.rdt}>NO</label>
          </div>
           </div>
            </div>
          </div>
         </div>
         <div className={styles.eqip_container}>
           <div className={styles.equip_innerContainer}>
            <label htmlFor="prod_other_details">Other Description :</label>
             <textarea value={formik.values.prod_other_details} onChange={formik.handleChange} className={styles.textarea_sty} type='text' placeholder='other_des' name="prod_other_details"/>
          </div>
         </div>
         <p style={{marginTop : "3rem"}}> 
         Please Note : Once Seller Added the details, it will go for the admin approval, after admin approved them only this will be visible on home page
         </p>
         <input type="submit" className={styles.bttn} value="Submit Response" />
      </form>
    </div>
  );
};

const AdvCategories = (props) =>{
  const [show, setShow] = useState(false);

  const ref=useRef();
  useEffect(()=>{
      document.addEventListener("click",(e)=>{
      if(ref.current && !ref.current.contains(e.target)){
        setShow(false)
      }
    });
  },[])
  return(
    <div className={styles.equip_innerContainer} ref={ref}>
      <div className={styles.specTag}>
        <p>{props.data.title}</p>
      </div>
      <div className={styles.selectEquipDiv} onClick={() => setShow(!show)}>
        <p>{props.data.description}</p>
        <img className={styles.dropDownImage} src={postDropdown} alt="..." />
      </div>

      {show && (
        <div className={styles.checkBox}>
          {props.data.dataList.map((value, index) => {
            return (
              <div className={styles.checkboxCont} >
                <input type="checkbox" id="category" value={value}  name="category"   />
                <label for="checkbox1">{value}</label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )

}

const MediaComp=({media,setMedia,dtype,removeMedia})=>{
  
  return(
    <div>
      <h4 style={{marginBottom:"10px",textTransform:"capitalize"}}>{dtype}</h4>
      <div className={styles.mediaDataCont}>
      <label for={"inputMedi"+dtype}>
        <input 
          type="file"
          id={"inputMedi"+dtype} 
          accept={dtype+"/*"}
          onChange={setMedia}
          name={dtype}
        />
        <img src={ImageUpload} style={{cursor:"pointer"}} alt="Upload" />
      </label>
      {
        media.map((value,index)=>{
          if(dtype==="image"){
            return (
              <div className={styles.medData} key={index}>
                <img src={value} alt="Upload" />
                <i className="bi bi-x" onClick={(e)=>removeMedia(e,index)}></i>
              </div>
            );
          }
          else{
            return (
              <div className={styles.medData} key={index}>
                <video width="320" height="240" controls>
                  <source src={value} type="video/mp4"/>
                </video>
                <i className="bi bi-x" onClick={(e)=>removeMedia(e,index)} name={index}></i>
              </div>
            );
          }
        })
      }
      
    </div>
    </div>
  );
};

