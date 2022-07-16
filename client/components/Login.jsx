import React, { Component, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

import styles from '../stylesheets/login.scss';


const Login = (props) => {

  const [ID, setID] = useState('')

  const handleLogin = (e) => {
      // e.preventDefault();

      console.log({username: document.getElementById('username').value, password: document.getElementById('password').value});
      document.getElementById('username').value = '';
      document.getElementById('password').value = '';

      setID('brennan')
      
      // fetch('/login', {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: {username: document.getElementById('username').value, password: document.getElementById('password').value}}
      // ).then(data => {
      //   if (data.length === 0) 
      //   const userData = data[0];
      //   setID(userData);
      // })
  }

  useEffect(() => {
    const homeLink = document.querySelector('.homeLink')
    if (ID !== '') homeLink.style.visibility = 'visible'
  }, [ID])

  return (
    <div className='router'>
      <h2>Find a Roommate</h2>
      <input type={'email'} id="username" placeholder='Enter your email address'></input>
      <input type={'password'} id="password" placeholder='Enter your password'></input>
      <button type='submit' id='submit' onClick={handleLogin}>Login</button>
      <div className='homeLink'>
        <Link to={{
          pathname: '/home',
          state: ID
          }}
        >Home</Link>
      </div>
      <Link to='/signup'>Sign up</Link>
      <a href='/login/auth/google'>Log in with google</a>
    </div>
  )

}

export default Login;