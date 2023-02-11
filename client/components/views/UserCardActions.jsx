import React from 'react';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const UserCardActions = ({ application, handleApply, hasApplied }) => {
  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
    { hasApplied ? 
      <Button sx={{mr:1}} onClick={handleApply} size="small" disabled={hasApplied}>
        <Typography variant="body2">
          Applied
        </Typography>
      </Button> 
      :
      <Tooltip title="Submit contact info">
        <Button mr={1} onClick={handleApply} size="small" disabled={hasApplied} >
          <Typography variant="body2" color="text.secondary">
            Apply
          </Typography>
        </Button>
      </Tooltip>
    }
      <Typography pb={0} variant="body2" noWrap={true} color="text.ternary">
        {application.length} in review
      </Typography>
    </div>
  );
}

export default UserCardActions;