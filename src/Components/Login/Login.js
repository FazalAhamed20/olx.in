import React,{useState} from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword,getAuth } from 'firebase/auth';
import {useNavigate}from 'react-router-dom'

function Login() {
  const auth=getAuth()
  const navigate=useNavigate()
  const [email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const[error,setError]=useState('')
  const handleSubmit=(e)=>{
    e.preventDefault()
    setError('')
    signInWithEmailAndPassword(auth,email,password).then(()=>{
      navigate('/')
    }).catch((error)=>{
     
      if(error.code==='auth/invalid-email'){
        setError('Please provide a valid email address.')
      }else if(error.code==='auth/missing-password'){
        setError('Please provide a valid password ')
      }
     
     
      
    })
    



  }
  return (
    <div>
      <div className="loginParentDiv">
      {error ? <p className='Error'>{error}</p> : null}
        <img width="200px" height="200px" src={Logo}></img>
       
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <Link to='/signup'
        >
           <a>Signup</a>
        </Link>
       
      </div>
    </div>
  );
}

export default Login;
