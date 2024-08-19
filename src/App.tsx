import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<h1>Aqui é a about</h1>} />
      <Route path="/contact" element={<h1>Aqui é a contact</h1>} />
    </Routes>
  );
}

export default App;
