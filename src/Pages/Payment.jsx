// import { useQuery } from "@tanstack/react-query";
// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthProvider";
// import useAxiosSecure from "../hooks/useAxiosSecure";

// const Payment = () => {
//   const axiosSecure = useAxiosSecure();

//   const { user } = useContext(AuthContext);

//   const { data, isLoading } = useQuery({
//     queryKey: ["payment", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/paymentHistory/${user?.email}`);
//       return res.data.data;
//     },
//   });

//   if(data?.length === 0){
//     return (
//        <div className=" flex justify-center items-center min-h-screen"><h1 className="text-3xl font-bold text-bg3">You havent made any payments yet.</h1></div>

//     )
//   }

//   console.log(data)


//   return (
//     <div className="mt-[64px] ">
//       <div className="overflow-x-auto">
//         <table className="table table-zebra ">
//           {/* head */}
//           <thead className="bg-bg3 text-white">
//             <tr>
//               <th></th>
//               <th>Name</th>
//               <th>Price</th>
//               <th>Status</th>
//               <th>Delivery </th>
//               <th>productName</th>
//             </tr>
//           </thead>
//           <tbody className="bg-bg4">
//             {data?.map((item,index)=>{

//               return (
//                 <tr className="bg-bg2">
//               <th>{index +1}</th>
//               <td>{item.name}</td>
//               <td>{item.price}</td>
//               <td className={item.PaidStatus ? 'text-bg3' : 'text-red-500'}>{item.PaidStatus ? 'payment success': 'Not Payment'}</td>
//               <td className={item.successStatus ? 'text-bg3' : 'text-red-500'}>{item.successStatus ? 'Delevered': 'Pending'}</td>
//               <td>
//               <ul className="list-disc pl-5">
//                 {item.orderName.map((name, i) => (
//                   <li key={i}>{name}</li>
//                 ))}
//               </ul>
//             </td>


              
//             </tr>

//               )
//             })}
            
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Payment;


import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["payment", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/paymentHistory/${user?.email}`);
      return res.data.data;
    },
  });

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

  // Pagination calculation
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

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

          <tbody className="bg-bg4">
            {currentItems.map((item, index) => (
              <tr key={index} className="bg-bg2">
                <th>{indexOfFirstItem + index + 1}</th>
                <td>{item.name}</td>
                <td className="font-semibold text-blue-600">{item.price} ৳</td>

                <td className={item.PaidStatus ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                  {item.PaidStatus ? "Payment Success" : "Not Paid"}
                </td>

                <td className={item.successStatus ? "text-green-500 font-bold" : "text-yellow-500 font-bold"}>
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
        <div className="flex justify-center gap-5 mt-5">

          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded bg-bg3 text-white disabled:bg-gray-400"
          >
            Previous
          </button>

          <span className="font-bold text-lg">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded bg-bg3 text-white disabled:bg-gray-400"
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
};

export default Payment;
