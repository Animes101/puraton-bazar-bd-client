
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Payment = () => {
        

  const [currentPage, setCurrentPage]=useState(0);


  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);


  const { data, isLoading } = useQuery({
    queryKey: ["payment", user?.email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistory/${user?.email}?skip=${currentPage}&limit=${10}`);
      return res.data;
    },
  });



  //pagination
  const totalPayments=data?.totalPayment;
  const totapPages=Math.ceil(totalPayments / 10)

  const pages=[];

  for(let i=0; i < totapPages; i++){

    pages.push(i);
  }

  const handlePrev=()=>{

    if(currentPage> 0){
      setCurrentPage(currentPage -1);
    }

  }

  const handleNext=()=>{

    if(currentPage < pages.length -1){
      setCurrentPage(currentPage +1)
    }

  }


  // 🔵 Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-bg3"></span>
          <h2 className="text-xl mt-3 font-semibold text-bg3">
            Loading Payment History...
          </h2>
        </div>
      </div>
    );
  }

  // No payments
  if (data?.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-3xl font-bold text-bg3">
          You haven't made any payments yet.
        </h1>
      </div>
    );
  }


  return (
    <div className="mt-[64px] p-5">
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-bg3 text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
              <th>Delivery</th>
              <th>Product Name</th>
            </tr>
          </thead>

          <tbody className="bg-btnBg/80">
            {data.data.map((item, index) => (
              <tr key={index} className="bg-bg2">
                <th>{ index +1}</th>
                <td className="text-xl font-bold text-bg3">{item.name}</td>
                <td className="font-bold text-xl text-bg3 ">{item.price.toLocaleString()} ৳</td>

                <td className={item.PaidStatus ? "text-bg3 font-bold" : "text-btnBg font-bold"}>
                  {item.PaidStatus ? "Payment Success" : "Not Paid"}
                </td>

                <td className={item.successStatus ? "text-bg3 font-bold" : "text-btnBg font-bold"}>
                  {item.successStatus ? "Delivered" : "Pending"}
                </td>
                <td>
                  <ul className="list-disc pl-5">
                    {item.orderName.map((name, i) => (
                      <li key={i}>{name}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))} 
          </tbody> 
        </table>

        {/* ======================
                PAGINATION
        ====================== */}
        {pages.length > 1 && (
  <div className="flex justify-center gap-5 mt-5">

    <button
      onClick={handlePrev}
      disabled={currentPage === 0}
      className="px-4 py-2 rounded bg-bg3 text-white disabled:bg-gray-400"
    >
      Previous
    </button>

    {pages.map((pageIndex) => (
      <button
        key={pageIndex}
        onClick={() => setCurrentPage(pageIndex)}
        className={
          currentPage === pageIndex
            ? "px-4 py-2 rounded bg-bg3 text-white"
            : "px-4 py-2 rounded bg-gray-200 text-gray-700"
        }
      >
        {pageIndex}
      </button>
    ))}

    <button
      onClick={handleNext}
      disabled={currentPage === pages.length - 1}
      className="px-4 py-2 rounded bg-bg3 text-white disabled:bg-gray-400"
    >
      Next
    </button>

  </div>
)}

      </div>
    </div>
  );
};

export default Payment;
