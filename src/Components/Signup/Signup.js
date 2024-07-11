import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { getAuth,createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {setDoc,doc, getFirestore,} from 'firebase/firestore'
import {useNavigate} from 'react-router-dom'



export default function Signup() {
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setPassword]=useState('')
  const [error,setError]=useState('')
  

  const auth=getAuth()
  const db=getFirestore()
  const navigate=useNavigate()

 
  const onSubmit=(e)=>{
    e.preventDefault()
    
    createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
      updateProfile(auth.currentUser,{displayName:username}).then(()=>{
        setDoc(doc(db, 'users',email), {
          id: response.user.uid,
          username: username,
          phone: phone
        })

      })
    
      .then(() => {
        navigate('/')
      })
      .catch((error) => {
       alert(error.message)
      });
    })
    .catch((error) => {
      alert(error.message)
      if(error.code==='auth/invalid-email'){
        setError('Please provide a valid email address.')
      }else if(error.code==='auth/missing-password'){
        setError('Please provide a valid password')
      }else if(error.code==='auth/email-already-in-use'){
        setError('Email is already taken,use different Email')
      }
    });
  
    

  }
  return (
    <div>
      <div className="signupParentDiv">
      {error ? <p className='Error'>{error}</p> : null}
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={onSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            id="fname"
            name="name"
            defaultValue="John"
            required
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
            id="lname"
            name="phone"
            defaultValue="Doe"
            required
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
          <button>Signup</button>
        </form>
        <Link to='/login'>
        <a>Login</a>

        </Link>
       
      </div>
    </div>
  );
}
