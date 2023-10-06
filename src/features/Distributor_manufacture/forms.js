import React, { useRef, useState } from 'react';
import styles from '../../assets/css/manufacture/forms.module.css';
import {
    manIcon,
    meetSuccess
} from '../../assets/images/index';
import { NavLink, useNavigate } from 'react-router-dom';
import { AdvtCategoriesDorpDown } from '../Sell/PostAdvt';
import { useFormik } from 'formik';
import * as yup from "yup";
import { ToastContainer,toast } from 'react-toastify';
import { pnumberSchema } from '../../utils/validation';

export const AskType=(props)=>{
    const navigate=useNavigate();
    const [selectedOpt,setSelectOpt]=useState(-1);

    const handleChange=(e)=>{
        setSelectOpt(e.currentTarget.name);
    }

    const handleContinue=()=>{
        if(selectedOpt==="0"){
            navigate("/distributor-form/");
        }
        else if(selectedOpt==="1"){
            navigate("/manufacturer-form/");
        }
        else{
            toast.info("Please Select Any One Option !",{autoClose:2000});
        }
        window.scrollTo(0,0);
    }
    return(
        <React.Fragment>
            <ToastContainer/>
            <div className={styles.askTypeCont}>
            <div className={styles.asktop}>
                <div className={styles.askPos}>
                    <img style={{marginRight:"8px"}} src={manIcon} alt='...'/>
                    <b>What’s your Position</b>
                </div>
                <div className={styles.crossBtn}><i onClick={props.handleClick} style={{fontSize:"30px",cursor:"pointer"}} className="bi bi-x"></i></div>
            </div>
            <p>Select one category from the following to help us identify which title suites you better.</p>
            <b>You are*</b>
            <div className={styles.askOptions}>
                <div>
                    <input type="radio" onChange={handleChange} name='0'/>
                    <span>Distributor</span>
                </div>
                <div>
                    <input type="radio" onChange={handleChange} name='1'/>
                    <span>Manufacturer</span>
                </div>
            </div>
            <div onClick={handleContinue} className={styles.continue}>CONTINUE</div>
        </div>
        </React.Fragment>
    );
};

export const DistributorFrom=()=>{
    const [isSubmitted,setSubmitted]=useState(false);

    const formik =  useFormik({
        initialValues : {
         brand : "",
         busi_firm : "",
         website_name : "",
         res_person : "",
         ph_number : "",
         email_id : "",
         city : "",
         equip_cat : ""
        },
        validationSchema : yup.object().shape({
         ph_number : pnumberSchema,

        }),
        onSubmit : function(values){
            // console.log(values)
            handleFormSubmit(values)
        }
    })


    const handleFormSubmit = (event) =>{
        // event.preventDefault()
        // setSubmitted(true);
        // window.scrollTo(0,0);
    }

    // console.log(formik.values ,"formik")

    return(
        <div className={styles.distriCont} style={{backgroundColor:isSubmitted?"#e6e6e673":"#FFFFFF"}}>
            { isSubmitted && <FormSubmitPopup setSubmitted={setSubmitted}/> }
            <div className={styles.distriTop}>
                <NavLink to='/'>
                    <i className="bi bi-arrow-left-short"></i>
                    <span>Back</span>
                </NavLink>
            </div>
            <h3>DISTRIBUTOR FORM</h3>

            <form className={styles.distForm} onSubmit={formik.handleSubmit}>
                <div className={styles.distRow}>
                    <div>
                        <b>Brands or Product you deal in</b>
                        <input id='brand' name='brand' type='text' placeholder='write the brands you deal in ' value={formik.values.brand} onChange={formik.handleChange} onBlur={formik.handleBlur}  />
                    </div>
                    <div>
                        <b>Business/Firm Name</b>
                        <input type='text' id='busi_firm' name='busi_firm' value={formik.values.busi_firm} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    </div>
                </div>

                <div className={styles.distRow}>
                    <div>
                        <b>Website Name</b>
                        <input type='text' id='website_name' name='website_name' value={formik.values.website_name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    </div>
                    <div>
                        <b>Responsible Person</b>
                        <input type='text' id='res_person' name='res_person' value={formik.values.res_person} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    </div>
                </div>

                <div className={styles.distRow}>
                    <div>
                        <b>Phone Number</b>
                        <input type='number' id='ph_number' name='ph_number' value={formik.values.ph_number} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                      
                    </div>
                    <div>
                        <b>Email Id</b>
                        <input type='email' id='email_id' name='email_id' value={formik.values.email_id} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    </div>
                </div>

                <div className={styles.distRow}>
                    <div>
                        <b>Location /City</b>
                        <input type='text' id='city' name='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    </div>
                    <div>
                        <b>Equipment Category</b>
                        <input type='text' id='equip_cat' name='equip_cat' value={formik.values.equip_cat} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {/* <AdvtCategoriesDorpDown  data={[]} /> */}

                    </div>
                </div>
                <p className={styles.recheck} >Note : Recheck all the details before final submission of the form.</p>
                <div style={{textAlign:"center"}}>
                    <input  className={styles.submitBtn} type="submit" value="Submit Response"/>
                </div>

            </form>

        </div>
    );
};

export const MANUFACTURERForm=()=>{
    const [isSubmitted,setSubmitted]=useState(false);

    const handleFormSubmit=(e)=>{
        e.preventDefault();
        setSubmitted(true);
        window.scrollTo(0,0);
    }
    return(
        <div className={styles.distriCont} style={{backgroundColor:isSubmitted?"#e6e6e673":"#FFFFFF"}}>
            { isSubmitted && <FormSubmitPopup setSubmitted={setSubmitted}/> }
            <div className={styles.distriTop}>
                <NavLink to='/'>
                    <i className="bi bi-arrow-left-short"></i>
                    <span>Back</span>
                </NavLink>
            </div>
            <h3>MANUFACTURER FORM</h3>

            <form className={styles.distForm} onSubmit={handleFormSubmit}>
                <div className={styles.distRow}>
                    <div>
                        <b>Product you deal in</b>
                        <input type='text' />
                    </div>
                    <div>
                        <b>Buisness/Firm Name</b>
                        <input type='text' />
                    </div>
                </div>
                <div className={styles.distRow}>
                    <div>
                        <b>Phone Number</b>
                        <input type='number' />
                    </div>
                    <div>
                        <b>Email Id</b>
                        <input type='email' />
                    </div>
                </div>

                <div className={styles.distRow}>
                    <div>
                        <b>Responsible Person</b>
                        <input type='text' />
                    </div>
                    <div>
                        <b>Office Location</b>
                        <input type='text' />
                    </div>
                </div>
                <div className={styles.distRow}>
                    <div>
                        <b>Equipment Category</b>
                        <input type='text' />
                        {/* <AdvtCategoriesDorpDown  data={[]} /> */}

                    </div>
                    <div>
                        <b>Equipment Category</b>
                        <input type='text' />
                        {/* <AdvtCategoriesDorpDown  data={[]} /> */}

                    </div>
                </div>
                <p className={styles.recheck} >Note : Recheck all the details before final submission of the form.</p>
                <div style={{textAlign:"center"}}>
                    <input  className={styles.submitBtn} type='submit' value="Submit Response"/>
                </div>

            </form>

        </div>
    );
};

const FormSubmitPopup=(props)=>{
    return(
        <div className={styles.submitPopupCont}>
            <div className={styles.crossBtn}><i onClick={()=>props.setSubmitted(false)} style={{fontSize:"30px",cursor:"pointer"}} className="bi bi-x"></i></div>
            <img src={meetSuccess} alt='meetSucees'/>
            <h4>Form Submitted</h4>
            <p>Thanks for reaching out, we will get in touch soon.</p>
            <span>Continue</span>
        </div>
    );
}