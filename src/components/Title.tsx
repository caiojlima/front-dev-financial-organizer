import { Box } from '@mui/material';
import logo from '../assets/Logo.svg';
import { useNavigate } from 'react-router-dom';

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
        fontSize: '2vw',
        marginTop: '2vh',
        ':hover': { cursor: 'pointer' },
      }}
      onClick={handleClick}
    >
      <img style={{ width: '20vw' }} src={logo} alt="Logo" />
      <h1
        style={{
          color: 'rgba(45, 146, 42, 0.37)',
          textAlign: 'center',
          margin: 0,
        }}
      >
        Financial Organizer
      </h1>
    </Box>
  );
};
