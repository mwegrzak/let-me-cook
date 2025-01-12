import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Form } from 'react-router-dom';
import { Avatar, Button, Card, CardActions, CardContent, Divider, Stack, Typography, Box, CardHeader, Grid2 as Grid, FormControl, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { fetchPut, fetchGet } from '../utils/api';
import { useUser, useUpdateUser } from '../UserContext.jsx'


export default function UserProfile(props) {
  const { isLoggedIn, user } = useUser()
  const params = useParams()
  const toggleLogin = useUpdateUser();
  const location = useLocation()
  const [formData, setFormData] = useState(
    {
      name: user.name,
      email: user.email,
      isAdmin: false
    }
  )

  useEffect(() => {
    async function getUser() {
      if (location.pathname.includes('admin')) {
        const response = fetchGet(`/api/admin/user/${params.id}`)
        console.log(response)
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

    if (location.pathname.includes('admin')) {
      const response = await fetchPut(`/api/admin/user/${params.id}`,
        {
          email: formData.email,
          name: formData.name,
          isAdmin: formData.isAdmin
        })
    }
    else {
      const response = await fetchPut(`/api/user/${user.id}`,
        {
          email: formData.email,
          name: formData.name,
        })
      console.log(response)

      if (response.id) {
        toggleLogin(response);
        navigate("/", replace);
      }
      else {
        setError(response.error)
      }
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
                      <OutlinedInput onChange={handleChange} value={formData.name} label="Name" name="name" />
                    </FormControl>
                  </Grid>

                </Grid>

                <Grid container my={1}>
                  <Grid item md={6} xs={12} mr={4}>
                    <FormControl fullWidth>
                      <InputLabel>Email address</InputLabel>
                      <OutlinedInput onChange={handleChange} value={formData.email} label="Email address" name="email" />
                    </FormControl>
                  </Grid>

                </Grid>
              </Grid>

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
