import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUser } from '../UserContext.js';

export default function RequireAuth(props) {
  const { isLoggedIn, user } = useUser()
  console.log('user')
  console.log(user)

  if (!isLoggedIn) {
    return <Navigate to="/login?message=You must log in first" />
  }
  else { return <Outlet />; }
}