import React, { Component } from 'react';

import Card from './Card.jsx';

import styles from '../stylesheets/containerFeed.scss'

const ContainerFeed = ({props}) => {
  // Need props to pass down user info and application info

  const applications = [];

  function handleChange(e) {
    // user as applicant to post
    // const value = e.target.value
    // fetch('/', git 
  }

  return (
    <div className='feed'>
      <Card props={props}/>
      <div className="apply">
        <input type='checkbox' className='apply' onChange={(e) => handleChange(e)}></input>
        <p>{applications.length} pending application(s)</p>
      </div>
    </div>
  )
}

export default ContainerFeed;