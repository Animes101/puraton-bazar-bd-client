
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminAllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const [currentPage, setCurrentPage] = useState(0);
  const itemPerPage = 10;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["users", currentPage],
    queryFn: async () => {
      const res = await axiosSecure(
        `/users?page=${currentPage}&limit=${itemPerPage}`
      );
      return res.data;
    },
  });

  const totalUsers = data?.totalUsers || 0;  
  const numberOfPages = Math.ceil(totalUsers / itemPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // -------------- Update Role -----------------
  const handleUpdate = (id) => {
    axiosSecure.patch(`/users/${id}`)
    .then((res) => {
      if (res.data.data.modifiedCount > 0) {
        Swal.fire("Success!", "User role has been updated.", "success");
        refetch();
      }
    });
  };

  // -------------- Delete User -----------------
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
        axiosSecure.delete(`/users/${id}`).then((res) => {
          if (res.data.data.deletedCount > 0) {
            Swal.fire("Deleted!", "User has been deleted.", "success");
            refetch();
          }
        });
      }
    });
  };

  // -------------- Loader -----------------
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-infinity loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="">
      <div>
        <h1 className="text-4xl font-bold text-bg1 py-5">
          Total Users: {totalUsers}
        </h1>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead className="bg-bg3 text-white">
            <tr>
              <th></th>
              <th className="text-lg font-bold">Name</th>
              <th className="text-lg font-bold">Email</th>
              <th className="text-lg font-bold">Password</th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody className="bg-bg4/30">
            {data?.data?.map((user, index) => (
              <tr key={index}>
                <th>{index + 1 + currentPage * itemPerPage}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(user._id)}
                    className="bg-bg4 btn p-2 text-white"
                  >
                    {user.role === "admin" ? "Admin" : "Make Admin"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-bg4 text-white btn p-2 ml-3"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* -------------- No Data -------------- */}
        {data?.data?.length === 0 && (
          <div className="text-center py-10 text-xl font-semibold text-gray-500">
            No Users Found!
          </div>
        )}
      </div>

      {/* -------------- Pagination Buttons -------------- */}
      <div className="flex justify-center items-center mt-5 gap-3">
        {/* Prev */}
        <button
          onClick={() => currentPage > 0 && setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-bg3 rounded text-white disabled:opacity-40"
        >
          Prev
        </button>

        {/* Page Buttons */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-5 py-1 rounded-full ${
              currentPage === page
                ? "bg-bg3 text-white"
                : "bg-bg4 text-black"
            }`}
          >
            {page + 1}
          </button>
        ))}

        {/* Next */}
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

export default AdminAllUsers;
