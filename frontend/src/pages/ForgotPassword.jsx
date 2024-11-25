import React, { useState } from 'react';
import { useLoaderData, Form, redirect, useActionData } from 'react-router-dom';
import { Box, Button, FormLabel, Link, TextField, Typography, Alert } from '@mui/material'
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { SitemarkIcon } from '../components/CustomIcons';
import fetchPost from '../utils/fetchPost';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));


export function loader({ request }) {
  return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {

  const formData = await request.formData()

  const password = formData.get("password")
  const repeatPassword = formData.get("repeatPassword")

  // check if passwords match
  try {
    const user = await fetchPost('/login', { password: password, email: email })
    redirect('/')

  } catch (err) {
    return err
  }

  return response
}

export default function Login(props) {

  const [open, setOpen] = useState(false);
  const message = useLoaderData()
  //const error = useActionData()
  //console.log(error.message)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    return null
  };

  return (
    <>
      <Box direction="column" justifyContent="space-between">

        {message &&
          <Alert severity="error" variant="outlined"
            sx={{
              width: '40%', display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
            }} >
            {message}
          </Alert>
        }
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
            Forgot password
          </Typography>

          <Box noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 3,
            }}
          >
            <Form method="post" action="/forgot-password" replace>

              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                name="password"
                placeholder="••••••••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />

              <FormLabel htmlFor="repeatPassword">Repeat password</FormLabel>
              <TextField
                name="repeatPassword"
                placeholder="••••••••••••"
                type="password"
                id="repeatPassword"
                autoComplete="current-password"
                autoFocus
                required
                fullWidth
                variant="outlined"
              />


              <Button type="submit" fullWidth variant="contained">
                Remind me a password
              </Button>
            </Form>

          </Box>
        </Card>
      </Box>
    </>
  );
}
