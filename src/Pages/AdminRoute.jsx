import React from 'react'
import { useContext } from 'react'
import useAdmin from '../hooks/useAdmin'
import { AuthContext } from '../context/AuthProvider'
import { Children } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const AdminRoute = ({children}) =>{

    const location=useLocation();

    const {user, isLoading:authLoading}=useContext(AuthContext);
     const {isAdmin, isLoading}=useAdmin();

     if(authLoading || isLoading){
        return <div> Loading ..................</div>
     }

     if(isAdmin && user){
        return children
     }


     <Navigate to="/login" state={location.pathname} replace></Navigate>



   
  
}

export default AdminRoute