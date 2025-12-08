import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const UserHome = () => {
  const {user}=useContext(AuthContext);
  const axiosSecure=useAxiosSecure();

  const {data, isLoading}=useQuery({
    queryKey:['users', user?.email],
    queryFn: async()=>{
      const res= await axiosSecure.get(`/dashboard-state/${user?.email}`);
      return res.data;
    }
  })

  console.log(data);


  return (
    <div className='' >
      <h1 className='text-2xl font-bold '>WelCome Back {user.displayName}</h1>
      <div>
        {/* BarChart */}
        <div>
     {!isLoading && data && (

        <BarChart
      style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="catagory" />
      <YAxis dataKey="quentity" width="auto" />
      <Tooltip />
      <Legend />
      <Bar dataKey="catagory" fill="#5b6e74" activeBar={<Rectangle fill="#819fa7" stroke="blue" />} />
      <Bar dataKey="quentity" fill="#5b6e74" activeBar={<Rectangle fill="#819fa7" stroke="purple" />} />
    </BarChart>



)}

        </div>
        {/* Bar Chart2 */}
        <div>

        </div>
      </div>
    </div>
  )
}

export default UserHome