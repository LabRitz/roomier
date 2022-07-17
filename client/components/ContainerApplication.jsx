import React, { Component } from 'react';

import Card from './Card.jsx';

import styles from '../stylesheets/containerApplication.scss'

const ContainerApplications = ({props}) => {
  // Need props to pass down user info and application info

  const applications = [];

  function handleChange(e) {
    // user as applicant to post
    // const value = e.target.value
    // fetch('/', git 
  }

  return (
    <div className='applications'>
      <Card props={props}/>
      <div className="apply">
        <p>{applications.length} pending application(s)</p>
      </div>
    </div>
  )
}

export default ContainerApplications;