import React from 'react';

import Phrases from './Phrases.jsx';
import '../stylesheets/login.scss'; 

const Signup = () => {

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const reqBody = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        username: document.getElementById('username').value, 
        password: document.getElementById('password').value,
        zipCode: document.getElementById('zipCode').value
      }
  
      const res = await fetch('/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(reqBody)
        })
      const data = await res.json()
      if (data !== null) {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('firstName').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('zipCode').value = '';
        window.open('/', '_self')
      }
      else {
        alert('User already exists in the database')
      }
    } catch(err) {
      console.log('signup error: ', err)
    }
  }

  return (
    <div className='router'>
      <div className="logo">
        <img src='https://raw.githubusercontent.com/gist/blee3395/a44a462bef347d7096753a1a0057db2f/raw/28f52dcd17eb53e9b0d415826a43bd2480c34f6a/roomier_logo.svg'/>
        <h4>a LabRitz thing</h4>
        <h6>looking for a Zillow corporate sponsorship</h6>
      </div>
      <div className="login">
        <Phrases/>
        <input type={'text'} id='firstName' placeholder='Enter your first name'></input>
        <input type={'text'} id='lastName' placeholder='Enter your last name'></input>
        <input type={'email'} id="username" placeholder='Enter your email address'></input>
        <input type={'password'} id="password" placeholder='Enter your password'></input>
        <input type={'text'} id='zipCode' placeholder='Enter your zip code'></input>
        <button type='submit' id='submit' onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  )

}

export default Signup;