import * as React from 'react';
import Container from '@mui/material/Container';
import { useLoaderData } from 'react-router-dom';

export function loader() {
  return null
}

export default function UserProfile(props) {
  const data = useLoaderData()

  return (
    <>

      <Container>
        <h1>UserProfile goes here</h1>
      </Container>
    </>
  );
}
