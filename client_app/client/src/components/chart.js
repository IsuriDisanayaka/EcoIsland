import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";


export default function Chart() {
  const data = [
    {
      name: "january",
      newUsers: 90,
      posts: 240,
      amt: 240
    },
    {
      name: "february",
      newUsers: 70,
      posts: 138,
      amt: 22
    },
    {
      name: "march",
      newUsers: 110,
      posts: 111,
      amt: 220
    },
    {
      name: "april",
      newUsers: 120,
      posts: 298,
      amt: 2000
    },
    {
      name: "may",
      newUsers: 20,
      posts: 120,
      amt: 0
    },
    {
      name: "june",
      newUsers: 340,
      posts: 500,
      amt: 0
    },
    {
      name: "july",
      newUsers: 350,
      posts: 500,
      amt: 0
    },
    {
      name: "August",
      newUsers: 400,
      posts: 200,
      amt: 0
    },
    {
      name: "September",
      newUsers: 0,
      posts: 0,
      amt: 0
    },
    {
      name: "October",
      newUsers: 0,
      posts: 0,
      amt: 0
    },
    {
      name: "November",
      newUsers: 0,
      posts: 0,
      amt: 0
    },
    {
      name: "December ",
      newUsers: 0,
      posts: 0,
      amt: 0
    }
  ];

  const formatYAxisTick = (tickValue, index) => {
    return (index * 10) + '%';
  };

  return (
    <LineChart
      width={1100}
      height={400}
      margintop={60}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis tickFormatter={formatYAxisTick} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="newUsers"
        stroke="#8884d8"
        strokeDasharray="5 5"
      />
      <Line
        type="monotone"
        dataKey="posts"
        stroke="#82ca9d"
        strokeDasharray="3 4 5 2"
      />
    </LineChart>
  );
}