import React, { Component, useState, useEffect } from 'react';

import styles from '../stylesheets/login.scss'; 

const handleSignUp = (e) => {
    e.preventDefault();
    // console.log({firstName: document.getElementById('firstName').value, lastName: document.getElementById('lastName').value, username: document.getElementById('username').value, password: document.getElementById('password').value});
    
    const reqBody = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      username: document.getElementById('username').value, 
      password: document.getElementById('password').value
    }

    fetch('/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(reqBody)
      })
      .then(data => data.json())
      .then(formattedData => {
        if (formattedData !== null) {
          document.getElementById('username').value = '';
          document.getElementById('password').value = '';
          document.getElementById('firstName').value = '';
          document.getElementById('lastName').value = '';
          window.open('/', '_self')
        }
        else {
          alert('User already exists in the database')
        }
      })
      .catch(err => {
        console.log('signup error: ', err)
      })
    ;
}

const Signup = (props) => {
  const [phrase, setPhrase] = useState('Roommate');
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
        <h4>a Team Tassled Wobbegong thing</h4>
        <h6>looking for a Zillow corporate sponsorship</h6>
      </div>
      <div className="login">
        <h2>Find a {phrase}</h2>
        <input type={'text'} id='firstName' placeholder='Enter your first name'></input>
        <input type={'text'} id='lastName' placeholder='Enter your last name'></input>
        <input type={'email'} id="username" placeholder='Enter your email address'></input>
        <input type={'password'} id="password" placeholder='Enter your password'></input>
        <button type='submit' id='submit' onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  )

}

export default Signup;