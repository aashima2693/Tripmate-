import React, { useContext, useState } from 'react'
import './login.css'
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';

import { StoreContext } from '../../context/StoreContext';

const Login = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Login")
    const {url, setToken} = useContext(StoreContext)

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (event) =>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data, [name]:value}))
    }


    const onLogin = async (event) =>{
      event.preventDefault()
      let newUrl = url;

      if(currState === "Login"){
        newUrl += "/api/user/login"
      }
      else{
        newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl, data);
      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }
    }

    return (
      <div className='login'>
        <form className="login-popup-container" onSubmit={onLogin}>
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <RxCross2 onClick={()=>setShowLogin(false)}/>
            </div>
            <div className="login-popup-inputs">
              {currState === "Login"
                ? null
                : <input type="text" name="name" placeholder='Your Name' value={data.name} onChange={onChangeHandler} required />}
              <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder="Email" required />
              <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder="Password" required />
            </div>
            <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
            <div className="login-popup-condition">
              <input type='checkbox' required /> I agree to terms & conditions
            </div>
            <div className="login-popup-toggle">
              {currState === "Login"
                ? <p>Don't have an account? <span style={{color: "#da801a", cursor: "pointer"}} onClick={()=>setCurrState("Sign Up")}>Sign Up</span></p>
                : <p>Already have an account? <span style={{color: "#da801a", cursor: "pointer"}} onClick={()=>setCurrState("Login")}>Login</span></p>
              }
            </div>
        </form>
      </div>
    )
}

export default Login