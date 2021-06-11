import React, { useRef, useState, useEffect } from "react"
import { useGlobalContext } from "../../context/mainContext"
import { Link, useHistory } from "react-router-dom"
import './signup-style.css';
import { FaYoutube } from "react-icons/fa";
import tickLogo from '../Assets/images/tickLogo.png';

export default function Signup() {
  const { signup } = useGlobalContext()// primary global context
  // signup input refs 
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  // sign up error states 
  const [error, setError] = useState("")// error alert states 
  const [loading, setLoading] = useState(false)
  const history = useHistory()


const handleSubmit = async () =>{ 
  // confirm password error block;
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    setLoading(true);
    await signup(emailRef.current.value, passwordRef.current.value)
    .catch((err)=>{
      switch(err.code){ // firebase email error code cases
        case "auth/email-already-in-use":
          setError('Email already in use')
        case "auth/invalid-email":
          setError('Invalid Email address entered');
          break;
        case "auth/weak-password":
          setError('Enter a stronger password');
          break;
      }
    })
    setLoading(false);
    history.push("/");
  }

  return (
    <section className='signup-component'>
      <div className='signup-block'>
          <div className='signup-headers'>
              <img src={tickLogo} alt={tickLogo}></img>
          </div>
          <form className='signup-form' onSubmit={(e)=>{
            e.preventDefault();
            handleSubmit();}}>
              <div className='signup-inputs'>
                <input type="email" ref={emailRef} placeholder='Enter an email' required />
                <input type="password" ref={passwordRef} placeholder='Enter a password' required />
                <input type="password" ref={passwordConfirmRef} placeholder='Confirm your password' required />
              </div>
              <button disabled={loading} className="signup-btn" type="submit">Sign up</button>
              <div className="login-link">
                Already have an account? <Link className='login-text' to="/login">Log In</Link>
              </div>
          </form>
      </div>
    </section>
  )
}