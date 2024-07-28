import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/pages/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
