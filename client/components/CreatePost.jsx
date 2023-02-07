import React, { useState } from "react";

import PlacesAutocomplete, { getLatLng, geocodeByAddress } from 'react-places-autocomplete';

import CardActions from '@mui/material/CardActions';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Geocode from "react-geocode";

import "../stylesheets/createPost.scss";

const defaultImg = 'https://mindfuldesignconsulting.com/wp-content/uploads/2017/07/Fast-Food-Restaurant-Branding-with-Interior-Design.jpg'
const genders = ['male', 'female', 'no-preference']
const filters = ['pets', 'smoking', 'parking'];

const CreatePost = ({ userInfo }) => {
  // Initialize states for
  const [imageUpload, setImageUpload] = useState(null);
  const [index, setIndex] = useState(0) // Index for gallery image
  const [imgArr, setImgArr] = useState([]);
  const [imgLoad, setImgLoad] = useState(false)

  const [location, setLocation] = useState({})
  const [geoLoc, setGeoLoc] = useState({})
  const [price, setPrice] = useState(0)
  const [utilities, setUtilities] = useState(0)
  const [br, setBR] = useState(0)
  const [ba, setBA] = useState(0)
  const [sqft, setSqft] = useState(0)
  const [date, setDate] = useState(Date.now())
  const [gender, setGender] = useState('')
  const [desc, setDesc] = useState('')
  const [pets, setPets] = useState(false)
  const [smoking, setSmoking] = useState(false)
  const [parking, setParking] = useState(false)
  const [condition, setCondition] = useState('')

  const firebaseUploadImage = async () => {
    if (imageUpload) {
      const imgPath = `images/${userInfo.username}/${imageUpload.name}`
      const imgRef = ref(storage, imgPath);
      try {
        await uploadBytes(imgRef, imageUpload);
        const imgUrl = await getDownloadURL(imgRef);
        setImgArr([...imgArr, { imgUrl: imgUrl, imgPath: imgPath }]);
        document.querySelector("#imgPreview").src = imgUrl;
      } catch (err) {
        console.log('ERROR: Cannot upload to Firebase')
      }
    } else {
      alert("No image selected");
    }
  };


  const handleStreet1Change = (address) => {
    const newAddress = {...location}
    newAddress.street1 = address
    setLocation(newAddress)
  };

  const handleStreet1 = async (address) => {
    const newAddress = {...location}
    try {
      const results = await geocodeByAddress(address)
      let i = 0
      while (i < results[0].address_components.length) {
        const res = results[0].address_components[i]
        if (res.types.indexOf('street_number') != -1) {
          newAddress.street1 = `${res.short_name} ${results[0].address_components[i+1].short_name}`
          newAddress.street2= ''
          i++
        }
        else if (res.types.indexOf('locality') != -1) newAddress.city = res.short_name
        else if (res.types.indexOf('administrative_area_level_1') != -1) newAddress.state = res.short_name
        else if (res.types.indexOf('postal_code') != -1) newAddress.zipCode = res.short_name
        i++
      }
      setLocation(newAddress)

      const geo = await getLatLng(results[0])
      setGeoLoc(geo)
    } catch(error) {
      console.error('Error selecting street', error);
    }
  };

  const handleCityChange = (city) => {
    const newAddress = {...location}
    newAddress.city = city
    setLocation(newAddress)
  };

  const handleCity = async (address) => {
    const newAddress = {...location}
    try {
      const results = await geocodeByAddress(address)
      let i = 0
      while (i < results[0].address_components.length) {
        const res = results[0].address_components[i]
        if (res.types.indexOf('locality') != -1) newAddress.city = res.short_name
        else if (res.types.indexOf('administrative_area_level_1') != -1) newAddress.state = res.short_name
        i++
      }
      newAddress.zipCode = ''
      setLocation(newAddress)
    } catch(error) {
      console.error('Error selecting city', error);
    }
  };

  const handleStateChange = (state) => {
    const newAddress = {...location}
    newAddress.state = state
    setLocation(newAddress)
  };

  const handleState = async (address) => {
    const newAddress = {...location}
    try {
      const results = await geocodeByAddress(address)
      let i = 0
      while (i < results[0].address_components.length) {
        const res = results[0].address_components[i]
        if (res.types.indexOf('administrative_area_level_1') != -1) newAddress.state = res.short_name
        i++
      }
      newAddress.zipCode = ''
      setLocation(newAddress)
    } catch(error) {
      console.error('Error selecting city', error);
    }
  };

  const handleGender = (e) => { setGender(e.target.value) }

  const handleDate = (val) => {setDate(val)}

  // Validate whether input is number
  const checkNum = (e) => {
    const regex = /^[0-9\b]+$/;
    return (e.target.value === "" || regex.test(e.target.value))
  }

  const handleClick = (dir) => {
    if (index + dir < 0) setIndex(imgArr.length - 1)
    else if (index + dir > imgArr.length - 1) setIndex(0)
    else setIndex(index + dir);
  }

  // Set filter array in Home state with each change
  // const handleChip = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   let isPets = false
  //   let isSmoking = false 
  //   let isParking = false
  //   value.split(',').forEach(el => {
  //     switch (el) {
  //       case 'pets':
  //         isPets = true
  //       case 'smoking':
  //         isSmoking = true
  //       case 'parking':
  //         isParking = true 
  //       default:
  //         return
  //     }
  //   })

  //   setPets(isPets)
  //   setSmoking(isSmoking)
  //   setParking(isParking)
  // };

  const createPostSubmissions = async (e) => {
    e.preventDefault();

    if (
      location.street1 === "" ||
      location.city === "" ||
      location.state === "" ||
      location.zipCode === "" ||
      gender === "" ||
      sqft === 0 ||
      price === 0 
    ) {
      alert("Must Require Input Fields");
    } 

    let geoData
    try {
      const geo = await Geocode.fromAddress(
        `${location.street1} ${location.city} ${location.state} ${location.zipCode}`
      );
      const { lat, lng } = geo.results[0].geometry.location;
      geoData = { lat: lat, lng: lng };
    } catch (err) {
      console.log(
        `ERROR: Unable to resolve coordinates of ${location.street1} ${location.city} ${location.state} ${location.zipCode}:`,
        err
      );
    }

    try {
      const reqBody = {
        address: {
          street1: location.street1,
          street2: location.street2,
          city: location.city,
          state: location.state,
          zipCode: location.zipCode,
        },
        roommate: { gender: gender },
        description: {
          BR: br,
          BA: ba,
          sqFt: sqft,
          pets: pets,
          smoking: smoking,
          parking: parking,
          condition: condition,
        },
        moveInDate: date,
        utilities: utilities,
        rent: price,
        bio: desc,
        userData: userInfo,
        applications: [],
        geoData: geoData,
        images: imgArr,
      };
      const res = await fetch("/createPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      })
      const data = await res.json()
      if (data) {
        console.log("SUCCESS: Created post", data);
        handleClear()
      }
    } catch (err) {
      console.log("ERROR: POST request in createPost: ", err);
    }    
  };

  // Clear form document
  const handleClear = () => {
    setLocation({})
    setGeoLoc({})
    setPrice(0)
    setUtilities(0)
    setBR(0)
    setBA(0)
    setSqft(0)
    setDate(Date.now())
    setGender('')
    setDesc('')
    setPets(false)
    setSmoking(false)
    setParking(false)
    setCondition('')
    setImgArr([]);
  }

  return (
    <div className="createPost">
      <div className='postForm'>
        <Paper elevation={0} sx={{p: 2, display:'flex', flexDirection:'column', justifyContent:'center', width:'50%'}}>
          <CardMedia
            component="img"
            height="300"
            image={(!imgArr[index]) ? defaultImg : imgArr[index]['imgUrl']}
          />
          <CardActions sx={{display: 'flex', justifyContent:'space-around'}}>
            <IconButton color="inherit" onClick={() => handleClick(-1)}>
              <ArrowBackIosNewIcon fontSize='medium'/>
            </IconButton>
            <div className="imageUpload">
              <input
                type="file"
                multiple
                onChange={(e) => setImageUpload(e.target.files[0])}
              ></input>
              <Tooltip title="Upload image">
                <Button color="inherit" onClick={firebaseUploadImage} size="small">
                  <FileUploadIcon />
                </Button>
              </Tooltip>
            </div>
            <IconButton color="inherit" onClick={() => handleClick(1)}>
              <ArrowForwardIosIcon fontSize='medium'/>
            </IconButton>
          </CardActions>
        </Paper>
        <Paper elevation={0} sx={{p:3, pt:2, pb:1, pr:1, display:'flex', flexDirection:'column', justifyContent:'center', width:'50%'}}>
          <FormControl sx={{ display: 'grid', gridTemplateColumns:'2fr 1fr', columnGap:'8px', m: 1 }} size="small">
            <PlacesAutocomplete
              value={location.street1}
              onChange={handleStreet1Change}
              onSelect={handleStreet1}
              searchOptions={{
                componentRestrictions: { country: ['us'] }
              }}
              >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <TextField
                    required
                    label="Street Address"
                    value={location.street1}
                    sx={{ mr:1, width: '100%' }}
                    size="small"
                    inputProps={{
                      ...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                      }),
                      style: {fontSize: 14}
                    }} />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                      const style = suggestion.active ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div {...getSuggestionItemProps(suggestion, { className, style })} >
                          <span style={{fontSize:'12px', overflowX:'hidden'}}>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <TextField
              label="Apt, Suite, Unit, etc."
              value={location.street2}
              inputProps={{ style: {fontSize: 14} }}
              size="small"
            />
          </FormControl>

          <FormControl sx={{ display: 'flex', flexDirection: 'row', m: 1 }} size="small">
            <PlacesAutocomplete
              data-testid='cityInput'
              value={location.city}
              onChange={handleCityChange}
              onSelect={handleCity}
              searchOptions={{
                componentRestrictions: { country: ['us'] },
                types: ['locality']
              }}
              >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <TextField
                    required
                    label="City"
                    value={location.city}
                    sx={{ mr:1 }}
                    size="small"
                    inputProps={{
                      ...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                      }),
                      style: {fontSize: 14}
                    }} />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                      const style = suggestion.active ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div {...getSuggestionItemProps(suggestion, { className, style })} >
                          <span style={{fontSize:'12px', overflowX:'hidden'}}>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>

            <PlacesAutocomplete
              value={location.state}
              onChange={handleStateChange}
              onSelect={handleState}
              searchOptions={{
                componentRestrictions: { country: ['us'] },
                types: ['administrative_area_level_1']
              }}
              >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <TextField
                    required
                    label="State"
                    value={location.state}
                    sx={{ mr:1, width:60 }}
                    size="small"
                    inputProps={{
                      ...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input',
                      }),
                      style: {fontSize: 14}
                    }} />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                      const style = suggestion.active ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div {...getSuggestionItemProps(suggestion, { className, style })} >
                          <span style={{fontSize:'12px', overflowX:'hidden'}}>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <TextField
              required
              label="Zip code"
              value={location.zipCode}
              sx={{ width:100 }}
              inputProps={{style: {fontSize: 14}}}
              size="small"
            />
          </FormControl>
        
          <FormControl sx={{ display: 'flex', flexDirection: 'row', m: 1 }} size="small">
            <FormControl sx={{ mr: 1, width: 150 }} size="small">
              <InputLabel required htmlFor="outlined-adornment-amount">Amount</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment sx={{ fontSize:12 }} position="start">$</InputAdornment>}
                value={price}
                label="Amount"
                onChange={(e) => {if (checkNum(e)) setPrice(e.target.value)}}
                inputProps={{style: {fontSize: 14}}}
                />
            </FormControl>
            <FormControl sx={{ width:200 }} size="small">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Available"
                  inputFormat="MM/DD/YYYY"
                  value={date}
                  onChange={handleDate}
                  renderInput={(params) => <TextField size="small" inputProps={{ style: {fontSize: 12} }} {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </FormControl>

          <FormControl sx={{ display: 'flex', flexDirection: 'row', m: 1 }} size="small">
            <TextField
              required
              label="BR"
              value={br}
              sx={{ mr:1, width: 50}}
              size="small"
              onChange={(e) => {if (checkNum(e)) setBR(e.target.value) }}
              inputProps={{ style: {fontSize: 14} }} />
            <TextField
              required
              label="BA"
              value={ba}
              sx={{ mr:1, width: 50}}
              size="small"
              onChange={(e) => {if (checkNum(e)) setBA(e.target.value) }}
              inputProps={{ style: {fontSize: 14} }} />
            <TextField
              required
              label="sqft"
              value={sqft}
              sx={{ mr:1, width: 70}}
              size="small"
              onChange={(e) => {if (checkNum(e)) setSqft(e.target.value) }}
              inputProps={{ style: {fontSize: 14} }} />
            <FormControl sx={{minWidth: 200 }} size="small">
              <InputLabel id="roommate-select-label" sx={{ fontSize: 14 }}>Looking for...</InputLabel>
              <Select
                labelId="roommate-select-label"
                id="roommate-select"
                sx={{ fontSize: 14, minWidth: 200 }}
                value={gender}
                onChange={handleGender}
                input={<OutlinedInput id="roommate-select" label="Looking for..."/>}
              >
                {genders.map((opt, i) => (
                  <MenuItem key={i} value={opt} sx={{ fontSize: 14 }}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl> 

            {/* <FormControl sx={{ m: 1, minWidth: 200, maxWidth: 300 }} size="small">
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
            </FormControl>       */}
          </FormControl>
          
          <FormControl sx={{ display: 'block', m:1 }} size="small">
            <TextField
              label="Condition"
              value={condition}
              size="small"
              multiline
              minRows={1}
              maxRows={2}
              fullWidth
              onChange={(e) => setCondition(e.target.value)}
              inputProps={{style: {fontSize: 10}}}
              sx={{ overflowY:'scroll' }}
            />
          </FormControl>

          <FormControl sx={{ display: 'block', m:1 }} size="small">
            <TextField
              label="Description"
              value={desc}
              size="small"
              multiline
              minRows={8}
              maxRows={12}
              fullWidth
              onChange={(e) => setDesc(e.target.value)}
              inputProps={{style: {fontSize: 10}}}
              sx={{ overflowY:'scroll', height: '100%' }}
            />
          </FormControl>

          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around', alignItems: 'center'}}>
            <Tooltip title="Clear form">
              <Button color="inherit" onClick={handleClear} size="small">
                <PlaylistRemoveIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Upload post">
              <Button color="inherit" onClick={createPostSubmissions} size="small">
                <CloudUploadIcon />
              </Button>
            </Tooltip>
          </div>

        </Paper>
      </div>
    </div>
  );
};

export default CreatePost;
