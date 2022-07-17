import React, { Component } from 'react';

import NavBar from './NavBar.jsx';
import ProfileFeed from './ProfileFeed.jsx';

const Profile = (props) => {

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