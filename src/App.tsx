import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Home, Register } from "./pages";
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<h1>Aqui é a contact</h1>} />
      </Routes>
    </>

  );
}

export default App;
