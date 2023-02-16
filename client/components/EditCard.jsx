import React, { useState, useEffect, useContext } from 'react';

import PlacesAutocomplete, { getLatLng, geocodeByAddress } from 'react-places-autocomplete';

import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import EditCardActions from './views/EditCardActions';
import ImageGallery from './ImageGallery';
import Context from './context/Context';

const genders = ['male', 'female', 'no-preference'];

function EditCard({ postInfo, getProfilePosts }) {
  const {
    _id,
    address,
    roommate,
    description,
    moveInDate,
    utilities,
    rent,
    bio,
    geoData,
    images,
    condition,
  } = postInfo;

  const { setAlert } = useContext(Context);

  const [location, setLocation] = useState(address);
  const [price, setPrice] = useState(rent);
  const [util, setUtil] = useState(utilities);
  const [br, setBR] = useState(description.BR);
  const [ba, setBA] = useState(description.BA);
  const [sqft, setSqft] = useState(description.sqFt);
  const [date, setDate] = useState(moveInDate);
  const [gender, setGender] = useState(roommate.gender);
  const [cond, setCond] = useState(condition);
  const [desc, setDesc] = useState(bio);
  const [geoLoc, setGeoLoc] = useState(geoData);
  const [imgArr, setImgArr] = useState(images);

  // Validate whether input is number
  const checkNum = (e) => {
    const regex = /^[0-9\b]+$/;
    return (e.target.value === '' || regex.test(e.target.value));
  };

  const handleStreet1Change = (value) => {
    const newAddress = { ...location };
    newAddress.street1 = value;
    setLocation(newAddress);
  };

  const handleStreet1 = async (value) => {
    const newAddress = { ...location };
    try {
      const results = await geocodeByAddress(value);
      let i = 0;
      while (i < results[0].address_components.length) {
        const res = results[0].address_components[i];
        if (res.types.indexOf('street_number') !== -1) {
          newAddress.street1 = `${res.short_name} ${results[0].address_components[i + 1].short_name}`;
          newAddress.street2 = '';
          i += 1;
        } else if (res.types.indexOf('locality') !== -1) newAddress.city = res.short_name;
        else if (res.types.indexOf('administrative_area_level_1') !== -1) newAddress.state = res.short_name;
        else if (res.types.indexOf('postal_code') !== -1) newAddress.zipCode = res.short_name;
        i += 1;
      }
      setLocation(newAddress);

      const geo = await getLatLng(results[0]);
      setGeoLoc(geo);
    } catch (error) {
      console.error('Error selecting street', error);
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error occurred while fetching addresses' }]);
    }
  };

  const handleStreet2 = async (e) => {
    const newAddress = { ...location };
    newAddress.street2 = e.target.value;
    setLocation(newAddress);
  };

  const handleCityChange = (city) => {
    const newAddress = { ...location };
    newAddress.city = city;
    setLocation(newAddress);
  };

  const handleCity = async (value) => {
    const newAddress = { ...location };
    try {
      const results = await geocodeByAddress(value);
      let i = 0;
      while (i < results[0].address_components.length) {
        const res = results[0].address_components[i];
        if (res.types.indexOf('locality') !== -1) newAddress.city = res.short_name;
        else if (res.types.indexOf('administrative_area_level_1') !== -1) newAddress.state = res.short_name;
        i += 1;
      }
      newAddress.zipCode = '';
      setLocation(newAddress);
    } catch (error) {
      console.error('Error selecting city', error);
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error occurred while fetching cities' }]);
    }
  };

  const handleStateChange = (state) => {
    const newAddress = { ...location };
    newAddress.state = state;
    setLocation(newAddress);
  };

  const handleState = async (value) => {
    const newAddress = { ...location };
    try {
      const results = await geocodeByAddress(value);
      let i = 0;
      while (i < results[0].address_components.length) {
        const res = results[0].address_components[i];
        if (res.types.indexOf('administrative_area_level_1') !== -1) newAddress.state = res.short_name;
        i += 1;
      }
      newAddress.zipCode = '';
      setLocation(newAddress);
    } catch (error) {
      console.error('Error selecting state', error);
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error occurred while fetching states' }]);
    }
  };

  const handleZip = async (e) => {
    if (!checkNum(e) || e.target.value.length > 5) return;
    const newAddress = { ...location };
    newAddress.zipCode = e.target.value;
    setLocation(newAddress);
  };

  const handleGender = (e) => { setGender(e.target.value); };

  const handleDate = (val) => { setDate(val); };

  const handleSave = async () => {
    const reqBody = {
      address: location,
      rent: price,
      roommate: { gender },
      description: {
        BR: br,
        BA: ba,
        sqFt: sqft,
      },
      moveInDate: date,
      bio: desc,
      geoData: geoLoc,
    };

    try {
      const res = await fetch(`/posts/update/${postInfo._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
      });
      const data = await res.json();
      if (data) {
        getProfilePosts();
        setAlert((alerts) => [...alerts, { severity: 'success', message: 'Successfully updated post' }]);
      } else setAlert((alerts) => [...alerts, { severity: 'error', message: 'Could not update post' }]);
    } catch (err) {
      console.log('ERROR: Cannot save updated post');
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error occurred while updating post' }]);
    }
  };

  const handleUndo = () => {
    setLocation(address);
    setPrice(rent);
    setBR(description.BR);
    setBA(description.BA);
    setSqft(description.sqFt);
    setGender(roommate.gender);
    setDate(moveInDate);
    setDesc(bio);
    setGeoLoc(geoData);
    setImgArr(images);
  };

  // Update the form based on change in post choice
  useEffect(() => {
    handleUndo();
  }, [postInfo]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'row', minWidth: '300px', height: '100%',
    }}
    >
      <ImageGallery images={imgArr} setImages={setImgArr} view="edit" postId={_id} />
      <Paper elevation={0} sx={{ p: 1, width: '50%' }}>
        <FormControl
          sx={{
            display: 'grid', gridTemplateColumns: '2fr 1fr', columnGap: '8px', m: 1,
          }}
          size="small"
        >
          <PlacesAutocomplete
            value={location.street1}
            onChange={handleStreet1Change}
            onSelect={handleStreet1}
            searchOptions={{
              componentRestrictions: { country: ['us'] },
            }}
          >
            {({
              getInputProps, suggestions, getSuggestionItemProps, loading,
            }) => (
              <div style={{ position: 'relative' }}>
                <TextField
                  required
                  label="Street Address"
                  value={address.street1}
                  sx={{ mr: 1, width: '100%' }}
                  size="small"
                  inputProps={{
                    ...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input',
                    }),
                    style: { fontSize: 14 },
                  }}
                />
                <div className="autocomplete-dropdown-container" style={{ width: '100%', position: 'absolute', zIndex: 5 }}>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    const style = suggestion.active ? {
                      width: '100%', backgroundColor: '#e1e4e6', color: '#293241', fontWeight: '500', cursor: 'pointer',
                    }
                      : { width: '100%', backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div {...getSuggestionItemProps(suggestion, { className, style })}>
                        <span style={{ fontSize: '12px', overflowX: 'hidden' }}>{suggestion.description}</span>
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
            onChange={handleStreet2}
            inputProps={{ style: { fontSize: 14 } }}
            size="small"
          />
        </FormControl>

        <FormControl
          sx={{
            display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', columnGap: '8px', m: 1,
          }}
          size="small"
        >
          <PlacesAutocomplete
            data-testid="cityInput"
            value={location.city}
            onChange={handleCityChange}
            onSelect={handleCity}
            searchOptions={{
              componentRestrictions: { country: ['us'] },
              types: ['locality'],
            }}
          >
            {({
              getInputProps, suggestions, getSuggestionItemProps, loading,
            }) => (
              <div style={{ position: 'relative' }}>
                <TextField
                  required
                  label="City"
                  value={location.city}
                  sx={{ mr: 1, width: '100%' }}
                  size="small"
                  inputProps={{
                    ...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input',
                    }),
                    style: { fontSize: 14 },
                  }}
                />
                <div className="autocomplete-dropdown-container" style={{ width: '100%', position: 'absolute', zIndex: 5 }}>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    const style = suggestion.active ? {
                      width: '100%', backgroundColor: '#e1e4e6', color: '#293241', fontWeight: '500', cursor: 'pointer',
                    }
                      : { width: '100%', backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div {...getSuggestionItemProps(suggestion, { className, style })}>
                        <span style={{ fontSize: '12px', overflowX: 'hidden' }}>{suggestion.description}</span>
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
              types: ['administrative_area_level_1'],
            }}
          >
            {({
              getInputProps, suggestions, getSuggestionItemProps, loading,
            }) => (
              <div style={{ position: 'relative' }}>
                <TextField
                  required
                  label="State"
                  value={location.state}
                  sx={{ mr: 1, width: '100%' }}
                  size="small"
                  inputProps={{
                    ...getInputProps({
                      placeholder: 'Search Places ...',
                      className: 'location-search-input',
                    }),
                    style: { fontSize: 14 },
                  }}
                />
                <div className="autocomplete-dropdown-container" style={{ width: '100%', position: 'absolute', zIndex: 5 }}>
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                    const style = suggestion.active ? {
                      width: '100%', backgroundColor: '#e1e4e6', color: '#293241', fontWeight: '500', cursor: 'pointer',
                    }
                      : { width: '100%', backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div {...getSuggestionItemProps(suggestion, { className, style })}>
                        <span style={{ fontSize: '12px', overflowX: 'hidden' }}>{suggestion.description}</span>
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
            onChange={handleZip}
            value={location.zipCode}
            sx={{ width: 100 }}
            inputProps={{ style: { fontSize: 14 } }}
            size="small"
          />
        </FormControl>

        <FormControl sx={{ display: 'flex', flexDirection: 'row', m: 1 }} size="small">
          <FormControl sx={{ mr: 1, width: '30%' }} size="small">
            <InputLabel required htmlFor="outlined-adornment-amount">Amount</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment sx={{ fontSize: 12 }} position="start">$</InputAdornment>}
              value={price}
              label="Amount"
              onChange={(e) => { if (checkNum(e)) setPrice(e.target.value); }}
              inputProps={{ style: { fontSize: 14 } }}
            />
          </FormControl>
          <FormControl sx={{ mr: 1, width: '30%' }} size="small">
            <InputLabel required htmlFor="outlined-adornment-amount">Utilities</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              startAdornment={<InputAdornment sx={{ fontSize: 12 }} position="start">$</InputAdornment>}
              value={util}
              label="Utilities"
              onChange={(e) => { if (checkNum(e)) setUtil(e.target.value); }}
              inputProps={{ style: { fontSize: 14 } }}
            />
          </FormControl>
          <FormControl sx={{ width: '40%' }} size="small">
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label="Available"
                inputFormat="MM/DD/YYYY"
                value={date}
                onChange={handleDate}
                renderInput={(params) => <TextField size="small" inputProps={{ style: { fontSize: 12 } }} {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </FormControl>

        <FormControl sx={{ display: 'flex', flexDirection: 'row', m: 1 }} size="small">
          <TextField
            required
            label="BR"
            value={br}
            sx={{ mr: 1, width: 50 }}
            size="small"
            onChange={(e) => { if (checkNum(e)) setBR(e.target.value); }}
            inputProps={{ style: { fontSize: 14 } }}
          />
          <TextField
            required
            label="BA"
            value={ba}
            sx={{ mr: 1, width: 50 }}
            size="small"
            onChange={(e) => { if (checkNum(e)) setBA(e.target.value); }}
            inputProps={{ style: { fontSize: 14 } }}
          />
          <TextField
            required
            label="sqft"
            value={sqft}
            sx={{ mr: 1, width: 70 }}
            size="small"
            onChange={(e) => { if (checkNum(e)) setSqft(e.target.value); }}
            inputProps={{ style: { fontSize: 14 } }}
          />
          <FormControl sx={{ minWidth: 100 }} size="small">
            <InputLabel id="roommate-select-label" sx={{ fontSize: 14 }}>Looking for...</InputLabel>
            <Select
              labelId="roommate-select-label"
              id="roommate-select"
              sx={{ fontSize: 14, minWidth: 100 }}
              value={gender}
              onChange={handleGender}
              input={<OutlinedInput id="roommate-select" label="Looking for..." />}
            >
              {genders.map((opt, i) => (
                <MenuItem key={i} value={opt} sx={{ fontSize: 14 }}>{opt}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </FormControl>

        <FormControl sx={{ display: 'block', m: 1 }} size="small">
          <TextField
            label="Condition"
            value={cond}
            size="small"
            multiline
            minRows={1}
            maxRows={2}
            fullWidth
            onChange={(e) => setCond(e.target.value)}
            inputProps={{ style: { fontSize: 10 } }}
            sx={{ overflowY: 'scroll' }}
          />
        </FormControl>

        <FormControl sx={{ display: 'block', m: 1 }} size="small">
          <TextField
            label="Description"
            value={desc}
            size="small"
            multiline
            minRows={3}
            maxRows={5}
            fullWidth
            onChange={(e) => setDesc(e.target.value)}
            inputProps={{ style: { fontSize: 10 } }}
            sx={{ overflowY: 'scroll', height: '35%' }}
          />
        </FormControl>

        <EditCardActions handleSave={handleSave} handleUndo={handleUndo} />

      </Paper>
    </div>
  );
}

export default EditCard;
