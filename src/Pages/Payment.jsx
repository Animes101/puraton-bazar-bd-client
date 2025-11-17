import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Payment = () => {

  const axiosSecure=useAxiosSecure();

  const {user}=useContext(AuthContext);

  const {data, isLoading}=useQuery({
        queryKey:['payment', user?.email],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/paymentHistory/${user?.email}`);
            return res.data.data;
        }
    })

    console.log(data);

  return (
    <div>Payment</div>
  )
}

export default Payment