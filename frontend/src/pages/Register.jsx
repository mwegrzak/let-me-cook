import React from 'react';
import { NavLink, Form } from 'react-router-dom';
import { SitemarkIcon } from '../components/CustomIcons';
import { Box, Button, FormLabel, TextField, Typography, Stack, styled } from '@mui/material'
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

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
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

export async function loader() {
  console.log('looooaaaadooor')
  return null
}

export async function action({ request }) {
  const formData = await request.formData()
  const email = formData.get("email")
  const password = formData.get("password")
  const name = formData.get("name")

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
      <SignUpContainer direction="column" justifyContent="space-between">
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
              //error={passwordError}
              //helperText={passwordErrorMessage}
              //color={passwordError ? 'error' : 'primary'}
              />
              <Button type="submit" fullWidth variant="contained">
                Sign up
              </Button>
            </Form>
            <Typography sx={{ textAlign: 'center' }}>
              Already have an account?{' '}
              <NavLink to="/login" className={'navlink'}>Sign in</NavLink>
            </Typography>
          </Box>

        </Card>
      </SignUpContainer>
    </>
  );
}
