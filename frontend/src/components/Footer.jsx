// Footer.jsx
import React from 'react';
import { Box, Button, Container, Divider, IconButton, InputLabel, Link, Stack, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // For routing
import GithubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link
        color="text.secondary"
        component={RouterLink}
        to="/" // Link back to your home page
        sx={{ textDecoration: 'none' }}
      >
        Let Me Cook
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <React.Fragment>
      <Divider />
      <Box
        component="footer"
        sx={{
          py: 6,
          mt: 6,
        }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 4, sm: 6 },
            justifyContent: 'center',
          }}
        >
          {/* Newsletter subscription (optional) */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 3,
              mb: 4,
            }}
          >
            <Box sx={{ maxWidth: 400 }}>
              <Typography variant="h6" gutterBottom>
                Join the Newsletter
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Subscribe for weekly updates. No spam, ever!
              </Typography>
              <InputLabel htmlFor="email-newsletter">Email</InputLabel>
              <Stack direction="row" spacing={1} useFlexGap>
                <TextField
                  id="email-newsletter"
                  size="small"
                  variant="outlined"
                  fullWidth
                  aria-label="Enter your email address"
                  placeholder="Your email address"
                  sx={{ width: '250px' }}
                />
                <Button variant="contained" color="primary" size="small">
                  Subscribe
                </Button>
              </Stack>
            </Box>

            {/* Social icons */}
            <Stack direction="row" spacing={1} sx={{ alignSelf: 'center' }}>
              <IconButton
                color="inherit"
                size="medium"
                href="https://github.com/YourGithub"
                aria-label="GitHub"
              >
                <GithubIcon />
              </IconButton>
              <IconButton
                color="inherit"
                size="medium"
                href="https://x.com/YourTwitter"
                aria-label="Twitter"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton
                color="inherit"
                size="medium"
                href="https://www.linkedin.com/company/YourLinkedIn"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </IconButton>
            </Stack>
          </Box>

          {/* Footer navigation */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-around',
              alignItems: 'flex-start',
              gap: { xs: 4, sm: 8 },
            }}
          >
            {/* Column 1 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Explore
              </Typography>
              <Link
                component={RouterLink}
                to="/"
                color="text.secondary"
                variant="body2"
                underline="hover"
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/login"
                color="text.secondary"
                variant="body2"
                underline="hover"
              >
                Login
              </Link>
              <Link
                component={RouterLink}
                to="/register"
                color="text.secondary"
                variant="body2"
                underline="hover"
              >
                Register
              </Link>
            </Box>

            {/* Column 2 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                My Account
              </Typography>
              <Link
                component={RouterLink}
                to="/my-recipes"
                color="text.secondary"
                variant="body2"
                underline="hover"
              >
                My Recipes
              </Link>
              <Link
                component={RouterLink}
                to="/user"
                color="text.secondary"
                variant="body2"
                underline="hover"
              >
                Profile
              </Link>
            </Box>

            {/* Column 3 (Admin) */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Admin
              </Typography>
              <Link
                component={RouterLink}
                to="/admin"
                color="text.secondary"
                variant="body2"
                underline="hover"
              >
                Dashboard
              </Link>
              <Link
                component={RouterLink}
                to="/admin/users"
                color="text.secondary"
                variant="body2"
                underline="hover"
              >
                User Management
              </Link>
              <Link
                component={RouterLink}
                to="/admin/recipes"
                color="text.secondary"
                variant="body2"
                underline="hover"
              >
                Recipe Management
              </Link>
            </Box>
          </Box>

          {/* Bottom row */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: { xs: 'center', sm: 'space-between' },
              alignItems: 'center',
              mt: 4,
              pt: 3,
              borderTop: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Copyright />
          </Box>
        </Container>
      </Box>
    </React.Fragment>
  );
}
