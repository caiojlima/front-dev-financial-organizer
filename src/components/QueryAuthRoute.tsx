import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const QueryAuthRoute: React.FC = () => {
  const query = new URLSearchParams(useLocation().search);

  return query.get('token') ? <Outlet /> : <Navigate to="/" replace />;
};

export default QueryAuthRoute;
