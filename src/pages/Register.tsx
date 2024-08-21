import { Box } from "@mui/material";
import homeImage from "../assets/home-img.svg";
import { firstBoxStyle, homeContainerStyle, secondBoxStyle } from "../styles";
import { RegisterForm, Title } from "../components";

export const Register = () => {
  return (
    <Box sx={homeContainerStyle}>
      <Box sx={firstBoxStyle}>
        <img src={homeImage} alt="home-img" />
      </Box>
      <Box sx={secondBoxStyle}>
        <Title />
        <RegisterForm />
      </Box>
    </Box>
  );
}