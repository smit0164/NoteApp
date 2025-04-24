import React from 'react'
import { Outlet,Navigate } from "react-router"; 
import { useSelector } from 'react-redux';
const GuestLayout = () => {
 const {token} = useSelector((state) => state.auth);
 return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export default GuestLayout