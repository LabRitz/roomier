import React, { useState, useEffect } from 'react';

import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

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
import EditCardActions from './views/EditCardActions.jsx'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const defaultImg = 'https://mindfuldesignconsulting.com/wp-content/uploads/2017/07/Fast-Food-Restaurant-Branding-with-Interior-Design.jpg'

const genders = ['male', 'female', 'no-preference']

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
  const [price, setPrice] = useState(rent)
  const [br, setBR] = useState(description.BR)
  const [ba, setBA] = useState(description.BA)
  const [sqft, setSqft] = useState(description.sqFt)
  const [date, setDate] = useState(moveInDate)
  const [gender, setGender] = useState(roommate.gender)
  const [desc, setDesc] = useState(bio)
  const [index, setIndex] = useState(0) // Index for gallery image
 
  // Update the form based on change in post choice
  useEffect(() => {
    handleUndo()
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

  const handleGender = (e) => { setGender(e.target.value) }

  const handleDate = (val) => {setDate(val)}

  // Validate whether input is number
  const checkNum = (e) => {
    const regex = /^[0-9\b]+$/;
    return (e.target.value === "" || regex.test(e.target.value))
  }

  const handleSave = async () => {

  }

  const handleUndo = () => {
    setLocation(address)
    setPrice(rent)
    setBR(description.BR)
    setBA(description.BA)
    setSqft(description.sqFt)
    setGender(roommate.gender)
    setDate(moveInDate)
    setDesc(bio)
  }

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
      <Paper elevation={0} sx={{p:3, pt:2, pb:1, pr:1, width:'50%'}}>
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
          <FormControl sx={{minWidth: 100 }} size="small">
            <InputLabel id="roommate-select-label" sx={{ fontSize: 14 }}>Looking for...</InputLabel>
            <Select
              labelId="roommate-select-label"
              id="roommate-select"
              sx={{ fontSize: 14, minWidth: 100 }}
              value={gender}
              onChange={handleGender}
              input={<OutlinedInput id="roommate-select" label="Looking for..."/>}
            >
              {genders.map((opt, i) => (
                <MenuItem key={i} value={opt} sx={{ fontSize: 14 }}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>       
        </FormControl>
        
        <FormControl sx={{ display: 'block', m:1 }} size="small">
          <TextField
            label="Description"
            value={desc}
            size="small"
            multiline
            fullWidth
            onChange={(e) => setDesc(e.target.value)}
            inputProps={{style: {fontSize: 10}}}
            sx={{ 
              overflowY:'scroll',
              height: '40%',
            }}
          />
        </FormControl>
        <EditCardActions handleSave={handleSave} handleUndo={handleUndo}/>

      </Paper>
    </div>
  )
}

export default EditCard;