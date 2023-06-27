import React, { useMemo } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';


export const Autocomplete = ({
  label, tooltip, value, placeholder, onChange, onSelect, searchOptions, required = false,
}) => {
  const labelContent = useMemo(() => {
    if (tooltip) {
      return (
        <Tooltip title={tooltip}>
          {label}
        </Tooltip>
      );
    }

    return label;
  }, [label, tooltip]);

  return (
    <PlacesAutocomplete
      value={value}
      onChange={onChange}
      onSelect={onSelect}
      searchOptions={searchOptions}
    >
      {({
        getInputProps, suggestions, getSuggestionItemProps, loading,
      }) => (
        <AutocompleteWrapper key={`${labelContent}`}>
          <TextField
            required={required}
            label={labelContent}
            value={value}
            size="small"
            inputProps={{
              ...getInputProps({
                placeholder: placeholder || 'Search Places ...',
                className: 'location-search-input',
              }),
            }}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div className="suggestion-loading">Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';

              return (
                <div {...getSuggestionItemProps(suggestion, { className })}>
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </AutocompleteWrapper>
      )}
    </PlacesAutocomplete>
  );
};

const AutocompleteWrapper = styled('div')(() => ({
  position: 'relative',
  '.MuiTextField-root': {
    marginRight: '4px',
    width: '100%',
    '.location-search-input': {
      fontSize: 14,
    },
  },
  '.autocomplete-dropdown-container': {
    width: '100%',
    position: 'absolute',
    zIndex: 5,
    '.suggestion-loading': {
      fontSize: '12px',
      backgroundColor: 'white',
    },
    '.suggestion-item--active': {
      width: '100%',
      backgroundColor: '#e1e4e6',
      color: '#293241',
      fontWeight: '500',
      cursor: 'pointer',
      '> span': {
        fontSize: '12px',
        overflowX: 'hidden',
      },
    },
    '.suggestion-item': {
      width: '100%',
      backgroundColor: '#ffffff',
      cursor: 'pointer',
      '> span': {
        fontSize: '12px',
        overflowX: 'hidden',
      },
    },
  },
}));
