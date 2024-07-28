import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const loggedIn = useSelector((state) => state.authReducer.isLoggedIn);

  if (loggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to={'/login'} />;
  }
};

export default PrivateRoute;
