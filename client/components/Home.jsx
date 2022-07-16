import React, { Component } from 'react';

import NavBar from './NavBar.jsx';
import HomeFeed from './HomeFeed.jsx';

import Card from './Card.jsx';
import ContainerFeed from './ContainerFeed.jsx';


const Home = (props) => {

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