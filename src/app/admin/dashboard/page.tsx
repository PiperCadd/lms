"use client";

import MonthlyRevenueChart from "@/components/admin/MonthlyRevenuChart";
import SalesAndViewsCard from "@/components/admin/SalesAndViewsChart";
import {
  BarChartSkeleton,
  DonutChartSkeleton,
  StatsGridSkeleton,
} from "@/components/admin/Skeleton";
import Stats from "@/components/admin/stats";
import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const payload = {
  stats: {
    activeUsers: {
      count: 42500,
      change: 24000,
      trend: [12, 15, 18, 14, 16, 17, 15],
    },
    totalUsers: {
      count: 97400,
      changePercent: 12.5,
      trend: [50, 60, 55, 65, 70, 68, 72],
    },
    overallRevenue: {
      amount: 254000,
      changePercent: 8.3,
      trend: [20, 21, 19, 22, 24, 23, 25],
    },
    enrollments: {
      count: 12800,
      changePercent: -2.1,
      trend: [10, 12, 11, 14, 13, 15, 12],
    },
  },
  monthlyRevenue: {
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    sales: [15, 12, 60, 25, 30, 18, 35, 20, 28],
    views: [18, 8, 45, 15, 28, 22, 40, 12, 30],
  },
  salesAndViews: {
    monthly: { sales: 65127, changePercent: 16.5, amountUsd: 55.21 },
    yearly: { sales: 984246, changePercent: 24.9, amountUsd: 267.35 },
  },
};

const Page: React.FC = () => {
  useEffect(() => {}, []);

  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     const res = await axios.get("/api/dashboard");
  //     setData(res.data);
  //     setLoading(false);
  //   }
  //   fetchData();
  // }, []);

  const statsArray = [
    {
      title: "Active Users",
      value: payload.stats.activeUsers.count.toLocaleString(),
      change: payload.stats.activeUsers.change,
      trend: payload.stats.activeUsers.trend,
    },
    {
      title: "Total Users",
      value: payload.stats.totalUsers.count.toLocaleString(),
      percent: payload.stats.totalUsers.changePercent,
      trend: payload.stats.totalUsers.trend,
    },
    {
      title: "Overall Revenue",
      value: `$${(payload.stats.overallRevenue.amount / 1000).toFixed(1)}K`,
      percent: payload.stats.overallRevenue.changePercent,
      trend: payload.stats.overallRevenue.trend,
    },
    {
      title: "Enrollments",
      value: payload.stats.enrollments.count.toLocaleString(),
      percent: payload.stats.enrollments.changePercent,
      trend: payload.stats.enrollments.trend,
    },
  ];

  return (
    <main className="text-white p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      {loading ? (
        <>
          <div className="mb-6">
            <StatsGridSkeleton />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChartSkeleton />
            <DonutChartSkeleton />
          </div>
        </>
      ) : (
        <>
          {/* Top stats row */}
          <div className="mb-6">
            <Stats stats={statsArray} />
          </div>
          {/* Main content: left large chart + right card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MonthlyRevenueChart
              months={payload.monthlyRevenue.months}
              sales={payload.monthlyRevenue.sales}
              views={payload.monthlyRevenue.views}
            />
            <div>
              <SalesAndViewsCard
                monthly={payload.salesAndViews.monthly}
                yearly={payload.salesAndViews.yearly}
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Page;
