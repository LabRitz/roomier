import React from 'react';

import ContainerFeed from './ContainerFeed.jsx';

import '../stylesheets/containerApplication.scss'

const ContainerApplications = ({ getProfilePosts, postInfo, setPostInfo, setEditMode }) => {
  const handleUpdate = () => {
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

  return (
    <div className='applications'>
      <ContainerFeed 
        data={postInfo} 
        setPostInfo={setPostInfo} 
        view={'profile'} 
        handleDelete={handleDelete} 
        handleUpdate={handleUpdate}
        setEditMode={setEditMode}/>
    </div>
  )
}

export default ContainerApplications;