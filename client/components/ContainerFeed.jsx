import React, { useState, Suspense } from 'react';
import Card from '@mui/material/Card';
import { CardActions } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

const UserCardActions = React.lazy(() => import('./views/UserCardActions.jsx'));
const ProfileCardActions = React.lazy(() => import('./views/ProfileCardActions.jsx'));
import '../stylesheets/containerFeed.scss'

const ContainerFeed = ({ data, handleOpen, setPostInfo, view, handleUpdate, handleDelete }) => {
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
  const handleApply = async (e) => {
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
    <motion.div 
      variants={{
        present: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 },
      }}
      initial="exit"
      animate="present"
      exit="exit"
      layout={true}>
      <Card sx={{ maxWidth: 480, m: 1, p:0}}>
        <CardContent sx={{ pb:0 }} onClick={handleClick}>
          <CardMedia
            sx={{ height: 180, mb:1 }}
            image={(!images[0]) ? defaultImg : Object.keys(images[0])[0]}
          />
          <Typography gutterBottom variant="h5" noWrap={true} component="div" color="text.darkBlue">
            ${rent}/mo
          </Typography>
          <Typography variant="subtitle2" noWrap={true} color="text.darkBlue">
            {address.street1} {address.street2}
          </Typography>
          <Typography variant="body2" noWrap={true} color="text.secondary">
            {description.BR}BR | {description.BA}BA | {description.sqFt} sqft
          </Typography>
        </CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          {(view === 'user') && 
            <CardActions sx={{display:'flex', alignItems:'center'}}>
              <UserCardActions 
                application={application} 
                handleApply={handleApply}/>
            </CardActions>}
          {(view === 'profile') && 
            <CardActions sx={{display:'flex', justifyContent: 'space-evenly'}}>          
              <ProfileCardActions 
                application={application} 
                handleUpdate={handleUpdate} 
                handleDelete={handleDelete}/>
            </CardActions>}
        </Suspense>
      </Card>
    </motion.div>

  )
}

export default ContainerFeed;