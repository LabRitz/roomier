import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import '../stylesheets/login.scss';


const Login = ({ setUserInfo }) => {

  const [phrase, setPhrase] = useState('Roommate');

  const handleLogin = async () => {      
    const reqBody = {
      username: document.getElementById('username').value, 
      password: document.getElementById('password').value
    }
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(reqBody)
      });
      const data = await res.json();
      if (data == null || data.err) alert("Credentials incorrect. Please try again or create account");
      else setUserInfo(data);
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';
    } catch (err) {
      console.log('CAUGHT ERROR', err)
    }
  }

  const phrases = ['Roommate', 'Future', 'Life', 'Friend' ]
  useEffect(()=> {
    const index = phrases.indexOf(phrase);
    const newPhrase = (index === phrases.length - 1) ? phrases[0] : phrases[index+1];
    setTimeout(() => {
      setPhrase(newPhrase)
    }, 5000)
  }, [phrase])

  return (
    <div className='router'>
      <div className="logo">
        <img src='https://raw.githubusercontent.com/gist/blee3395/a44a462bef347d7096753a1a0057db2f/raw/28f52dcd17eb53e9b0d415826a43bd2480c34f6a/roomier_logo.svg'/>
        <h4>a LabRitz thing</h4>
        <h6>looking for a Zillow corporate sponsorship</h6>
      </div>
      <div className="login">
        <h2>Find a {phrase}</h2>
        <div className='accNotFound'></div>
        <input type={'email'} id="username" placeholder='Enter your email address'></input>
        <input type={'password'} id="password" placeholder='Enter your password'></input>
        <button type='submit' id='submit' onClick={handleLogin}>Login</button>
        <div className='homeLink'>
        </div>
        <a href='/login/auth/google'>
          Google Login 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
            </svg>
        </a>
        <Link to='/signup'>Sign up</Link>
      </div>
    </div>
  )

}

export default Login;