import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
} from "recharts";

const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const PIE_COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const RADIAN = Math.PI / 180;

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: states } = useQuery({
    queryKey: ["state"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/state`);
      return res.data;
    },
  });

  const { data: orderState = [] } = useQuery({
    queryKey: ["orderState"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orderState`);
      return res.data;
    },
  });

  const pieData = orderState.map((item) => ({
    name: item.category,
    value: item.quentity,
  }));

  // TRIANGLE BAR SHAPE
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}
    C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2},${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width},${y + height}
    Z`;
  };
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} fill={fill} stroke="none" />;
  };

  // PIE LABEL
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (!cx || !cy) return null;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="middle"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div>
      <h1>Welcome {user?.displayName}</h1>

      {/* STATS */}
      <div className="stats shadow my-4">
        <div className="stat">
          <div className="stat-title">Total Products</div>
          <div className="stat-value">{states?.allProduct}</div>
        </div>

        <div className="stat">
          <div className="stat-title">New Users</div>
          <div className="stat-value">{states?.users}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">{states?.revenue} tk</div>
        </div>

        <div className="stat">
          <div className="stat-title">Total Order</div>
          <div className="stat-value">{states?.order}</div>
        </div>
      </div>

      {/* CHART SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* BAR CHART */}
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={orderState} margin={{ top: 20, right: 20, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis width={40} />
              <Bar dataKey="quentity" shape={TriangleBar} label={{ position: "top" }}>
                {orderState.map((_, index) => (
                  <Cell key={index} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                fill="#8884d8"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Legend></Legend>
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default AdminHome;
