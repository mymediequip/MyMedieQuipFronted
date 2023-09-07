import React, { useEffect, useState } from 'react';
import styles from '../assets/css/card.module.css';
import { NewProductsCard } from './Cards';
import {
    prev_arrow,
    next_arrow,
    rightMove
} from '../assets/images/index';
import { NavLink } from 'react-router-dom';
const itemsPerPage = 5;
export const NewProducts=(props)=>{
    const [currentPage, setCurrentPage] = useState(1);
    const [currentIndex ,setCurrentIndex] = useState(0)
    const [displayedData, setDisplayedData] = useState([]);
    const [scroll, setScroll] = useState(false);
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
          setIsMobileView(window.innerWidth <= 768); // Adjust breakpoint as needed
        };

        handleResize(); // Set initial view on component mount
        window.addEventListener('resize', handleResize);
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);


    const handleScrollLeft = () =>{
        setScroll(true)
     setCurrentIndex((prev)=>(prev-1 + props?.data?.length) % props?.data?.length)
    } 
  
    const handleScrollRight = () =>{
        setScroll(true)
        setCurrentIndex((prev)=> (prev + 1) % props?.data?.length)
       }
   
  
    useEffect(()=>{
      const updateDisplayedData = () =>{
        const displayed=[
          props?.data[currentIndex % props?.data?.length],
          props?.data[(currentIndex + 1) % props?.data?.length],
          props?.data[(currentIndex + 2) % props?.data?.length],
          props?.data[(currentIndex + 3) % props?.data?.length],
          props?.data[(currentIndex + 4) % props?.data?.length],

        ]
        setDisplayedData(displayed)
      }
  
      updateDisplayedData();
    },[currentIndex , props?.data])

    const cardData=[
        {title:"Operation Machine",desc:"space for a small product description.. space for a small product description..space for a small product description",dis_price:"50000.00",t_price:55000.00 , img : "https://images.unsplash.com/photo-1504439468489-c8920d796a29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"},
        {title:"Blood pressure systems",desc:"space for a small product description.. space for a small product description..space for a small product description",dis_price:"30000.00",t_price:75000.00 , img : "https://plus.unsplash.com/premium_photo-1661772484028-74016b213190?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"},
        {title:"Endoscopy Equipment",desc:"space for a small product description.. space for a small product description..space for a small product description",dis_price:"60000.00",t_price:65000.00 , img : "https://media.istockphoto.com/id/1295788967/photo/patient-getting-fiber-optic-gastroscopy.jpg?s=2048x2048&w=is&k=20&c=qMWwkU8rCg46jJc1jxVN3LTTbD0_oS9i7qEET8oD-Uw="},
        {title:"Air Compressors",desc:"space for a small product description.. space for a small product description..space for a small product description",dis_price:"80000.00",t_price:335000.00 , img : "https://media.istockphoto.com/id/1006038874/photo/close-up-air-compressor-engine-machine-industrial-engineering-concept.jpg?s=2048x2048&w=is&k=20&c=U8HEQaMVw9pqmyyUb35_1zt5PtE_Kw5qTvRL8F23t2k="},
        {title:"Anesthesia Machines",desc:"space for a small product description.. space for a small product description..space for a small product description",dis_price:"110000.00",t_price:65000.00 , img : "https://images.unsplash.com/photo-1605654580413-5a7f24649936?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80"},
        {title:"Dental Equipment",desc:"space for a small product description.. space for a small product description..space for a small product description",dis_price:"450000.00",t_price:815000.00 , img : "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80"},
        {title:"Home Care Rehab",desc:"space for a small product description.. space for a small product description..space for a small product description",dis_price:"20000.00",t_price:5000.00 , img : "https://media.istockphoto.com/id/1319783107/photo/asian-disabled-senior-elderly-man-on-wheelchair-doing-physiotherapist-with-support-from.jpg?s=2048x2048&w=is&k=20&c=1bRTtT8hBzeFCYuzXVk5tVdL_kyCvDPmYz7dA55XEKg="},
    ];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = cardData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setScroll(false)
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  };

    return(
        <div className={styles.new_prod_container}>
            <h2 style={{color:"#2B2B2B"}}>{props.title}</h2>
            <div className={styles.product_container}>
                <img src={prev_arrow} alt='prev' className={styles.arrowImgPrev} onClick={handleScrollLeft}/>
                {!scroll && isMobileView ?
                    currentData.map((values,index)=>{
                        return <NewProductsCard isNew={props.isnew} key={index} data={values}/>
                    }) : 
                    displayedData.map((values,index)=>{
                        return <NewProductsCard isNew={props.isnew} key={index} data={values}/>
                    })
                }
                <img src={next_arrow} alt='next' className={styles.arrowImgNext} onClick={handleScrollRight}/>
            </div>
        <NextProductTab 
           currentPage={currentPage}
           totalPages={Math.ceil(cardData.length / itemsPerPage)}
           onPageChange={handlePageChange}
           handleScrollRight={handleScrollRight}
           isMobileView={isMobileView}
          />
        </div>
    );
};

const NextProductTab=({currentPage ,totalPages , onPageChange , handleScrollRight ,isMobileView})=>{
    
    return(
        <div className={styles.nextProdCont} >
            {isMobileView && Array.from({ length: totalPages }, (_, index) => (
                <NavLink 
                key={index}
          onClick={() => onPageChange(index + 1)}
          style={{backgroundColor : currentPage === index + 1 ? '#019c89' : ''}}>{index+1}</NavLink>
              
              ))}
           {isMobileView && <img alt='Next' style={{cursor : 'pointer'}} src={rightMove} onClick={handleScrollRight} />}
        </div>
    );
};
