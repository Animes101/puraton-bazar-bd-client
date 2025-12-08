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
// } from "recharts";




// const UserHome = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();

//   const { data, isLoading } = useQuery({
//     queryKey: ["users", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/dashboard-state/${user?.email}`);
//       return res.data;
//     },
//   });

//   console.log(data)
//   const { data: data2, isLoading: isLoading2 } = useQuery({
//     queryKey: ["stats-user", user?.email],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/user-state/${user?.email}`);
//       return res.data;
//     },
//   });

//   console.log(data2)

//   return (
//     <div className="">
//       <h1 className="text-2xl font-bold ">WelCome Back {user.displayName}</h1>
//       <div>
//         {/* BarChart */}
//         <div>
//           {!isLoading && data && (
//             <BarChart
//               style={{
//                 width: "100%",
//                 maxWidth: "700px",
//                 maxHeight: "70vh",
//                 aspectRatio: 1.618,
//               }}
//               responsive
//               data={data}
//               margin={{
//                 top: 5,
//                 right: 0,
//                 left: 0,
//                 bottom: 5,
//               }}
//             >
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="catagory" />
//               <YAxis dataKey="quentity" width="auto" />
//               <Tooltip />
//               <Legend />
//               <Bar
//                 dataKey="catagory"
//                 fill="#5b6e74"
//                 activeBar={<Rectangle fill="#819fa7" stroke="blue" />}
//               />
//               <Bar
//                 dataKey="quentity"
//                 fill="#5b6e74"
//                 activeBar={<Rectangle fill="#819fa7" stroke="purple" />}
//               />
//             </BarChart>
//           )}
//         </div>
//         {/* Pie Chart */}

//         {/* <PieChart
//           style={{
//             width: "100%",
//             maxWidth: "500px",
//             maxHeight: "80vh",
//             aspectRatio: 1,
//           }}
//           responsive
//         >
//           <Pie
//             data={data}
//             labelLine={false}
//             label={renderCustomizedLabel}
//             fill="#8884d8"
//             dataKey="value"
//             isAnimationActive={isAnimationActive}
//           >
//             {data.map((entry, index) => (
//               <Cell
//                 key={`cell-${entry.name}`}
//                 fill={COLORS[index % COLORS.length]}
//               />
//             ))}
//           </Pie> */}
//         {/* </PieChart> */}
//         <div></div>
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

  // Total order + total spent
  const { data: data2, isLoading: isLoading2 } = useQuery({
    queryKey: ["stats-user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-state/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        Welcome Back, {user.displayName}
      </h1>

      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {/* Total Orders */}
        <div className="bg-white shadow-md rounded-lg p-5 border">
          <h2 className="text-xl font-semibold">Total Orders</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {data2?.totalOrder || 0}
          </p>
        </div>

        {/* Total Spent */}
        <div className="bg-white shadow-md rounded-lg p-5 border">
          <h2 className="text-xl font-semibold">Total Spent</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {data2?.totalSpent?.toLocaleString() || 0} ৳
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* BarChart */}
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
              <XAxis dataKey="catagory" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="quentity"
                fill="#4e79a7"
                activeBar={<Rectangle fill="#76b7b2" stroke="#000" />}
              />
            </BarChart>
          )}
        </div>

        {/* PieChart */}
        <div className="bg-white shadow-md p-5 rounded-lg border">
          <h3 className="text-xl font-semibold mb-3">Category Distribution</h3>

          {!isLoading && data && (
            <PieChart width={400} height={350}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
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

