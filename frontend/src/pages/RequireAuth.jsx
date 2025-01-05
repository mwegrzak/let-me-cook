import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '../UserContext.jsx';

export default function RequireAuth(props) {
  const { isLoggedIn, user } = useUser()

  if (!isLoggedIn) {
    return <Navigate to="/login?message=You must log in first" />
  }
  else { return <Outlet /> }
}