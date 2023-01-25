import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import DisplayCard from './DisplayCard.jsx';
import ContainerApplication from './ContainerApplication.jsx';
import EditCard from './EditCard.jsx'

import '../stylesheets/profileFeed.scss'

const style = { 
  marginTop: '70px', 
  height:`${parseInt(window.innerHeight) - 70}px`, 
  paddingLeft: '12px',
  paddingRight: '12px',
  display:'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows:'55% 45%', 
  rowGap:'12px',
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
      <Paper elevation={0} 
        sx={{
          display:'flex', 
          alignItems: 'center', 
          height:'90%',
          width:'50%',
          minWidth:'750px',
          mt:4,
          p:2 }} >
        {(editMode) ? <EditCard postInfo={postInfo}/> : <DisplayCard postInfo={postInfo} view={'profile'}/>}
      </Paper>
      <div className='profileFeed'>
        {posts.map((post, i) => (
          <ContainerApplication key={i} postInfo={post} setPostInfo={setPostInfo} setEditMode={setEditMode}/>
        ))}
      </div>
    </div>
  )

}

export default ProfileFeed;