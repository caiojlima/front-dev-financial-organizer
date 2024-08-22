import { Box } from '@mui/material';
import forgotPasswordImg from '../assets/forgot-password-img.svg';
import { firstBoxStyle, homeContainerStyle, secondBoxStyle } from '../styles';
import { Title, ForgotPasswordForm } from '../components';

export const ForgotPassword = () => {
  return (
    <Box sx={homeContainerStyle}>
      <Box sx={firstBoxStyle}>
        <img src={forgotPasswordImg} alt="home-img" width="65%" />
      </Box>
      <Box sx={secondBoxStyle}>
        <Title />
        <ForgotPasswordForm />
      </Box>
    </Box>
  );
};
