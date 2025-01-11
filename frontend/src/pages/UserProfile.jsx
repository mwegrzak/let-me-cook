import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Form } from 'react-router-dom';
import { Avatar, Button, Card, CardActions, CardContent, Divider, Stack, Typography, Box, CardHeader, Grid2 as Grid, FormControl, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { fetchPut, fetchGet } from '../utils/api';
import { useUser } from '../UserContext.jsx'


export default function UserProfile(props) {
  const { isLoggedIn, user } = useUser()
  const params = useParams()
  const location = useLocation()
  const [formData, setFormData] = useState(
    {
      name: user.name,
      email: user.email,
      // id: user.id,
      // aboutMe: 'I love cocking',
      // favouriteCuisine: 'Spanish',
      // avatar: '/assets/avatar.png',

    }
  )

  useEffect(() => {
    async function getUser() {
      if (location.pathname.includes('/admin/user')) {
        const response = fetchGet(`/api/user/${params.id}`)
        setFormData(response)
      }
    }
    getUser()
  }, [])



  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(values => ({ ...values, [name]: value }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetchPut(`/api/user/${formData.id}`,
      {
        email: formData.email,
        name: formData.name,
        // lastName: formData.lastName,
        // favouriteCuisine: formData.favouriteCuisine,
        // aboutMe: formData.aboutMe
      })
    if (response.id) {
      toggleLogin(response);
      navigate("/", replace);
    }
    else {
      setError(response.error)
    }

  }

  return (
    <>
      <Typography variant="h4">Account</Typography>

      <Box direction='column' display='flex' >

        <Card sx={{ minWidth: "20em", marginRight: "20px" }}>
          <CardContent>
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
              <div>
                <Avatar src={formData.avatar} sx={{ height: '80px', width: '80px' }}>SR</Avatar>
              </div>
              <Stack spacing={1} sx={{ textAlign: 'center' }}>
                <Typography variant="h5">{formData.name}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {formData.city} {formData.country}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {formData.timezone}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
          <Divider />
          <CardActions>
            <Button fullWidth variant="text" disabled>
              Upload picture
            </Button>
          </CardActions>
        </Card>


        <Card sx={{ minWidth: "50em", maxWidth: false }}>
          <Form onSubmit={handleSubmit}>
            <CardHeader title="Profile" sx={{ marginBottom: "20px" }} />

            <CardContent>
              <Grid container justifyContent='center' alignItems='center'>

                <Grid container my={1}>
                  <Grid item md={6} xs={12} mr={4}>
                    <FormControl fullWidth>
                      <InputLabel>Name</InputLabel>
                      <OutlinedInput defaultValue={formData.name} label="Name" name="name" />
                    </FormControl>
                  </Grid>

                  {/* <Grid item md={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Last name</InputLabel>
                      <OutlinedInput defaultValue={formData.lastName} label="Last name" name="lastName" />
                    </FormControl>
                  </Grid>*/}
                </Grid>

                <Grid container my={1}>
                  <Grid item md={6} xs={12} mr={4}>
                    <FormControl fullWidth>
                      <InputLabel>Email address</InputLabel>
                      <OutlinedInput onChange={handleChange} defaultValue={formData.email} label="Email address" name="email" />
                    </FormControl>
                  </Grid>

                  {/* <Grid item md={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Favourite cuisine</InputLabel>
                      <OutlinedInput onChange={handleChange} defaultValue={formData.favouriteCuisine} label="favouriteCuisine" name="favouriteCuisine" />
                    </FormControl>
                  </Grid> */}
                </Grid>
              </Grid>

              {/* <Grid container >
                <Box justifyContent={'center'}>
                  <TextField name="bio"
                    label='About me'
                    variant="outlined"
                    onChange={handleChange}
                    defaultValue={formData.aboutMe}
                    rows={4}
                    multiline
                    sx={{
                      width: { sm: 600, md: 600 },
                      "& .MuiInputBase-root": { height: 100 }
                    }}
                  />
                </Box>

              </Grid> */}
            </CardContent>

            <CardActions sx={{ marginTop: "30px", justifyContent: 'flex-end' }}>
              <Button variant="contained" type="submit">Save details</Button>
            </CardActions>
          </Form>
        </Card>

      </Box>
    </>
  );
}
