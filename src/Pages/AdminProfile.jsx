import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'

const AdminProfile = () => {
  const {user}=useContext(AuthContext)
  return (
    <div>
      <div>
        <h1 className='text-center py-10 font-bold text-4xl'>{user?.displayName}</h1>

      </div>
    </div>
  )
}

export default AdminProfile