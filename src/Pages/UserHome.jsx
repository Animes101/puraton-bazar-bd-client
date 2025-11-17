import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const UserHome = () => {
  const {user}=useContext(AuthContext);
  return (
    <div>
      <h1>Well come {user.displayName}</h1>
    </div>
  )
}

export default UserHome