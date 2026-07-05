import styles from './DashBoard.module.css'
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Skeleton from '@mui/material/Skeleton';
import withAuthHOC from '../utils/HOC/withAuthHOC';
import { useState } from 'react';
import axios from '../utils/axios'
import { useContext} from 'react';
import { AuthContext } from '../utils/AuthContext';
import { useEffect } from "react";

const DashBoard= () => {
  const [uploadFiletext,setUploadFiletext]=useState("Upload Your Resume");
  const [loading,setLoading]=useState(false);
  const [resumeFile,setResumeFile]=useState(null);
  const [jobDesc,setJobDesc]=useState(null);
   const [result,setResult]=useState(null);
   const {userInfo}=useContext(AuthContext);

    const [openCard,setOpenCard]=useState(false);

  const handleonChangeFile=(e)=>{
     setResumeFile(e.target.files[0]);
     setUploadFiletext(e.target.files[0].name);
  }


  const handleUpload=async()=>{
     setResult(null);
     if(!jobDesc || !resumeFile){
      alert("Please Fill Job Description & Upload Resume");
     }

     const formData=new FormData();
     formData.append('resume',resumeFile);
     formData.append('job_desc',jobDesc);
     formData.append('user',userInfo._id);

    setLoading(true);

     try{
      const res=await axios.post('/api/resume/addResume',formData);
      setResult(res.data.data);
     }
     catch(err){
      console.log(err);
     }

     finally{
      setLoading(false);
     }
  }
   
  return (
    <div className={styles.Dashboard}>
       <div className={styles.DashboardLeft}>
          <div className={styles.DashboardHeader}>
            <div className={styles.DashboardHeaderTitle}>Smart Resume Screenig</div>
            <div className={styles.DashboardHeaderLargeTitle}>AI Resume Analyzer</div>
         </div>

        <div className={styles.infoCard}>
      <h3>📋 Before You Analyze</h3>
      <p>✓ Paste the complete Job Description for accurate AI analysis.</p>
      <p>✓ Upload your resume in PDF (.pdf) format only.</p>
</div>

        <div className={styles.upload}>
          <div className={styles.uploadPlace}>{uploadFiletext}</div>
          <div className={styles.inputField}>
            <label htmlFor='inputField' className={styles.analyzeAi}>Upload Resume</label>
            <input type="file" accept='.pdf' id='inputField' onChange={handleonChangeFile}></input>
          </div>
        </div>

       <div className={styles.holder}>
         <textarea className={styles.textArea} placeholder='Paste Your Job Description' rows={10} cols={50} onChange={(e)=>setJobDesc(e.target.value)}></textarea>
         <div className={styles.analyzeButton} onClick={handleUpload}>
           Analyze
         </div>
       </div>

    </div>

     <div className={styles.DashboardRight}> 
         <div className={styles.DashboardRightTop}>
            <div>Analyze With AI</div>
            <img className={styles.profileImg} src={userInfo?.photoUrl}></img>
            <h2>{userInfo?.name}</h2>
         </div>

          
         {
  result && (
    <>
      <div
        className={styles.DashboardRightTop}
        onClick={() => setOpenCard(true)}
      >
        <div>Result</div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20,}}>
          <h1>{result?.score}%</h1>
          <CreditScoreIcon />
        </div>

        <div className={styles.feedback}>
          <h3>Feedback</h3>

          <p className={styles.shortText}>
            {result?.feedback}
          </p>

          <p style={{ color: "blue", cursor: "pointer" }}>
            Click to Read More
          </p>
        </div>
      </div>

      {openCard && (
        <div
          className={styles.overlay}
          onClick={() => setOpenCard(false)}
        >
          <div
            className={styles.popup}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>AI Resume Feedback</h2>

            <h3>Score: {result.score}%</h3>

            <p>{result.feedback}</p>

            <button onClick={() => setOpenCard(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}
        {/* {
            result && <div className={`${styles.DashboardRightTop} ${openCard === userInfo._id ? styles.feedbackOpen: styles.feedbackClosed}`}>
            <div>Result</div>
            <div style={{display:"flex", justifyContent:"center" , alignItems:"center",gap:20}}>
              <h1>{result?.score}%</h1>
              <CreditScoreIcon />
            </div>

            <div className={styles.feedback}>
              <h3>Feedback</h3>
              <p>{result?.feedback}</p>
            </div>
         </div>
        }
        */}

     {
      loading && <div className={styles.loadingOverlay}>

      <div className={styles.loadingBox} >
        <Skeleton
          variant="rectangular"
          width={350}
          height={250}
          sx={{ borderRadius: "20px" }}
        />
        <h3>Analyzing Resume...</h3>
      </div>
    </div>

     }
     </div>

    </div>
  )
}

export default withAuthHOC(DashBoard);