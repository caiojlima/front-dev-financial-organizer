import React from 'react';
import ReactDOM from 'react-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Loading: React.FC = () => {
  return ReactDOM.createPortal(
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="rgba(0, 0, 0, 0.3)"
      zIndex={9999}
    >
      <CircularProgress sx={{ color: 'green' }} />
    </Box>,
    document.body,
  );
};
