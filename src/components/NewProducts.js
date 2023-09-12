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

    
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = props?.data?.slice(startIndex, endIndex);

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
                    displayedData?.map((values,index)=>{
                        return <NewProductsCard isNew={props.isnew} key={index} data={values}/>
                    })
                }
                <img src={next_arrow} alt='next' className={styles.arrowImgNext} onClick={handleScrollRight}/>
            </div>
        <NextProductTab 
           currentPage={currentPage}
           totalPages={Math.ceil(props?.data.length / itemsPerPage)}
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
