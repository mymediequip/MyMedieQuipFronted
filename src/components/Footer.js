import React from 'react';
import { NavLink } from 'react-router-dom';
import { getDateTime } from '../utils/purefun';
import styles from '../assets/css/content.module.css';
import {
    twitter,
    fb,
    instagram,
    linkdin,
    mailIcon,
    phoneIcon,
} from '../assets/images/index';


// Footer 1
export const Footer=()=>{
    return(
        <div>
            <footer className={styles.footContainer}>
            <div className={styles.rightFoot}>
                <img className={styles.mediLogo} src={process.env.PUBLIC_URL+"/logo.png"} alt="..." />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas iure possimus natus voluptate dolores expedita </p>
                <div className={styles.socialLinks}>
                    <img className={styles.footSocial} src={twitter} alt="..." />
                    <img className={styles.footSocial} src={linkdin} alt="..." />
                    <img className={styles.footSocial} src={instagram} alt=".." />
                    <img className={styles.footSocial} src={fb} alt="..." />
                </div>
            </div>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div>
                        <h4 className={styles.listTitle}>Need Help</h4>
                        <ul className={styles.listStyle}>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Track Order</a></li>
                            <li><a href="#">Return & Refunds</a></li>
                            <li><a href="#">FAQ’s</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className={styles.listTitle}>Company</h4>
                        <ul className={styles.listStyle}>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Blogs</a></li>
                            <li><a href="#">Media</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className={styles.listTitle}>More Info</h4>
                        <ul className={styles.listStyle}>
                            <li><a href="#">Terms and Condition</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Shiping Policy</a></li>
                            <li><a href="#">Sitemap</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className={styles.listTitle}>Location</h4>
                        <ul className={styles.listStyle}>
                            <li><a href="#">support@domain.com</a></li>
                            <li><a href="#">MMQ, VIP Road Main Road</a></li>
                            <li><a href="#">Hauz Khas , India -110023</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>

        <div className={styles.allRights}>
                @All rights reserved to My Medie Quip.in
        </div>
      </div>
    );
};

//Footer 2 
export const Footer2=()=>{
    const footerLinks=[
        {title:"STATISTICS",path:"/"},
        {title:"USER AGREEMENT",path:"/"},
        {title:"FAQ's",path:"/"},
        {title:"SITEMAP",path:"/"},
        {title:"CONTACTS",path:"/"},
        {title:"NEWS",path:"/"},
        {title:"BECOME PARTNER",path:"/"},
    ];
    return (
      <footer>
        <div className={styles.ftext}>
          {
            footerLinks.map((values,index)=>{
                return <NavLink to={values.path} key={index} className={styles.fvalue}>{values.title}</NavLink>;
            })
          }
        </div>
        <div className={styles.social}>
          <a className={styles.socialAnc} href="/">
            <img src={twitter} alt="s" />{" "}
          </a>
          <a className={styles.socialAnc} href="/">
            <img src={linkdin} alt="s" />{" "}
          </a>
          <a className={styles.socialAnc} href="/">
            <img src={instagram} alt="s" />{" "}
          </a>
          <a className={styles.socialAnc} href="/">
            <img src={fb} alt="s" />{" "}
          </a>
        </div>
        <div className={styles.socMP}>
          <a className={styles.socMed} href="/">
            <img src={mailIcon} alt="s" />
            MedieQuip@gmail.com{" "}
          </a>
          <a className={styles.socPhon} href="/">
            <img src={phoneIcon} alt="s" />
            265464421132{" "}
          </a>
        </div>
        <div className={styles.bottom}>
          <p>@Medie Quip 2023-{getDateTime().year}</p>
        </div>
      </footer>
    );
};

export const MobileBottomNavbar=()=>{
  return(
    <div className={styles.mobileBottonNavbarr}>
      <NavLink style={activateLink} to="/">
        <i class="bi bi-house"></i>   
        <span>Home</span>
      </NavLink>
      <NavLink to="/">
        <i class="bi bi-cart-plus"></i>   
        <span>Buy</span>
      </NavLink>
      <NavLink to="/">
        <i class="bi bi-box2"></i>
        <span>Sell</span>
      </NavLink>
      <NavLink to="/user/login/">
        <i class="bi bi-person"></i>
        <span>Profile</span>
      </NavLink>
    </div>
  )
};

// non components functions
const activateLink=({isActive})=>{
  return {
      color:isActive?"#019C89":"#81837F"
  };
}