import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import useAxiosSecure from './useAxiosSecure';

const useAdmin = () => {

    const {user}=useContext(AuthContext);
    const axiosSecure=useAxiosSecure();


    const {data:isAdmin}=useQuery({
        queryKey:['users'],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/users/admin/${user?.email}`);
            return res.data;
        }
    })

    return isAdmin?.isAdmin;

  
}

export default useAdmin