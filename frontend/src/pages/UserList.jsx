import React from 'react';
import Box from '@mui/material/Container';
import UserTile from '../components/UserTile.jsx'

export default function UserList(props) {

  const onEdit = (userId) => {
    return
  }

  const user = { name: 'John', surname: 'Doe', email: 'johndoe@example.local', avatarUrl: '', creationDate: '15.12.2024', userId: 3 }
  return (
    <>

      <UserTile user={user} />
      <UserTile user={user} />
      <UserTile user={user} />
    </>
  );
}
