import React from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

const AdminPaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  
  const [currentPage, setCurrentPage]=useState(0);
    const itemPerpage = 10;
  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ["paymentAll", currentPage,],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-all?page=${currentPage}&skip=${itemPerpage}`);
      return res.data || [];
    },
  });
  const totalPage=data.totalPayment;
  const numberOfPages=Math.ceil(totalPage / itemPerpage);
  const pages=[];


  for(let i=0; i < numberOfPages ; i++){

    pages.push(i)

  }

  const handlePrev=()=>{

    if(currentPage >0){
        setCurrentPage(currentPage -1 )
    }
    
  }

  const handleNext=()=>{

    if(currentPage< pages.length -1 ){
        setCurrentPage(currentPage + 1)
    }
    
  }

 const handleAprove = (_id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to Aprove this order?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#5b6e74",
    cancelButtonColor: "#F1C40F",
    background: "#f2f2f0",
    confirmButtonText: "Yes, Approve it!",
    iconColor:'#F1C40F',
    color:'#5b6e74',
  }).then((result) => {
    if (result.isConfirmed) {
      
      axiosSecure.patch(`/payment-status/${_id}`)
        .then((res) => {
          if (res.data.result.modifiedCount > 0) {
            refetch();

            Swal.fire({
              title: "Approved",
              text: "Order has been Approved successfully.",
              icon: "success",
              confirmButtonColor: "#5b6e74",
              background: "#f2f2f0",
              iconColor:'#F1C40F',
              color:'#5b6e74',

            });
          }
        })
        .catch((err) => toast.error(`${err.message}`));
    }
  });
};

 const handleCancel = (_id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to Cancel this order?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#5b6e74",
    cancelButtonColor: "#F1C40F",
    background: "#f2f2f0",
    confirmButtonText: "Yes, Approve it!",
    iconColor:'#F1C40F',
    color:'#5b6e74',
  }).then((result) => {
    if (result.isConfirmed) {
      
      axiosSecure.patch(`/payment-cancel/${_id}`)
        .then((res) => {
          if (res.data.result.modifiedCount > 0) {
            refetch();

            Swal.fire({
              title: "Cancelled!",
              text: "Order has been cancelled successfully.",
              icon: "success",
              confirmButtonColor: "#5b6e74",
              background: "#f2f2f0",
            });
          }
        })
        .catch((err) => toast.error(`${err.message}`));
    }
  });
};



  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-5">Admin Payment History</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full border rounded-lg">
          <thead className="bg-bg3 font-bold text-white">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Products</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody className="bg-bg4/30">
            {data?.data?.map((item, index) => {
              const products =
                Array.isArray(item.id) &&
                Array.isArray(item.orderName) &&
                item.id.length === item.orderName.length
                  ? item.id.map((productId, i) => ({
                      id: productId,
                      name: item.orderName[i],
                    }))
                  : [];

              return (
                <tr key={item._id} className="hover">
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>

                  <td>
                    {products.map((p, i) => (
                      <p key={i} className="text-sm">
                        {p.name}
                        <span className="text-gray-500"> (ID: {p.id})</span>
                      </p>
                    ))}
                  </td>

                  <td>৳ {item.price}</td>
                  <td className="text-btnBg font-semibold">
                    {item.tran_id}
                  </td>
                  <td><button onClick={()=> item.successStatus ? handleCancel(item._id): handleAprove(item._id)}  className={`btn p-2 bg-bg3 ${ item.successStatus ? 'text-white': 'text-btnBg'}`}>{item.successStatus == true ? 'Aprove': 'Pending'}</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {data.length === 0 && (
          <div className="text-center py-10 text-xl font-semibold text-gray-500">
            No Payment History Found!
          </div>
        )}
      </div>

      <div className="flex justify-center items-center mt-5 gap-3">
        <button className="px-4 py-2 bg-bg3 rounded  text-white" onClick={handlePrev}><GrFormPrevious /></button>
       {pages.map((item, index)=>{
        return(
            <button  className={`px-5 py-1 rounded-full ${
              currentPage === item ? " bg-bg3 text-white" : "bg-bg4"
            }`} key={index} onClick={()=> setCurrentPage(item)}>{item}</button>
        )
       })}
       <button className="px-4 py-2 bg-bg3 rounded  text-white" onClick={handleNext}><MdNavigateNext /></button>
      </div>
    </div>
  );
};

export default AdminPaymentHistory;
