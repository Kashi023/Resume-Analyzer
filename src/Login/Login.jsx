import styles from './Login.module.css';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GoogleIcon from '@mui/icons-material/Google';
import {auth,provider} from '../utils/fireBase.jsx';
import { signInWithPopup } from 'firebase/auth';
import { useContext } from 'react';
import { AuthContext } from '../utils/AuthContext';
import { useNavigate} from 'react-router-dom';
import axios from '../utils/axios';

const Login = () => {
  
  const {isLogin,setLogin,userInfo,setUserInfo}=useContext(AuthContext);
  const navigate=useNavigate();
  const handlelogin=async()=>{

    try{
     
      provider.setCustomParameters({
  prompt: "select_account",
});
     const result=await signInWithPopup(auth,provider);
     const user=result.user;
     const userData = {
      name:user.displayName,
      email:user.email,
      photoUrl:user.photoURL
     }


    const response = await axios.post("/api/user",userData);
    
    console.log(response.data);

     setUserInfo(response.data.user);

     localStorage.setItem(
     "userInfo",
    JSON.stringify(response.data.user)
    );

     setLogin(true);
     localStorage.setItem("isLogin","true");
     console.log("Navigating...");
     navigate('/dashboard');
    }

    catch(err){
       alert("Something Went Wrong");
       console.log(err);
    }

  }
  return (
    <div className={styles.Login}>
        <div className={styles.loginCard}>
          
           <div className={styles.loginCardTitle}>
              <h1>Login</h1>
              <VpnKeyIcon />
           </div>

           <div className={styles.googleBtn}  onClick={handlelogin}><GoogleIcon sx={{fontSize:20, color:"red"}}/> Sign in with Google</div>
      </div>
    </div>
  )
}


export default Login