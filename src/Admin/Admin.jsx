import styles from './Admin.module.css';
import Skeleton from '@mui/material/Skeleton';
import withAuthHOC from '../utils/HOC/withAuthHOC';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from '../utils/axios';

const Admin = () => {
  const [data,setData]=useState([]);
  const [loader,setLoader]=useState(false);
   
  const [openCard,setOpenCard]=useState(null);

  useEffect(()=>{

     const fetchAllData=async()=>{
       setLoader(true);
       try{
           const res=await axios.get('/api/resume/get');
           console.log(res.data);
           setData(res.data.resumes)
        }

        catch(err){
          console.log(err);
          alert('Something Went Wrong');
        }

        finally{
          setLoader(false);
        }
     }
     fetchAllData();
  },[])
  return (
    <div className={styles.Admin}>
      <div className={styles.AdminBlock}>

        {
          loader && <>

           <Skeleton variant='rectangular' sx={{borderRadius:"20px"}} width={266} height={200}/>
           <Skeleton variant='rectangular' sx={{borderRadius:"20px"}} width={266} height={200}/>
           <Skeleton variant='rectangular' sx={{borderRadius:"20px"}} width={266} height={200}/>
          </>
        }

        {
          data.map((item,idx)=>{
            return (
              <div key={item._id} className={`${styles.AdminCard} ${ openCard===item._id ? styles.fullScreen : ""}  ${openCard && openCard !== item._id ? styles.hiddenCard : ""}`} onClick={()=>
                  setOpenCard(
                  openCard===item._id ? null : item._id
              )}>
                
              <h2>{item?.user?.name}</h2>
              <p style={{color:"blue"}}>{item?.user?.email}</p>
             <h3>Score:{item.score}%</h3>
             <div className={openCard === item._id ? styles.feedbackOpen: styles.feedbackClosed}>
               {item.feedback}
              </div>
            </div>
            )
          })
        }

        

      </div>
    </div>
  )
}

export default withAuthHOC(Admin);