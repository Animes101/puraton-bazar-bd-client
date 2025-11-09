import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AdminAllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure("/users");
      return res.data;
    },
  });

  console.log(data);

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

        axiosSecure.delete(`/users/${id}`)
        .then(res=>{
          console.log(res);
            if(res.data.data.deletedCount>0){
                Swal.fire("Deleted!", "User has been deleted.", "success");
                refetch();
            }
          })
      }
    });
  };

  return (
    <div>
      <div>
        <h1>Total Users: {data?.data?.length}</h1>
      </div>
      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {data?.data?.map((user, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-bgGradinet3 btn p-2"
                    >
                      Delete
                    </button>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAllUsers;
