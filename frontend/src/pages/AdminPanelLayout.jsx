import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar.jsx';

export default function AdminPanelLayout(props) {
  return (
    <>
      <AdminSidebar />
      <Outlet />

    </>
  );
}

