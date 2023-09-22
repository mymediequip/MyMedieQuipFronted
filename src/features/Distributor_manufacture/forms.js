import React from 'react';
import styles from '../../assets/css/manufacture/forms.module.css';
import {
    manIcon
} from '../../assets/images/index';
import { useNavigate } from 'react-router-dom';

export const AskType=(props)=>{
    const navigate=useNavigate();
    const handleContinue=()=>{
        navigate("/distributor-form/");
        window.scrollTo(0,0);
    }
    return(
        <div className={styles.askTypeCont}>
            <div className={styles.asktop}>
                <div className={styles.askPos}>
                    <img style={{marginRight:"8px"}} src={manIcon} alt='...'/>
                    <b>What’s your Position</b>
                </div>
                <div className={styles.crossBtn}><i onClick={props.handleClick} style={{fontSize:"30px",cursor:"pointer"}} className="bi bi-x"></i></div>
            </div>
            <p>Select one category from the following to help us identify which title suites u better.</p>
            <b>You are*</b>
            <div className={styles.askOptions}>
                <div>
                    <input type="radio" name='askopt'/>
                    <span>Distributor</span>
                </div>
                <div>
                    <input type="radio" name='askopt'/>
                    <span>Manufacturer</span>
                </div>
            </div>
            <div onClick={handleContinue} className={styles.continue}>CONTINUE</div>
        </div>
    );
};

export const DistributorFrom=()=>{
    return(
        <div className={styles.distriCont}>
            <div className={styles.distriTop}>
                <i class="bi bi-arrow-left-short"></i>
                <span>Back</span>
            </div>
            <h3>DISTRIBUTOR FORM</h3>

            <form className={styles.distForm}>
                <div className={styles.distRow}>
                    <div>
                        <b>Brands or Product you deal in</b>
                        <input type='text' placeholder='write the brands you deal in '/>
                    </div>
                    <div>
                        <b>Buisness/Firm Name</b>
                        <input type='text' />
                    </div>
                </div>

                <div className={styles.distRow}>
                    <div>
                        <b>Website Name</b>
                        <input type='text' />
                    </div>
                    <div>
                        <b>Responsible Person</b>
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
                        <b>Location /City</b>
                        <input type='text' />
                    </div>
                    <div>
                        <b>Equipment Category</b>
                        <input type='text' />
                    </div>
                </div>
                <p>Note : Recheck all the details before final submission of the form.</p>
                <input type='submit' value="Submit Response"/>

            </form>

        </div>
    );
}