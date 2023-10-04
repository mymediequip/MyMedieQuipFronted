import React from 'react';
import styles from '../../assets/css/services/service.module.css';
import { Catogories } from '../../components/Hero';
import {
    serviceImg,
    serviceMail,
    whatsBtn
} from '../../assets/images/index';

export const Service=()=>{
    const sfilters=["AMC","CMC","Delivery","Repairing","Consumable","Parts","Shiiping and Installation","Software Update","Rental Services"];
    return(
        <section className={styles.serviceCont}>
            <div className={styles.serviceSubCont}>
                <div className={styles.serviceRow1}>
                    <i className="bi bi-house-door"></i>
                    <i style={{fontSize:"14px"}} className="bi bi-chevron-right"></i>
                    <span>Services</span>
                </div>

                <div className={styles.serviceRow2}>
                    <div className={styles.servCat}>
                        <Catogories/>
                    </div>
                    <div style={{background:"none",boxShadow:"none"}} className={styles.serviceContent}>
                        <div className={styles.serviceFilters}>
                            
                            {
                                sfilters.map((value,index)=>{
                                    return <span className={styles.sFilter} key={index}>{value}</span>
                                })
                            }

                            <span className={styles.sFilterApply} >Apply</span>

                        </div>
                        <div className={styles.serviceData}>
                            <ServiceCard/>
                            <ServiceCard/>
                            <ServiceCard/>
                            <ServiceCard/>
                            <ServiceCard/>
                        </div>

                    </div>
                </div>
                

            </div>
        </section>
    );
};

const ServiceCard=()=>{
    return(
        <div className={styles.serviceCard}>
            <img src={serviceImg}  alt='service'/>
            <div className={styles.serviceData}>
                <div className={styles.sOffer}>
                    <span>OFFERED</span>
                    <p>Repair SAMSUNG Accuvix XQ Ultrasound Machine</p>
                </div>
                <div className={styles.location}>Location</div>
                <div className={styles.servCont}>
                    <div className={styles.servWhat}>
                        <img src={whatsBtn} alt='Chat'/>
                        <span>Chat on WhatsApp</span>
                    </div>
                    <div style={{backgroundColor:"#485280"}} className={styles.servMail}>
                        <img src={serviceMail} />
                        <span>SEND A REQUEST</span>
                    </div>
                </div>
            </div>

        </div>
    );
}