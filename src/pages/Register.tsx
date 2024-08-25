import { Box } from '@mui/material';
import registerImg from '../assets/register-img.svg';
import { firstBoxStyle, homeContainerStyle, secondBoxStyle } from '../styles';
import { RegisterForm, Title } from '../components';

export const Register = () => {
  return (
    <Box sx={homeContainerStyle}>
      <Box sx={firstBoxStyle} display={{ xs: 'none', md: 'flex' }}>
        <img src={registerImg} alt="register-img" width="60%" />
      </Box>
      <Box sx={secondBoxStyle}>
        <Title />
        <RegisterForm />
      </Box>
    </Box>
  );
};
