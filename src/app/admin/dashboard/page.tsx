import AreaChart from "@/components/admin/AreaChart";
import { Card } from "@mui/material";
import React from "react";

const page = () => {
  const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const series = [
    {
      name: "Active Users",
      data: [1200, 1500, 1600, 1800, 1700, 2000],
      color: "#3B82F6",
    },
    {
      name: "Total Users",
      data: [5000, 5400, 5800, 6100, 6400, 7000],
      color: "#22C55E",
    },
    {
      name: "Revenue",
      data: [42000, 45000, 47000, 46000, 49000, 52000],
      color: "#EAB308",
    },
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl m-4">Dashboard</h1>
      <div className="flex">
        <Card>
          <AreaChart
            previous={1700}
            current={2000}
            label="Active Users"
            smoothness={1} // ← more curve
          />
        </Card>
      </div>
    </main>
  );
};

export default page;
