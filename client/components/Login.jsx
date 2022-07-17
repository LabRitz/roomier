import React, { Component, useState, useEffect } from 'react';
import {Link} from 'react-router-dom'

import styles from '../stylesheets/login.scss';


const Login = (props) => {

  const [ID, setID] = useState('')

  const handleLogin = (e) => {
      // e.preventDefault();

      // console.log({username: document.getElementById('username').value, password: document.getElementById('password').value});
      
      // setID('brennan')
      
    const reqBody = {
      username: document.getElementById('username').value, 
      password: document.getElementById('password').value
    }

    // fetch('http://localhost:3000', {
    fetch('/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(reqBody)})
      .then(data => data.json())
      .then(formattedData => {
        console.log('data: ', formattedData)
        if (formattedData.err) {
          // document.getElementById('accNotFound').innerHTML = "Account doesn't exist, please try again or create account";
          alert("Account doesn't exist, please try again or create account");
        }
        else if (formattedData.error) {
          // document.getElementById('accNotFound').innerHTML = "Password incorrect";
          alert("Password incorrect");
        }
        else {
          setID(formattedData);
        }
      })
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}

  useEffect(() => {
    const homeLink = document.querySelector('.homeLink')
    if (ID !== '') homeLink.style.visibility = 'visible'
  }, [ID])

  return (
    <div className='router'>
      <h2>Find a Roommate</h2>
      <div className='accNotFound'></div>
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

// import {useNavgiate}
// let navigate = useNavigate()
// navigateToHome = navigate('/home')