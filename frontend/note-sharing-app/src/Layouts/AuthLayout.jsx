import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet,Navigate } from "react-router";
const AuthLayout = () => {

  const { token} = useSelector((state) => state.auth);
  return token ? <Outlet/> : <Navigate to="/" replace />;
}

export default AuthLayout