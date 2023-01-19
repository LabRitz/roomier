/* eslint-disable react/prop-types */
import React from 'react';
import { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Pagination from '@mui/material/Pagination';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import { AnimatePresence } from 'framer-motion';

import ContainerFeed from './ContainerFeed.jsx';
import PostModal from './PostModal.jsx';

import styles from '../stylesheets/homeFeed.scss';

function getStyles(filter, filterName, theme) {
  return {
    fontWeight:
      filterName.indexOf(filter) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const filters = [
  'Pets',
  'Smoking',
  'Parking',
];
const distances = [1, 2, 5, 10, 25, 50];
const postsPerPage = [2, 4, 6, 12, 24];

const HomeFeed = ({ posts, zipCode, setZipCode, distance, setDistance, filterArr, setFilterArr }) => {  
  const theme = useTheme();

  // Handlers for post modal open and close
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  // Filter states
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(0)
  const [minSqft, setMinSqft] = useState(0)
  const [maxSqft, setMaxSqft] = useState(0)
  const [minBR, setMinBR] = useState(0)
  const [minBA, setMinBA] = useState(0)

  // Set user selected posts per page
  const[numPosts, setNumPosts] = useState(6)

  // Set current page of posts to display
  const [displayPosts, setDisplayPosts] = useState(posts.slice(0, numPosts));  

  // Handle user input functions
  const handleInput = (e) => { if (e.target.value.length === 5) setZipCode(e.target.value) }
  const handleDistance = (e) => { setDistance(1609.344 * e.target.value) }
  const handlePages = (event, value) => { setDisplayPosts(posts.slice(numPosts*(value-1), numPosts*value)) }
  const handlePostsPerPage = (e) => { setNumPosts(e.target.value) }

  // Set filter array in Home state with each change
  const handleChip = (event) => {
    const {
      target: { value },
    } = event;
    setFilterArr(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  // Render posts in each page on load or filter change
  useEffect(() => {
    setDisplayPosts(posts.slice(0, numPosts))
  }, [posts, numPosts])

  return (
    <>
      <div className='homeFeed'>
        <div className="filter">
          <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
            {(posts.length > 0) ? (
              <TextField
                id="zipCode"
                label="Zipcode"
                defaultValue={zipCode}
                onChange={handleInput}
                size="small"
                inputProps={{ 
                  inputMode: 'numeric', 
                  pattern: '^\d{5}(?:[-\s]\d{4})?$' 
                }}
              /> ) : (
              <TextField
                error
                id="zipCode"
                label="Zipcode"
                defaultValue={zipCode}
                onChange={handleInput}
                helperText="No results"
                size="small"
              /> )}  
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
            <InputLabel id="distance-select-label" sx={{ fontSize: 14 }}>Distance (mi)</InputLabel>
            <Select
              labelId="distance-select-label"
              id="distance-select"
              value={Math.round(distance/1609.344)}
              onChange={handleDistance}
              input={<OutlinedInput id="distance-select" label="Distance (mi)"/>}
            >
              {distances.map((dist, i) => (
                <MenuItem key={i} value={dist}>{dist} mi</MenuItem>
              ))}
            </Select>
          </FormControl>
         
          <FormControl sx={{ m: 1, minWidth: 200, maxWidth: 300 }} size="small">
            <InputLabel id="filter-chip-label">Filter</InputLabel>
              <Select
                labelId="filter-chip-label"
                id="filter-chip"
                multiple
                value={filterArr}
                onChange={handleChip}
                input={<OutlinedInput id="select-filter" label="Filter" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.25 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
              {filters.map((filter) => (
                <MenuItem
                  key={filter}
                  value={filter}
                  style={getStyles(filter, filterArr, theme)}
                >
                  <Checkbox checked={filterArr.indexOf(filter) > -1} />
                  <ListItemText primary={filter} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>   

          <FormControl sx={{ m: 1, minWidth: 70 }} size="small">
            <InputLabel id="ppp-select-label" sx={{ fontSize: 14 }}># of Posts</InputLabel>
            <Select
              labelId="ppp-select-label"
              id="ppp-select"
              value={numPosts}
              onChange={handlePostsPerPage}
              input={<OutlinedInput id="ppp-select" label="# of Posts"/>}
            >
              {postsPerPage.map((opt, i) => (
                <MenuItem key={i} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <ImageList sx={{ width: '100%', height: '100%', mb:4}} cols={2} rowHeight={350}>
          <AnimatePresence initial={false}>
            {displayPosts.map((post) => (
              <ImageListItem key={post._id}>
                <ContainerFeed key={post._id} data={post} handleOpen={handleOpen} setPostInfo={setPostInfo}/>
              </ImageListItem>
            ))}
          </AnimatePresence>
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