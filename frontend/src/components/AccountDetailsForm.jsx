import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Grid2 as Grid } from '@mui/material';

const states = [
    { value: 'alabama', label: 'Alabama' },
    { value: 'new-york', label: 'New York' },
    { value: 'san-francisco', label: 'San Francisco' },
    { value: 'los-angeles', label: 'Los Angeles' },
];

export default function AccountDetailsForm() {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
            }}
        >
            <Card >
                <CardHeader subheader="The information can be edited" title="Profile" />

                <CardContent>
                    <Grid container spacing={3} display='flex'>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>First name</InputLabel>
                                <OutlinedInput defaultValue="Sofia" label="First name" name="firstName" />
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Last name</InputLabel>
                                <OutlinedInput defaultValue="Rivers" label="Last name" name="lastName" />
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Email address</InputLabel>
                                <OutlinedInput defaultValue="sofia@devias.io" label="Email address" name="email" />
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Phone number</InputLabel>
                                <OutlinedInput label="Phone number" name="phone" type="tel" />
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>State</InputLabel>
                                <Select defaultValue="New York" label="State" name="state" variant="outlined">
                                    {states.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>City</InputLabel>
                                <OutlinedInput label="City" />
                            </FormControl>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained">Save details</Button>
                </CardActions>
            </Card>
        </form>
    );
}
