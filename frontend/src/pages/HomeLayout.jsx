import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AppTheme from '../shared-theme/AppTheme';

export default function HomeLayout(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <NavBar />

      <Outlet />

      <Footer />
    </AppTheme>
  );
}
