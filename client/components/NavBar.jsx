import React, { Component, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from '../stylesheets/navbar.scss';

const NavBar = (props) => {
  const location = useLocation();
  const userData = location.state;
  // console.log('metaData from navBar: ', userData)

  const [phrase, setPhrase] = useState('roommate');

  const phrases = [
    'roommate', 
    'future', 
    'friend', 
    'bed',
    'dorito',
    'milk steak'
  ]
  useEffect(()=> {
    const index = phrases.indexOf(phrase);
    const newPhrase = (index === phrases.length - 1) ? phrases[0] : phrases[index+1];
    setTimeout(() => {
      setPhrase(newPhrase)
    }, 5000)
  }, [phrase])

  return (
    <div className='nav'>
      <div class="leftBtn">
        < Link to={{
          pathname: '/home',
          state: userData
          }}>
          <img src='https://raw.githubusercontent.com/gist/blee3395/a44a462bef347d7096753a1a0057db2f/raw/28f52dcd17eb53e9b0d415826a43bd2480c34f6a/roomier_logo.svg'/>
          {/* <button class='logoBtn'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
              <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
            </svg>
          </button> */}
        </Link>
        < Link to={{
          pathname: '/home',
          state: userData
          }}>
            <h1>find a {phrase}...</h1>
          {/* <img src='https://raw.githubusercontent.com/gist/blee3395/a44a462bef347d7096753a1a0057db2f/raw/28f52dcd17eb53e9b0d415826a43bd2480c34f6a/roomier_logo.svg'/> */}
          
        </Link>
      </div>
      <div class="rightBtn">
        {/* <input type="text" value="Looking for a fine piece of art..."></input> */}
        < Link to={{
          pathname: '/createPost',
          state: userData
          }}>
          <button class="post">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-file-earmark-arrow-up" viewBox="0 0 16 16">
              <path d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z"/>
              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
            </svg>
          </button>
        </Link>
        < Link to={{
          pathname: '/profile',
          state: userData
          }}>
          <button class='textBtn version profile'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  )

}

export default NavBar;