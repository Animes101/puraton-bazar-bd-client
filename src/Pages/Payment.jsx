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


  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table ">
          {/* head */}
          <thead>
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

              console.log(item)
              return (
                <tr className="bg-base-200">
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
