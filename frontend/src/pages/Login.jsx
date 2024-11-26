import React, { useState, useContext, useEffect } from 'react';
import { useLoaderData, Form, redirect, useActionData, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { Box, Button, FormLabel, Link, TextField, Typography, Stack, Alert, AlertTitle } from '@mui/material'
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import { SitemarkIcon } from '../components/CustomIcons';
import { fetchPost } from '../utils/api';

import { userContext } from '../userContext';

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
  const forgotPasswordEmail = formData.get("forgotPasswordEmail")
  const email = formData.get("email")
  const password = formData.get("password")

  if (forgotPasswordEmail != null) {
    // handle forgot password form TODO
    try {
      const response = await fetchPost('/api/auth/passwordreset', { email: email })
      return response
    }
    catch (err) {
      return err
    }
  }
  else {
    // handle login form
    try {
      const response = await fetchPost('/api/auth/login', { email: email, password: password })
      return response

    } catch (err) {
      return err
    }
  }

}

export default function Login(props) {

  const [open, setOpen] = useState(false);
  const loaderData = useLoaderData()
  const actionData = useActionData()
  const { toggleLogin } = useContext(userContext);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    return null
  };

  useEffect(() => {
    console.log(JSON.stringify(actionData));
    if (actionData?.id) {
        toggleLogin(actionData.user);
        navigate('/');
    }
}, [actionData, toggleLogin, navigate]);

  return (
    <>
      <Box direction="column" justifyContent="space-between">
        <Card variant="outlined">

          {loaderData &&
            <Alert severity="error" variant="outlined"
              sx={{
                width: '100%', display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
              }} >
              {loaderData.error}
            </Alert>
          }


          {actionData &&
            <Alert severity="error" variant="outlined"
              sx={{
                width: '100%', display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',
              }} >
              {actionData.error}
            </Alert>
          }


          <SitemarkIcon />
          <Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}>
            Log in
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
            <ForgotPasswordModal open={open} handleClose={handleClose} />

            <Box display={'inline-flex'} justifyContent={'space-between'}>

              <Link component="button" type="button" onClick={handleClickOpen} variant="body2" sx={{ alignSelf: 'baseline' }}>
                Forgot your password?
              </Link>

              <Typography sx={{ textAlign: 'center' }}>
                Don't have an account?{' '}
                <NavLink className={'navlink'} to="/register">Register!</NavLink>
              </Typography>

            </Box>

          </Box>
        </Card>
      </Box>
    </>
  );
}
