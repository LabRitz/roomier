/* eslint-disable react/prop-types */
import React from 'react';
import { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Pagination from '@mui/material/Pagination';

import ContainerFeed from './ContainerFeed.jsx';
import PostModal from './PostModal.jsx';

import styles from '../stylesheets/homeFeed.scss';

const distances = [1, 2, 5, 10];
const postsPerPage = [2, 4, 6, 12];

const HomeFeed = ({posts, zipCode, setZipCode, distance, setDistance}) => {  
  // Handlers for post modal open and close
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Set user selected posts per page
  const[numPosts, setNumPosts] = useState(6)

  // Set current page of posts to display
  const [displayPosts, setDisplayPosts] = useState(posts.slice(0, numPosts));
  
  // Set Post infor for modal display
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

  // Handle pagination
  const handlePages = (event, value) => {
    setDisplayPosts(posts.slice(numPosts*(value-1), numPosts*value))
  }

   // Handle pagination
   const handlePostsPerPage = (e) => {
    setNumPosts(e.target.value)
  }

  // Render posts in each page on load or filter change
  useEffect(() => {
    setDisplayPosts(posts.slice(0, numPosts))
  }, [posts, numPosts])

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
            <select name='distance' id='distance' defaultValue={Math.round(distance/1609.344)} onChange={handleDistance}>
              {distances.map(dist => (
                 <option value={dist}>{dist} mi</option>
              ))}
            </select>
          </div>
          <div className="postsPerPage">
            <label htmlFor="postsPerPage">Posts per page:</label>
            <select name='postsPerPage' id='postsPerPage' defaultValue={6} onChange={handlePostsPerPage}>
              {postsPerPage.map(opt => (
                <option value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>
        <ImageList sx={{ width: '100%', height: '100%' }} cols={2} rowHeight={350}>
          {displayPosts.map((post) => (
            <ImageListItem key={post._id}>
              <ContainerFeed key={post._id} data={post} handleOpen={handleOpen} setPostInfo={setPostInfo}/>
            </ImageListItem>
          ))}
        </ImageList>
        <Pagination 
          count={Math.ceil(posts.length/numPosts)} 
          defaultPage={1} boundaryCount={2} 
          onChange={handlePages}/>
      </div>

      <PostModal postInfo={postInfo} open={open} handleClose={handleClose}/>
    </>
  )

}

export default HomeFeed;