import React from 'react';
import { Card, CardContent, Typography, Button, Avatar, Box } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

const UserTile = ({ user, onEdit, onDelete }) => {
    const { name, surname, email, avatarUrl, creationDate } = user;

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
                <Avatar src={avatarUrl} alt={`${name} ${surname}`} sx={{ width: 56, height: 56, mr: 3 }} />
                <Typography variant="h6">{name} {surname}</Typography>
            </Box>

            <Typography variant="body2" color="text.secondary">{email}</Typography>
            <Typography variant="body2" color="text.secondary">Created: {creationDate}</Typography>
            <Box>
                <Button variant="outlined" startIcon={<EditIcon />} onClick={() => onEdit(user)}  >
                    Edit
                </Button>
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => onDelete(user)}>
                    Delete
                </Button>
            </Box>
        </Card>
    );
};

export default UserTile;
