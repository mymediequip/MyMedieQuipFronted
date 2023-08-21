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
  const [displayedData, setDisplayedData] = useState([]);


  const handleClientListData = async()=>{
    const res = await postData("master/list_ourclient/")
    console.log(res?.data)
    if(res.status){
      setClientList(res?.data)
    }
  }

  useEffect(()=>{
    handleClientListData()
  },[])
  
  const handleScrollLeft = () =>{
    setCurrentIndex((prevIndex) => (prevIndex - 1 + clientList?.length) % clientList?.length);
  }
  const handleScrollRight = () =>{
    setCurrentIndex((prevIndex) => (prevIndex + 1) % clientList?.length);
  }

  useEffect(() => {
    const updateDisplayedData = () => {
      const displayed = [
        clientList[currentIndex % clientList?.length],
        clientList[(currentIndex + 1) % clientList?.length],
        clientList[(currentIndex + 2) % clientList?.length]
      ];
      setDisplayedData(displayed);
    };
  
    updateDisplayedData();
  }, [currentIndex]);
 
  console.log(currentIndex)

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
            displayedData?.map((client)=>{
               return   <ClientCard clientList={client} />
            })
          }
        
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