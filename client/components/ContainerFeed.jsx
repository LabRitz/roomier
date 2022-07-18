import React, { Component } from 'react';

import Card from './Card.jsx';

import styles from '../stylesheets/containerFeed.scss'

const ContainerFeed = ({props}) => {

  let applications
  if (!props.applicantData) {
    // *****DUMMY DATA******
    applications = [
      {
        firstName: 'Brennan',
        lastName: 'Lee',
        username: 'cheekyBoi@clubpenguin.com'
      },
      {
        firstName: 'Big',
        lastName: 'Addy',
        username: 'admin@garticphone.com'
      },
      {
        firstName: 'Michael',
        lastName: 'R',
        username: 'newPhone@whoDis.com'
      }
    ];
  }
  else if (props.applicantData.length === 0)  {
    applications = []
  }
  else applications = props.applicantData

  console.log('apps', applications)

  async function handleApply(e) {
    console.log('clicking apply')
    try {
      const { applicantData } = props
      const reqBody = {
        firstName: applicantData.firstName,
        lastName: applicantData.lastName,
        username: applicantData.username
      }
      const response = await fetch(`/home/${props._id}`, {
          method:'PATCH',
          headers: { 'Content-Type': 'application/json' },
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