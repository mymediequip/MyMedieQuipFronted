import React, { useState ,useEffect,useRef} from 'react';
import {companyName} from '../assets/data/data';
import { useSelector,useDispatch } from 'react-redux';
import { changeLocation, changeLoginStatus } from '../app/Slices/AuthSlice';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from '../assets/css/navigation.module.css';
import { ToastContainer, toast} from 'react-toastify';
import {
    downIcon,
    searchIcon,
    profileIcon,
    actimg,
    testimage2,
    arrLeft,
    Jaipur,
    location
} from '../assets/images/index';
import useClickOutside from '../customHooks/useClickOutside';
const profileImg = process.env.REACT_APP_IMAGE_PREVIEW
export const Navigation=()=>{
    const isLogin=useSelector((state)=>state.auth.isLogin);
    const {pathname}=useLocation();
    console.log(pathname)
    const token=localStorage.getItem("token");
    const links=[
        {name:"Equipment Category",path:"/specialization"},
        {name:"Pre-owned Equipment",path:"/preowned-equip/"},
        {name:"New Equipment",path:"/new-equip/"},
        {name:"Services",path:"/services/"},
        {name:"Spare & Accessories",path:"/"},
        {name:"Manufactures & Distribution",path:"/manufacturers/"},
        {name:"Contact Us",path:"/"}
    ];
    const postlinks=[
        // {name:"Equipment Category",path:"/specialization"},
        {name:"My Profile",path:"/dashboard/"},
        {name:"My Ads",path:"/dashboard/ads/"},
        {name:"My Messages",path:"/"},
        {name:"My Services",path:"/"},
        {name:"Payment History",path:"/"},
        {name:"Awaiting Payment",path:"/"},
        {name:"Subcriptions",path:"/"},
        {name:"My Orders",path:"/"}
    ];
    return(
        <div id="navigationBlur">
            <header className={styles.headContainer}>
                <NavLink to="/">
                <img className={styles.logo} src={process.env.PUBLIC_URL+"/logo.png"} alt={companyName}/>
                </NavLink>
                <Location/>
                <Search />
                <BuyBtn/>
                <SellBtn/>
                <Explore/>
                <Speciality/>
                {
                    token   ? <ProfileDropDown/> : <LoginBtn/>
                }
                <div style={{display:"flex",alignItems:"center"}}>
                    <AddToCart/>
                    <Humberger/>
                </div>
            </header>
            <hr className={styles.nav_line}/>
            {
                pathname.includes("/post/")?<Nav2 links={postlinks}/>:<Nav2 links={links}/>
            }
            <hr className={styles.nav_line}/>
        </div>
    );
};

const Nav2=(props)=>{
    
    return(
        <div className={styles.Nav2Container}>
           <div className={styles.navlinks}>
           {
                props.links.map((values,index)=>{
                    return <NavLink to={values.path} style={activateLink} key={index}>{values.name}</NavLink>;
                })
            }
           </div>
           <CreatBtn/>
        </div>
    );
};


const Location=(props)=>{
    const [isOpen,setIsOpen]=useState(false);
    const handleLocation=(event)=>{
        event.preventDefault();
        setIsOpen(!isOpen);
    }
    const ref=useRef();
    useEffect(()=>{
        document.addEventListener("click",(e)=>{
        if(ref.current && !ref.current.contains(e.target)){
            setIsOpen(false);
        }
      });
    },[])
    return(
        <div>
            <div className={styles.location} id="loc1" onClick={handleLocation} ref={ref}>
                <span>India</span>
                <img src={downIcon} alt='>'/>
            </div>
            {
                isOpen?<LocationDropDown handleLocation={handleLocation} />:""
            }
        </div>
    );
};

const LocationDropDown=(props)=>{
    const locationCity=[
        {name:"Delhi",bg:Jaipur},
        {name:"Mumbai",bg:Jaipur},
        {name:"Bengaluru",bg:Jaipur},
        {name:"Pune",bg:Jaipur},
        {name:"Gujarat",bg:Jaipur},
        {name:"Chennai",bg:Jaipur},
        {name:"Ahmedabad",bg:Jaipur},
        {name:"Kolkata",bg:Jaipur},
        {name:"Bihar",bg:Jaipur}
    ];
    
    return (
        <div className={styles.locationCont} >
          <div className={styles.selectLocHead} >
            <a href="" onClick={props.handleLocation}>
              <img
                className={styles.leftArrow}
                src={arrLeft}
                alt="..."
              />
            </a>
            <p>Please Select your Location</p>
          </div>

          <div className={styles.inputCity}>
            <input type="text" placeholder="Enter Your City" />
          </div>

          <div className={styles.detectLoc}>
            <a href="">
              <img
                className={styles.locationPic}
                src={location}
                alt="..."
              />
            </a>
            <p>Detect my location</p>
          </div>
          <div className={styles.pupularCity}>
            <p>Popular Cities</p>
          </div>
          <div className={styles.allCity}>
            {
                locationCity.map((value,index)=>{
                    return (
                      <NavLink to='/' key={index}>
                        <img className={styles.cityImage} src={value.bg} alt="..." />
                        <p className={styles.cityPicName}>{value.name}</p>
                      </NavLink>
                    );
                })
            }
          </div>
        </div>
    );
};

export const Search=({handleChange })=>{
    const handleKeyPress = (e) =>{
        const  {key, keyCode} = e;
        if(keyCode===13){
            e.preventDefault()
        }
    }
    const handleSubmit = (e) =>{
        e.preventDefault()
    }

    return(
        <form className={styles.search} onSubmit={handleSubmit} >
            <input type='text' placeholder='Find medical instrument..' onChange={handleChange} onKeyDown={handleKeyPress} />
            <input  type='submit' value="Search" />
        </form>
    );
};

const BuyBtn=()=>{
    return(
        <NavLink className={styles.BuyBtn} to="/search/">Buy</NavLink>
    )
};

const SellBtn=()=>{
    const token =  localStorage.getItem("token");
    const [isToast,setToast]=useState(false);
    const navigate=useNavigate();
    const handlClick=(e)=>{
        e.preventDefault();
        if(!token){
            navigate("/user/login/" ,{state:{navigateTo:"/post/"}});
            toast.info("Please login to procced",{autoClose:2000});
            setToast(true);
        }
        else{
            navigate("/post/");
        }
    }
    return(
        <React.Fragment>
            <NavLink 
            onClick={handlClick}
            className={styles.SellBtn} 
            to=''>
                Sell
            <ToastContainer/>
            </NavLink>
            
            {/* { isToast && <ToastContainer/> } */}
        </React.Fragment>
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
    const ref=useRef();
    useEffect(()=>{
        document.addEventListener("click",(e)=>{
        if(ref.current && !ref.current.contains(e.target)){
            setIsOpen(false)
        }
      });
    },[])
    return(
        <div className={styles.exploreCont} ref={ref}>
            <div className={styles.exploreHead} onClick={handleClick}>
                <span>Explore</span>
                <img src={downIcon} alt='>'/>
            </div>
            {
                isOpen?<div className={styles.exploreLinks}>
                {
                exploreLinks.map((values,index)=>{
                    return <NavLink to="/" onClick={handleClick}>{values.title}</NavLink>
                })
                }
                </div>:""
            }
            
        </div>
    );
}

const Speciality=()=>{
    return(
        <NavLink className={styles.Speciality} to="/speciality-search/">
            <img src={searchIcon} alt='search'/>
            <input placeholder='Speciality' readOnly type='text'/>
        </NavLink>
    )
};

const LoginBtn=()=>{
    const navigate=useNavigate();
    const handlClick=(e)=>{
        e.preventDefault();
        navigate("/user/login/",{state:{navigateTo:"/"}})
    }
    return(
        <NavLink className={styles.LoginBtn} onClick={handlClick}>
            <img src={profileIcon} alt='profile'/>
            <span>Login</span>
        </NavLink>
    )
};

const ProfileDropDown=()=>{
    const profile_image =  useSelector((state)=>state?.profileData?.profile_image)
    const [isOpen,setIsOpen]=useState(false);
    const profileLinks=[
        {title:"Profile",path:"/"},
        {title:"Dashboard",path:"/dashboard/"},
        {title:"Notifications",path:"/"},
    ];
    const handleClick=()=>{
        setIsOpen(!isOpen);
    };
    const ref=useRef();
    useEffect(()=>{
        document.addEventListener("click",(e)=>{
        if(ref.current && !ref.current.contains(e.target)){
            setIsOpen(false)
        }
      });
    },[])
    
    return(
        <div className={styles.exploreCont} ref={ref}>
            <div className={styles.profileHead} onClick={handleClick} >
                <img src={profile_image ? `${profileImg}${profile_image}` : testimage2} style={{width:"45px",height:"45px" , borderRadius : "50%"}} alt='Dashboard'/>
                <img style={{cursor : 'pointer'}} src={downIcon} alt='>'/>
            </div>
            {
                isOpen?<div className={styles.exploreLinks} style={{right:"10px"}}>
                {
                profileLinks.map((values,index)=>{
                    return <NavLink to={values.path} onClick={handleClick} key={index}>{values.title}</NavLink>
                })
                }
                <Logout setIsOpen={setIsOpen} />
                </div>:""
            }
        </div>
    );
};

export const Logout=({setIsOpen})=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const logout=(event)=>{
        event.preventDefault();
        localStorage.removeItem("token")
        dispatch(changeLoginStatus(false));
        dispatch(changeLocation(false));
        setIsOpen(false)
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
    console.log(isMobile ,"u")
    const ref =  useRef(null)
    const navigate=useNavigate();
    const handleHumberg=()=>{
        setIsMobile(!isMobile);
    };
    console.log(isMobile)
    const handleClickOutSide = () =>{
        setIsMobile(true);
    }
    useClickOutside(ref , handleClickOutSide)
    const links=[
        {name:"PRE-OWNED EQUIPMENT",path:"/preowned-equip/"},
        {name:"NEW EQUIPMENT",path:"/new-equip/"},
        {name:"SERVICES",path:"/services/"},
        {name:"SPARE & ACCESSORIES",path:"/"},
        {name:"MANUFACTURES & DISTRIBUTION",path:"/manufacturers/"},
        {name:"CONTACT US",path:"/"},
        {name:"POST ADVERT",path:"/"}
    ];
    return(
        <div ref={ref} className={styles.humberg} id="humberg">
            <span  id="humIcon" onClick={handleHumberg}>
                {
                    isMobile ? <i class="bi bi-list"></i> : <i class="bi bi-x"></i>
                }
            </span>
            {
                isMobile?"":<div className={styles.mobileMenu}>
                {
                    links.map((value,index)=>{
                        if(index===0){
                            return <NavLink onClick={(e)=>{
                                e.preventDefault();
                                setIsMobile(true);
                                navigate(value.path)

                            }}  style={{color:"#019C89"}} className={styles.topMobileMenu} key={index}>{value.name}</NavLink>
                        }
                        return <NavLink onClick={(e)=>{
                            e.preventDefault();
                            setIsMobile(true);
                            navigate(value.path);

                        }}  key={index}>{value.name}</NavLink>
                    })
                }
                </div>
            }
        </div>
    );
};

const AddToCart=()=>{
    const carts=useSelector((state)=>state.profileData.cart);
    console.log(carts);
    return(
        <div className={styles.AddToCart}>
            <img src={actimg} alt='atc'/>
            <span>{carts.length}</span>
        </div>
    );
};

// non components functions
const activateLink=({isActive})=>{
    return {
        color:isActive?"#019C89":"#757574"
    };
}
