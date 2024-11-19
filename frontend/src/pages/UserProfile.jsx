import React from 'react';
import Container from '@mui/material/Container';
import { useLoaderData } from 'react-router-dom';
import { requireAuth } from '../utils/api';


export async function loader() {
  await requireAuth()
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
