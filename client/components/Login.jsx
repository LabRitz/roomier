import React, { Component } from 'react';
import {Link} from 'react-router-dom'

const handleLogin = (e) => {
    e.preventDefault();
    console.log({username: document.getElementById('username').value, password: document.getElementById('password').value});
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    // fetch('/login', {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: {username: document.getElementById('username').value, password: document.getElementById('password').value}}
    // );
}

const Login = (props) => {
  return (
    <div className='router'>
      <h2>Find a Roommate</h2>
      <input type={'email'} id="username" placeholder='Enter your email address'></input>
      <input type={'password'} id="password" placeholder='Enter your password'></input>
      <button type='submit' id='submit' onClick={handleLogin}>Login</button>
      <Link to='/signup'>Sign up</Link>
      <a href='/login/auth/google'>Log in with google</a>
    </div>
  )

}

export default Login;