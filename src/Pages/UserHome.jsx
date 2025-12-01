import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const UserHome = () => {
  const {user}=useContext(AuthContext);
  return (
    <div >
      <h1 className='text-3xl font-bold '>WelCome Back {user.displayName}</h1>
    </div>
  )
}

export default UserHome