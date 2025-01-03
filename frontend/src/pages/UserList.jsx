import React, { useEffect, useState } from 'react';
import UserTile from '../components/UserTile.jsx'
import { fetchDelete, fetchGet } from '../utils/api.js'

export default function UserList(props) {

  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])


  useEffect(() => {
    async function getUsers() {
      setLoading(true)
      const response = await fetchGet('/api/user/')
      console.log(response)
      setUsers(response)
      setLoading(false)
    }
    getUsers()
  }, [])


  const handleDelete = async (userId) => {
    console.log(userId)

    try {
      const response = await fetchDelete(`/api/user/${userId}`)
      console.log(response)
      return response
    }
    catch (err) {
      console.log(err)
      return err
    }

  }

  const testUsers = [
    { name: 'John', surname: 'Doe', email: 'johndoe@example.local', avatarUrl: '', creationDate: '15.12.2024', userId: 1 },
    { name: 'John', surname: 'Doe', email: 'johndoe@example.local', avatarUrl: '', creationDate: '15.12.2024', userId: 2 },
    { name: 'John', surname: 'Doe', email: 'johndoe@example.local', avatarUrl: '', creationDate: '15.12.2024', userId: 3 }
  ]
  return (
    <>
      {testUsers.map((user) => (
        <UserTile key={user.userId} user={user} onDelete={() => handleDelete(user.userId)} />
      ))}
    </>
  );
}
