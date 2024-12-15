import React from 'react';
import { Box, Card, CardContent, Typography, Grid2 as Grid } from '@mui/material';
import { PersonOutline, Star, Fastfood } from '@mui/icons-material';

// Mock data for the dashboard
const dashboardData = {
  totalUsers: 350,
  totalPublishedRecipes: 150,
  totalRecipes: 200,
  topRatedRecipe: {
    title: "Classic Lasagna",
    rating: 4.8,
  },
};

const AdminPanelDashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>

        {/* Total Number of Users */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center',
            padding: 2, backgroundColor: '#e3f2fd', boxShadow: 3
          }}>
            <CardContent>
              <PersonOutline sx={{ fontSize: 50, color: '#1976d2', marginBottom: 2 }} />
              <Typography variant="h6" sx={{ color: '#1976d2', fontWeight: 'bold' }}>Total Users</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                {dashboardData.totalUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>


        {/* Total Published Recipes */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center',
            padding: 2, backgroundColor: '#f1f8e9', boxShadow: 3
          }}>
            <CardContent>
              <Fastfood sx={{ fontSize: 50, color: '#4caf50', marginBottom: 2 }} />
              <Typography variant="h6" sx={{ color: '#4caf50', fontWeight: 'bold' }}>Total Published Recipes</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                {dashboardData.totalPublishedRecipes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>


        {/* Total Recipes */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center',
            padding: 2, backgroundColor: '#fff3e0', boxShadow: 3
          }}>
            <CardContent>
              <Fastfood sx={{ fontSize: 50, color: '#ff9800', marginBottom: 2 }} />
              <Typography variant="h6" sx={{ color: '#ff9800', fontWeight: 'bold' }}>Total Recipes</Typography>
              <Typography variant="h4" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                {dashboardData.totalRecipes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>


        {/* Top Rated Recipe */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center',
            padding: 2, backgroundColor: '#fce4ec', boxShadow: 3
          }}>
            <CardContent>
              <Star sx={{ fontSize: 50, color: '#e91e63', marginBottom: 2 }} />
              <Typography variant="h6" sx={{ color: '#e91e63', fontWeight: 'bold' }}>Top Rated Recipe</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                {dashboardData.topRatedRecipe.title}
              </Typography>
              <Typography variant="body1">Rating: {dashboardData.topRatedRecipe.rating} / 5</Typography>
            </CardContent>
          </Card>
        </Grid>


      </Grid>
    </Box>
  );
};

export default AdminPanelDashboard;
