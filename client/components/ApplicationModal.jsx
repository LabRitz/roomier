import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

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
        <List key='appModal' component='nav' sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {applications.map((app, i) => (
            <>
            <ListItem key={i} alignItems="flex-start" data-testid='listItemModal'>
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
            <Divider variant="inset" component="li" data-testid='dividerModal'/>
            </>
          ))}
        </List>
      </Box>
    </Modal>
  )
}

export default ApplicationModal;