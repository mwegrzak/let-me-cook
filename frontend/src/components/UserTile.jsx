import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, Typography, Button, Avatar, Box, Checkbox } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, AdminPanelSettings } from '@mui/icons-material';

const UserTile = ({ user, onDelete }) => {
    const { name, email, id, isAdmin } = user;

    return (
        <Card sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderRadius: '25px',
            padding: 2,
            width: '100%',
            boxShadow: 3,
        }}>
            <Box display='flex' alignItems='center'>
                <Avatar alt={`${name}`} sx={{ width: 56, height: 56, mr: 3 }} />
                <Box>
                    <Typography variant="h6">{name}</Typography>
                    {isAdmin && <Typography variant="subtitle2">Admin</Typography>}
                </Box>
            </Box>

            <Typography variant="body2" color="text.secondary">{email}</Typography>
            <Box>
                <Button component={NavLink} to={`${id}`} variant="outlined" startIcon={<EditIcon />}>
                    Edit
                </Button>
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => onDelete(id)}>
                    Delete
                </Button>
            </Box>
        </Card>
    );
};

export default UserTile;
