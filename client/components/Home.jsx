import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';

import NavBar from './NavBar.jsx';
import HomeFeed from './HomeFeed.jsx';

import Card from './Card.jsx';
import ContainerFeed from './ContainerFeed.jsx';


const Home = (props) => {
  const location = useLocation();
  const ID = location.state;

  console.log(location)

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