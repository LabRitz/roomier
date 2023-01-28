import React from 'react';

import ContainerFeed from './ContainerFeed.jsx';

import '../stylesheets/containerApplication.scss'

const ContainerApplications = ({ getProfilePosts, postInfo, setPostInfo, setEditMode }) => {
  const handleUpdate = (e) => {
    setPostInfo(postInfo)
    setEditMode(true)
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`/posts/${postInfo._id}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
        })
      const data = await response.json()
      if (data.deletedCount === 1) {
        alert('Post successfully removed!')
        getProfilePosts()
      }
      else alert('Unable to delete posts')
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
      <ContainerFeed 
        data={postInfo} 
        handleOpen={()=>{}} 
        setPostInfo={setPostInfo} 
        view={'profile'} 
        handleDelete={handleDelete} 
        handleUpdate={handleUpdate}
        setEditMode={setEditMode}/>
    </div>
  )
}

export default ContainerApplications;