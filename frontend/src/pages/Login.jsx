import React, { useState } from 'react';
import { useLoaderData, Form, redirect, useActionData } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Box, Button, FormLabel, Link, TextField, Typography, Stack, Alert, AlertTitle } from '@mui/material'
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from '../components/ForgotPassword';
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

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {

  const formData = await request.formData()

  // TODO form forgot-password
  const email = formData.get("email")
  const password = formData.get("password")
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
  const error = useActionData()
  console.log(error.message)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    return null
  };

  return (
    <>
      <SignInContainer direction="column" justifyContent="space-between">

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
            Sign in
          </Typography>

          <Box noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 3,
            }}
          >
            <Form method="post" action="/login" replace>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                sx={{ ariaLabel: 'email' }}

              />
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

              <Button type="submit" fullWidth variant="contained">
                Sign in
              </Button>
            </Form>
            <ForgotPassword open={open} handleClose={handleClose} />

            <Box display={'inline-flex'} justifyContent={'space-between'}>

              <Link component="button" type="button" onClick={handleClickOpen} variant="body2" sx={{ alignSelf: 'baseline' }}>
                Forgot your password?
              </Link>

              <Typography sx={{ textAlign: 'center' }}>
                Don't have an account?{' '}
                <NavLink className={'navlink'} to="/register">Sign up</NavLink>
              </Typography>

            </Box>

          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
