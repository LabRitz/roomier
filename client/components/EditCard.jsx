import React, { useState } from 'react';
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

  const [index, setIndex] = useState(0) // Index for gallery image
 
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
        <TextField
          label="Street address"
          defaultValue={address.street1}
          size="small"
        />
        <TextField
          label="Apt, etc"
          defaultValue={address.street2}
          size="small"
        />
        <TextField
          label="City"
          defaultValue={address.city}
          size="small"
        />
        <TextField
          label="State"
          defaultValue={address.state}
          size="small"
        />
        <TextField
          label="Zip code"
          defaultValue={address.zipCode}
          size="small"
        />
      
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
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