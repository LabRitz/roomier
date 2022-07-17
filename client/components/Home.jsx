import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';

import NavBar from './NavBar.jsx';
import HomeFeed from './HomeFeed.jsx';

const Home = (props) => {
  const location = useLocation();
  const userData = location.state;
  console.log('metaData from Home: ', userData)

  return (
    <>
      <div className='home'>
        <NavBar />
        <HomeFeed />
      </div>
    </>
  )
}

export default Home;