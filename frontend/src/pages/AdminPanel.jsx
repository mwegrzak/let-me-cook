import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AdminPanel(props) {
  return (
    <>
      <h1>AdminPanel goes here</h1>
      <Outlet />
    </>
  );
}

