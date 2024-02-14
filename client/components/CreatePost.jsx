import React, { useState, useContext, useCallback } from 'react';
import { geocodeByAddress } from 'react-places-autocomplete';
import { styled, useTheme } from '@mui/material/styles';
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
import SaveIcon from '@mui/icons-material/Save';
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
import { shallow } from 'zustand/shallow';

import { isNum } from '../utils/isNum';
import { defaultFormState, usePostStore } from '../stores/post-form';

import Context from './context/Context';
import ImageGallery from './ImageGallery';
import '../stylesheets/createPost.scss';
import { Autocomplete } from './Autocomplete';

const getStyles = (filter, filterName, theme) => ({
  fontWeight:
      filterName.indexOf(filter) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
});

const genders = ['male', 'female', 'no-preference'];
const filterOptions = ['pets', 'smoking', 'parking'];

function CreatePost() {
  const theme = useTheme();
  const { userInfo, setAlert } = useContext(Context);

  const { postFormState, setPostFormState } = usePostStore((state) => ({
    postFormState: state.postFormState,
    setPostFormState: state.setPostFormState,
  }), shallow);

  const [formState, setFormState] = useState(postFormState);

  // Clear form document
  const handleClear = () => {
    setFormState(defaultFormState);
    setPostFormState(defaultFormState);
  };

  const handleStreet1Change = (address) => {
    const newAddress = { ...formState.location };
    newAddress.street1 = address;
    setFormState((prev) => ({ ...prev, location: newAddress }));
  };

  const handleStreet1 = async (address) => {
    const newAddress = { ...formState.location };
    try {
      const results = await geocodeByAddress(address);
      let i = 0;
      while (i < results[0].address_components.length) {
        const res = results[0].address_components[i];
        if (res.types.indexOf('street_number') !== -1) {
          newAddress.street1 = `${res.short_name} ${results[0].address_components[i + 1].short_name}`;
          newAddress.street2 = '';
          i += 1;
        } else if (res.types.indexOf('locality') !== -1) {
          newAddress.city = res.short_name;
        } else if (res.types.indexOf('administrative_area_level_1') !== -1) {
          newAddress.state = res.short_name;
        } else if (res.types.indexOf('postal_code') !== -1) {
          newAddress.zipCode = res.short_name;
        }
        i += 1;
      }
      setFormState((prev) => ({ ...prev, location: newAddress }));
    } catch (error) {
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error selecting street' }]);
    }
  };

  const handleStreet2 = async (e) => {
    const newAddress = { ...formState.location };
    newAddress.street2 = e.target.value;
    setFormState((prev) => ({ ...prev, location: newAddress }));
  };

  const handleCityChange = (city) => {
    const newAddress = { ...formState.location };
    newAddress.city = city;
    setFormState((prev) => ({ ...prev, location: newAddress }));
  };

  const handleCity = async (address) => {
    const newAddress = { ...formState.location };
    try {
      const results = await geocodeByAddress(address);
      let i = 0;
      while (i < results[0].address_components.length) {
        const res = results[0].address_components[i];
        if (res.types.indexOf('locality') !== -1) {
          newAddress.city = res.short_name;
        } else if (res.types.indexOf('administrative_area_level_1') !== -1) {
          newAddress.state = res.short_name;
        }
        i += 1;
      }
      newAddress.zipCode = '';
      setFormState((prev) => ({ ...prev, location: newAddress }));
    } catch (error) {
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error selecting city' }]);
    }
  };

  const handleStateChange = (state) => {
    const newAddress = { ...formState.location };
    newAddress.state = state;
    setFormState((prev) => ({ ...prev, location: newAddress }));
  };

  const handleState = async (address) => {
    const newAddress = { ...formState.location };
    try {
      const results = await geocodeByAddress(address);
      let i = 0;
      while (i < results[0].address_components.length) {
        const res = results[0].address_components[i];
        if (res.types.indexOf('administrative_area_level_1') !== -1) newAddress.state = res.short_name;
        i += 1;
      }
      newAddress.zipCode = '';
      setFormState((prev) => ({ ...prev, location: newAddress }));
    } catch (error) {
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error selecting state' }]);
    }
  };

  const handleZip = async (e) => {
    const val = e.target.value ?? null;

    if (!val || !isNum(val) || val.length > 5) return;

    const newAddress = { ...formState.location };
    newAddress.zipCode = val;
    setFormState((prev) => ({ ...prev, location: newAddress }));
  };

  const handleGender = (e) => {
    const val = e.target.value ?? null;

    if (!val) return;

    setFormState((prev) => ({ ...prev, gender: val }));
  };

  const handleDate = (val) => {
    setFormState((prev) => ({ ...prev, date: val }));
  };

  // Set filter array in Home state with each change
  const handleChip = (event) => {
    const {
      target: { value },
    } = event;

    // On autofill we get a stringified value.
    const newFilters = typeof value === 'string' ? value.split(',') : value;

    setFormState((prev) => ({ ...prev, filters: newFilters }));
  };

  const checkForm = useCallback(() => {
    const {
      location, gender, sqft, price,
    } = formState;

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

      return false;
    }

    return true;
  }, [formState, setAlert]);

  const handleSave = useCallback(() => {
    setPostFormState(formState);
    setAlert((alerts) => [...alerts, { severity: 'success', message: 'Your post has been succesfully saved' }]);
  }, [formState, setAlert, setPostFormState]);

  const handleUpload = async (e) => {
    e.preventDefault();

    const {
      location, utilities, gender, sqft, price, br, ba, filters, date, description, condition, images,
    } = formState;

    const isValidForm = checkForm();

    if (!isValidForm) return;

    let geoData;
    try {
      const geo = await Geocode.fromAddress(
        `${location.street1} ${location.city} ${location.state} ${location.zipCode}`,
      );
      const { lat, lng } = geo.results[0].geometry.location;
      geoData = { lat, lng };
    } catch (err) {
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
          pets: (filters.indexOf('pets') > -1),
          smoking: (filters.indexOf('smoking') > -1),
          parking: (filters.indexOf('parking') > -1),
          condition,
        },
        moveInDate: date,
        utilities,
        rent: price,
        bio: description,
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
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error in creating post' }]);
    }
  };

  const handleImages = useCallback((arr) => {
    setFormState((prev) => ({ ...prev, images: arr }));
  }, []);

  return (
    <div className="createPost">
      <div className="postForm">
        <ImageGallery images={formState.images} setImages={handleImages} view="create" />
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
            <Autocomplete
              label="Street Address"
              value={formState.location.street1}
              placeholder="Search streets..."
              onChange={handleStreet1Change}
              onSelect={handleStreet1}
              searchOptions={{
                componentRestrictions: { country: ['us'] },
              }}
              required
            />
            <TextField
              label="Apt, Suite, Unit, etc."
              value={formState.location.street2}
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
            <Autocomplete
              data-testid="cityInput"
              label="City"
              value={formState.location.city}
              placeholder="Search cities..."
              onChange={handleCityChange}
              onSelect={handleCity}
              searchOptions={{
                componentRestrictions: { country: ['us'] },
                types: ['locality'],
              }}
              required
            />
            <Autocomplete
              data-testid="stateInput"
              label="State"
              value={formState.location.state}
              placeholder="Search states..."
              onChange={handleStateChange}
              onSelect={handleState}
              searchOptions={{
                componentRestrictions: { country: ['us'] },
                types: ['administrative_area_level_1'],
              }}
              required
            />
            <TextField
              required
              label="Zip code"
              onChange={handleZip}
              value={formState.location.zipCode}
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
                value={formState.price}
                label="Amount"
                onChange={(e) => {
                  const val = e.target.value ?? null;

                  if (!val || !isNum(e.target.value)) return;

                  setFormState((prev) => ({ ...prev, price: e.target.value }));
                }}
                inputProps={{ style: { fontSize: 14 } }}
              />
            </FormControl>
            <FormControl sx={{ mr: 1, width: '30%' }} size="small">
              <InputLabel required htmlFor="outlined-adornment-amount">Utilities</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment sx={{ fontSize: 12 }} position="start">$</InputAdornment>}
                value={formState.utilities}
                label="Utilities"
                onChange={(e) => {
                  const val = e.target.value ?? null;

                  if (!val || !isNum(e.target.value)) return;

                  setFormState((prev) => ({ ...prev, utilities: e.target.value }));
                }}
                inputProps={{ style: { fontSize: 14 } }}
              />
            </FormControl>
            <FormControl sx={{ width: '40%' }} size="small">
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Available"
                  inputFormat="MM/DD/YYYY"
                  value={formState.date}
                  onChange={handleDate}
                  renderInput={(params) => (
                    <TextField size="small" inputProps={{ style: { fontSize: 12 } }} {...params} />
                  )}
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
              value={formState.br}
              sx={{ mr: 1, width: '100%' }}
              size="small"
              onChange={(e) => {
                const val = e.target.value ?? null;

                if (!val || !isNum(e.target.value)) return;

                setFormState((prev) => ({ ...prev, br: e.target.value }));
              }}
              inputProps={{ style: { fontSize: 14 } }}
            />
            <TextField
              required
              label="BA"
              value={formState.ba}
              sx={{ mr: 1, width: '100%' }}
              size="small"
              onChange={(e) => {
                const val = e.target.value ?? null;

                if (!val || !isNum(e.target.value)) return;

                setFormState((prev) => ({ ...prev, ba: e.target.value }));
              }}
              inputProps={{ style: { fontSize: 14 } }}
            />
            <TextField
              required
              label="sqft"
              value={formState.sqft}
              sx={{ mr: 1, width: '100%' }}
              size="small"
              onChange={(e) => {
                const val = e.target.value ?? null;

                if (!val || !isNum(e.target.value)) return;

                setFormState((prev) => ({ ...prev, sqft: e.target.value }));
              }}
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
                value={formState.gender}
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
                value={formState.filters}
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
                {filterOptions.map((filter) => (
                  <MenuItem
                    key={filter}
                    value={filter}
                    style={getStyles(filter, formState.filters, theme)}
                  >
                    <Checkbox ised={formState.filters.indexOf(filter) > -1} />
                    <ListItemText primary={filter} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </FormControl>

          <FormControl sx={{ display: 'block', m: 1 }} size="small">
            <TextField
              label="Condition"
              value={formState.condition}
              size="small"
              multiline
              minRows={1}
              maxRows={2}
              fullWidth
              onChange={(e) => setFormState((prev) => ({ ...prev, condition: e.target.value }))}
              inputProps={{ style: { fontSize: 10 } }}
              sx={{ overflowY: 'scroll' }}
            />
          </FormControl>

          <FormControl sx={{ display: 'block', m: 1 }} size="small">
            <TextField
              label="Description"
              value={formState.description}
              size="small"
              multiline
              minRows={3}
              maxRows={5}
              fullWidth
              onChange={(e) => setFormState((prev) => ({ ...prev, description: e.target.value }))}
              inputProps={{ style: { fontSize: 10 } }}
              sx={{ overflowY: 'scroll', height: '100%' }}
            />
          </FormControl>

          <ActionFormWrapper>
            <Tooltip title="Clear">
              <Button color="inherit" onClick={handleClear} size="small">
                Clear
              </Button>
            </Tooltip>
            <Tooltip title="Save">
              <Button color="inherit" onClick={handleSave} size="small">
                Save
              </Button>
            </Tooltip>
            <Tooltip title="Upload">
              <Button color="inherit" onClick={handleUpload} size="small">
                Upload
              </Button>
            </Tooltip>
          </ActionFormWrapper>

        </Paper>
      </div>
    </div>
  );
}

export default CreatePost;

const ActionFormWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
}));

