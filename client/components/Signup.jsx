import React, {Component} from 'react';

const handleSignUp = (e) => {
    e.preventDefault();
    console.log({firstName: document.getElementById('firstName').value, lastName: document.getElementById('lastName').value, username: document.getElementById('username').value, password: document.getElementById('password').value});
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('lastName').value = '';
    // fetch('/login', {
    //     method: 'POST',
    //     headers: {'Content-Type': 'application/json'},
    //     body: {username: document.getElementById('username').value, password: document.getElementById('password').value}}
    // );
}

const Signup = (props) => {
  return (
    <div className='router'>
      <h2>Find a Roommate</h2>
      <input type={'text'} id='firstName' placeholder='Enter your first name'></input>
      <input type={'text'} id='lastName' placeholder='Enter your last name'></input>
      <input type={'email'} id="username" placeholder='Enter your email address'></input>
      <input type={'password'} id="password" placeholder='Enter your password'></input>
      <button type='submit' id='submit' onClick={handleSignUp}>Sign Up</button>
    </div>
  )

}

export default Signup;