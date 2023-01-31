/* eslint-disable react/prop-types */
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';

const ImageList = lazy(() => import('@mui/material/ImageList'));
const ImageListItem = lazy(() => import('@mui/material/ImageListItem'));
const Pagination = lazy(() => import('@mui/material/Pagination'));
const TextField = lazy(() => import('@mui/material/TextField'));
const OutlinedInput = lazy(() => import('@mui/material/OutlinedInput'));
const InputLabel = lazy(() => import('@mui/material/InputLabel'));
const MenuItem = lazy(() => import('@mui/material/MenuItem'));
const FormControl = lazy(() => import('@mui/material/FormControl'));
const Select = lazy(() => import('@mui/material/Select'));
const Button = lazy(() => import('@mui/material/Button'));
const ToggleButton = lazy(() => import('@mui/material/ToggleButton'));
const FilterListIcon = lazy(() => import('@mui/icons-material/FilterList'));
const Box = lazy(() => import('@mui/material/Box'));
const Chip = lazy(() => import('@mui/material/Chip'));
const ListItemText = lazy(() => import('@mui/material/ListItemText'));
const Checkbox = lazy(() => import('@mui/material/Checkbox'));
const Slider  = lazy(() => import('@mui/material/Slider'));

const ContainerFeed = lazy(() => import('./ContainerFeed.jsx'));
const PostModal = lazy(() => import('./PostModal.jsx'));

import '../stylesheets/homeFeed.scss';

const getStyles = (filter, filterName, theme) => {
  return {
    fontWeight:
      filterName.indexOf(filter) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const PrettoSlider = styled(Slider)({
  height: 6,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 18,
    width: 18,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#3D5A80',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -80%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -80%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

const filters = ['Pets', 'Smoking', 'Parking'];
const distances = [1, 2, 5, 10, 25, 50];
const postsPerPage = [2, 4, 6, 12, 24];
const bedrooms = [0, 1, 2, 3, 4]
const bathrooms = [1, 2, 3, 4]
const priceGap = 100;
const sqftGap = 50;

const HomeFeed = ({ posts, zipCode, setZipCode, distance, setDistance, filterArr, setFilterArr, priceRange, setPriceRange, sqftRange, setSqftRange, applyFilter, br, setBR, ba, setBA }) => {  
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
  
  // Toggle filter div open/closed
  const [showFilter, setShowFilter] = useState(false)

  // Set user selected posts per page
  const[numPosts, setNumPosts] = useState(6)

  // Set current page of posts to display
  const [displayPosts, setDisplayPosts] = useState(posts.slice(0, numPosts));  

  // Handle user input functions
  const handleInput = (e) => { if (e.target.value.length === 5) setZipCode(e.target.value) }
  const handleDistance = (e) => { setDistance(1609.344 * e.target.value) }
  const handlePages = (event, value) => { setDisplayPosts(posts.slice(numPosts*(value-1), numPosts*value)) }
  const handlePostsPerPage = (e) => { setNumPosts(e.target.value) }  
  const handleBR = (e) => { setBR(e.target.value) }  
  const handleBA = (e) => { setBA(e.target.value) }  

  // Dynamically update price selection based on range slider
  const handlePrice = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < 10) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 10000 - priceGap);
        setPriceRange([clamped, clamped + priceGap]);
      } else {
        const clamped = Math.max(newValue[1], priceGap);
        setPriceRange([clamped - priceGap, clamped]);
      }
    } else {
      setPriceRange(newValue);
    }
  };

  // Dynamically update price selection based on range slider
  const handleSqft = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < 10) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 3000 - sqftGap);
        setSqftRange([clamped, clamped + sqftGap]);
      } else {
        const clamped = Math.max(newValue[1], sqftGap);
        setSqftRange([clamped - sqftGap, clamped]);
      }
    } else {
      setSqftRange(newValue);
    }
  };

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
    <AnimatePresence initial={false}>
      <div key='homeFeed' className='homeFeed'>
        <div className="filter" style={{
          display: 'flex',
          flexDirection: 'row', 
          alignItems: 'center'}}>
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

          <ToggleButton
            sx={{ml:1}}
            size="small"
            value="filter"
            selected={showFilter}
            onChange={() => setShowFilter(!showFilter)}
          >
            <FilterListIcon/>
          </ToggleButton>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          { showFilter && 
            <motion.div 
              variants={{
                present: { scale: 1, opacity: 1 },
                exit: { scale: 0.8, opacity: 0 },
              }}
              initial="exit"
              animate="present"
              exit="exit"
              layout={true}>
              <div className="filter" style={{
                paddingLeft:'4px',
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row', 
                alignItems: 'center'}}>
                <Box sx={{ p:1, minWidth: 190, display: 'flex', flexDirection: 'column'}} size="small">
                  <InputLabel id="price-range-label" sx={{ fontSize: 12 }}>Price:</InputLabel>
                  <PrettoSlider
                    min={0}
                    step={10}
                    max={10000}
                    value={priceRange}
                    onChange={handlePrice}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                  <InputLabel id="sqft-range-label" sx={{ fontSize: 12 }}>SqFt:</InputLabel>
                  <PrettoSlider
                    min={200}
                    step={10}
                    max={3000}
                    value={sqftRange}
                    onChange={handleSqft}
                    valueLabelDisplay="auto"
                    disableSwap
                  />
                </Box>
                <FormControl sx={{ m: 1, minWidth: 55 }} size="small">
                  <InputLabel id="br-select-label" sx={{ fontSize: 14 }}>BR</InputLabel>
                  <Select
                    sx={{ fontSize: 14 }}
                    labelId="br-select-label"
                    id="br-select"
                    value={br}
                    onChange={handleBR}
                    input={<OutlinedInput id="br-select" label="BR"/>}
                  >
                    {bedrooms.map((opt, i) => (
                      <MenuItem key={i} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1, minWidth: 55 }} size="small">
                  <InputLabel id="ba-select-label" sx={{ fontSize: 14 }}>BA</InputLabel>
                  <Select
                    sx={{ fontSize: 14 }}
                    labelId="ba-select-label"
                    id="ba-select"
                    value={ba}
                    onChange={handleBA}
                    input={<OutlinedInput id="ba-select" label="BA"/>}
                  >
                    {bathrooms.map((opt, i) => (
                      <MenuItem key={i} value={opt}>{opt}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 200, maxWidth: 300 }} size="small">
                  <InputLabel id="filter-chip-label">Options</InputLabel>
                    <Select
                      labelId="filter-chip-label"
                      id="filter-chip"
                      multiple
                      value={filterArr}
                      onChange={handleChip}
                      input={<OutlinedInput id="select-filter" label="Options" />}
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
                <Button onClick={applyFilter}>Filter</Button>
              </div>
            </motion.div>
          }
        </Suspense>        
        <ImageList sx={{ width: '100%', height: '95%', mb:4}} cols={2} rowHeight={350}>
            {displayPosts.map((post, i) => (
              <ImageListItem key={i}>
                <ContainerFeed key={i} data={post} handleOpen={handleOpen} setPostInfo={setPostInfo} view={'user'}/>
              </ImageListItem>
            ))}
        </ImageList>
        <Pagination 
          count={Math.ceil(posts.length/numPosts)} 
          defaultPage={1} boundaryCount={2} 
          onChange={handlePages}/>
      </div>
      <PostModal key='postModal' postInfo={postInfo} open={open} handleClose={handleClose}/>
    </AnimatePresence>
  )

}

export default HomeFeed;