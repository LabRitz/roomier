import React from 'react';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const UserCardActions = ({ application, handleApply }) => {
  return (
    <>
      <Tooltip title="Submit contact info">
        <Button sx={{mr:1}} onClick={() => handleApply()} size="small">Apply</Button>
      </Tooltip>
      <Typography variant="body2" noWrap={true} color="text.secondary">
        {application.length} in review
      </Typography>
    </>
  );
}

export default UserCardActions;