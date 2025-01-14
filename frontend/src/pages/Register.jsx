import React, { useState } from 'react';
import { NavLink, Form, useNavigate, replace } from 'react-router-dom';
import { SitemarkIcon } from '../components/CustomIcons';
import { Box, Button, FormLabel, TextField, Typography, styled, Alert } from '@mui/material'
import MuiCard from '@mui/material/Card';
import { fetchPost } from '../utils/api';
import { useUser, useUpdateUser } from '../UserContext.jsx'


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


export default function Register(props) {
  const [formData, setFormData] = useState({ email: "", name: "", password: "", repeatPassword: "" });
  const [error, setError] = useState(false)
  const { isLoggedIn, user } = useUser()
  const toggleLogin = useUpdateUser();
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password != formData.repeatPassword) {
      setError('Passwords do not match')
      return
    }

    const response = await fetchPost('/api/auth/register', { email: formData.email, name: formData.name, password: formData.password })

    if (response.id) {
      toggleLogin(response);
      navigate("/", replace);
    }
    else {
      setError(response.error)
    }

  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(values => ({ ...values, [name]: value }))
  }

  return (
    <>
      <Box direction="column" justifyContent='space-between'>

        <Card variant="outlined">
          {error &&
            <Alert severity="error" variant="outlined"
              sx={{
                width: '100%', display: 'flex',
                flexDirection: 'column',
                alignSelf: 'center',

              }} >
              {error}
            </Alert>
          }
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Register
          </Typography>


          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

            <Form onSubmit={handleSubmit} replace>

              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                onChange={handleChange}
                required
                fullWidth
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                variant="outlined"
              />

              <FormLabel htmlFor="name">Name</FormLabel>
              <TextField
                onChange={handleChange}

                autoComplete="name"
                name="name"
                required
                fullWidth
                id="name"
                placeholder="JonSnow1337"
              />


              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                onChange={handleChange}
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
                onChange={handleChange}
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
