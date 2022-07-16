import React, { Component } from 'react';

import NavBar from './NavBar.jsx';
import ContainerFeed from './ContainerFeed.jsx';

const HomeFeed = ({props}) => {

  [state, setState] = useState(props)



  const feed = []
  for (let i = 0; i < state.length; i++) {
    feed.push(<ContainerFeed props={state[i]}/>)
  }

  return (
    <>
      <div className='homeFeed'>
        <NavBar />
        {feed}
      </div>
    </>
  )

}

export default HomeFeed;