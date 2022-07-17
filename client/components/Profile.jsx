import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';

import NavBar from './NavBar.jsx';
import ProfileFeed from './ProfileFeed.jsx';

const Profile = (props) => {
  const location = useLocation();
  const userData = location.state;
  console.log('metaData from profile: ', userData)

  return (
    <>
      <div className='profile'>
        <NavBar />
        <ProfileFeed />
      </div>
    </>
  )

}

export default Profile;