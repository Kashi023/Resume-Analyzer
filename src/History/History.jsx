import styles from './History.module.css'
import Skeleton from '@mui/material/Skeleton'
import withAuthHOC from '../utils/HOC/withAuthHOC'
import { useState ,useEffect,useContext} from 'react'
import axios from '../utils/axios'
import { AuthContext } from '../utils/AuthContext'

const History = () => {

  const [data,setData]=useState([]);
  const [loader,setLoader]=useState(false);
  const [openCard,setOpenCard]=useState(null);

  const {userInfo} = useContext(AuthContext);
  useEffect(()=>{

    const fetchUserData=async()=>{
      setLoader(true);
      try{
          const userInfo = JSON.parse(localStorage.getItem("userInfo"));

         const res=await axios.get(`/api/resume/get/${userInfo._id}`);
         console.log(res.data);
         setData(res.data.resumes);
      }

      catch(err){
        console.log(err);
        alert("Something Went Wrong");
      }

      finally{
        setLoader(false);
      }
    }
    fetchUserData()
  },[])

  return (
    <div className={styles.History}>
      <div className={styles.HistoryCardBlock}>

          {
            loader && <>
              <Skeleton variant='rectangular' sx={{borderRadius:"20px"}} width={200} height={200}/>
              <Skeleton variant='rectangular' sx={{borderRadius:"20px"}} width={200} height={200}/>

              <Skeleton variant='rectangular' sx={{borderRadius:"20px"}} width={200} height={200}/>

            </>
          }

          
          {
            data.map((item,idx)=>{
              return (
                 
          <div key={item._id} className={`${styles.HistoryCard} ${ openCard===item._id ? styles.fullScreen : ""}  ${openCard && openCard !== item._id ? styles.hiddenCard : ""}`} onClick={()=>
            setOpenCard(
            openCard===item._id ? null : item._id
          )}
          >

          <div className={styles.cardPercentage}>
               {item.score}%
          </div>
            {/* <h1>Frontend Developer</h1> */}
            <p>Resume name : {item.resume_name}</p>

            <div className={openCard === item._id ? styles.feedbackOpen: styles.feedbackClosed}>
             {item.feedback}
            </div>

            <p>Dated:{item.createdAt.slice(0,10)}</p>
          </div>
              );
            })
          }

        </div>
    </div>
  )
}

export default withAuthHOC(History);