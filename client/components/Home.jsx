import React, { Component, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import NavBar from './NavBar.jsx';
import HomeFeed from './HomeFeed.jsx';

const Home = (props) => {
  const location = useLocation();
  const userData = location.state;
  // console.log('metaData from Home: ', userData)

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch('/home')
      .then(data => data.json())
      .then(postsArr => {
        setPosts(postsArr)
        return (
          <>
            <div className='home'>
              <NavBar />
              <HomeFeed props = {posts} />
            </div>
          </>
        )
      })
  }, [])

  if (posts) {
    return (
      <>
        <div className='home'>
          <NavBar />
          <div className='background'>
            <img src='https://i.redd.it/za30ryykl7n81.jpg'></img>
          </div>
          <div className="fade">
            <img/>
          </div>
          <HomeFeed props = {posts} />
        </div>
      </>
    )
  } else return null
}

export default Home;