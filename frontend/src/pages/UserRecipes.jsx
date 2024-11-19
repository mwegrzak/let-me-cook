import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Container from '@mui/material/Container';
import { requireAuth } from '../utils/api';

export async function loader() {
  await requireAuth()
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
