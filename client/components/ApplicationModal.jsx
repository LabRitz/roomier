import React, { lazy } from 'react';

const Modal = lazy(() => import('@mui/material/Modal'));
const Box = lazy(() => import('@mui/material/Box'));
const List = lazy(() => import('@mui/material/List'));
const ListItem = lazy(() => import('@mui/material/ListItem'));
const Divider = lazy(() => import('@mui/material/Divider'));
const ListItemText = lazy(() => import('@mui/material/ListItemText'));
const ListItemAvatar = lazy(() => import('@mui/material/ListItemAvatar'));
const Avatar = lazy(() => import('@mui/material/Avatar'));
const Typography = lazy(() => import('@mui/material/Typography'));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxWidth: '500px',
  maxHeight: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
};

const ApplicationModal = ({ applications, closeApps, open }) => {

  return (
    <Modal
      keepMounted
      open={open}
      onClose={closeApps}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <List component='nav' sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {applications.map((app, i) => (
            <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={app.firstName} src={app?.profilePicture} />
              </ListItemAvatar>
              <ListItemText
                primary={`${app.firstName} ${app.lastName}`}
                secondary={
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {app.username}
                  </Typography>   
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            </>
          ))}
        </List>
      </Box>
    </Modal>
  )
}

export default ApplicationModal;