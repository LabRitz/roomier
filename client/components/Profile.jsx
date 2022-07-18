import React, { Component, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import NavBar from './NavBar.jsx';
import ProfileFeed from './ProfileFeed.jsx';

const Profile = (props) => {
  const location = useLocation();
  const userData = location.state;
  // console.log('metaData from profile: ', userData)

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch(`/home/${userData.username}`)
      .then(data => data.json())
      .then(postsArr => {
        setPosts(postsArr)
        return (
          <>
            <div className='profile'>
              <NavBar />
              <ProfileFeed props={posts}/>
            </div>
          </>
        )
      })
  }, [])

  if (posts) {
    return (
      <>
        <div className='profile'>
          <NavBar />
          <ProfileFeed props={posts}/>
        </div>
      </>
    )
  } else return null
  

}

export default Profile;