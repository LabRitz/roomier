import React, { useState, useEffect, Suspense } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

const UserCardActions = React.lazy(() => import('./views/UserCardActions.jsx'));
const ProfileCardActions = React.lazy(() => import('./views/ProfileCardActions.jsx'));
import '../stylesheets/containerFeed.scss'

const defaultImg = 'https://mindfuldesignconsulting.com/wp-content/uploads/2017/07/Fast-Food-Restaurant-Branding-with-Interior-Design.jpg'

const ContainerFeed = ({ data, handleOpen, setPostInfo, view, handleUpdate, handleDelete, setEditMode }) => {
  const {
    address,
    description,
    rent,
    images,
    applicantData,
    currUser
  } = data;

  const [application, setApplication] = useState(!applicantData ? [] : applicantData)
  const [hasApplied, setHasApplied] = useState(false)

  const handleApply = async (e) => {
    try {
      const reqBody = {
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        username: currUser.username
      }
      const response = await fetch(`/home/${data._id}`, {
        method:'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody)
      })
      const data = await response.json();
      if (data) setApplication(...application, reqBody); // only update if patch request is true/not error
    }
    catch(err) {
      console.log('Error applying to post: ', err)
    }
  }

  const handleClick = () => {
    if (view === 'profile') setEditMode(false)
    setPostInfo(data)
    handleOpen()
  }

  useEffect(() => {
    if (currUser) {
      let applied = false
      for (const applicant of applicantData) {
        if (applicant.username === currUser.username) applied = true
      }
      setHasApplied(applied)
    }
  }, [application])

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
            image={(!images[0]) ? defaultImg : (images[0]['imgUrl'] == undefined) ? Object.keys(images[0])[0] : images[0]['imgUrl']}
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
                handleApply={handleApply}
                hasApplied={hasApplied}/>
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