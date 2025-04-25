import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router';
import Headers from '../components/Header'; // Make sure to import this if it's a local component

const AuthLayout = () => {
  const { token } = useSelector((state) => state.auth);

  return token ? (
    <>
      <Headers />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" replace />
  );
};

export default AuthLayout;
