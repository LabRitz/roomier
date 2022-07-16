import React, { Component } from 'react';

import Card from './Card.jsx';

const ContainerFeed = (props) => {
  // Need props to pass down user info and application info

  function handleChange(e) {
    // user as applicant to post
    // const value = e.target.value
    // fetch('/', 
  }

  return (
    <div className='feed'>
      <Card props={props}/>
      <div className="apply">
        <input className='apply' onChange={(e) => handleChange(e)}></input>
        <p>{applications.length} pending application(s)</p>
      </div>
    </div>
  )

}

export default ContainerFeed;