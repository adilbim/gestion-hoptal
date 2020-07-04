import React, {useState} from 'react';
import css from './login.css';
import axios from 'axios';
//import jwt from 'jsonwebtoken';

export default function Login({history}){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    const handleUserNameChange = (e) => {
      setUserName(e.target.value);
    }
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    }
    const handleClick = async () => {
      let user = await axios.post('/api/login',{username: userName, password: password});
      //console.log(user);
      if(user.headers['auth-token']){
        localStorage.setItem('isLoggedIn',true);
        localStorage.setItem('user',user.headers['auth-token']);
        history.push("/");
      }
    }


    return (
        <div className="A_bigContainer">
    <div id = "A_container">
      <div className = "A_hi">Bonjour!</div>
      <div className = "A_user">
        <label for="uname"><b>Username</b></label>
        <input 
         type="text"
         value={userName}
         placeholder="Enter 
         Username" 
         name="uname" 
         onChange={handleUserNameChange}
         required 
         />
         <span className="separator"> </span>
      </div>
      <div className = "A_user">
        <label for="psw"><b>Password</b></label>
        <input 
        type="password" 
        value={password}
        placeholder="Enter Password" 
        onChange={handlePasswordChange}
        name="psw" 
        required
        />
        <span className="separator"> </span>
      </div> 
      
      <div className = "A_two">
        
        <div className = "A_rem">
          <label>
            <input type="checkbox" />
              Remember me
          </label>
        </div>   
        <div className="A_forgot">
          <span className="psw"><a href="#">Forgot password?</a></span>
        </div>
      </div> 
      <div className = "A_submit">
        <input type="submit" id="submit" value="Login" onClick={handleClick}  />
      </div>
    </div>
    </div>
    );
}