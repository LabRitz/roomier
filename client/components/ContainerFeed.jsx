import React, { useState } from 'react';
import Card from '@mui/material/Card';
import { Button, CardActions } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';

import styles from '../stylesheets/containerFeed.scss'

const ContainerFeed = ({ data, handleOpen, setPostInfo }) => {
  const {
    address,
    description,
    rent,
    images
  } = data;

  const defaultImg = 'https://mindfuldesignconsulting.com/wp-content/uploads/2017/07/Fast-Food-Restaurant-Branding-with-Interior-Design.jpg'

  const handleClick = () => {
    setPostInfo(data)
    handleOpen()
  }

  const [application, setApplication] = useState(!data.applicantData ? [] : data.applicantData)
  async function handleApply(e) {
    try {
      const { applicationInfo } = data
      const reqBody = {
        firstName: applicationInfo.firstName,
        lastName: applicationInfo.lastName,
        username: applicationInfo.username
      }
      const response = await fetch(`/home/${props._id}`, {
        method:'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
      })
      const data = await response.json();
      if (data) setApplication([].concat(application.slice(),reqBody )); // only update if patch request is true/not error
    }
    catch(err) {
      console.log('Error applying to post: ', err)
    }
  }

  return (
    <Card sx={{ maxWidth: 480, m: 1, p:0}}>
      <CardContent onClick={handleClick}>
        <CardMedia
          sx={{ height: 180 }}
          image={(!images[0]) ? defaultImg : Object.keys(images[0])[0]}
        />
        <Typography gutterBottom variant="h5" noWrap='true' component="div" color="text.darkBlue">
          ${rent}/mo
        </Typography>
        <Typography variant="subtitle2" noWrap='true' color="text.darkBlue">
          {address.street1} {address.street2}
        </Typography>
        <Typography variant="body2" noWrap='true' color="text.secondary">
          {description.BR}BR | {description.BA}BA | {description.sqFt} sqft
        </Typography>
      </CardContent>
      <CardActions sx={{pt:0}}>
        <Tooltip title="Submit contact info">
          <Button sx={{mr:1}} onClick={() => handleApply()} size="small">Apply</Button>
        </Tooltip>
        <Typography variant="body2" noWrap='true' color="text.secondary">
          {application.length} in review
        </Typography>
      </CardActions>
    </Card>
  )
}

export default ContainerFeed;