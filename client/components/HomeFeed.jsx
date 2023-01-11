/* eslint-disable react/prop-types */
import React from 'react';
import { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import ContainerFeed from './ContainerFeed.jsx';
import PostModal from './PostModal.jsx';

import styles from '../stylesheets/homeFeed.scss';

const HomeFeed = ({posts, zipCode, setZipCode, setDistance}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  // Set user's location 
  const handleInput = (val) => {
    setZipCode(val)
  }

  // Set user's max distance
  const handleDistance = (e) => {
    const meters = 1609.344 * e.target.value;
    setDistance(meters)
  }

  return (
    <>
      <div className='homeFeed'>
        <div className="filter">
          <div className="userLocation">
            <input 
              id='zipCode'
              type="number" 
              placeholder={zipCode} 
              pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$"
            ></input>
            <button onClick={() => handleInput(document.getElementById('zipCode').value)}>Submit</button>
          </div>
          <div className="distance">
            <label htmlFor="distance">Distance(mi):</label>
            <select name='distance' id='distance' onChange={handleDistance}>
              <option value={1}>1 mi</option>
              <option value={2}>2 mi</option>
              <option value={5}>5 mi</option>
              <option value={10}>10 mi</option>
            </select>
          </div>
        </div>
        <ImageList sx={{ width: '100%', height: '100%' }} cols={2} rowHeight={350}>
          {posts.map((post) => (
            <ImageListItem key={post._id}>
              <ContainerFeed key={post._id} data={post} handleOpen={handleOpen} setPostInfo={setPostInfo}/>
            </ImageListItem>
          ))}
        </ImageList>
      </div>

      <PostModal postInfo={postInfo} open={open} handleClose={handleClose}/>
    </>
  )

}

export default HomeFeed;