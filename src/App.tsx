import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ForgotPassword, Home, Register, ResetPassword } from './pages';
import 'react-toastify/dist/ReactToastify.css';
import MaterialUITableWithForm from './pages/Wallet';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/wallet" element={<MaterialUITableWithForm />} />
      </Routes>
    </>
  );
}

export default App;
