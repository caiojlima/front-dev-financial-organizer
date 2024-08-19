import { Box } from "@mui/material";
import homeImage from "../assets/home-img.svg";
import { firstBoxStyle, homeContainerStyle, secondBoxStyle } from "../styles/home.style";
import Form from "../components/Form";
import Title from "../components/Title";

const Home = () => {
  return (
    <Box sx={homeContainerStyle}>
      <Box sx={firstBoxStyle}>
        <img src={homeImage} alt="home-img" />
      </Box>
      <Box sx={secondBoxStyle}>
        <Title />
        <Form></Form>
      </Box>
    </Box>
  );
}

export default Home;