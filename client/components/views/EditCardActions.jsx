import React from 'react';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import SaveIcon from '@mui/icons-material/Save';
import RestoreIcon from '@mui/icons-material/Restore';

function EditCardActions({ handleSave, handleUndo }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
    }}
    >
      <Tooltip title="Restore changes">
        <Button color="inherit" onClick={handleUndo} size="small">
          <RestoreIcon />
        </Button>
      </Tooltip>
      <Tooltip title="Save changes">
        <Button color="inherit" onClick={handleSave} size="small">
          <SaveIcon />
        </Button>
      </Tooltip>
    </div>
  );
}

export default EditCardActions;
