import React from 'react';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function AdminPanelLayout(props) {
  return (
    <>
      <NavBar />
      <Container>
        <h1>AdminPanelLayout goes here</h1>
      </Container>
      <Footer />
    </>
  );
}
