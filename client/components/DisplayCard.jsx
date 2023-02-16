/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

import CardActions from '@mui/material/CardActions';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import Context from './context/Context';
import { mapDisplayCardStyle } from './styles/googleMaps';

const defaultImg = 'https://mindfuldesignconsulting.com/wp-content/uploads/2017/07/Fast-Food-Restaurant-Branding-with-Interior-Design.jpg';

function DisplayCard({ postInfo }) {
  const {
    address, roommate, description, moveInDate, utilities,
    rent, bio, images, geoData, applicantData,
  } = postInfo;

  const { userInfo, setAlert } = useContext(Context);

  const [index, setIndex] = useState(0); // Index for gallery image
  const [hasApplied, setHasApplied] = useState(false);

  const handleClick = (dir) => {
    if (index + dir < 0) setIndex(images.length - 1);
    else if (index + dir > images.length - 1) setIndex(0);
    else setIndex(index + dir);
  };

  const handleApply = async () => {
    try {
      const reqBody = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        username: userInfo.username,
      };
      const response = await fetch(`/home/${postInfo._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
      });
      await response.json();
    } catch (err) {
      console.log('Error applying to post: ', err);
    }
  };

  useEffect(() => {
    if (userInfo !== '') {
      let applied = false;
      applicantData.map((applicant) => {
        if (applicant.username === userInfo.username) applied = true;
      });
      setHasApplied(applied);
    }
  }, []);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
    }}
    >
      <div style={{
        display: 'flex', flexDirection: 'row', minWidth: '300px', height: '70%',
      }}
      >
        <Paper
          elevation={0}
          sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '50%',
          }}
        >
          <CardMedia
            component="img"
            height="300"
            image={(!images[index]) ? defaultImg
              : (images[index].imgUrl === undefined) ? Object.keys(images[index])[0]
                : images[index].imgUrl}
          />
          <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <IconButton data-testid="leftImg" color="primary" onClick={() => handleClick(-1)}>
              <ArrowBackIosNewIcon fontSize="medium" />
            </IconButton>
            { hasApplied
              ? (
                <Button sx={{ mr: 1 }} onClick={handleApply} size="small" disabled={hasApplied}>
                  <Typography variant="body2">
                    Applied
                  </Typography>
                </Button>
              )
              : (
                <Tooltip title="Submit contact info">
                  <Button mr={1} onClick={handleApply} size="small" disabled={hasApplied}>
                    <Typography variant="body2" color="text.secondary">
                      Apply
                    </Typography>
                  </Button>
                </Tooltip>
              )}
            <IconButton data-testid="rightImg" color="primary" onClick={() => handleClick(1)}>
              <ArrowForwardIosIcon fontSize="medium" />
            </IconButton>
          </CardActions>
        </Paper>
        <Paper
          elevation={0}
          sx={{
            p: 3, pt: 2, pb: 1, width: '50%',
          }}
        >
          <Typography variant="h4" noWrap={false} component="div" color="text.primary">
            {`${address.street1} ${address.street2}`}
          </Typography>
          <Typography gutterBottom variant="h5" noWrap={false} component="div" color="text.primary">
            {`${address.city}, ${address.state} ${address.zipCode}`}
          </Typography>
          <Typography gutterBottom variant="h5" noWrap color="text.primary">
            {`$${rent}/mo`}
          </Typography>
          <Typography variant="h6" noWrap color="text.ternary">
            {`${description.BR}BR | ${description.BA}BA | ${description.sqFt} sqft`}
          </Typography>
          <Typography gutterBottom variant="subtitle2" noWrap color="text.primary">
            {`Available: ${new Date(moveInDate).toLocaleDateString()}`}
          </Typography>
          <Typography gutterBottom variant="body2" noWrap color="text.primary">
            {`Looking for: ${roommate.gender}`}
          </Typography>
          <Typography
            mb={0}
            variant="body1"
            noWrap={false}
            paragraph
            color="text.primary"
            sx={{
              fontSize: 12,
              height: '35%',
              overflowY: 'scroll',
            }}
          >
            {bio}
          </Typography>
        </Paper>
      </div>
      <GoogleMap
        center={{ lng: geoData?.coordinates[0], lat: geoData?.coordinates[1] }}
        mapContainerStyle={mapDisplayCardStyle}
        zoom={15}
        options={{ keyboardShortcuts: false, fullscreenControl: false }}
      >
        <Marker position={{ lng: geoData?.coordinates[0], lat: geoData?.coordinates[1] }} />
      </GoogleMap>
    </div>
  );
}

export default DisplayCard;
