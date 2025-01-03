import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItemButton, ListItemText, Divider, IconButton, Box } from '@mui/material';
import { Dashboard as DashboardIcon, People as PeopleIcon, LocalDining as LocalDiningIcon, Close as CloseIcon } from '@mui/icons-material';

export default function AdminSidebar() {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Drawer
            sx={{
                '& .MuiDrawer-paper': {
                    width: 250,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
                <h2>Admin Panel</h2>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <List>
                <ListItemButton key="Dashboard" component={NavLink} to="/admin">
                    <DashboardIcon />
                    <ListItemText primary="Dashboard" />
                </ListItemButton>
                <ListItemButton component={NavLink} to="/admin/users">
                    <PeopleIcon />
                    <ListItemText primary="Users" />
                </ListItemButton>
                <ListItemButton component={NavLink} to="/admin/recipes">
                    <LocalDiningIcon />
                    <ListItemText primary="Recipes" />
                </ListItemButton>
            </List>
        </Drawer>

    );
};
