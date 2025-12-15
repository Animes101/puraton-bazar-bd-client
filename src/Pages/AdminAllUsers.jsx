import React, { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { deleteUser } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import ReactHelmet from "../Components/Layout/ReactHelmet";

const AdminAllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(0);
  const { user } = useContext(AuthContext);
  const itemPerPage = 10;

  // -------------- Fetch Users -----------------

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
  const handleMakeAdmin = (id) => {
    axiosSecure.patch(`/make-admin/${id}`).then((res) => {
      if (res.data.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "User role has been updated.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          background: "#f2f2f0",
          color: "#5b6e74",
          iconColor: "#F1C40F",
        });

        refetch();
      }
    });
  };

  const handleMakeUser = (id) => {
    axiosSecure.patch(`/make-user/${id}`).then((res) => {
      if (res.data.data.modifiedCount > 0) {
        Swal.fire({
          title: "Role Updated!",
          text: "User role has been updated.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
          background: "#f2f2f0",
          color: "#5b6e74",
          iconColor: "#F1C40F",
        });

        refetch();
      }
    });
  };

  // -------------- Delete User -----------------
const handleDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#5b6e74",  
    cancelButtonColor: "#F1C40F",   
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    background: "#f2f2f0",          // ✅ updated background
    color: "#5b6e74",                // ✅ text color
    iconColor: "#F1C40F",            // ✅ warning icon color
  }).then((result) => {
    if (result.isConfirmed) {
      axiosSecure.delete(`/users/${id}`).then((res) => {
        if (res.data.data.deletedCount > 0) {
          // ✅ Success alert with same color theme
          Swal.fire({
            title: "Deleted Successfully!",
            text: "The user has been removed from the system.",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
            background: "#f2f2f0",   // light background
            color: "#5b6e74",        // text color
            iconColor: "#F1C40F",    // success icon color
            timerProgressBar: true,
          });

          refetch();
        }
      }).catch((err) => {
        // ❌ Error alert with same color theme
        Swal.fire({
          title: "Error!",
          text: `Failed to delete user. ${err.message}`,
          icon: "error",
          showConfirmButton: false,
          timer: 2500,
          background: "#f2f2f0",   // light red background
          color: "#5b6e74",         // text color
          iconColor: "#F1C40F",     // error icon color
          timerProgressBar: true,
        });
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
      {/* Helmet (SEO title) */}
      <ReactHelmet pageName={"Admin All Users"} />
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
                    onClick={() =>
                      user.role === "admin"
                        ? handleMakeUser(user._id)
                        : handleMakeAdmin(user._id)
                    }
                    className={`bg-bg4 btn p-2  font-bold ${
                      user.role === "admin" ? "text-btnBg " : "text-white"
                    }`}
                  >
                    {user.role === "admin" ? "Admin" : "Make Admin"}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-btnBg text-white btn p-2 ml-3"
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
          <GrFormPrevious />
        </button>

        {/* Page Buttons */}
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

        {/* Next */}
        <button
          onClick={() =>
            currentPage < numberOfPages - 1 && setCurrentPage(currentPage + 1)
          }
          disabled={currentPage === numberOfPages - 1}
          className="px-4 py-2 bg-bg3 rounded text-white disabled:opacity-40"
        >
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default AdminAllUsers;
