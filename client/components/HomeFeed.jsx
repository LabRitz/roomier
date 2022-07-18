import React, { Component } from 'react';
import { useState } from 'react';

import ContainerFeed from './ContainerFeed.jsx';

import styles from '../stylesheets/homeFeed.scss'

const HomeFeed = ({props}) => {
  console.log('Homefeed: ', props)
  
  //Initialize state to apt array
  const [state, setState] = useState(props)
  console.log('Homefeed state:', state)

  const feed = []
  for (let i = 0; i < state.length; i++) {
    const data = Object.assign(state[i], {applicationInfo: state.userData})
    feed.push(<ContainerFeed props={data}/>)
  }

  return (
    <>
      <div className='homeFeed'>
        {feed}
      </div>
    </>
  )

}

export default HomeFeed;