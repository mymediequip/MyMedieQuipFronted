import React, { useState } from 'react';
import {companyName} from '../assets/data/data';
import { useSelector,useDispatch } from 'react-redux';
import { changeLoginStatus } from '../app/Slices/AuthSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from '../assets/css/navigation.module.css';
import {
    downIcon,
    searchIcon,
    profileIcon,
    actimg,
    testimage2
} from '../assets/images/index';

export const Navigation=()=>{
    const isLogin=useSelector((state)=>state.auth.isLogin);
    return(
        <React.Fragment>
            <header className={styles.headContainer}>
                <NavLink to="/">
                <img className={styles.logo} src={process.env.PUBLIC_URL+"/logo.png"} alt={companyName}/>
                </NavLink>
                <Location/>
                <Search/>
                <BuyBtn/>
                <SellBtn/>
                <Explore/>
                <Speciality/>
                {
                    isLogin?<ProfileDropDown/>:<LoginBtn/>
                }
                <div style={{display:"flex",alignItems:"center"}}>
                    <AddToCart/>
                    <Humberger/>
                </div>
            </header>
            <Nav2/>
        </React.Fragment>
    );
};

const Nav2=()=>{
    const links=[
        {name:"Equipment Category",path:"/specialization"},
        {name:"Used Equipment",path:"/"},
        {name:"New Equipment",path:"/"},
        {name:"Service",path:"/"},
        {name:"Spare and Accessories",path:"/"},
        {name:"For Distribution",path:"/"},
        {name:"Contact Us",path:"/"}
    ];
    return(
        <div className={styles.Nav2Container}>
           <div className={styles.navlinks}>
           {
                links.map((values,index)=>{
                    return <NavLink to={values.path} style={activateLink} key={index}>{values.name}</NavLink>;
                })
            }
           </div>
           <CreatBtn/>
        </div>
    );
};


const Location=(props)=>{

    return(
        <div className={styles.location} id="loc1">
            <span>India</span>
            <img src={downIcon} alt='>'/>
        </div>
    );
};

export const Search=()=>{
    return(
        <form className={styles.search}>
            <input type='text' placeholder='Find medical instrument..'/>
            <input type='submit' value="Search"/>
        </form>
    );
};

const BuyBtn=()=>{
    return(
        <NavLink className={styles.BuyBtn} to="/">Buy</NavLink>
    )
};

const SellBtn=()=>{
    return(
        <NavLink className={styles.SellBtn} to="/">Sell</NavLink>
    )
};

const Explore=()=>{
    const [isOpen,setIsOpen]=useState(false);
    const exploreLinks=[
        {title:"Blog Post"},
        {title:"Review"},
        {title:"Articles"},
        {title:"Tech Updates"},
        {title:"News"},
        {title:"Forum"},
        {title:"Expert Tip’s"},
    ];
    const handleClick=()=>{
        setIsOpen(!isOpen);
    }
    return(
        <div className={styles.exploreCont}>
            <div className={styles.exploreHead} onClick={handleClick}>
                <span>Explore</span>
                <img src={downIcon} alt='>'/>
            </div>
            {
                isOpen?<div className={styles.exploreLinks}>
                {
                exploreLinks.map((values,index)=>{
                    return <NavLink to="/">{values.title}</NavLink>
                })
                }
                </div>:""
            }
            
        </div>
    );
}

const Speciality=()=>{
    return(
        <NavLink className={styles.Speciality} to="/">
            <img src={searchIcon} alt='search'/>
            <input placeholder='Speciality' type='text'/>
        </NavLink>
    )
};

const LoginBtn=()=>{
    return(
        <NavLink className={styles.LoginBtn} to="/user/login/">
            <img src={profileIcon} alt='profile'/>
            <span>Login</span>
        </NavLink>
    )
};

const ProfileDropDown=()=>{
    const [isOpen,setIsOpen]=useState(false);
    const profileLinks=[
        {title:"Profile",path:"/"},
        {title:"Dashboard",path:"/dashboard"},
        {title:"Notifications",path:"/"},
    ];
    const handleClick=()=>{
        setIsOpen(!isOpen);
    };
    
    return(
        <div className={styles.exploreCont}>
            <div className={styles.profileHead} onClick={handleClick} >
                <img src={testimage2} style={{width:"45px",height:"45px"}} alt='Dashboard'/>
                <img src={downIcon} alt='>'/>
            </div>
            {
                isOpen?<div className={styles.exploreLinks} style={{right:"10px"}}>
                {
                profileLinks.map((values,index)=>{
                    return <NavLink to={values.path} onClick={handleClick} key={index}>{values.title}</NavLink>
                })
                }
                <Logout />
                </div>:""
            }
        </div>
    );
};

export const Logout=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const logout=(event)=>{
        event.preventDefault();
        dispatch(changeLoginStatus());
        navigate("/");
    }
    return(
        <NavLink path="/" onClick={logout}>Logout</NavLink>
    );
};

const CreatBtn=()=>{
    return(
        <NavLink className={styles.CreatBtn} style={{color:"#FFFFFF"}}to="/">Create a Requirement</NavLink>
    )
};

const Humberger=()=>{
    const [isMobile,setIsMobile]=useState(true);
    const handleHumberg=()=>{
        setIsMobile(!isMobile);
    };
    const links=[
        {name:"USED EQUIPMENTS",path:"/"},
        {name:"NEW EQUIPMENTS",path:"/"},
        {name:"SERVICES",path:"/"},
        {name:"SPARE and ACCESSORIES",path:"/"},
        {name:"FOR DISTRIBUTION",path:"/"},
        {name:"CONTACT US",path:"/"},
        {name:"POST ADVERT",path:"/"}
    ];
    return(
        <div className={styles.humberg} id="humberg">
            <span id="humIcon" onClick={handleHumberg}>
                {
                    isMobile ? <i class="bi bi-list"></i> : <i class="bi bi-x"></i>
                }
            </span>
            {
                isMobile?"":<div className={styles.mobileMenu}>
                {
                    links.map((value,index)=>{
                        if(index===0){
                            return <NavLink to={value.path} style={{color:"#019C89"}} className={styles.topMobileMenu} key={index}>{value.name}</NavLink>
                        }
                        return <NavLink to={value.path} key={index}>{value.name}</NavLink>
                    })
                }
                </div>
            }
        </div>
    );
};

const AddToCart=()=>{
    return(
        <div className={styles.AddToCart}>
            <img src={actimg} alt='atc'/>
        </div>
    );
};

// non components functions
const activateLink=({isActive})=>{
    return {
        color:isActive?"#019C89":"#757574"
    };
}