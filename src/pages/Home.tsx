import { Box } from '@mui/material';
import homeImage from '../assets/home-img.svg';
import { firstBoxStyle, homeContainerStyle, secondBoxStyle } from '../styles';
import { Title, LoginForm } from '../components';

export const Home = () => {
  return (
    <Box sx={homeContainerStyle}>
      <Box sx={firstBoxStyle}>
        <img src={homeImage} alt="home-img" />
      </Box>
      <Box sx={secondBoxStyle}>
        <Title />
        <LoginForm />
      </Box>
    </Box>
  );
};
