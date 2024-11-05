import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import AppTheme from '../shared-theme/AppTheme';

export default function AdminPanel(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <NavBar />
      <Container>
        <h1>Sorry, the page you were looking for does not exist :(</h1>
      </Container>
      <Footer />
    </AppTheme>
  );
}
