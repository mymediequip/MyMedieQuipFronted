import React, { useEffect, useState } from 'react';
import {
    line,
    swipetestleft,
    nextArow,
    spotify,
    office,
    adobe,
    blender,
} from '../assets/images/index';
import { ClientCard } from './Cards';
import styles from '../assets/css/card.module.css';
import { postData } from '../services';

export const OurClients=()=>{
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clientList, setClientList] = useState([]);
  const itemsPerSlide = 3;

  const handleClientListData = async()=>{
    const res = await postData("master/list_ourclient/")
    console.log(res.data)
    if(res.status){
      setClientList(res?.data)
    }
  }

  useEffect(()=>{
    handleClientListData()
  },[])
  
  const handleScrollLeft = () =>{
    setCurrentIndex(Math.max(currentIndex - itemsPerSlide, 0));
  }
  const handleScrollRight = () =>{
    if (currentIndex + itemsPerSlide < clientList.length) {
      setCurrentIndex(currentIndex + 1);
    } else if (currentIndex + itemsPerSlide === clientList.length) {
      // Add new client data and remove the first item
      const newClient = {
        id: clientList.length + 1,
        name: "New Client",
        // Add other properties as needed
      };
      setClientList([...clientList.slice(1), newClient]);
    }
  }
 
  console.log(clientList , currentIndex)
    return(
        <div className={styles.testMaincCont}>
        <div className={styles.testHeading}>
          <p>What Our Clients says!</p>
          <img className={styles.headingLine1} src={line} alt='...'/>
        </div>
        <div className={styles.reviewCont}>
          <div className={styles.swipeArrow} >
          <img onClick={handleScrollLeft} alt='' className={styles.headingLine}  src={swipetestleft}/>
          </div>
          {
            clientList?.slice(currentIndex, currentIndex + itemsPerSlide)?.map((client)=>{
               return   <ClientCard clientList={client} />
            })
          }
          
          
          {/* <ClientCard/>
          <ClientCard/>
           */}
          <div className={styles.swipeArrow}>
          <img onClick={handleScrollRight} alt='' className={styles.headingLine}  src={nextArow}/>
          </div>
        </div>
      </div>
    );
};

export const ClientBanner=()=>{
  const clietns=[spotify,
    office,
    adobe,
    blender,
    office
  ];
  return(
    <div className={styles.clientContainer}>
      {
        clietns.map((values,index)=>{
          return <img src={values} key={index} alt='...'/>
        })
      }
    </div>
  );
}