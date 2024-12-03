import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import letMeCookLogo from '../images/letmecook.webp';
import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';

import { userContext } from '../userContext';

import '@mui/system';
import { color } from '@mui/system';


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

const logout = (toggleLogin) => {
  fetch('http://localhost:4000/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  })
  .then(() => {
    toggleLogin(); 
    window.location.href = '/';
  })
}

export default function NavBar() {
  const {isLoggedIn, user, toggleLogin} = useContext(userContext);

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
      {JSON.stringify(isLoggedIn)}
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button component={NavLink} to="/" variant="outlined" color="info" size="small">All recipes</Button>
              <Button component={NavLink} to="/recipes" variant="outlined" color="info" size="small">My recipes</Button>
              <Button component={NavLink} to="/recipes/add" variant="outlined" color="info" size="small">Add recipe</Button>
            </Box>
          </Box>

          {isLoggedIn ? (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center', }}>
              <Box sx={{ color: 'text.primary' }}>Welcome, {user.name}</Box>
              <Button component={NavLink} to="/profile" variant="outlined" color="info" size="small">Profile</Button>
              <Button color="info" variant="contained" size="small" onClick={() => logout(toggleLogin)}>Logout</Button>
              <ColorModeIconDropdown />
            </Box>
          ) : (
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center', }}>
            <Button component={NavLink} to="/login" color="primary" variant="outlined" size="small">Login</Button>
            <Button component={NavLink} to="/register" color="primary" variant="contained" size="small">Register</Button>
            <Button component={NavLink} to="/profile" variant="outlined" color="info" size="small">Profile</Button>
            <Button component={NavLink} to="/" color="outlined" variant="contained" size="small">Logout</Button>
            <ColorModeIconDropdown />
          </Box>
          )}

        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
