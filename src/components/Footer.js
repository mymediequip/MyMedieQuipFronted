import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from '../assets/css/content.module.css';
import {
    twitter,
    fb,
    instagram,
    linkdin
} from '../assets/images/index';



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