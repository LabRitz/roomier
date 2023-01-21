import React, { Component, useState, useEffect } from 'react';

import ContainerFeed from './ContainerFeed.jsx';

import '../stylesheets/containerApplication.scss'

const ContainerApplications = ({ postInfo, setPostInfo }) => {
  const handleUpdate = (e) => {
    setPostInfo(postInfo)
  }

  const handleDelete = async (e) => {
    try {
      const app = e.target.parentNode.parentNode.parentNode.parentNode
      const response = await fetch(`/profile/${postInfo._id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
        })
      const data = await response.json()
      
      app.style.transform = 'scale(1.2)';
      setTimeout(() => {
        app.style.transform = 'scale(0.01) rotate(270deg) translateX(800px)';
        app.style.opacity = '0.2';
        app.style.height = '30%'
      }, 350)
      setTimeout(() => {
        app.style.display = 'none'
      }, 750)
    }
    catch(err) {
      console.log('Error in delete: ', err)
    }
  }

  // Toggle visibility of applicants
  const viewApplicants = (e) => {
    if (applications.length === 0) alert(`Hey dummy nobody wants to live with you! (yet) 🙃`)  
    else {
      const content = e.target.nextSibling
      if (content.style.display === 'none') {
        content.style.display = 'block'
      } else content.style.display = 'none'
    }
  }

  let applications
  if (!postInfo.applicantData) {
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
  else if (postInfo.applicantData.length === 0)  {
    applications = []
  }
  else applications = postInfo.applicantData

  // // Map applicants to dropdown container
  // const apps = applicationData.map(app => {
  //   <li>{app.firstName} {app.lastName} | {app.username}</li>
  // })

  return (
    <div className='applications'>
      <ContainerFeed data={postInfo} handleOpen={()=>{}} setPostInfo={setPostInfo} view={'profile'} handleDelete={handleDelete} handleUpdate={handleUpdate}/>

    </div>
  )
}

export default ContainerApplications;