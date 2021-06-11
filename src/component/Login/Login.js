import React, { useEffect, useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useGlobalContext } from "../../context/mainContext"
import { Link, useHistory } from "react-router-dom"
import {FaSignInAlt} from 'react-icons/fa';
import './login-style.css';
import tickLogo from '../Assets/images/tickLogo.png';

export default function Login() {
  // login email states
  const loginEmail = useRef()
  const loginPassword = useRef();
  // global context for login function 
  const { login } = useGlobalContext()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

 const handleSubmit = async () =>{
      setLoading(true);
      await login(loginEmail.current.value, loginPassword.current.value)
      .catch((err)=>{
        switch(err.code){
          case "auth/Invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setError('User not found, try a different user');
            break;
          case "auth/wrong-password":
            setError('Wrong password has been entered!')
            break;
        }
      });
      setLoading(false); // unmounting all the states is important to prevent memory leak issues
      history.push("/");
  };

  return (
    <section className='login-component'> 
      <div className = 'login-block'>
        <div className='login-headers'>
          <img src={tickLogo} alt={tickLogo}></img>
        </div>
        <form className='login-form' onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}>
          <div className='login-inputs'>
            <input type='text' placeholder='enter email' ref={loginEmail} required></input>
            <input type='password' placeholder='enter password' ref={loginPassword} required></input>
          </div>
          <button className='login-btn' type='submit'>Sign In <FaSignInAlt/></button>
            <div className="login-link">
              <p><Link to="/forgot-password">Forgot Password?</Link></p>
              <p>Need an account? <Link className='login-text' to="/signup">Sign Up</Link></p>
            </div>
        </form>
      </div>
    </section>
  )
}