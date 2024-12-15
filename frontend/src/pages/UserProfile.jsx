import React from 'react';
import { Avatar, Button, Card, CardActions, CardContent, Divider, Stack, Typography, Box, CardHeader, Grid2 as Grid, FormControl, InputLabel, OutlinedInput, } from '@mui/material';

const states = [
  { value: 'alabama', label: 'Alabama' },
  { value: 'new-york', label: 'New York' },
  { value: 'san-francisco', label: 'San Francisco' },
  { value: 'los-angeles', label: 'Los Angeles' },
];

const user = {
  name: 'Sofia Rivers',
  avatar: '/assets/avatar.png',
  jobTitle: 'Senior Developer',
  country: 'USA',
  city: 'Los Angeles',
  timezone: 'GTM-7',
};

export default function UserProfile(props) {

  return (
    <>
      <Typography variant="h4">Account</Typography>

      <Box direction='column' display='flex' >

        <Card sx={{ minWidth: "20em", marginRight: "20px" }}>
          <CardContent>
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
              <div>
                <Avatar src={user.avatar} sx={{ height: '80px', width: '80px' }}>SR</Avatar>
              </div>
              <Stack spacing={1} sx={{ textAlign: 'center' }}>
                <Typography variant="h5">{user.name}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {user.city} {user.country}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {user.timezone}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
          <Divider />
          <CardActions>
            <Button fullWidth variant="text">
              Upload picture
            </Button>
          </CardActions>
        </Card>


        <Card sx={{ minWidth: "50em", maxWidth: false }}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <CardHeader title="Profile" sx={{ marginBottom: "20px" }} />

            <CardContent>
              <Grid container justifyContent='center'>

                <Grid container my={1}>
                  <Grid item md={6} xs={12} mr={2}>
                    <FormControl fullWidth>
                      <InputLabel>First name</InputLabel>
                      <OutlinedInput defaultValue="Sofia" label="First name" name="firstName" />
                    </FormControl>
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Last name</InputLabel>
                      <OutlinedInput defaultValue="Rivers" label="Last name" name="lastName" />
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container my={1}>
                  <Grid item md={6} xs={12} mr={2}>
                    <FormControl fullWidth>
                      <InputLabel>Email address</InputLabel>
                      <OutlinedInput defaultValue="sofia@devias.io" label="Email address" name="email" />
                    </FormControl>
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Favourite cuisine</InputLabel>
                      <OutlinedInput defaultValue="" label="Email address" name="favouriteCuisine" />
                    </FormControl>
                  </Grid>
                </Grid>

              </Grid>
            </CardContent>

            <CardActions sx={{ marginTop: "30px", justifyContent: 'flex-end' }}>
              <Button variant="contained">Save details</Button>
            </CardActions>
          </form>
        </Card>

      </Box>
    </>
  );
}
