"use client";

import React from "react";
import UnifiedChart from "./UnifiedChart";

export default function MonthlyRevenueChart({
  months,
  sales,
  views,
}: {
  months: string[];
  sales: number[];
  views: number[];
}) {
  const series = [
    { name: "Sales", data: sales },
    { name: "Views", data: views },
  ];

  return (
    <div className="[background-image:var(--admin-bgimg)] bg-[var(--admin-card-bg)] rounded-2xl p-6 shadow-xl h-full">
      <div className="text-white text-lg font-semibold mb-3">
        Monthly Revenue
      </div>

      <div className="w-full h-[280px] md:h-[300px]">
        <UnifiedChart
          type="bar"
          series={series}
          categories={months}
          height="100%"
        />
      </div>

      <div className="flex gap-4 mt-4 items-center text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-sm"
            style={{ background: "#FFB457" }}
          />{" "}
          Sales
        </div>
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-sm"
            style={{ background: "#4BB0FF" }}
          />{" "}
          Views
        </div>
      </div>
    </div>
  );
}
