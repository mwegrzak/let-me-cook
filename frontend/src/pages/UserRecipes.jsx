import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
import Container from '@mui/material/Container';

export function loader() {
  return null
}

export default function UserRecipes(props) {
  const data = useLoaderData()

  return (
    <Container>
      <h1>UserRecipes goes here</h1>
    </Container>
  );
}