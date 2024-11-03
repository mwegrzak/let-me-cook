import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AppTheme from '../shared-theme/AppTheme';

export default function AdminPanelLayout(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <NavBar />
      <Container>
        <h1>AdminPanelLayout goes here</h1>
      </Container>
      <Footer />
    </AppTheme>
  );
}
