import React, { Component } from 'react';

import Card from './Card.jsx';

import styles from '../stylesheets/containerFeed.scss'

const ContainerFeed = ({props}) => {

  const applications = (props.applications) ? props.applications:[]

  async function handleApply(e) {
    console.log('clicking apply')
    try {
      const { applicantData } = props
      const reqBody = {
        firstName: applicantData.firstName,
        lastName: applicantData.lastName,
        username: applicantData.username
      }

      console.log('application reqBody, ', reqBody ,'to _id', props._id)

      const response = await fetch(`/home/${props._id}`, {
          method:'POST',
          body: JSON.stringify(reqBody)
        })
      const data = await response.json();
      console.log('Response from applying to post: ', data)
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
        <p>{applications.length} pending application(s)</p>
      </div>
    </div>
  )
}

export default ContainerFeed;