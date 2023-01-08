import React, { Component, useState, useEffect } from 'react';

import Card from './Card.jsx';

import styles from '../stylesheets/containerFeed.scss'

const ContainerFeed = ({props}) => {
  
  const [application, setApplication] = useState(!props.applicantData ? [] : props.applicantData)
  async function handleApply(e) {
    console.log('clicking apply')
    try {
      const { applicationInfo } = props
      const reqBody = {
        firstName: applicationInfo.firstName,
        lastName: applicationInfo.lastName,
        username: applicationInfo.username
      }
      const response = await fetch(`/home/${props._id}`, {
        method:'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
      })
      const data = await response.json();
      console.log('Response from applying to post: ', data)
      if (data) setApplication([].concat(application.slice(),reqBody )); // only update if patch request is true/not error
    }
    catch(err) {
      console.log('Error applying to post: ', err)
    }
  }
  



  return (
    <div className='feed'>
      <Card props={props}/>
      <div className="apply">
        <button className='apply' onClick={(e) => handleApply(e)}>Apply</button>
        <p>{application.length} pending application(s)</p>
      </div>
    </div>
  )
}

export default ContainerFeed;