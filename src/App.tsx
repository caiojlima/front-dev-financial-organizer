import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ForgotPassword, Home, Register, ResetPassword, Wallet } from './pages';
import AuthRoute from './components/AuthRoute';
import 'react-toastify/dist/ReactToastify.css';
import QueryAuthRoute from './components/QueryAuthRoute';

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<QueryAuthRoute />}>
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/wallet" element={<Wallet />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
