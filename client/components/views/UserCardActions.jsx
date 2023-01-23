import React from 'react';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const UserCardActions = ({ application, handleApply, hasApplied }) => {
  return (
    <>
      <Tooltip title="Submit contact info">
        <Button mr={1} onClick={() => handleApply()} size="small" disabled={hasApplied}>
          {hasApplied ? 'Applied' : 'Apply'}
        </Button>
      </Tooltip>
      <Typography pb={0.5} variant="body2" noWrap={true} color="text.secondary">
        {application.length} in review
      </Typography>
    </>
  );
}

export default UserCardActions;