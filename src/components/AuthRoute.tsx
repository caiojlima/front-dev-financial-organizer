import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSessionStorage } from '../hooks';

const AuthRoute: React.FC = () => {
  const { getToken } = useSessionStorage();

  return getToken() ? <Outlet /> : <Navigate to="/" replace />;
};

export default AuthRoute;
