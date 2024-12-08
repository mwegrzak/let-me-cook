import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { Box } from '@mui/material';

export default function AdminPanelLayout(props) {
  return (
    <>

      <AdminSidebar />
      <Outlet />

    </>
  );
}

