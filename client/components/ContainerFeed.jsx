import React, {
  useState, useEffect, useContext, Suspense,
} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

import Context from './context/Context';
import '../stylesheets/containerFeed.scss';

const UserCardActions = React.lazy(() => import('./views/UserCardActions'));
const ProfileCardActions = React.lazy(() => import('./views/ProfileCardActions'));
const ApplicationModal = React.lazy(() => import('./ApplicationModal'));

const defaultImg = 'https://mindfuldesignconsulting.com/wp-content/uploads/2017/07/Fast-Food-Restaurant-Branding-with-Interior-Design.jpg';

function ContainerFeed({
  post, handleOpen, setPostInfo, view, handleUpdate, handleDelete, setEditMode,
}) {
  const { userInfo, setAlert } = useContext(Context);
  const {
    address, description, rent, images, applicantData,
  } = post;

  const [application, setApplication] = useState(!applicantData ? [] : applicantData);
  const [hasApplied, setHasApplied] = useState(false);

  // Profile view applications
  const [open, setOpen] = useState(false);
  const openApps = () => setOpen(true);
  const closeApps = () => setOpen(false);

  const handleApply = async (e) => {
    try {
      const reqBody = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        username: userInfo.username,
      };
      const response = await fetch(`/home/${post._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reqBody),
      });
      const data = await response.json();
      if (data) { // only update if patch request is true/not error
        setApplication([...application, reqBody]);
        setHasApplied(true);
        setAlert((alerts) => [...alerts, { severity: 'success', message: 'Successfully submitted application' }]);
      }
    } catch (err) {
      console.log('Error applying to post: ', err);
      setAlert((alerts) => [...alerts, { severity: 'error', message: 'Error in applying to post' }]);
    }
  };

  const handleClick = () => {
    setPostInfo(post);
    if (view === 'profile') setEditMode(false);
    else if (view === 'user') handleOpen();
  };

  useEffect(() => {
    setApplication(applicantData);
  }, [applicantData]);

  useEffect(() => {
    if (userInfo !== '') {
      let applied = false;
      applicantData.map((applicant) => {
        if (applicant.username === userInfo.username) applied = true;
      });
      setHasApplied(applied);
    }
  }, [application]);

  return (
    <motion.div
      variants={{
        present: { scale: 1, opacity: 1 },
        exit: { scale: 0.8, opacity: 0 },
      }}
      initial="exit"
      animate="present"
      exit="exit"
      layout
    >
      <Card sx={{ maxWidth: 480, m: 1, p: 0 }}>
        <CardContent sx={{ pb: 0 }} onClick={handleClick}>
          <CardMedia
            sx={{ height: 180, mb: 1 }}
            image={(!images[0]) ? defaultImg
              : (images[0].imgUrl == undefined) ? Object.keys(images[0])[0] : images[0].imgUrl}
          />
          <Typography gutterBottom variant="h5" noWrap component="div" color="text.primary">
            {`$${rent}/mo`}
          </Typography>
          <Typography variant="subtitle2" noWrap color="text.primary">
            {`${address.street1} ${address.street2}`}
          </Typography>
          <Typography variant="body2" noWrap color="text.ternary">
            {`${description.BR}BR | ${description.BA}BA | ${description.sqFt} sqft`}
          </Typography>
        </CardContent>
        <Suspense fallback={<div>Loading...</div>}>
          {(view === 'user')
            && (
            <CardActions sx={{ display: 'flex', alignItems: 'center' }}>
              <UserCardActions
                application={application}
                handleApply={handleApply}
                hasApplied={hasApplied}
              />
            </CardActions>
            )}
          {(view === 'profile')
            && (
            <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
              <ProfileCardActions
                application={application}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
                openApps={openApps}
              />
            </CardActions>
            )}
        </Suspense>
      </Card>
      <Suspense fallback={<div>Loading...</div>}>
        {(view === 'profile') && <ApplicationModal applications={application} open={open} closeApps={closeApps} /> }
      </Suspense>
    </motion.div>
  );
}

export default ContainerFeed;
