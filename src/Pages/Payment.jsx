import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Payment = () => {
  const axiosSecure = useAxiosSecure();

  const { user } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistory/${user?.email}`);
      return res.data.data;
    },
  });

  if(data?.length === 0){
    return (
       <div className=" flex justify-center items-center min-h-screen"><h1 className="text-3xl font-bold text-bg3">You havent made any payments yet.</h1></div>

    )
  }


  return (
    <div className="mt-[64px] ">
      <div className="overflow-x-auto">
        <table className="table table-zebra ">
          {/* head */}
          <thead className="bg-bg3 text-white">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>productName</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item,index)=>{

              return (
                <tr className="bg-bg2">
              <th>{index +1}</th>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.PaidStatus ? 'payment success': 'Not Payment'}</td>
              <td>
              <ul className="list-disc pl-5">
                {item.orderName.map((name, i) => (
                  <li key={i}>{name}</li>
                ))}
              </ul>
            </td>


              
            </tr>

              )
            })}
            
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;
