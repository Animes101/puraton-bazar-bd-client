import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AdminHome = () => {
  const { user } = useContext(AuthContext);

  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["state"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/state`);
      return res.data;
    },
  });

  console.log(data);

  return (
    <div>
      <h1>wellcome {user?.displayName}</h1>
      <div>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-figure text-secondary">
            
            </div>
            <div className="stat-title">Total Products</div>
            <div className="stat-value">{data?.allProduct}</div>
            <div className="stat-desc">{new Date().toLocaleDateString()}</div>

          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
            </div>
            <div className="stat-title">New Users</div>
            <div className="stat-value">{data?.users}</div>
            
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
            </div>
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value">{data?.revenue}tk</div>
          </div>

           <div className="stat">
            <div className="stat-figure text-secondary">
            </div>
            <div className="stat-title">Total Order</div>
            <div className="stat-value">{data?.order}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
