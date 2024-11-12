import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function HomeLayout() {
  return (
    <>
      <Container maxWidth="lg" component="main" sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}>
        <NavBar />
        <Outlet />
      </Container>
      <Footer />
    </>

  );
}
