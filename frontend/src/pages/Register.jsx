import React from 'react';
import { NavLink, Form } from 'react-router-dom';
import { SitemarkIcon } from '../components/CustomIcons';
import { Box, Button, FormLabel, TextField, Typography, styled } from '@mui/material'
import MuiCard from '@mui/material/Card';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(3),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));


export async function loader() {
  console.log('looooaaaadooor')
  return null
}

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")
  const repeatPassword = formData.get("repeatPassword")
  const name = formData.get("name")

  if (password != repeatPassword) {
    throw 'Passwords do not match'
  }

  try {
    const response = await fetchPost('/register', { name: name, email: email, password: password })
    return null
  }
  catch (err) {
    return err
  }
}

export default function Register(props) {


  return (
    <>
      <Box direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign up
          </Typography>


          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

            <Form method="post" action='/register' replace>

              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                variant="outlined"
              //error={emailError}
              //helperText={emailErrorMessage}
              //color={passwordError ? 'error' : 'primary'}
              />

              <FormLabel htmlFor="name">Full name</FormLabel>
              <TextField
                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="Jon Snow"
              //error={nameError}
              //helperText={nameErrorMessage}
              //color={nameError ? 'error' : 'primary'}
              />


              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                placeholder="••••••"
                autoComplete="new-password"
                variant="outlined"
              />
              <FormLabel htmlFor="repeatPassword">Repeat Password</FormLabel>

              <TextField
                required
                fullWidth
                name="repeatPassword"
                type="password"
                id="repeatPassword"
                placeholder="••••••"
                autoComplete="new-password"
                variant="outlined"
              />
              <Button type="submit" fullWidth variant="contained">
                Sign up
              </Button>
            </Form>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <NavLink to="/login" className={'navlink'}>Log in!</NavLink>
            </Typography>
          </Box>

        </Card>
      </Box>
    </>
  );
}
