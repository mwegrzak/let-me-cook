import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Button, Container, alpha, styled } from '@mui/material';
import letMeCookLogo from '../images/letmecook.webp';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import { useUser, useUpdateUser } from '../UserContext.js'
import { fetchPost } from '../utils/api.js';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));


export default function NavBar() {

  const { isLoggedIn, user } = useUser()
  const toggleLogin = useUpdateUser()
  let navigate = useNavigate()


  const logout = async (toggleLogin) => {
    fetch('http://localhost:4000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(() => {
        toggleLogin();
        navigate("/", { replace: true })
      })
  }

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button component={NavLink} to="/" variant="outlined" color="info" size="small">All recipes</Button>
              {isLoggedIn && (
                <>
                  <Button component={NavLink} to="/my-recipes" variant="outlined" color="info" size="small">My recipes</Button>
                  <Button component={NavLink} to="/my-recipes/add" variant="outlined" color="info" size="small">Add recipe</Button>
                </>
              )}
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center', }}>
            {isLoggedIn ? (
              <>
                <Box sx={{ color: 'text.primary' }}>Welcome, {user.name}</Box>
                <Button component={NavLink} to="/user" variant="outlined" color="info" size="small">Profile</Button>
                <Button component={NavLink} to="/admin" variant="outlined" color="info" size="small">Admin panel</Button>
                <Button color="info" variant="contained" size="small" onClick={() => logout(toggleLogin)}>Logout</Button>
                <ColorModeIconDropdown />
              </>
            ) : (
              <>
                <Button component={NavLink} to="/login" color="primary" variant="outlined" size="small">Login</Button>
                <Button component={NavLink} to="/register" color="primary" variant="contained" size="small">Register</Button>
                <ColorModeIconDropdown />
              </>
            )
            }
          </Box>

        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
