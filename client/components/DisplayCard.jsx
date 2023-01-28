import React, { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const defaultImg = 'https://mindfuldesignconsulting.com/wp-content/uploads/2017/07/Fast-Food-Restaurant-Branding-with-Interior-Design.jpg'

const DisplayCard = ({ postInfo, view }) => {
  const {
    address,
    applicantData,
    roommate,
    description,
    moveInDate,
    utilities,
    rent,
    bio,
    images,
    currUser
  } = postInfo;

  const [index, setIndex] = useState(0) // Index for gallery image
 
  const handleClick = (dir) => {
    if (index + dir < 0) setIndex(images.length - 1)
    else if (index + dir > images.length - 1) setIndex(0)
    else setIndex(index + dir);
  }

  const handleApply = async () => {
    try {
      const reqBody = {
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        username: currUser.username
      }
      const response = await fetch(`/home/${props._id}`, {
        method:'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
      })
      const data = await response.json();
    }
    catch(err) {
      console.log('Error applying to post: ', err)
    }
  }

  const handleUpload = async () => {
    // Need to include Firebase logic
  }

  const handleRemove = async () => {
    // Need logic to remove picture from image array
  }

  return (
    <div style={{display: 'flex', flexDirection:'row', minWidth:'300px', height:'100%'}}>
      <Paper elevation={0} sx={{display:'flex', flexDirection:'column', justifyContent:'center', width:'50%'}}>
        <CardMedia
          component="img"
          height="300"
          image={(!images[index]) ? defaultImg : (images[index]['imgUrl'] == undefined) ? Object.keys(images[index])[0] : images[index]['imgUrl']}
        />
        <CardActions sx={{display: 'flex', justifyContent:'space-evenly'}}>
          <IconButton color="inherit" onClick={() => handleClick(-1)}>
            <ArrowBackIosNewIcon fontSize='medium'/>
          </IconButton>
          {(view === 'user') && 
            <Tooltip title="Submit contact info">
              <Button onClick={(e) => handleApply(e)} size="small">Apply</Button>
            </Tooltip>}
          {(view === 'profile') && <></>}
          <IconButton color="inherit" onClick={() => handleClick(1)}>
            <ArrowForwardIosIcon fontSize='medium'/>
          </IconButton>
        </CardActions>
      </Paper>
      <Paper elevation={0} sx={{p:3, pt:2, pb:1, width:'50%'}}>
        <Typography variant="h4" noWrap={false} component="div" color="text.darkBlue">
          {address.street1} {address.street2}
        </Typography>
        <Typography gutterBottom variant="h5" noWrap={false} component="div" color="text.darkBlue">
          {address.city}, {address.state} {address.zipCode}
        </Typography>
        <Typography gutterBottom variant="h5" noWrap={true} color="text.darkBlue">
          ${rent}/mo
        </Typography>
        <Typography variant="h6" noWrap={true} color="text.secondary">
          {description.BR}BR | {description.BA}BA | {description.sqFt} sqft
        </Typography>
        <Typography gutterBottom variant="subtitle2" noWrap={true} color="text.primary">
          Available: {new Date(moveInDate).toLocaleDateString()}
        </Typography>
        <Typography gutterBottom variant="body2" noWrap={true} color="text.primary">
          Looking for: {roommate.gender}
        </Typography>
        <Typography 
          mb={0} 
          variant="body1" 
          noWrap={false} 
          paragraph={true} 
          color="text.primary" 
          sx={{ 
            fontSize:12, 
            height: '35%', 
            overflowY:'scroll' 
          }}>
          {bio}
        </Typography>
      </Paper>
    </div>
  )
}

export default DisplayCard;