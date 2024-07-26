import React from 'react';
import Cookies from 'js-cookie';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = () => {
  // TODO check token validity if we decide to keep it in cookies
  const token = Cookies.get('token');

  return ( token ? <Outlet /> : <Navigate to="/login" />);
};

export default ProtectedRoutes;