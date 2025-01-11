import React, { useState } from 'react';
import { Form, useNavigate, replace, NavLink } from 'react-router-dom';
import { Box, Button, FormLabel, Link, TextField, Typography, Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, OutlinedInput, DialogActions } from '@mui/material'
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { SitemarkIcon } from '../components/CustomIcons';
import { fetchPost } from '../utils/api';
import { useUser, useUpdateUser } from '../UserContext';

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

export default function Login(props) {

  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [openSnackBar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", forgotPasswordEmail: "" });
  const { isLoggedIn, user } = useUser()
  const toggleLogin = useUpdateUser();
  let navigate = useNavigate()


  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/auth/passwordreset', { email: formData.forgotPasswordEmail })
    console.log(response)
    setOpenSnackbar(true)

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetchPost('/api/auth/login', { email: formData.email, password: formData.password })
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
  const handleClickOpen = () => {
    setOpenForgotPassword(true);
  };

  const handleClose = () => {
    setOpenForgotPassword(false);
    return null
  };

  const handleCloseSnackBar = () => {
    setOpenSnackbar(false);
    return null
  };

  return (
    <>
      <Box direction="column" justifyContent="space-between">
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

            <Form onSubmit={handleSubmit} replace>
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
                onChange={handleChange}
                value={formData.email}
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
                onChange={handleChange}
                value={formData.password}
                variant="outlined"
              />

              <Button type="submit" fullWidth variant="contained">
                Sign in
              </Button>
            </Form>

            {/* **************************************
            ***************** Modal ***************** 
            **************************************
            */}


            <Dialog
              open={openForgotPassword}
              onClose={handleClose}
              PaperProps={{
                sx: { backgroundImage: 'none' },
              }}
            >
              <Form onSubmit={handleForgotPasswordSubmit}>

                <DialogTitle>Reset password</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
                  <DialogContentText>
                    Enter your account's email address and we'll send you a link to reset your password.
                  </DialogContentText>
                  <OutlinedInput
                    autoFocus
                    required
                    margin="dense"
                    id="forgotPasswordEmail"
                    type="email"
                    name="forgotPasswordEmail"
                    autoComplete="email"
                    placeholder="your@email.com"
                    onChange={handleChange}
                    value={formData.forgotPasswordEmail}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions sx={{ pb: 3, px: 3 }}>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button type="submit" variant="contained">
                    Continue
                  </Button>
                </DialogActions>
              </Form>

            </Dialog>

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
        <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleCloseSnackBar}>
          <Alert
            onClose={handleCloseSnackBar}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Password reminder has been successfully submitted. <br />
            If you registered an account we will send you an email with a reset link.
          </Alert>
        </Snackbar>
      </Box >
    </>
  );
}
