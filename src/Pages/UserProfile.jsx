import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const UserProfile = () => {
  const {user}=useContext(AuthContext);

  console.log(user)


  return (
    <div>
      <h1>UserProfile</h1>

      <div>
        <img src={user?.photoURL} alt="profile" />
        <h1>{user?.displayName}</h1>
      </div>
    </div>
  )
}

export default UserProfile