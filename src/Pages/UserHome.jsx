// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthProvider";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../hooks/useAxiosSecure";

// import {
//   BarChart,
//   Bar,
//   Rectangle,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";

// const COLORS = ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f"];

// const UserHome = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();

//   // Category wise chart data
//   const { data, isLoading } = useQuery({
//     queryKey: ["users", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/dashboard-state/${user?.email}`);
//       return res.data;
//     },
//   });

//   // Total order + total spent
//   const { data: data2, isLoading: isLoading2 } = useQuery({
//     queryKey: ["stats-user", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/user-state/${user?.email}`);
//       return res.data;
//     },
//   });

//   return (
//     <div className="p-5">
//       <h1 className="text-3xl font-bold mb-5">
//         Welcome Back, {user.displayName}
//       </h1>

//       {/* Top Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
//         {/* Total Orders */}
//         <div className="bg-white shadow-md rounded-lg p-5 border">
//           <h2 className="text-xl font-semibold">Total Orders</h2>
//           <p className="text-3xl font-bold text-blue-600 mt-2">
//             {data2?.totalOrder || 0}
//           </p>
//         </div>

//         {/* Total Spent */}
//         <div className="bg-white shadow-md rounded-lg p-5 border">
//           <h2 className="text-xl font-semibold">Total Spent</h2>
//           <p className="text-3xl font-bold text-green-600 mt-2">
//             {data2?.totalSpent?.toLocaleString() || 0} ৳
//           </p>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

//         {/* BarChart */}
//         <div className="bg-white shadow-md p-5 rounded-lg border">
//           <h3 className="text-xl font-semibold mb-3">Category Wise Orders</h3>

//           {!isLoading && data && (
//             <BarChart
//               width={450}
//               height={300}
//               data={data}
//               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="catagory" />
//               <YAxis />
//               <Tooltip />
//               <Legend />

//               <Bar
//                 dataKey="quentity"
//                 fill="#4e79a7"
//                 activeBar={<Rectangle fill="#76b7b2" stroke="#000" />}
//               />
//             </BarChart>
//           )}
//         </div>

//         {/* PieChart */}
//         <div className="bg-white shadow-md p-5 rounded-lg border">
//           <h3 className="text-xl font-semibold mb-3">Category Distribution</h3>

//           {!isLoading && data && (
//             <PieChart width={400} height={350}>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={120}
//                 fill="#8884d8"
//                 dataKey="quentity"
//                 nameKey="catagory"
//                 label
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={index} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default UserHome;


import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Soft Modern Color Palette ❤️
const COLORS = ["#4e79a7", "#f28e2b", "#e15759", "#76b7b2", "#59a14f"];

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // Category wise chart data
  const { data, isLoading } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/dashboard-state/${user?.email}`);
      return res.data;
    },
  });

  // Total orders, total spent
  const { data: data2 } = useQuery({
    queryKey: ["stats-user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-state/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-5">

      {/* ===========================
              Welcome Text Updated
      ============================ */}
      <h1 className="text-3xl font-bold mb-5">
        Welcome Back, <span className="text-red-500 text-4xl">{user?.displayName}</span> 👋
      </h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        
        <div className="bg-white shadow-md rounded-lg p-5 border">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold text-bg3 mt-2">
            {data2?.totalOrder || 0}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5 border">
          <h2 className="text-xl font-semibold">Total Spent</h2>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {data2?.totalSpent?.toLocaleString() || 0} ৳
          </p>
        </div>

      </div>

      {/* ===========================
                  CHARTS
      ============================ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Bar Chart */}
        <div className="bg-white shadow-md p-5 rounded-lg border">
          <h3 className="text-xl font-semibold mb-3">Category Wise Orders</h3>

          {!isLoading && data && (
            <BarChart
              width={450}
              height={300}
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="catagory" tick={{ fill: "#333" }} />
              <YAxis tick={{ fill: "#333" }} />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="quentity"
                fill="#4e79a7"
                activeBar={<Rectangle fill="#76b7b2" stroke="#000" />}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          )}
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow-md p-5 rounded-lg border">
          <h3 className="text-xl font-semibold mb-3">Category Distribution</h3>

          {!isLoading && data && (
            <PieChart width={400} height={350}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={120}
                dataKey="quentity"
                nameKey="catagory"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserHome;
