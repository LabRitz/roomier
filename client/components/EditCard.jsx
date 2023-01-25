import React, { useState, useEffect } from 'react';

import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import CardActions from '@mui/material/CardActions';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';


const GoogleMapsAPIKey = "AIzaSyAdo3_P6D0eBnk6Xj6fmQ4b1pO-HHvEfOM";
const defaultImg = 'https://mindfuldesignconsulting.com/wp-content/uploads/2017/07/Fast-Food-Restaurant-Branding-with-Interior-Design.jpg'

const EditCard = ({ postInfo }) => {
  const {
    address,
    roommate,
    description,
    moveInDate,
    utilities,
    rent,
    bio,
    images,
  } = postInfo;

  const [location, setLocation] = useState(address)
  const [index, setIndex] = useState(0) // Index for gallery image
 
  // Need to update the form based on change in post choice
  useEffect(() => {
    setLocation(address)
  }, [postInfo])

  const handleClick = (dir) => {
    if (index + dir < 0) setIndex(images.length - 1)
    else if (index + dir > images.length - 1) setIndex(0)
    else setIndex(index + dir);
  }

  const handleUpload = async () => {
    // Need to include Firebase logic
  }

  const handleRemove = async () => {
    // Need logic to remove picture from image array
  }

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


  return (
    <div style={{display: 'flex', flexDirection:'row', minWidth:'300px', height:'100%'}}>
      <Paper elevation={0} sx={{display:'flex', flexDirection:'column', justifyContent:'center', width:'50%'}}>
        <CardMedia
          component="img"
          height="300"
          image={(!images[index]) ? defaultImg : Object.keys(images[index])[0]}
        />
        <CardActions sx={{display: 'flex', justifyContent:'space-evenly'}}>
          <IconButton color="inherit" onClick={() => handleClick(-1)}>
            <ArrowBackIosNewIcon fontSize='medium'/>
          </IconButton>
          <Button onClick={(e) => handleUpload(e)} size="small">Upload Image</Button>
          <Button onClick={(e) => handleRemove(e)} size="small">Remove Image</Button>
          <IconButton color="inherit" onClick={() => handleClick(1)}>
            <ArrowForwardIosIcon fontSize='medium'/>
          </IconButton>
        </CardActions>
      </Paper>
      <Paper elevation={0} sx={{p:3, pt:2, pb:1, width:'50%'}}>
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
                  value={address.street1}
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
      
        <FormControl sx={{ m: 1, width:200 }} size="small">
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment sx={{ fontSize:12 }} position="start">$</InputAdornment>}
            defaultValue={rent}
            label="Amount"
            inputProps={{style: {fontSize: 14}}}
            />
        </FormControl>
        
        <Typography variant="h6" noWrap={true} color="text.secondary">
          {description.BR}BR | {description.BA}BA | {description.sqFt} sqft
        </Typography>
        <Typography gutterBottom variant="subtitle2" noWrap={true} color="text.primary">
          Available: {new Date(moveInDate).toLocaleDateString()}
        </Typography>
        <Typography gutterBottom variant="body2" noWrap={true} color="text.primary">
          Looking for: {roommate.gender}
        </Typography>
        <TextField
          label="Description"
          defaultValue={bio}
          size="small"
          placeholder="Placeholder"
          multiline
          fullWidth
          inputProps={{style: {fontSize: 10}}}
          sx={{ 
            fontSize: 8, 
            overflowY:'scroll',
            height: '35%'
          }}
        />
      </Paper>
    </div>
  )
}

export default EditCard;