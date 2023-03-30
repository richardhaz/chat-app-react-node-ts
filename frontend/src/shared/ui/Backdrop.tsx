import MuiBackdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import React from 'react';

const Backdrop = () => {
  return (
    <MuiBackdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
      <CircularProgress color="inherit" />
    </MuiBackdrop>
  );
};

export default Backdrop;
