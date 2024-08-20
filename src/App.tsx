import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<h1>Aqui é a about</h1>} />
        <Route path="/contact" element={<h1>Aqui é a contact</h1>} />
      </Routes>
    </>

  );
}

export default App;
