import React, { Component, useState, useEffect } from 'react';

import Card from './Card.jsx';

import styles from '../stylesheets/containerApplication.scss'

const ContainerApplications = ({props}) => {
  function handleUpdate() {
    alert(`haha that tickles @${props._id}`)
    // do something
    // pls
  }

  function handleDelete() {
    fetch(`/profile/${props_id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
      })
      .then(data => data.json())
      .then(formattedData => {
        // TODO
        console.log(formattedData)
      })
      .catch(err => console.log('Error in delete: ', err))
  }

  // Toggle visibility of applicants
  function viewApplicants(e) {
    const content = e.target.nextSibling
    if (content.style.display === 'none') {
      content.style.display = 'block'
    } else content.style.display = 'none'
  }
  
  let applications
  if (props.applications === undefined) {
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
  else if (props.applications.length === 0)  {
    console.log(`Hey dummy nobody wants to live with you (yet)`)  
  }
  else applications = props.applications

  // Map applicants to dropdown container
  const apps = applications.map(app => {
    <li>{app.firstName} {app.lastName} | {app.username}</li>
  })

  return (
    <div className='applications'>
      <Card props={props}/>
      <div className="apply">
        <div className="buttons">
          <button className='update' onClick={() => handleUpdate()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
              <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
            </svg>
          </button>
          <button className='delete' onClick={() => handleDelete()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
        <div className="dropdown">
          <button onClick={(e) => viewApplicants(e)}>{applications.length} application(s)</button>
          <ul className="dropdown-applicants">
            {applications.map(app => (
              <li>{app.firstName} {app.lastName} <br/> {app.username}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ContainerApplications;