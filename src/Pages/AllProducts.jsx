// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../hooks/useAxiosSecure";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import useItem from "../hooks/useItem";

// const AllProducts = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data, isLoading, refetch } = useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const res = await axiosSecure("/products");
//       return res.data;
//     },
//   });




//   const handleDelete = (id) => {
//     axiosSecure.delete(`/products/${id}`).then((result) => {

//       if (result.data.data.deletedCount > 0) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: `Delete ${id}`,
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         refetch();
//       }
//     });
//   };

//   return (
//     <div>
//       <h1 className="text-4xl font-bold text-bg3 py-4">Total Products={data?.data?.length}</h1>
//       <div className="overflow-x-auto">
//         <table className="table  table-zebra">
//           {/* head */}
//           <thead>
//             <tr>
//               <th>
//               </th>
//               <th className="text-3xl font-bold text-bg1"> Image & Name</th>
//               <th className="text-3xl font-bold text-bg1">Catagory</th>
//               <th className="text-3xl font-bold text-bg1">Price</th>
//               <th></th>
//             </tr>
//           </thead>
//           <tbody className="bg-bg4/30">
//             {/* row 1 */}
//             {data?.data?.map((product, index) => {
//               return (
//                 <tr>
//                   <th>{index + 1}</th>
//                   <td>
//                     <div className="flex items-center gap-3">
//                       <div className="avatar">
//                         <div className="mask mask-squircle h-12 w-12">
//                           <img
//                             src={product.images[0]}
//                             alt="Avatar Tailwind CSS Component"
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <div className="font-bold">{product?.name}</div>
//                         <div className="text-sm opacity-50">
//                           {product?.description ? product.description.slice(0, 100) + (product.description.length > 100 ? "..." : "") : ""}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td>{product.category}</td>
//                   <td>{product.price}</td>
//                   <td>
//                     <button
//                       onClick={() => handleDelete(product._id)}
//                       className="btn bg-bg1 text-white p-2"
//                     >
//                       delete
//                     </button>
                    
//                   </td>
//                   <td>
//                     <Link
//                       to={`/dashboard/updateItem/${product._id}`}
//                       className=" bg-bg3 p-2 ml-3 btn  text-white"
//                     >
//                       Update
//                     </Link></td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AllProducts;
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";


const AllProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 10;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure(
        `/products?page=${currentPage}&limit=${itemPerPage}`
      );
      return res.data;
    },
  });


  console.log(data)

  const totalProducts=data?.total_product;
 
  const numberOfPages = Math.ceil(totalProducts / itemPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/products/${id}`).then((res) => {
          if (res.data.data.deletedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `Deleted successfully`,
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
          }
        });
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
    <div>
      <h1 className="text-4xl font-bold text-bg3 py-4">
        Total Products: {data?.data?.length}
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th className="text-lg font-bold text-bg1">Image & Name</th>
              <th className="text-lg font-bold text-bg1">Category</th>
              <th className="text-lg font-bold text-bg1">Price</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody className="bg-bg4/30">
            {data?.data?.map((product, index) => (
              <tr key={product._id} className="hover">
                <th>{index + 1 + currentPage * itemPerPage}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={product.images[0]} alt={product.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.name}</div>
                      <div className="text-sm opacity-50">
                        {product.description
                          ? product.description.slice(0, 100) +
                            (product.description.length > 100 ? "..." : "")
                          : ""}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product.category}</td>
                <td>৳ {product.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn bg-bg1 text-white p-2"
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link
                    to={`/dashboard/updateItem/${product._id}`}
                    className="btn bg-bg3 text-white p-2 ml-3"
                  >
                    Update
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data?.data?.length === 0 && (
          <div className="text-center py-10 text-xl font-semibold text-gray-500">
            No Products Found!
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-5 gap-3">
        <button
          onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-bg3 rounded text-white disabled:opacity-40"
        >
          Prev
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-5 py-1 rounded-full ${
              currentPage === page ? "bg-bg3 text-white" : "bg-bg4 text-black"
            }`}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={() =>
            currentPage < numberOfPages - 1 &&
            setCurrentPage(currentPage + 1)
          }
          disabled={currentPage === numberOfPages - 1}
          className="px-4 py-2 bg-bg3 rounded text-white disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllProducts;
