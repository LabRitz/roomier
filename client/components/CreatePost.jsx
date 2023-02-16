import React, { useState, useContext } from 'react';

import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import Box from '@mui/system/Box';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import Geocode from 'react-geocode';

import Context from './context/Context';
import ImageGallery from './ImageGallery';

import '../stylesheets/createPost.scss';

const getStyles = (filter, filterName, theme) => ({
  fontWeight:
      filterName.indexOf(filter) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
});

const genders = ['male', 'female', 'no-preference'];
const filters = ['pets', 'smoking', 'parking'];

function CreatePost() {
  const theme = useTheme();
  const { userInfo, setAlert } = useContext(Context);

  const [location, setLocation] = useState({
    street1: '',
    street2: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [price, setPrice] = useState(0);
  const [utilities, setUtilities] = useState(0);
  const [br, setBR] = useState(0);
  const [ba, setBA] = useState(0);
  const [sqft, setSqft] = useState(0);
  const [date, setDate] = useState(Date.now());
  const [gender, setGender] = useState('');
  const [desc, setDesc] = useState('');
  const [filterArr, setFilterArr] = useState([]);
  const [condition, setCondition] = useState('');
  const [images, setImages] = useState([]);

  // Validate whether input is number
  const checkNum = (e) => {
    const regex = /^[0-9\b]+$/;
    return (e.target.value === '' || regex.test(e.target.value));
  };

  // Clear form document
  const handleClear = () => {
    setLocation({
      street1: '',
      street2: '',
      city: '',
      state: '',
      zipCode: '',
    });
    setPrice(0);
    setUtilities(0);
    setBR(0);
    setBA(0);
    setSqft(0);
    setDate(Date.now());
    setGender('');
    setDesc('');
    setCondition('');
    setFilterArr([]);
    setImages([]);
  };

  const handleStreet1Change = (address) => {
    const newAddress = { ...location };
    newAddress.street1 = address;
    setLocation(newAddress);
  };

  const handleStreet1 = async (address) => {
    const newAddress = { ...location };
    try {
      const results = await geocodeByAddress(address);
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
    } catch (error) {
      console.error('Error selecting street', error);
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

  const handleCity = async (address) => {
    const newAddress = { ...location };
    try {
      const results = await geocodeByAddress(address);
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
    }
  };

  const handleStateChange = (state) => {
    const newAddress = { ...location };
    newAddress.state = state;
    setLocation(newAddress);
  };

  const handleState = async (address) => {
    const newAddress = { ...location };
    try {
      const results = await geocodeByAddress(address);
      let i = 0;
      while (i < results[0].address_components.length) {
        const res = results[0].address_components[i];
        if (res.types.indexOf('administrative_area_level_1') !== -1) newAddress.state = res.short_name;
        i += 1;
      }
      newAddress.zipCode = '';
      setLocation(newAddress);
    } catch (error) {
      console.error('Error selecting city', error);
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error selecting city' }]);
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

  // Set filter array in Home state with each change
  const handleChip = (event) => {
    const {
      target: { value },
    } = event;
    setFilterArr(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const createPostSubmissions = async (e) => {
    e.preventDefault();

    if (
      location.street1 === ''
      || location.city === ''
      || location.state === ''
      || location.zipCode === ''
      || gender === ''
      || sqft === 0
      || price === 0
    ) {
      setAlert((alerts) => [...alerts, { severity: 'warn', message: 'Must provide the required fields' }]);
    }

    let geoData;
    try {
      const geo = await Geocode.fromAddress(
        `${location.street1} ${location.city} ${location.state} ${location.zipCode}`,
      );
      const { lat, lng } = geo.results[0].geometry.location;
      geoData = { lat, lng };
    } catch (err) {
      console.log(
        `ERROR: Unable to resolve coordinates of ${location.street1} ${location.city} ${location.state} ${location.zipCode}:`,
        err,
      );
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Unable to resolve coordinates' }]);
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
        roommate: { gender },
        description: {
          BR: br,
          BA: ba,
          sqFt: sqft,
          pets: (filterArr.indexOf('pets') > -1),
          smoking: (filterArr.indexOf('smoking') > -1),
          parking: (filterArr.indexOf('parking') > -1),
          condition,
        },
        moveInDate: date,
        utilities,
        rent: price,
        bio: desc,
        userData: userInfo,
        applications: [],
        geoData,
        images,
      };
      const res = await fetch('/createPost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
      });
      const data = await res.json();
      if (data) {
        setAlert((alerts) => [...alerts, { severity: 'success', message: 'Your post has been succesfully uploaded' }]);
        handleClear();
      }
    } catch (err) {
      console.log('ERROR: POST request in createPost: ', err);
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error in creating post' }]);
    }
  };

  return (
    <div className="createPost">
      <div className="postForm">
        <ImageGallery images={images} setImages={setImages} view="create" />
        <Paper
          elevation={0}
          sx={{
            p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '50%',
          }}
        >
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
                    value={location.street1}
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
              sx={{ width: '100%' }}
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
                value={utilities}
                label="Utilities"
                onChange={(e) => { if (checkNum(e)) setUtilities(e.target.value); }}
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

          <FormControl
            sx={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 3fr', columnGap: '8px', m: 1,
            }}
            size="small"
          >
            <TextField
              required
              label="BR"
              value={br}
              sx={{ mr: 1, width: '100%' }}
              size="small"
              onChange={(e) => { if (checkNum(e)) setBR(e.target.value); }}
              inputProps={{ style: { fontSize: 14 } }}
            />
            <TextField
              required
              label="BA"
              value={ba}
              sx={{ mr: 1, width: '100%' }}
              size="small"
              onChange={(e) => { if (checkNum(e)) setBA(e.target.value); }}
              inputProps={{ style: { fontSize: 14 } }}
            />
            <TextField
              required
              label="sqft"
              value={sqft}
              sx={{ mr: 1, width: '100%' }}
              size="small"
              onChange={(e) => { if (checkNum(e)) setSqft(e.target.value); }}
              inputProps={{ style: { fontSize: 14 } }}
            />
          </FormControl>

          <FormControl
            sx={{
              m: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '8px',
            }}
            size="small"
          >
            <FormControl sx={{ width: '100%' }} size="small">
              <InputLabel id="roommate-select-label" sx={{ fontSize: 14 }}>Looking for...</InputLabel>
              <Select
                labelId="roommate-select-label"
                id="roommate-select"
                sx={{ fontSize: 14 }}
                value={gender}
                onChange={handleGender}
                input={<OutlinedInput id="roommate-select" label="Looking for..." />}
              >
                {genders.map((opt, i) => (
                  <MenuItem key={i} value={opt} sx={{ fontSize: 14 }}>{opt}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ width: '100%' }} size="small">
              <InputLabel id="filter-chip-label">Options</InputLabel>
              <Select
                labelId="filter-chip-label"
                id="filter-chip"
                multiple
                value={filterArr}
                onChange={handleChip}
                sx={{ fontSize: 14, width: '100%' }}
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
          </FormControl>

          <FormControl sx={{ display: 'block', m: 1 }} size="small">
            <TextField
              label="Condition"
              value={condition}
              size="small"
              multiline
              minRows={1}
              maxRows={2}
              fullWidth
              onChange={(e) => setCondition(e.target.value)}
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
              sx={{ overflowY: 'scroll', height: '100%' }}
            />
          </FormControl>

          <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
          }}
          >
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
}

export default CreatePost;
