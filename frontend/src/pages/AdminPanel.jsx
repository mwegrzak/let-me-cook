import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export function loader() {
  return null
}
export default function AdminPanel(props) {
  const data = useLoaderData()

  return (
    <>
      <NavBar />
      <Container>
        <h1>AdminPanel goes here</h1>
      </Container>
      <Footer />
    </>
  );
}
