import { Box } from "@mui/material";
import homeImage from "../assets/home-img.svg";
import { firstBoxStyle, homeContainerStyle, secondBoxStyle } from "../styles/home.style";

const Home = () => {
  return (
    <Box sx={ homeContainerStyle }>
      <Box sx={ firstBoxStyle }>
        <img src={ homeImage } alt="home-img" />
      </Box>
      <Box sx={ secondBoxStyle }></Box>
    </Box>
  );
}

export default Home;