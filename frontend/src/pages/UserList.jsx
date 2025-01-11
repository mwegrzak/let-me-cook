import React, { useEffect, useState } from 'react';
import UserTile from '../components/UserTile.jsx'
import { fetchDelete, fetchGet } from '../utils/api.js'

export default function UserList(props) {

  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])


  useEffect(() => {
    async function getUsers() {
      setLoading(true)
      const response = await fetchGet('/api/admin/user')
      if (response.ok) {
        setUsers(response)
      }
      setLoading(false)
    }
    getUsers()
  }, [])


  const handleDelete = async (userId) => {
    console.log(userId)

    try {
      const response = await fetchDelete(`/api/admin/user/${userId}`)
      console.log(response)
      return response
    }
    catch (err) {
      console.log(err)
      return err
    }

  }

  return (
    <>
      {users.map((user) => (
        <UserTile key={user.id} user={user} onDelete={() => handleDelete(user.userId)} />
      ))}
    </>
  );
}
