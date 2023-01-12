import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import Card from './Card.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 1,
};

const PostModal = ({postInfo, open, handleClose }) => {

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Card postInfo={postInfo}/>
      </Box>
    </Modal>
  )
}

export default PostModal;