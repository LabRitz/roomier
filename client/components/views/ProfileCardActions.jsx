import React from 'react';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import TuneIcon from '@mui/icons-material/Tune';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ProfileCardActions = ({ application, handleUpdate, handleDelete, openApps }) => { 
  return (
    <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems: 'center'}}>
      <Tooltip title="Edit post">
        <Button sx={{mr:1}} color="inherit" onClick={handleUpdate} size="small">
          <TuneIcon />
        </Button>
      </Tooltip>
      <Typography variant="body2" noWrap={true} color="text.secondary" onClick={openApps}>
        {application.length} in review
      </Typography>
      <Tooltip title="Remove post">
        <Button sx={{mr:1}} color="inherit" onClick={handleDelete} size="small">
          <DeleteForeverIcon />
        </Button>
      </Tooltip>
    </div>
  );
}

export default ProfileCardActions;