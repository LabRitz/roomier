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
        <ContainerFeed />
        {/* <HomeFeed props={props}/> */}
      </div>
    </>
  )

}

export default Home;