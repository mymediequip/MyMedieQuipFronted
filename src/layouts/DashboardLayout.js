import React from 'react';
import styles from '../assets/css/profile.module.css';
import { DashboardMenu } from '../pages/ProfilePage';
import { DashboardAdvt } from '../components/Advt';
import { Outlet } from 'react-router-dom';

export const DashboardLayout=()=>{
    return(
        <React.Fragment>
            <DashboardAdvt/>
            <div className={styles.dashboardLayout}>
                <DashboardMenu/>
                <Outlet/>
            </div>
        </React.Fragment>
    );
};