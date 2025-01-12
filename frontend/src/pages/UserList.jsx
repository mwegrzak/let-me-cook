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
      if (response) {
        setUsers(response)
      }
      setLoading(false)

    }
    getUsers()
  }, [])


  const handleDelete = async (userId) => {
    const response = await fetchDelete(`/api/admin/user/${userId}`)
    if (response.ok) {
      const updatedUsers = response.filter(user => user.id != userId)
      console.log(updatedUsers)
      setUsers(updatedUsers)
    }
    else {
      console.log(response.error)
    }

  }

  return (
    <>
      {loading
        ? <h1>Loading...</h1>
        : users.map((user) => (<UserTile key={user.id} user={user} onDelete={() => handleDelete(user.id)} />))}
    </>
  );
}
