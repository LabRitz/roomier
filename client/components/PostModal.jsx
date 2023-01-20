import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import DisplayCard from './DisplayCard.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxHeight: 'auto',
  bgcolor: 'background.paper',
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
        <DisplayCard postInfo={postInfo}/>
      </Box>
    </Modal>
  )
}

export default PostModal;