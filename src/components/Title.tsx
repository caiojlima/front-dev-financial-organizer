import { Box } from "@mui/material";
import logo from "../assets/Logo.svg";

const Title = () => (
  <Box sx={{ width: "60%  ", display: "flex", alignItems: 'center', fontSize: "2vw" }}>
    <img style={{ width: "20vw" }} src={ logo } alt="Logo" />
    <h1 style={ { color: "rgba(45, 146, 42, 0.37)", textAlign: "center" } }>Financial Organizer</h1>
  </Box>
);

export default Title;