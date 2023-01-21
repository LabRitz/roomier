import React, { useEffect } from 'react';
import { useState } from 'react';
import Paper from '@mui/material/Paper';
import DisplayCard from './DisplayCard.jsx';
import ContainerApplication from './ContainerApplication.jsx';

import '../stylesheets/profileFeed.scss'

const style = { 
  marginTop: '70px', 
  maxHeight:`${window.screen.height-70}`, 
  paddingLeft: '12px',
  paddingRight: '12px',
  display:'inline-grid', 
  gridTemplateColumns:'2fr 1fr', 
  columnGap:'24px',
  justifyItems:'center',
  alignItems: 'center' 
};

const ProfileFeed = ({ posts }) => {

  const [editMode, setEditMode] = useState(false)
  const [postInfo, setPostInfo] = useState({
    address:'',
    roommate:{
      gender:''
    },
    description:{
      condition:'',
      BA:0,
      BR:0,
      sqFt:0,
      pets: false,
      smoking: false,
      parking: false,
    },
    moveInDate:'',
    utilities:'',
    rent:'',
    bio:'',
    images:{'key': 'value'}
  })

  useEffect(() => {
    if (posts.length > 0) setPostInfo(posts[0])
  }, [posts])

  return (
    <div style={style}>
      <Paper elevation={0} sx={{display:'flex', alignItems: 'center', height: '50%', p:2}}>
        <DisplayCard postInfo={postInfo} view={'profile'}/> 
      </Paper>
      <div className='profileFeed'>
        {posts.map((post, i) => (
          <ContainerApplication key={i} postInfo={post} setPostInfo={setPostInfo}/>
        ))}
      </div>
    </div>
  )

}

export default ProfileFeed;