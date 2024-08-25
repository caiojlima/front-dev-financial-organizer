import {
  Box,
  createTheme,
  responsiveFontSizes,
  Typography,
} from '@mui/material';
import logo from '../assets/Logo.svg';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';

let theme = createTheme();
theme = responsiveFontSizes(theme);

export const Title = () => {
  const navigator = useNavigate();
  const handleClick = () => {
    navigator('/');
  };

  return (
    <Box
      sx={{
        width: '60%',
        height: '25%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2vw',
        marginTop: '2vh',
        ':hover': { cursor: 'pointer' },
      }}
      onClick={handleClick}
    >
      <img style={{ width: '20vw' }} src={logo} alt="Logo" />
      <ThemeProvider theme={theme}>
        <Typography
          variant="h1"
          textAlign={'center'}
          fontFamily={'Times New Roman'}
          color={'rgba(45, 146, 42, 0.37)'}
        >
          Financial Organizer
        </Typography>
      </ThemeProvider>
    </Box>
  );
};
