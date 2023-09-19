import React, { useEffect, useState } from 'react';
import {pngwing ,currency,ImageUpload} from "../../../assets/images/index";
import styles from "../../../assets/css/user/buyer_seller/ads.module.css";
import {postData} from "../../../services/index";
import { NavLink } from 'react-router-dom';


const MyAds = () => {
  const userId = localStorage.getItem("uid");
  const [ads, setads] = useState([]);
  const [editForm,setEditForm]=useState(false);

  const handleEditForm=()=>{
    setEditForm(!editForm);
  };

  useEffect(() => {
    handleAdsDetails();
  }, []);

  const handleAdsDetails = async () => {
    const formData = new FormData();
    formData.append("user", userId);
    const res = await postData("product/lists/", formData, true);
    console.log(res?.data, "res");
    if (res?.status) {
      setads(res?.data);
    }
  };
  return (
    <div className={styles.main_content}>
      {
        editForm?<EditAds setEditForm={setEditForm} />:
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
            <p onClick={() => handleEditForm()}>Edit</p>
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
  return(
    <div className={styles.editAddCont}>
      <div onClick={()=>props.setEditForm(false)} className={styles.backTab}><i class="bi bi-arrow-left-short"></i><span>Back</span></div>
      <form>
        <h4 className={styles.formTitle}>Product Update</h4>
        <div className={styles.medContainer}>
          <MediaComp media={images} dtype="image" setMedia={handleImges} removeMedia={removeImges}/>
          <MediaComp media={videos} dtype="video" setMedia={handlesetVideos} removeMedia={removeVideo}/>
        </div>
        <div className={styles.formData}>
          
        </div>
      </form>
    </div>
  );
};

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

