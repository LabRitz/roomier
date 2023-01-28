import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  minWidth: '500px',
  maxHeight: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 1,
};

const ApplicationModal = ({applications, closeApps, open }) => {

  

  return (
    <Modal
      keepMounted
      open={open}
      onClose={closeApps}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <ul>
          {applications.map((app, i) => (
            <li key={i}>
              <p>{app.firstName}</p>
              <p>{app.lastName}</p>
              <p>{app.username}</p>
            </li>
          ))}
        </ul>
      </Box>
    </Modal>
  )
}

export default ApplicationModal;